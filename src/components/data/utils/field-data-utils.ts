import { DataSource, FormWidgetType } from "../types";
import { includes, isObject } from "lodash-es";

const DATASET_WIDGETS = [
  "select",
  "autocomplete",
  "typeahead",
  "chips",
  "checkboxset",
  "radioset",
  "rating",
  "switch",
];

/**
 * Check if widget type is a dataset widget (similar to isDataSetWidget in Angular)
 */
export const isDataSetWidget = (widgettype: string): boolean => {
  return DATASET_WIDGETS.includes(widgettype?.toLowerCase());
};

export const getDistinctFieldProperties = (dataSource: any, formField: any) => {
  const props: any = {};
  let fieldColumn;
  if (formField["isRelated"]) {
    props.tableName = formField["lookup-type"];
    fieldColumn = formField["lookup-field"];
    props.distinctField = fieldColumn;
    props.aliasColumn = fieldColumn?.replace(".", "$"); // For related fields, In response . is replaced by $
    props.filterExpr = formField.filterexpressions
      ? isObject(formField.filterexpressions)
        ? formField.filterexpressions
        : JSON.parse(formField.filterexpressions)
      : {};
  } else {
    props.tableName = dataSource.execute(DataSource.Operation.GET_ENTITY_NAME);
    fieldColumn = formField["fieldcol"] || formField.key;
    props.distinctField = fieldColumn;
    props.aliasColumn = fieldColumn;
  }
  return props;
};

export function getDistinctValues(dataSource: any, formField: any, widget: any) {
  let props: any;

  return new Promise((res, rej) => {
    if (
      isDataSetWidget(formField.widget) &&
      (!formField.isDataSetBound || widget === "filterwidget")
    ) {
      props = getDistinctFieldProperties(dataSource, formField);
      dataSource
        .execute(DataSource.Operation.GET_DISTINCT_DATA_BY_FIELDS, {
          fields: props.distinctField,
          entityName: props.tableName,
          pagesize: formField.limit,
          filterExpr: formField.filterexpressions ? JSON.parse(formField.filterexpressions) : {},
        })
        .then((response: any) => {
          res({ field: formField, data: response.data, aliasColumn: props.aliasColumn });
        }, rej)
        .catch((error: any) => {
          rej({ field: formField, data: [], aliasColumn: props.aliasColumn });
        });
    }
  });
}

export function isSearchWidgetType(widget: string) {
  return includes(
    [FormWidgetType.AUTOCOMPLETE, FormWidgetType.TYPEAHEAD, FormWidgetType.CHIPS],
    widget
  );
}
