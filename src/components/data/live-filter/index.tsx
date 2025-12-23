import { isArray, get } from "lodash-es";
import { useEffect, useRef } from "react";

import { isDefined } from "@/core/util";
import Form from "@/components/data/form";
import withBaseWrapper from "@/higherOrder/withBaseWrapper";
import LiveFilterProps, { DEFAULT_PROPS } from "./props";
import { DataSource, FormWidgetType, DataType } from "../types";
import {
  getRangeFieldValue,
  getRangeMatchMode,
  getEnableEmptyFilter,
  getEmptyMatchMode,
} from "@/components/data/utils";
import { isDataSetWidget } from "@/components/data/utils/field-data-utils";
import { getDistinctValuesForField } from "@/components/data/utils/filter-field-util";
import FormFieldProps from "../form/form-field/props";

const FILTER_CONSTANTS = {
  EMPTY_KEY: "EMPTY_NULL_FILTER",
};

const WmLiveFilter = (prop: LiveFilterProps) => {
  const props = { ...DEFAULT_PROPS, ...prop };
  const isInitilised = useRef<boolean>(false);
  const isDataSourceUpdatedRef = useRef<boolean>(false);
  const dataSource = props.listener?.Variables?.[props.dataSource as string];

  function updateResults(dataSet: any): void {
    props.listener?.onChange(props.name, {
      result: dataSet,
    });
  }

  async function Livefilter(options?: any, clearFilter?: boolean, formFields?: any) {
    if (!dataSource) return;

    // Treat first arg as submitted form data model
    const dataModel = options || {};

    let page, orderBy, pagesize, filterFields, isValid;
    page = 1;
    orderBy = props.orderBy ?? "";
    pagesize = props.pagesize ?? 20;
    filterFields = {} as Record<string, any>;

    // before invoke filter called onBeforeInvokeFilter if response is false or undefined then return

    try {
      isValid = props.onBeforeservicecall(filterFields);
      if (isValid === false) {
        return;
      }
      if (isValid && isValid.error) {
        props.toggleMessage(true, isValid.error, "error", "ERROR");
        return;
      }
    } catch (err: any) {
      if (err.message === "Abort") {
        return;
      }
    }

    if (clearFilter) {
      return dataSource[DataSource.Operation.LIST_RECORDS]({
        filterFields: {},
        orderBy: "",
        page: 1,
      })
        .then((results: any) => {
          if (results) {
            updateResults(results?.data);
          }
        })
        .catch((err: any) => {
          props.toggleMessage(true, err, "error", "ERROR");
          props.onResultCb(err, false);
          return err;
        });
    }

    /* Construct the formFields Variable to send it to the queryBuilder */
    const fieldsArray = isArray(formFields) ? formFields : Object.values(formFields || {});

    // Sync runtime values from submitted data into field definitions
    fieldsArray.forEach((filterField: any) => {
      // Use fieldcol (or name) as the actual column identifier since field may contain "true"
      const fieldKey = filterField.fieldcol || filterField.name || filterField.field;
      const submitted = dataModel?.[fieldKey];
      if (filterField["isRange"]) {
        if (submitted && typeof submitted === "object") {
          filterField._minValue =
            submitted.minValue ?? submitted.min ?? submitted.start ?? filterField._minValue;
          filterField._maxValue =
            submitted.maxValue ?? submitted.max ?? submitted.end ?? filterField._maxValue;
        }
      } else {
        if (submitted !== undefined) {
          filterField._value = submitted;
        }
      }
    });

    fieldsArray.forEach((filterField: any) => {
      let fieldValue;
      let matchMode;
      // Use fieldcol (or name) as the actual column identifier since field may contain "true"
      let colName = filterField.fieldcol || filterField.name || filterField.field;
      const minValue = filterField._minValue;
      const maxvalue = filterField._maxValue;
      /* if field is part of a related entity, column name will be 'entity.fieldName' */
      if (filterField["isRelated"]) {
        colName += "." + filterField["lookup-field"];
      }
      if (filterField["isRange"]) {
        /*Based on the min and max values, decide the matchmode condition*/
        fieldValue = getRangeFieldValue(minValue, maxvalue);
        matchMode = getRangeMatchMode(minValue, maxvalue);
        if (isDefined(fieldValue)) {
          filterFields[colName] = {
            value: fieldValue,
            matchMode: matchMode,
            logicalOp: "AND",
          };
        }
      } else {
        switch (filterField.widgettype) {
          case FormWidgetType.SELECT:
          case FormWidgetType.RADIOSET:
            if (
              getEnableEmptyFilter(props.enableemptyfilter as string) &&
              filterField._value === FILTER_CONSTANTS.EMPTY_KEY
            ) {
              matchMode = getEmptyMatchMode(props.enableemptyfilter as string);
              fieldValue = filterField._value;
            } else {
              if (filterField.type === DataType.BOOLEAN) {
                if (isDefined(filterField._value) && filterField._value !== "") {
                  fieldValue = JSON.parse(filterField._value);
                }
              } else {
                fieldValue = filterField._value;
              }
            }
            break;
          case FormWidgetType.CHECKBOXSET:
          case FormWidgetType.CHIPS:
            if (filterField._value && filterField._value.length) {
              fieldValue = filterField._value;
            }
            break;
          case FormWidgetType.CHECKBOX:
          case FormWidgetType.TOGGLE:
            if (isDefined(filterField._value) && filterField._value !== "") {
              fieldValue =
                filterField.type === DataType.BOOLEAN
                  ? JSON.parse(filterField._value)
                  : filterField._value;
            }
            break;
          default:
            fieldValue = filterField._value;
            break;
        }
        if (isDefined(fieldValue) && fieldValue !== "" && fieldValue !== null) {
          filterFields[colName] = {};
          if (matchMode) {
            filterFields[colName].matchMode = matchMode;
            fieldValue = undefined;
          } else if (filterField.type === DataType.STRING || filterField.isRelated) {
            // Only for string types and related fields, custom match modes are enabled.
            // filterFields[colName].matchMode =
            //   matchMode || filterField.matchmode || variable[DataSource.Operation.GET_MATCH_MODE]();
          }
          filterFields[colName].value = fieldValue;
          filterFields[colName].logicalOp = "AND";
          filterFields[colName].type = filterField.type;
        }
      }
    });

    //  if exportType is there then return the download
    if ((options && options.exportType) || (options && options.data && options.data.exportType)) {
      const exportType = options.exportType ?? options.data.exportType;
      return dataSource[DataSource.Operation.DOWNLOAD]({
        data: {
          matchMode: "anywhereignorecase",
          filterFields: filterFields,
          orderBy: orderBy,
          exportType,
          logicalOp: "AND",
          exportSize: options.exportSize ?? options.data?.exportSize,
          fields: options.fields ?? options.data?.fields,
          fileName: options.fileName ?? options.data?.fileName,
        },
      });
    }

    return dataSource[DataSource.Operation.LIST_RECORDS]({
      filterFields: filterFields,
      orderBy: orderBy,
      page: page,
      pagesize: pagesize,
      skipDataSetUpdate: true,
      inFlightBehavior: "executeAll",
    })
      .then((results: any) => {
        if (results) {
          updateResults(results?.data);
        }
      })
      .catch((err: any) => {
        props.toggleMessage(true, err, "error", "ERROR");
        props.onResultCb(err, false);
        return err;
      });
  }

  function onDataSourceChange(formFields: FormFieldProps[]) {
    if (isDataSourceUpdatedRef.current) return;
    // const fields = get(props.listener.Widgets[props.name], "formfields", []);

    // let formFields = isArray(fields) ? fields : Object.values(fields || {});

    if (get(formFields, "length")) {
      isDataSourceUpdatedRef.current = true;
    }
    formFields.forEach((field: any) => {
      if (isDataSetWidget(field.widget)) {
        getDistinctValuesForField(dataSource, field, {
          widget: "widgettype",
          enableemptyfilter: props.enableemptyfilter,
          EMPTY_VALUE: props?.listener?.appLocale.LABEL_NO_VALUE,
        });
      }
    });
  }

  // side events
  useEffect(() => {
    if (!isInitilised.current && props?.dataset && props?.dataset?.length > 0) {
      updateResults(props.dataset);
      // @ts-ignore
      isInitilised.current = true;
    }
  }, [props.dataset]);

  return (
    // @ts-ignore
    <Form
      {...props}
      Livefilter={Livefilter}
      onDataSourceChange={onDataSourceChange}
      form-type="live-filter"
    >
      {props.children}
    </Form>
  );
};

WmLiveFilter.displayName = "WmLiveFilter";
export default WmLiveFilter;
