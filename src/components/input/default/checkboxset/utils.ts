import toString from "lodash-es/toString";
import isEqual from "lodash-es/isEqual";
import { DatasetItem } from "./props";
import { ALL_FIELDS } from "@wavemaker/react-runtime/components/constants";

export function getCheckboxsetDisplayValues(
  items: Array<Pick<DatasetItem, "key" | "label" | "value" | "dataObject">> = [],
  selectedKeys: any[] = [],
  datafield: string,
  usekeys: boolean
): string[] {
  if (!Array.isArray(items) || !Array.isArray(selectedKeys)) {
    return [];
  }
  const isAllFields = datafield === ALL_FIELDS;
  return items
    .filter(item =>
      selectedKeys.some(k => {
        if (isAllFields) {
          return usekeys ? toString(k) === toString(item.key) : isEqual(k, item.value);
        }
        return toString(k) === toString(item.key);
      })
    )
    .map(item => (item?.label != null ? String(item.label) : ""));
}
