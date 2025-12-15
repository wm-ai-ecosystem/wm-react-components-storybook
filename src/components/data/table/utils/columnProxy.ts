export const keyMap: { [key: string]: string } = {
  caption: "header",
  name: "accessorKey",
  columnSize: "size",
  sortable: "enableSorting",
  textalignment: "meta.textAlign",
  backgroundcolor: "meta.backgroundColor",
  colClass: "meta.className",
  style: "meta",
};

export function createColumnsProxy(
  wmTableColumns: any[],
  applyOverride: (index: number, key: string, value: any) => void,
  setColumnsVersion?: (updater: (v: number) => number) => void
) {
  const proxy: Record<string, any> = {};
  wmTableColumns.forEach((col, idx) => {
    const key = (col as any).field;
    if (key) {
      proxy[key] = new Proxy(col, {
        get(target, prop) {
          return (target as any)[prop];
        },
        set(target, prop, value) {
          if ((target as any)[prop] !== value) {
            let mapped = keyMap[prop as string];
            if (mapped && mapped.includes(".")) {
              mapped = mapped.split(".")[1];
            }
            const finalKey = mapped || (prop as string);
            applyOverride(idx, finalKey, value);
            (target as any)[prop] = value;
            if (setColumnsVersion) {
              setColumnsVersion((v: number) => v + 1);
            }
          }
          return true;
        },
      });
    }
  });
  return proxy;
}
