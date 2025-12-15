// const fs = require("fs");
// const path = require("path");
// const execSync = require("child_process").execSync;

// const gitignorePath = path.resolve(__dirname, "../.gitignore");
// const distPattern = "dist";

// // Function to remove dist from .gitignore
// const removeDistFromGitignore = () => {
//   const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
//   const updatedContent = gitignoreContent.replace(new RegExp(`^${distPattern}$`, "m"), "");
//   fs.writeFileSync(gitignorePath, updatedContent, "utf8");
// };

// // Function to add dist back to .gitignore
// const addDistBackToGitignore = () => {
//   const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
//   if (!gitignoreContent.includes(distPattern)) {
//     fs.appendFileSync(gitignorePath, `\n${distPattern}\n`);
//   }
// };

// // Function to execute shell commands
// const execCommand = command => {
//   try {
//     execSync(command, { stdio: "inherit" });
//   } catch (error) {
//     console.error(`Error executing command: ${command}`);
//     process.exit(1);
//   }
// };

// // Main function
// const main = () => {
//   try {
//     // Step 1: Remove dist from .gitignore
//     removeDistFromGitignore();

//     // Step 2: Run build and yalc publish
//     execCommand('babel src --out-dir dist --extensions ".js,.ts,.tsx"');
//     execCommand("yalc publish --private");

//     // Step 3: Add dist back to .gitignore
//     addDistBackToGitignore();
//   } catch (error) {
//     console.error("Failed to publish package:", error);
//     process.exit(1);
//   }
// };

// main();
