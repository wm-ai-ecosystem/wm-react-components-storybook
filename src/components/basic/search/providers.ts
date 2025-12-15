import {
  filter,
  get,
  includes,
  isArray,
  isNumber,
  isObject,
  isString,
  split,
  toLower,
  values,
  isEmpty,
} from "lodash";

export interface DataProviderConfig {
  dataset?: any[];
  datafield?: string;
  query?: string;
  matchMode?: string;
  casesensitive?: boolean;
  searchKey?: string;
  isformfield?: boolean;
  limit?: number;
  page?: number;
  isLocalFilter?: boolean;
  onBeforeservicecall?: (widget: any, inputData: any) => void;
  component?: any;
}

export interface IDataProvider {
  filter(
    config: DataProviderConfig
  ): Promise<{ data: any[]; hasMoreData: boolean; isLastPage: boolean }>;
}

// Enhanced LocalDataProvider with React Native logic
export class LocalDataProvider implements IDataProvider {
  createEmptyResult(): { data: any[]; hasMoreData: boolean; isLastPage: boolean } {
    return { data: [], hasMoreData: false, isLastPage: true };
  }

  applyFilter(entry: any, queryText: any): boolean {
    entry = isNumber(entry) ? entry.toString() : entry;
    return includes(entry, queryText);
  }

  filter(
    config: DataProviderConfig
  ): Promise<{ data: any[]; hasMoreData: boolean; isLastPage: boolean }> {
    const entries = config.dataset || [];
    let queryText = typeof config.query === "string" ? config.query : "";
    const { searchKey, casesensitive = false } = config;
    let filteredData: any[] = [];

    return new Promise(resolve => {
      // If searchkey is defined, then check for match string against each item in the dataset
      if (searchKey) {
        const keys = split(searchKey, ",");
        if (!entries.length) {
          return resolve(this.createEmptyResult());
        }

        let entryObj = entries[0];
        entryObj = entryObj.hasOwnProperty("dataObject") ? entryObj["dataObject"] : entryObj;
        const entryKeys = Object.keys(entryObj);
        const hasEntry = keys.find((k: string) => {
          if (k.includes(".")) {
            k = split(k, ".")[0];
          }
          return entryKeys.includes(k);
        });

        if (!hasEntry) {
          // Widget bound to query variable, searchkey is query or path params
          return resolve({ data: entries, hasMoreData: false, isLastPage: true });
        }

        filteredData = filter(entries, (item: any) => {
          return keys.some((key: string) => {
            let a = get(item.dataObject || item, key);
            let b = queryText;
            if (!casesensitive) {
              a = toLower(String(a));
              b = toLower(String(b));
            }
            return this.applyFilter(a, b);
          });
        });
      } else {
        // Local search on data with array of objects
        if (isArray(entries) && entries.length > 0) {
          // Check if entries have dataObject property (normalized format)
          const hasDataObject = entries[0] && entries[0].hasOwnProperty("dataObject");

          if (hasDataObject) {
            // Handle normalized dataset format
            filteredData = filter(entries, (entry: any) => {
              const dataObj = entry.dataObject || entry;
              let a = isString(dataObj) ? dataObj : values(dataObj).join(" ");
              if (!casesensitive) {
                a = toLower(String(a));
                queryText = toLower(String(queryText));
              }
              return this.applyFilter(a, queryText);
            });
          } else if (isObject(entries[0])) {
            // Handle regular object array
            filteredData = filter(entries, (entry: any) => {
              const dataObj = entry.dataObject || entry;
              let a = isString(dataObj) ? dataObj : values(dataObj).join(" ");
              if (!casesensitive) {
                a = toLower(String(a));
                queryText = toLower(String(queryText));
              }
              return this.applyFilter(a, queryText);
            });
          } else {
            // Handle primitive values
            filteredData = filter(entries, (entry: any) => {
              let entryValue = entry;
              if (!casesensitive) {
                entryValue = toLower(String(entryValue));
                queryText = toLower(String(queryText));
              }
              return this.applyFilter(entryValue, queryText);
            });
          }
        } else {
          filteredData = filter(entries, (entry: any) => {
            let entryValue = entry;
            if (!casesensitive) {
              entryValue = toLower(String(entryValue));
              queryText = toLower(String(queryText));
            }
            return this.applyFilter(entryValue, queryText);
          });
        }
      }

      resolve({
        data: filteredData,
        hasMoreData: false,
        isLastPage: true,
      });
    });
  }

  // Keep existing methods for backward compatibility (not used till now)
  performFiltering(
    entries: any[],
    query: string,
    matchMode: string,
    datafield?: string,
    searchKey?: string
  ): any[] {
    const isAllFieldsSearch = datafield === "All Fields" || !datafield;

    if (isAllFieldsSearch) {
      return this.filterAllFields(entries, query, matchMode);
    }

    return this.filterSpecificFields(entries, query, matchMode, datafield, searchKey);
  }

  filterAllFields(entries: any[], query: string, matchMode: string): any[] {
    if (this.isObjectArray(entries)) {
      return entries?.filter(entry =>
        Object.keys(entry).some(key => this.matchesField(entry[key], query, matchMode))
      );
    }

    return entries?.filter(entry => this.matchesField(entry, query, matchMode));
  }

  filterSpecificFields(
    entries: any[],
    query: string,
    matchMode: string,
    datafield?: string,
    searchKey?: string
  ): any[] {
    const keys = searchKey ? searchKey.split(",") : [datafield];

    return entries?.filter(item =>
      keys.some(key => {
        if (!key || item[key] === undefined) return false;
        return this.matchesField(item[key], query, matchMode);
      })
    );
  }

  matchesField(fieldValue: any, query: string, matchMode: string): boolean {
    if (fieldValue == null) return false;

    const normalizedField = this.normalizeValue(fieldValue);
    const normalizedQuery = this.normalizeValue(query);

    return this.applyMatchMode(normalizedField, normalizedQuery, matchMode);
  }

  normalizeValue(value: any): string {
    return value?.toString().toLowerCase() ?? "";
  }

  isObjectArray(entries: any[]): boolean {
    return Array.isArray(entries) && entries.length > 0 && typeof entries[0] === "object";
  }

  applyMatchMode(entry: string, queryText: string, matchMode?: string): boolean {
    if (!queryText) return true;

    if (matchMode?.includes("start")) {
      return entry.startsWith(queryText);
    }

    if (matchMode?.includes("end")) {
      return entry.endsWith(queryText);
    }

    if (matchMode?.includes("exact")) {
      return entry === queryText;
    }

    return entry.includes(queryText);
  }
}

// Enhanced DataProvider with React Native logic
export class DataProvider {
  private localDataProvider = new LocalDataProvider();

  // Check if the variable is of type service variable and whether update is required
  init(component: any) {
    if (component?.isUpdateRequired) {
      return component?.isUpdateRequired();
    }
    return false;
  }

  // Setting the inputFields and invoking the variable for API calls
  async invokeVariable(component: any, query: string): Promise<any> {
    let paramsObj: { [key: string]: any } | null = null;

    if (component?.searchkey) {
      component?.searchkey.split(",").forEach((k: string) => {
        if (!paramsObj) {
          paramsObj = {};
        }
        paramsObj[k] = query;
      });
    }

    // Use the onQuerySearch callback if available
    if (component?.onQuerySearch) {
      return new Promise((resolve, reject) => {
        component?.onQuerySearch(
          paramsObj,
          (response: any) => resolve(response),
          (error: any) => reject(error)
        );
      });
    }

    return Promise.resolve();
  }

  async filter(
    config: DataProviderConfig
  ): Promise<{ data: any[]; hasMoreData: boolean; isLastPage: boolean }> {
    const { searchKey } = config;

    // If searchkey is provided, check if we need to make an API call
    if (searchKey) {
      const keys = split(searchKey, ",");
      if (keys.length && config.component) {
        // Check if update is required for service variables
        const updateRequired = this.init(config.component);

        if (updateRequired) {
          try {
            const response = await this.invokeVariable(config.component, config.query || "");
            if (response) {
              let dataSet = response.dataSet || response;
              if (isEmpty(dataSet)) {
                return { data: [], hasMoreData: false, isLastPage: true };
              }
              if (isObject(dataSet) && !isArray(dataSet)) {
                dataSet = [dataSet];
              }
              return { data: dataSet, hasMoreData: false, isLastPage: true };
            }
          } catch (error) {
            console.error("API call failed:", error);
            return { data: [], hasMoreData: false, isLastPage: true };
          }
        }
      }
    }

    // Fall back to local filtering
    return this.localDataProvider.filter(config);
  }
}
