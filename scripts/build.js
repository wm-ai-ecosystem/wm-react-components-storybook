const fs = require("fs-extra");
const projectDir = ".";
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const execa = require("execa");
const path = require("path");
const execSync = require("child_process").execSync;

async function createPackageLock(path) {
  console.log("came here--- 2");
  await execa.execa("npm", ["install", "--package-lock-only"], { cwd: path });
  console.log("came here--- 3");
  const expoPackageJSON = fs.readJSONSync(`${path}/package-lock.json`);
  Object.values(expoPackageJSON.packages || {}).map(v => {
    delete v.resolved;
  });
  fs.writeJSONSync(`${path}/package-lock.json`, expoPackageJSON, { spaces: 4 });
}

const execCommand = command => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

async function updatePackageVersion(packagePath, key, version) {
  let content = fs.readFileSync(packagePath, "utf8");
  content = content.replace(new RegExp(`"${key}"\\s*:\\s*"[^"]*"`), `"${key}": "${version}"`);
  fs.writeFileSync(packagePath, content);
}

async function postBuild(runtimeVersion, isProduction) {
  let distPath = "dist";
  if (isProduction) {
    distPath = distPath + "/npm-packages/package";
  }
  execCommand(`babel src --out-dir ${distPath} --extensions ".js,.ts,.tsx"`);

  // Copy CSS and CSS Module files
  let cssFiles = [];
  try {
    cssFiles = fs
      .readdirSync("src/components", { recursive: true, withFileTypes: true })
      .filter(
        dirent =>
          dirent.isFile() && (dirent.name.endsWith(".css") || dirent.name.endsWith(".module.css"))
      )
      .map(dirent => path.join(dirent.path, dirent.name));
  } catch (error) {
    console.error("Error reading CSS files:", error);
    throw error;
  }

  cssFiles.forEach(cssFilePath => {
    const relativePath = path.relative("src", cssFilePath);
    const destFilePath = path.join(distPath, relativePath);
    fs.copySync(cssFilePath, destFilePath);
  });

  fs.copySync(`${projectDir}/package.json`, `${projectDir}/dist/package.json`);
  const packageData = fs.readJSONSync(`${projectDir}/package.json`, { encoding: "utf8" });
  packageData.main = "index";
  packageData.module = "index";
  packageData["devDependencies"]["@wavemaker/variables"] = runtimeVersion;
  packageData.exports = { "./": "./" };
  delete packageData["files"];
  fs.writeFileSync(`${projectDir}/dist/package.json`, JSON.stringify(packageData, null, 2));
  await updatePackageVersion(`${projectDir}/dist/package.json`, "version", runtimeVersion);
  console.log("Post Build successful!!!");
}

async function prepareNpmPackages(runtimeVersion) {
  let tarballName = `wavemaker-react-runtime-${runtimeVersion}.tgz`;
  fs.readdirSync(`${projectDir}/dist`).forEach(item => {
    const srcPath = path.join(`${projectDir}/dist`, item);
    const destPath = path.join(`${projectDir}/dist/npm-packages/package`, item);
    if (!srcPath.includes("npm-packages")) {
      fs.copySync(srcPath, destPath, { filter: p => !p.includes("node_modules") });
    }
  });
  console.log("came here---");
  // generate package lock
  await createPackageLock(`${projectDir}/dist/npm-packages/package`);
  console.log("came here--- 1");
  await execa.execa(
    "tar",
    ["-czf", `dist/npm-packages/${tarballName}`, "-C", "dist/npm-packages", "package"],
    { cwd: `${projectDir}` }
  );
  console.log("came here--- 4");
  let tarballPath = path.join(__dirname, `../dist/npm-packages/${tarballName}`);
  const { stdout } = await execa.execa("node", [
    "./process-npm-package-stats.js",
    `--path=${tarballPath}`,
    "--packageName=@wavemaker/react-runtime",
    `--publishVersion=${runtimeVersion}`,
  ]);
  console.log("came here--- 5");
  console.log(stdout);
}

async function pushToLocalRepo() {
  fs.writeFileSync(`${projectDir}/dist/timestamp.txt`, "" + Date.now());
  await execa.execa("yalc", ["publish", "--no-sig", "--push"], { cwd: `${projectDir}/dist` });
}

yargs(hideBin(process.argv))
  .command(
    "post-build",
    "to run post processing after project build",
    yargs => {
      yargs
        .option("runtimeVersion", {
          describe: "version number",
          type: "string",
          default: "1.0.0-dev",
        })
        .option("production", {
          describe: "to perform a production build",
          type: "boolean",
          default: false,
        });
    },
    argv => {
      postBuild(argv.runtimeVersion, argv.production)
        .then(() => {
          console.log("argv", argv);
          if (argv.production) {
            return prepareNpmPackages(argv.runtimeVersion);
          } else {
            return pushToLocalRepo();
          }
        })
        .catch(err => {
          console.error("Error during post-build process:", err);
          process.exit(1);
        });
    }
  )
  .showHelpOnFail().argv;
