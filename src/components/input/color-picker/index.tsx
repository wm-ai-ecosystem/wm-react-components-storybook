import React, { memo, useRef, useCallback, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { Input } from "@base-ui-components/react/input";
import { styled } from "@mui/material/styles";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { ColorPickerProps, RGBAColor, PickerPosition, RGBColor } from "./props";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

// Constants
const AUTOCLOSE_TYPE = {
  ALWAYS: "always",
  OUTSIDECLICK: "outsideClick",
  NEVER: "disabled",
} as const;

const DEFAULT_CLASS = "input-group app-colorpicker";
const PICKER_HEIGHT = 320;
const PICKER_WIDTH = 226;
const POSITION_DELAY = 100;

// Styled Components
const StyledColorPicker = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 1300,
  marginTop: theme.spacing(1),
  left: 0,
  top: "115%",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "-20px",
    left: "8px",
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "10px 5px",
    borderColor: "rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #777 rgba(0, 0, 0, 0)",
    zIndex: 999999,
  },

  "& .chrome-picker": {
    boxShadow: "0 2px 15px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.16) !important",
    height: "auto",
    border: "#777 solid 1px",
    cursor: "default",
    userSelect: "none",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "8px",
    width: `${PICKER_WIDTH}px !important`,
    boxSizing: "border-box !important",
  },
}));

// Utility Functions
const isValidHexColor = (hex: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
};

const isValidRgbaColor = (rgba: string): boolean => {
  return /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(rgba);
};

const isValidRgbColor = (rgb: string): boolean => {
  return /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(rgb);
};

const isValidNamedColor = (color: string): boolean => {
  const tempElem = document.createElement("div");
  tempElem.style.color = "";
  document.body.appendChild(tempElem);

  const defaultColor = getComputedStyle(tempElem).color;
  tempElem.style.color = color;

  const computedColor = getComputedStyle(tempElem).color;
  document.body.removeChild(tempElem);

  // If color didn’t change, it's invalid
  return computedColor !== defaultColor;
};

const hexToRgba = (colorString: string): RGBAColor => {
  const defaultColor: RGBAColor = { r: 0, g: 0, b: 0, a: 0 };

  if (!colorString || colorString === "") {
    return defaultColor;
  }

  //Handle RGB format
  const rgbMatch = colorString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  // Handle RGBA format
  const rgbaMatch = colorString.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: parseFloat(rgbaMatch[4]),
    };
  }

  if (isValidNamedColor(colorString)) {
    return getNamedColorRgba(colorString) || defaultColor;
  }

  // Handle HEX format
  let hex = colorString.replace("#", "");
  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  if (hex.length === 3) {
    r = parseInt(hex.charAt(0).repeat(2), 16);
    g = parseInt(hex.charAt(1).repeat(2), 16);
    b = parseInt(hex.charAt(2).repeat(2), 16);
  } else if (hex.length >= 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    if (hex.length === 8) {
      a = parseInt(hex.substring(6, 8), 16) / 255;
    }
  }

  return { r, g, b, a };
};

const rgbaToHex = (color: RGBAColor): string => {
  const toHex = (value: number): string => Math.round(value).toString(16).padStart(2, "0");

  const r = toHex(color.r);
  const g = toHex(color.g);
  const b = toHex(color.b);

  if (color.a === 1) {
    return `#${r}${g}${b}`;
  }

  const a = toHex(color.a * 255);
  return `#${r}${g}${b}${a}`;
};

const rgbaToString = (color: RGBAColor): string => {
  if (color.a === undefined) {
    return `rgba(${color.r},${color.g},${color.b},1)`;
  }
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
};

const rgbToString = (color: RGBColor): string => {
  return `rgb(${color.r},${color.g},${color.b})`;
};

// get RGBA value from named color
const getNamedColorRgba = (colorName: string): RGBAColor | null => {
  const tempElem = document.createElement("div");
  tempElem.style.display = "none"; // hide element
  document.body.appendChild(tempElem);

  // Get default computed color before setting the name
  const defaultColor = getComputedStyle(tempElem).color;

  tempElem.style.color = colorName;
  const computedColor = getComputedStyle(tempElem).color;

  document.body.removeChild(tempElem);

  // If color didn’t change, it's invalid
  if (computedColor === defaultColor) {
    return null;
  }

  // Parse the valid computed color
  const rgbaMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1], 10),
      g: parseInt(rgbaMatch[2], 10),
      b: parseInt(rgbaMatch[3], 10),
      a: rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1,
    };
  }

  return { r: 255, g: 255, b: 255, a: 1 };
};

// Custom Hooks
const useColorValue = (initialValue?: string) => {
  const [colorValue, setColorValue] = useState<RGBAColor>(() =>
    initialValue ? hexToRgba(initialValue) : { r: 255, g: 255, b: 255, a: 1 }
  );
  const [inputValue, setInputValue] = useState<string>(initialValue || "");

  return {
    colorValue,
    setColorValue,
    inputValue,
    setInputValue,
  };
};

const usePickerPosition = () => {
  const [position, setPosition] = useState<PickerPosition>({ top: "115%", left: 0 });

  const calculatePosition = useCallback((containerElement: HTMLElement | null): PickerPosition => {
    if (!containerElement) {
      return { top: "115%", left: 0 };
    }

    const rect = containerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;

    return spaceBelow < PICKER_HEIGHT ? { top: -330, left: 0 } : { top: "115%", left: 0 };
  }, []);

  return { position, setPosition, calculatePosition };
};

// Main Component
export const WmColorPicker = memo<ColorPickerProps>(
  props => {
    const {
      datavalue,
      placeholder = "Select Color",
      readonly = false,
      disabled = false,
      required = false,
      name,
      shortcutkey,
      tabindex = 0,
      className,
      autoclose = AUTOCLOSE_TYPE.OUTSIDECLICK,
      arialabel,
      // Event handlers
      onDoubleClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      onKeydown,
      onKeyup,
      onChange,
      listener,
      ...restProps
    } = props;

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [isInteractingWithPicker, setIsInteractingWithPicker] = useState(false);
    const [prevValue, setPrevValue] = useState("");
    const [getPlaceholder, setPlaceholder] = useState(placeholder);

    // Custom hooks
    const { colorValue, setColorValue, inputValue, setInputValue } = useColorValue(datavalue);
    const {
      position: pickerPosition,
      setPosition: setPickerPosition,
      calculatePosition,
    } = usePickerPosition();

    // Computed values
    const shouldCloseOnOutsideClick =
      autoclose === AUTOCLOSE_TYPE.OUTSIDECLICK || autoclose === AUTOCLOSE_TYPE.ALWAYS;
    const isReadonlyOrDisabled = readonly || disabled;

    const openPicker = useCallback(() => {
      if (!isReadonlyOrDisabled && !isOpen) {
        setPickerPosition(calculatePosition(containerRef.current));
        setIsOpen(true);
      }
    }, [isReadonlyOrDisabled, isOpen, calculatePosition, setPickerPosition]);

    const closePicker = useCallback(() => {
      if (isOpen && !isInteractingWithPicker) {
        setIsOpen(false);
      }
    }, [isOpen, isInteractingWithPicker]);

    // Register widget methods (open/close) with listener
    useEffect(() => {
      if (listener?.onChange) {
        listener.onChange(name, {
          open: openPicker,
          close: closePicker,
        });
      }
    }, [openPicker, closePicker]);

    const validateAndSetColor = useCallback(
      (value: string) => {
        if (!value.trim()) {
          setColorValue({ r: 255, g: 255, b: 255, a: 1 });
          return "";
        }

        if (isValidRgbaColor(value)) {
          const color = hexToRgba(value);
          setColorValue(color);
          return rgbaToString(color);
        }

        if (isValidHexColor(value)) {
          const color = hexToRgba(value);
          setColorValue(color);
          return value;
        }

        if (isValidRgbColor(value)) {
          const color = hexToRgba(value);
          setColorValue(color);
          return rgbToString(color);
        }

        const namedColor = isValidNamedColor(value);
        if (namedColor) {
          const namedColorValue = getNamedColorRgba(value);
          setColorValue(namedColorValue);
          return rgbaToString(namedColorValue);
        }

        // Invalid format
        setColorValue({ r: 255, g: 255, b: 255, a: 1 });
        return "";
      },
      [setColorValue]
    );

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (newValue === "") {
          setPlaceholder(placeholder);
        }
        // Update color value for valid inputs
        if (
          newValue &&
          (isValidHexColor(newValue) ||
            isValidRgbaColor(newValue) ||
            isValidRgbColor(newValue) ||
            isValidNamedColor(newValue))
        ) {
          setColorValue(hexToRgba(newValue));
        } else if (!newValue) {
          setColorValue({ r: 255, g: 255, b: 255, a: 1 });
        }
        if (onChange && name) {
          onChange(event, listener.Widgets[name], newValue, colorValue);
        }
      },
      [setInputValue, setColorValue]
    );

    const handleInputBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        // Close picker logic
        if (
          autoclose !== AUTOCLOSE_TYPE.NEVER &&
          !isInteractingWithPicker &&
          pickerRef.current &&
          !pickerRef.current.contains(event.relatedTarget as Node)
        ) {
          setIsOpen(false);
          handleFloatingLabel("close");
        }

        // Validate and correct input value
        if (inputValue) {
          const validatedValue = validateAndSetColor(inputValue);
          // Check for named color equivalence
          const namedColor = getNamedColorRgba(inputValue);
          if (
            validatedValue !== inputValue &&
            !(namedColor && validatedValue === rgbaToString(namedColor))
          ) {
            setInputValue(validatedValue);
          }
        }

        // Call blur handlers
        if (onBlur) {
          onBlur(event, listener.Widgets[name]);
        }
      },
      [autoclose, isInteractingWithPicker, inputValue, validateAndSetColor, setInputValue, onBlur]
    );

    const handleInputFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement>) => {
        if (onFocus) {
          onFocus(event, listener.Widgets[name]);
        }
        openPicker();
        handleFloatingLabel("open");
      },
      [onFocus, openPicker]
    );

    const handleInputClick = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();

        if (!isReadonlyOrDisabled) {
          if (onClick && name) {
            onClick(event, listener.Widgets[name]);
          }
          openPicker();
          handleFloatingLabel("open");
        }
      },
      [isReadonlyOrDisabled, onClick, openPicker]
    );

    const handleColorBoxClick = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();

        if (!isReadonlyOrDisabled) {
          isOpen ? closePicker() : openPicker();
        }
      },
      [isReadonlyOrDisabled, isOpen, closePicker, openPicker]
    );

    const handleColorChange = useCallback(
      (color: any, event: any) => {
        const { r, g, b, a } = color.rgb;
        const rgbaColor: RGBAColor = { r, g, b, a };
        setColorValue(rgbaColor);

        const newValue = a !== 1 ? rgbaToString(rgbaColor) : rgbaToHex(rgbaColor);
        if (listener?.Widgets[props?.fieldName || name]) {
          listener.Widgets[name].displayValue = newValue;
        }
        setInputValue(newValue);
        if (listener?.onChange) {
          listener.onChange(props?.fieldName || name, {
            datavalue: newValue,
          });
        }
        const customEvent = {
          ...event,
          type: "change",
        };
        if (onChange) {
          onChange(customEvent, listener.Widgets[name], newValue, inputValue);
        }

        if (autoclose === AUTOCLOSE_TYPE.ALWAYS && !isInteractingWithPicker) {
          setTimeout(() => setIsOpen(false), POSITION_DELAY);
        }
      },
      [setColorValue, setInputValue, autoclose, isInteractingWithPicker]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          setIsOpen(false);
          const newValue = event.target.value;
          setInputValue(newValue);
          if (newValue === "") {
            setPlaceholder(placeholder);
          }
          // Update color value for valid inputs
          if (
            newValue &&
            (isValidHexColor(newValue) ||
              isValidRgbaColor(newValue) ||
              isValidRgbColor(newValue) ||
              isValidNamedColor(newValue))
          ) {
            setColorValue(hexToRgba(newValue));
          } else if (!newValue) {
            setColorValue({ r: 255, g: 255, b: 255, a: 1 });
          }
        }

        if (onKeydown) {
          onKeydown(event);
        }
      },
      [onKeydown]
    );

    // Picker interaction handlers
    const handlePickerMouseDown = useCallback(() => {
      setIsInteractingWithPicker(true);
    }, []);

    const handlePickerMouseUp = useCallback(() => {
      setTimeout(() => setIsInteractingWithPicker(false), POSITION_DELAY);
    }, []);

    const handleFloatingLabel = useCallback(
      (action: "open" | "close", currentValue?: string) => {
        const captionEl = containerRef.current?.closest(".app-composite-widget.caption-floating");
        if (!captionEl) return;

        if (action === "open") {
          // On click/focus - show placeholder and activate floating
          captionEl.classList.add("float-active");
          setPlaceholder(placeholder);
        } else if (action === "close" && (!inputValue || currentValue === "")) {
          // On blur - hide placeholder if no value
          captionEl.classList.remove("float-active");
          setPlaceholder("");
        }
      },
      [inputValue]
    );

    // Effects
    useEffect(() => {
      if (datavalue !== prevValue) {
        setPrevValue(datavalue);

        if (datavalue) {
          try {
            handleFloatingLabel("open");
            const color = hexToRgba(datavalue);
            setColorValue(color);

            const formattedValue = datavalue.startsWith("rgba(")
              ? datavalue
              : datavalue.startsWith("#")
                ? datavalue
                : `#${datavalue}`;

            setInputValue(formattedValue);
          } catch (error) {
            console.error("Invalid color format:", error);
            setColorValue({ r: 255, g: 255, b: 255, a: 1 });
            setInputValue("");
          }
        } else {
          setColorValue({ r: 255, g: 255, b: 255, a: 1 });
          setInputValue("");
        }
      }
    }, [datavalue, prevValue, setColorValue, setInputValue]);

    // Outside click handler
    useEffect(() => {
      if (!isOpen || !shouldCloseOnOutsideClick) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        if (
          !isInteractingWithPicker &&
          pickerRef.current &&
          !pickerRef.current.contains(target) &&
          containerRef.current &&
          !containerRef.current.contains(target)
        ) {
          setIsOpen(false);
          const currentValue = inputRef.current?.value || "";
          if (currentValue === "") {
            setInputValue("");
            handleFloatingLabel("close", currentValue);
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside, true);
      return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }, [isOpen, shouldCloseOnOutsideClick, isInteractingWithPicker]);

    // Escape key handler
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" || event.key === "Esc") {
          setIsOpen(false);
        }
      };

      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    const checkPlaceholder = (): void => {
      setTimeout(() => {
        const captionEl = containerRef.current?.closest(".app-composite-widget.caption-floating");
        // For floating labels: show placeholder only when user has interacted and no value
        if (captionEl && !captionEl.classList.contains("float-active")) {
          setPlaceholder("");
        } else {
          setPlaceholder(placeholder);
        }
      }, 100);
    };

    useEffect(() => {
      checkPlaceholder();
    }, [inputValue, isInteractingWithPicker]);

    // Render
    return (
      <Box
        className={clsx(DEFAULT_CLASS, className)}
        tabIndex={tabindex}
        onKeyDown={handleKeyDown}
        sx={{ position: "relative" }}
        ref={containerRef}
        name={name}
      >
        <Input
          ref={inputRef}
          type="text"
          className="form-control app-textbox"
          name={name}
          value={inputValue}
          placeholder={getPlaceholder}
          disabled={disabled || readonly}
          required={required}
          tabIndex={tabindex}
          accessKey={shortcutkey}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onClick={handleInputClick}
          onMouseEnter={event => onMouseEnter && onMouseEnter(event, listener.Widgets[name])}
          onMouseLeave={event => onMouseLeave && onMouseLeave(event, listener.Widgets[name])}
          aria-label={arialabel}
          aria-readonly={readonly}
        />

        <Box
          component="span"
          className="input-group-addon colorpicker-container"
          onClick={handleColorBoxClick}
          style={{
            cursor: isReadonlyOrDisabled ? "not-allowed" : "pointer",
          }}
        >
          <Box
            component="i"
            className="colored-box"
            style={{
              backgroundColor: inputValue ? rgbaToString(colorValue) : "transparent",
            }}
          />
        </Box>

        {isOpen && (
          <StyledColorPicker
            className="color-picker"
            ref={pickerRef}
            sx={{
              top: pickerPosition.top,
              left: pickerPosition.left,
              zIndex: 1300,
            }}
            onClick={e => e.stopPropagation()}
            onMouseDown={handlePickerMouseDown}
            onMouseUp={handlePickerMouseUp}
          >
            <ChromePicker color={colorValue} onChange={handleColorChange} />
          </StyledColorPicker>
        )}
      </Box>
    );
  },
  (prevProps, nextProps) => {
    const keysToCompare: (keyof ColorPickerProps)[] = [
      "datavalue",
      "placeholder",
      "readonly",
      "disabled",
      "required",
      "name",
      "shortcutkey",
      "show",
      "tabindex",
      "autoclose",
      "arialabel",
      "hidden",
      "show",
    ];

    return keysToCompare.every(key => prevProps[key] === nextProps[key]);
  }
);

WmColorPicker.displayName = "WmColorPicker";

export default withBaseWrapper(withFormController(WmColorPicker));
