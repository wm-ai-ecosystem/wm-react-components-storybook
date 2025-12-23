import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import NativeSelect from "@mui/material/NativeSelect";
import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmSelectProps } from "./props";
import { Box } from "@mui/material";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const WmSelect: React.FC<WmSelectProps> = React.memo(
  props => {
    const {
      autofocus,
      className,
      datafield = "key",
      dataset,
      datavalue,
      disabled = false,
      displayExpression,
      displaylabel,
      displayfield = "value",
      groupby,
      hint,
      dataPath,
      arialabel,
      multiple = false,
      name,
      styles,
      orderby,
      placeholder,
      readonly = false,
      required = false,
      shortcutkey,
      listener,
      tabindex = 0,
      match,
      onClick,
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onEnter,
      onMouseEnter,
      onMouseLeave,
      onKeyUp,
    } = props;

    const DEFAULT_CLASS = "app-select-wrapper ng-dirty";
    const selectRef = useRef<HTMLSelectElement>(null);
    const [displayValue, setDisplayValue] = useState("");
    const [localDatavalue, setLocalDatavalue] = useState<any>(
      multiple ? (Array.isArray(datavalue) ? datavalue : datavalue ? [datavalue] : []) : datavalue
    );

    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false);
    const [prevDatavalue, setPrevDatavalue] = useState<string | null>(datavalue);
    const transformedDataset = transformDataset(
      dataset,
      datafield,
      displayfield,
      displaylabel,
      displayExpression,
      orderby,
      groupby,
      dataPath,
      "",
      match
    );

    const validateInput = useCallback(
      (value: string): { isValid: boolean; message: string } => {
        // Handle special case value
        if (value === "") {
          return { isValid: !required, message: required ? "This field is required" : "" };
        }

        if (!value || !value.toString().trim()) {
          return { isValid: !required, message: required ? "This field is required" : "" };
        }

        return { isValid: true, message: "" };
      },
      [required]
    );

    // Handle value change
    const handleValueChange = async (event: React.ChangeEvent<any>) => {
      if (props.readonly || disabled) {
        return;
      }
      const newValue = multiple
        ? Array.from(event.target.selectedOptions, (option: HTMLOptionElement) => option.value)
        : event.target.selectedIndex;

      if (multiple) {
        // Filter out placeholder value from multiple selection
        const filteredValues = newValue.filter((val: any) => val !== placeholder);
        setLocalDatavalue(filteredValues);

        const selectedTexts = Array.from(
          event.target.selectedOptions,
          (option: HTMLOptionElement) => option.text
        ).filter(text => text !== placeholder);
        setDisplayValue(selectedTexts.join(", "));

        if (listener?.onChange) {
          if (filteredValues.length === 0) {
            // If only placeholder is selected or no valid selections, return empty array
            await listener.onChange(props.fieldName || name, {
              datavalue: [],
              displayValue: [],
            });
          } else {
            const findItem = (val: any) =>
              transformedDataset.find(item =>
                typeof item.value === "object"
                  ? String(item.key) === String(val)
                  : String(item.value) === String(val)
              );

            const selectedValues = filteredValues.map(
              (val: string | number | Record<string, any>) => {
                const item = findItem(val);
                return item ? item.value : val;
              }
            );

            const selectedDisplayValues = filteredValues.map(
              (val: string | number | Record<string, any>) => {
                const item = findItem(val);
                return item ? item.label : val;
              }
            );
            listener.onChange(props.fieldName || name, {
              datavalue: selectedValues,
              displayValue: selectedDisplayValues,
            });
          }
        }
      } else {
        setLocalDatavalue(event.target.value);
        setDisplayValue(event.target.options[event.target.selectedIndex]?.text || "");

        if (listener?.onChange) {
          if (newValue === 0 || event.target.value === placeholder) {
            await listener.onChange(props.fieldName || name, {
              datavalue: "",
              displayValue: "",
            });
          } else {
            await listener.onChange(props.fieldName || name, {
              datavalue: transformedDataset[newValue - 1].value,
              displayValue: transformedDataset[newValue - 1].label,
            });
          }
        }
      }
      if (onChange)
        onChange?.(
          event,
          listener?.Widgets?.[name],
          transformedDataset?.[newValue - 1]?.value || "en",
          prevDatavalue
        );
      setPrevDatavalue(newValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      const selectedItem = transformedDataset.find(item => String(item.value) === newValue);
      const validation = validateInput(selectedItem?.value);
      setIsTouched(true);
      if (!validation.isValid) {
        setIsDirty(true);
      } else {
        setIsDirty(false);
      }
      setShowError(!validation.isValid);
      onBlur?.(e, props);
    };

    // Handle floating label behavior
    const handleFloatingLabel = useCallback(
      (event: React.MouseEvent<HTMLSelectElement> | React.FocusEvent<HTMLSelectElement>) => {
        const captionEl = selectRef.current?.closest(".app-composite-widget.caption-floating");
        if (!captionEl) return;

        const placeholderOption = selectRef.current?.querySelector("#placeholderOption");
        if (!placeholderOption) return;

        if (
          event.type === "mousedown" &&
          (!datavalue ||
            (datavalue && selectRef.current?.querySelector("option:checked")?.textContent === ""))
        ) {
          if (placeholder) {
            placeholderOption.textContent = placeholder;
          }
        } else if (!datavalue) {
          if (placeholder) {
            placeholderOption.textContent = "";
          }
          captionEl.classList.remove("float-active");
        }
      },
      [datavalue, placeholder]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter") {
          onEnter?.(event);
        }
        onKeyDown?.(event);
      },
      [onEnter, onKeyDown]
    );

    useEffect(() => {
      if (datavalue !== undefined) {
        if (multiple) {
          const normalizedValue = Array.isArray(datavalue)
            ? datavalue
            : datavalue
              ? [datavalue]
              : [];
          const selectedOptions = normalizedValue.map(val =>
            transformedDataset.find(item => String(item.value) === String(val))
          );
          const displayText = selectedOptions.map(option => option?.label).join(", ");
          setDisplayValue(displayText);
        } else {
          const selectedOption = transformedDataset.find(item => item.selected);
          if (selectedOption) {
            setDisplayValue(selectedOption.label);
          }
        }
      }
    }, [transformedDataset, datavalue, multiple]);

    // Sync localDatavalue with incoming datavalue prop
    useEffect(() => {
      if (multiple) {
        const normalizedValue = Array.isArray(datavalue) ? datavalue : datavalue ? [datavalue] : [];
        if (JSON.stringify(normalizedValue) !== JSON.stringify(localDatavalue)) {
          setLocalDatavalue(normalizedValue);
        }
      } else {
        if (datavalue !== localDatavalue) {
          setLocalDatavalue(datavalue);
          listener?.onChange?.(props.fieldName || name, {
            datavalue: datavalue,
          });
        }
      }
    }, [datavalue, multiple]);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onClick?.(event);
      },
      [onClick]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onMouseEnter?.(event);
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        onMouseLeave?.(event);
      },
      [onMouseLeave]
    );

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyUp?.(event);
      },
      [onKeyUp]
    );

    const events = {
      onChange: handleValueChange,
      onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleFloatingLabel(e as any);
        handleBlur(e);
      },
      ...(onFocus ? { onFocus: handleFocus } : {}),
      ...(onKeyDown ? { onKeyDown: handleKeyDown } : {}),
      ...(onKeyUp ? { onKeyUp: handleKeyUp } : {}),
      ...(onClick ? { onClick: handleClick } : {}),
      ...(onMouseEnter ? { onMouseEnter: handleMouseEnter } : {}),
      ...(onMouseLeave ? { onMouseLeave: handleMouseLeave } : {}),
    };
    const isLocalDatavalueObject = () => {
      if (typeof localDatavalue === "object" && localDatavalue !== null) {
        const matchingItem = transformedDataset.find(
          item =>
            item.value === localDatavalue ||
            JSON.stringify(item.value) === JSON.stringify(localDatavalue)
        );
        if (matchingItem) {
          listener?.onChange?.(props.fieldName || name, {
            displayValue: matchingItem.label,
          });
          return matchingItem.key;
        }
      }
      let displayValue =
        (transformedDataset.length > 0 &&
          transformedDataset.find(item => item.value == localDatavalue)?.label) ||
        "";
      if (displayValue) {
        listener?.onChange?.(props.fieldName || name, {
          displayValue: displayValue,
        });
      }
      return localDatavalue;
    };
    return (
      <Box
        hidden={props.hidden}
        sx={{
          display: "inherit !important",
        }}
        className={clsx(
          DEFAULT_CLASS,
          isTouched ? "ng-touched" : "ng-untouched",
          isDirty ? "ng-invalid" : "ng-valid"
        )}
      >
        <NativeSelect
          key={name}
          IconComponent={() => null}
          value={
            multiple
              ? Array.isArray(localDatavalue)
                ? localDatavalue
                : []
              : (isLocalDatavalueObject() ?? placeholder ?? "")
          }
          {...events}
          sx={{
            "& .MuiNativeSelect-select": {
              ...styles,
              WebkitAppearance: styles?.WebkitAppearance || "auto",
            },
          }}
          inputProps={{
            id: name,
            name: name,
            required: required,
            autoFocus: autofocus,
            tabIndex: tabindex,
            "aria-label": arialabel,
            multiple,
            disabled: disabled,
            "aria-readonly": readonly,
            className: `app-select ${className} form-control ng-valid ng-touched ng-dirty wm-app `,
            accessKey: shortcutkey,
            title: hint,
          }}
          readOnly={readonly}
        >
          <option
            value={placeholder}
            id="placeholderOption"
            key="placeholder-text"
            hidden={!placeholder}
          >
            {placeholder}
          </option>
          {groupby && transformedDataset
            ? transformedDataset.map((group: any) => (
                <optgroup
                  key={group.key}
                  label={group.key}
                  style={{ backgroundColor: "rgba(0, 0, 0, .1)" }}
                >
                  {group.data.map((item: any) => (
                    <option
                      key={`${group.key}-${item.key}`}
                      value={typeof item.value === "object" ? item.key : item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : transformedDataset &&
              transformedDataset.map((item: any) => (
                <option
                  key={item.key}
                  value={typeof item.value === "object" ? item.key : item.value}
                >
                  {item.label}
                </option>
              ))}
        </NativeSelect>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    const keys: (keyof WmSelectProps)[] = [
      "dataset",
      "datafield",
      "displayfield",
      "displaylabel",
      "displayExpression",
      "orderby",
      "groupby",
      "dataPath",
      "arialabel",
      "multiple",
      "styles",
      "autofocus",
      "disabled",
      "readonly",
      "required",
      "datavalue",
      "hidden",
      "className",
    ];
    return keys.every(key => prevProps[key] === nextProps[key]);
  }
);

WmSelect.displayName = "WmSelect";

export default withBaseWrapper(withFormController(WmSelect));
