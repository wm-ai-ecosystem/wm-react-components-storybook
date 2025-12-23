import { WmTableColumnProps } from "../props";

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

// Types for summary row data
export interface SummaryRowValue {
  value?: any;
  class?: string;
}

export type SummaryRowData = string | number | SummaryRowValue | Promise<any>;

// Interface for aggregate methods
export interface ColumnAggregate {
  sum: () => number;
  average: (precision?: number) => number;
  count: () => number;
  minimum: () => number;
  maximum: () => number;
  percent: (total: number, precision?: number) => number;
}

// Interface for enhanced column with aggregate and summary methods
export interface EnhancedColumnProxy {
  aggregate: ColumnAggregate;
  setSummaryRowData: (data: SummaryRowData | SummaryRowData[]) => void;
}

// Function to create aggregate methods for a column

export function createColumnsProxy(
  wmTableColumns: any[],
  applyOverride: (index: number, key: string, value: any) => void,
  setColumnsVersion?: (updater: (v: number) => number) => void,
  setSummaryRowDef?: (
    columnKey: string,
    data: any,
    rowIndex: number,
    refresh: boolean,
    show?: boolean
  ) => void
) {
  const proxy: Record<string, any> = {};

  wmTableColumns.forEach((col, idx) => {
    const key = (col as any).field;

    if (key) {
      // Get column's show property (default to true if not specified)
      const columnShow = col.show !== undefined ? col.show : true;

      // Create setSummaryRowData method
      const setSummaryRowData = (data: SummaryRowData | SummaryRowData[]) => {
        const newData = Array.isArray(data) ? data : [data];
        invokeSummaryRowData(key, newData, setSummaryRowDef, columnShow);
      };

      // Create the proxy for this column
      proxy[key] = new Proxy(col, {
        get(target, prop) {
          // Return setSummaryRowData method
          if (prop === "setSummaryRowData") {
            return setSummaryRowData;
          }
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

// Helper function to invoke summary row data with Promise handling
function invokeSummaryRowData(
  columnKey: string,
  data: SummaryRowData[],
  setSummaryRowDef?: (
    columnKey: string,
    data: any,
    rowIndex: number,
    refresh: boolean,
    show?: boolean
  ) => void,
  show?: boolean
) {
  if (!setSummaryRowDef) return;

  data.forEach((item, index) => {
    // Handle Promise values directly
    if (item instanceof Promise) {
      item
        .then(resolvedValue => {
          setSummaryRowDef(columnKey, resolvedValue, index, true, show);
        })
        .catch(error => {
          console.error(`Error resolving summary row data for column ${columnKey}:`, error);
          setSummaryRowDef(columnKey, "", index, true, show);
        });
    }
    // Handle objects with Promise values
    else if (item && typeof item === "object" && "value" in item) {
      const itemObj = item as SummaryRowValue;
      if (itemObj.value instanceof Promise) {
        itemObj.value
          .then(resolvedValue => {
            setSummaryRowDef(columnKey, { ...itemObj, value: resolvedValue }, index, true, show);
          })
          .catch(error => {
            console.error(`Error resolving summary row data for column ${columnKey}:`, error);
            setSummaryRowDef(columnKey, { ...itemObj, value: "" }, index, true, show);
          });
      } else {
        // Object with non-Promise value
        setSummaryRowDef(columnKey, item, index, false, show);
      }
    }
    // Handle regular values (string, number, etc.)
    else {
      setSummaryRowDef(columnKey, item, index, false, show);
    }
  });
}
