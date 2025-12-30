import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import clsx from "clsx";
import Image from "next/image";
import debounce from "lodash/debounce";
import isPlainObject from "lodash/isPlainObject";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import CircularProgress from "@mui/material/CircularProgress";
import DOMPurify from "dompurify";
import { Box, Button } from "@mui/material";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { WmSearchProps, DataSetItem } from "./props";
import { DataProvider, DataProviderConfig, LocalDataProvider } from "./providers";
import withFormController from "@wavemaker/react-runtime/components/data/form/form-controller/withFormController";

const DEFAULT_CLASS = "app-search input-group";

const Search = React.forwardRef((props: WmSearchProps, ref: React.Ref<any>) => {
  const {
    showclear = false,
    debouncetime = 250,
    searchkey,
    searchon = "typing",
    matchmode = "contains",
    minchars = 1,
    limit = 10,
    tabindex = 0,
    placeholder = "Search",
    dropup = false,
    readonly = false,
    datavalue,
    dataset = [],
    datafield = "All Fields",
    displayfield,
    disabled = false,
    autofocus = false,
    type = "search", // Changed default to 'search'
    showsearchicon = true,
    showbackbutton = false, // Added with default false
    imagewidth = "16px",
    width, // Added width prop
    displaylabel,
    displayimagesrc,
    displayexpression,
    datacompletemsg = "No more data to load",
    loadingdatamsg = "Loading items...",
    clearsearchiconclass = "wi wi-close",
    backsearchiconclass = "wi wi-arrow-left",
    searchiconclass = "sl-search wm-sl-l",
    navsearchbar = false,
    class: className,
    shortcutkey,
    required,
    hint,
    arialabel = "Search field",
    onBeforeservicecall,
    onBlur,
    onChange,
    onFocus,
    onSelect,
    onSubmit,
    onClear,
    onSearch,
    onDatasetready, // Added onDatasetready callback
    conditionalstyles = {},
    styles = {},
    name,
    listener,
    value,
    // Extract props that should not be spread to DOM elements
    datasetItems,
    selectedItems,
    displayValue,
    groupedData: initialGroupedData,
    handleHeaderClick,
    toggleAllHeaders,
    isDestroyed,
    validation,
    casesensitive = false, // Default to case-insensitive
    isUpdateRequired,
    onQuerySearch,
    getDisplayExpression,
    ...restProps
  } = props;

  const debouncedSearchRef = useRef<ReturnType<typeof debounce> | null>(null);
  const debouncedSearchItemRef = useRef<ReturnType<typeof debounce> | null>(null);
  const getDataSourceRef = useRef<((query: string, nextPage?: boolean) => Promise<any[]>) | null>(
    null
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const initializedRef = useRef(false);
  const [query, setQuery] = useState<string>(typeof datavalue === "string" ? datavalue : "");
  const [isOpen, setIsOpen] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [page, setPage] = useState(1);
  const [formattedDataset, setFormattedDataset] = useState<any[]>([]);
  const [groupedData, setGroupedData] = useState<Record<string, any[]>>({});
  const [listenQuery, setListenQuery] = useState(type === "autocomplete"); // Only listen for autocomplete type
  const [menuOpen, setMenuOpen] = useState(false); // Track menu open state separately
  const [hasMoreData, setHasMoreData] = useState(true); // Track if there's more data to load
  const [selectedItem, setSelectedItem] = useState<any>(null); // Track the selected item
  const [updateRequired, setUpdateRequired] = useState<boolean | undefined>(undefined);

  const dataProvider = useMemo(() => new DataProvider(), []);

  // Note: Don't pass groupby to transformDataset - let getGroupedData handle grouping
  // transformDataset with groupby produces {key: groupKey, data: [...]} structure
  // which is incompatible with getGroupedData expecting {dataObject: {...}} structure
  const normalizedData = useMemo(
    () =>
      transformDataset(
        dataset,
        datafield,
        displayfield,
        displaylabel,
        displayexpression,
        props.orderby,
        undefined, // Don't pre-group - getGroupedData will handle it
        props.dataPath
      ),
    [
      dataset,
      datafield,
      displayfield,
      displaylabel,
      displayexpression,
      props.orderby,
      props.dataPath,
    ]
  );

  useEffect(() => {
    if (
      (isPlainObject(datavalue) || Array.isArray(datavalue)) &&
      searchkey &&
      Object.keys(datavalue).length > 0
    ) {
      const value = Array.isArray(datavalue) ? datavalue[0] : datavalue;
      if (value) {
        const key = searchkey.split(",")[0] || searchkey;

        const item = getDisplayExpression?.(value) || value[key];
        if (item) {
          setQuery(item);
          handleUpdateDatavalue(value);
        }
      }
    } else if (datafield !== "All Fields" && datafield) {
      let findItem = normalizedData?.find(item => item.value === datavalue) as DataSetItem;
      if (findItem) {
        let displayValue = getDisplayExpression?.(getSelectedItem(findItem)) || findItem.label;
        setQuery(displayValue);
        handleUpdateDatavalue(findItem);
      } else if (!initializedRef.current) {
        initializedRef.current = true;
        debouncedSearchItemRef.current?.(datavalue);
      }
    }
    // do not remove this code specifically handled for chips component for clearing the query.
    else if (!isPlainObject(datavalue)) {
      setQuery(datavalue);
    }
  }, [datavalue]);

  // Combine width with other styles
  const searchStyle = {
    width: width,
    ...styles,
    ...conditionalstyles,
  };

  // Create dataProvider instance

  // Initialize debounced searchItem function
  useEffect(() => {
    // Cancel previous debounced function if it exists
    if (debouncedSearchItemRef.current) {
      debouncedSearchItemRef.current.cancel();
    }

    // Create debounced version of searchItem
    debouncedSearchItemRef.current = debounce(async (value: string) => {
      const response = await dataProvider?.invokeVariable(props, value);
      if (response && response.length > 0) {
        let key = searchkey?.split(",")[0] || searchkey;
        if (!key) return;
        const findItem = response.find((item: any) => item[key] == value);
        if (findItem && Object.keys(findItem).length > 0) {
          let displayValue = getDisplayExpression?.(getSelectedItem(findItem)) || findItem[key];
          setQuery(displayValue);
        }
      }
    }, 200);

    // Cleanup: cancel debounced function on unmount or dependency change
    return () => {
      if (debouncedSearchItemRef.current) {
        debouncedSearchItemRef.current.cancel();
      }
    };
  }, [dataProvider, props, searchkey, getDisplayExpression]);

  // Focus input on mount
  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus();
    }
  }, []);

  // Handle shortcut key
  useEffect(() => {
    const handleShortcutKey = (event: KeyboardEvent) => {
      if (shortcutkey && event.key.toLowerCase() === shortcutkey.toLowerCase()) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcutKey);
    return () => window.removeEventListener("keydown", handleShortcutKey);
  }, [shortcutkey]);

  // Process and prepare dataset for autocomplete type since it list should be loaded immediately when the component is mounted
  useEffect(() => {
    // For autocomplete type load data immediately
    if (type === "autocomplete") {
      getDataSource("");
    }
  }, [type]);

  // Update listen query state when type changes
  useEffect(() => {
    setListenQuery(type === "autocomplete");
  }, [type]);

  const getGroupedData = useCallback(
    (data: any[]) => {
      if (props?.groupby && data?.length) {
        const result: Record<string, any[]> = {};
        data.forEach(item => {
          if (!props?.groupby) {
            return;
          }
          const groupKey =
            item[props?.groupby] || item?.dataObject?.[props?.groupby] || "ungrouped";
          if (!result[groupKey]) {
            result[groupKey] = [];
          }
          result[groupKey].push(item);
        });
        return result;
      }
      return { ungrouped: data };
    },
    [props?.groupby]
  );

  const getDataSource = useCallback(
    async (query: string, nextPage?: boolean) => {
      // For both search and autocomplete types, require a query unless explicitly showing all for autocomplete
      if (!query && (type === "search" || (type === "autocomplete" && !nextPage))) {
        setFormattedDataset([]);
        setIsOpen(false);
        setMenuOpen(false);
        return [];
      }

      const dataConfig: DataProviderConfig = {
        dataset: normalizedData,
        datafield: datafield || "All Fields",
        query: query,
        matchMode: matchmode,
        casesensitive: false,
        searchKey: searchkey,
        isformfield: false,
        limit: limit,
        page: nextPage ? page + 1 : 1,
        isLocalFilter: true,
        onBeforeservicecall: onBeforeservicecall,
      };

      try {
        setLoadingItems(true);
        let isUpdateRequired = updateRequired;
        if (searchkey && updateRequired === undefined) {
          isUpdateRequired = dataProvider.init(props);
          setUpdateRequired(isUpdateRequired);
        }

        // Handle remote search if required
        if (searchkey && isUpdateRequired) {
          try {
            const response = await dataProvider?.invokeVariable(props, query);
            setLoadingItems(false);

            if (response) {
              const dataSet = Array.isArray(response) ? response : [response];
              setFormattedDataset(dataSet);

              // Group data if grouping is enabled
              if (props?.groupby) {
                setGroupedData(getGroupedData(dataSet));
              }

              // Update UI state based on results
              if (dataSet.length > 0) {
                setIsOpen(true);
                setMenuOpen(true);
              } else {
                setIsOpen(false);
                setMenuOpen(false);
              }

              return dataSet;
            }
          } catch (error) {
            setLoadingItems(false);
            setIsOpen(false);
            setMenuOpen(false);
            // TODO: call a toast here
          }
          return [];
        }
        // search on client side
        if (!normalizedData || normalizedData.length === 0) {
          return [];
        }
        const localDataProvider = new LocalDataProvider();
        const response = await localDataProvider.filter(dataConfig);
        const { data, isLastPage } = response;

        // Update hasMoreData state based on results
        setHasMoreData(data.length > 0 && !isLastPage);

        if (!nextPage) {
          setFormattedDataset(data);
          setGroupedData(getGroupedData(data));
        } else {
          setFormattedDataset(prev => [...prev, ...data]);
          setGroupedData(getGroupedData([...formattedDataset, ...data]));
        }

        setPage(prev => (nextPage ? prev + 1 : 1));
        setIsScrolled(false);

        // Show dropdown if we have results
        if (data.length > 0) {
          setIsOpen(true);
          setMenuOpen(true);
        }

        // Call onDatasetready callback if provided
        if (onDatasetready && listener?.Widgets && name && name in listener.Widgets) {
          onDatasetready(listener.Widgets[name], data);
        }

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      } finally {
        setLoadingItems(false);
      }
    },
    [
      dataset,
      datafield,
      matchmode,
      searchkey,
      limit,
      onBeforeservicecall,
      page,
      formattedDataset,
      getGroupedData,
      type,
      onDatasetready,
      listener?.Widgets,
      name,
    ]
  );

  // Keep ref updated with latest getDataSource
  useEffect(() => {
    getDataSourceRef.current = getDataSource;
  }, [getDataSource]);

  // Initialize or update the debounced function when dependencies change
  // Note: Using ref for getDataSource to prevent debounced function recreation on every render
  useEffect(() => {
    // Cancel previous debounced function if it exists
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current.cancel();
    }

    // Create new debounced function - uses ref to always get latest getDataSource
    debouncedSearchRef.current = debounce(async (query: string) => {
      // Don't do anything if query is empty and we don't want to show all
      if (!query) {
        setFormattedDataset([]);
        setIsOpen(false);
        setMenuOpen(false);
        return;
      }

      // Only proceed if we meet the minimum characters requirement
      if (query.length >= minchars) {
        try {
          setLoadingItems(true);
          // Use ref to get latest getDataSource function
          const data = (await getDataSourceRef.current?.(query)) || [];
          setLoadingItems(false);

          // Update the formatted dataset first
          setFormattedDataset(data);

          // Then update visibility based on results
          if (data && data.length > 0) {
            setIsOpen(true);
            setMenuOpen(true);
          } else {
            setIsOpen(false);
            setMenuOpen(false);
          }
        } catch (error) {
          console.error("Error in search:", error);
          setLoadingItems(false);
          setIsOpen(false);
          setMenuOpen(false);
        }
      }
    }, debouncetime);

    // Cleanup: cancel debounced function on unmount or dependency change
    return () => {
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current.cancel();
      }
    };
  }, [minchars, debouncetime]); // Removed getDataSource - now using ref

  // listen to query change and trigger debounced search
  useEffect(() => {
    if (
      query &&
      ((type === "autocomplete" && listenQuery) || (type === "search" && searchon === "typing"))
    ) {
      // Call the persisted debounced function
      debouncedSearchRef.current?.(query);
    }
  }, [query, type, listenQuery, searchon]);

  // Simplify handleInputChange to only update query
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (readonly || disabled) {
      return;
    }
    const queryValue = event?.target?.value || "";
    setQuery(queryValue);

    // Call onChange handlers
    if (onChange && listener?.Widgets && name && name in listener?.Widgets) {
      onChange(event, listener.Widgets[name], queryValue, queryValue);
    }

    // Handle empty query - for autocomplete show all options, for search close dropdown
    if (!queryValue) {
      setSelectedItem(null);
      if (onClear && listener?.Widgets && name && name in listener?.Widgets) {
        onClear(event as unknown as React.MouseEvent<HTMLButtonElement>, listener.Widgets[name]);
      }
      // For autocomplete type, show all options when query is cleared
      if (type === "autocomplete" && normalizedData && normalizedData.length > 0) {
        setFormattedDataset(normalizedData);
        if (props?.groupby) {
          setGroupedData(getGroupedData(normalizedData));
        }
        setIsOpen(true);
        setMenuOpen(true);
      } else {
        setFormattedDataset([]);
        setIsOpen(false);
        setMenuOpen(false);
      }
      return;
    }

    // For autocomplete type, only show dropdown if we meet minimum chars
    // if (type === "autocomplete" && queryValue.length < minchars) {
    //   setFormattedDataset([]);
    //   setIsOpen(false);
    //   setMenuOpen(false);
    //   return;
    // }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      // If dropdown is open and we have items
      if (menuOpen && formattedDataset.length > 0) {
        const matches = dropdownRef.current?.querySelectorAll("li") || [];
        if (matches.length > 0) {
          const firstMatch = matches[0] as HTMLElement;
          handleMatchSelect(firstMatch);
        }
      } else {
        // For search type with searchon=iconclick or no searchon specified
        if (type === "search" && (!searchon || searchon === "onsearchiconclick")) {
          handleSearchClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
        }

        // Fire onSubmit if provided
        if (onSubmit && listener?.Widgets && name && name in listener.Widgets) {
          onSubmit(event as unknown as React.MouseEvent<HTMLDivElement>, listener.Widgets[name]);
        }
        if (props.clearOnSelect) {
          setQuery("");
        }
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      handleFocusNextItem();
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setMenuOpen(false);
    }
  };

  const handleClearSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuery("");
    setSelectedItem(null);

    if (onClear && listener?.Widgets && name && name in listener.Widgets) {
      onClear(event, listener.Widgets[name]);
    }

    // For autocomplete type, show all options after clearing
    if (type === "autocomplete" && normalizedData && normalizedData.length > 0) {
      setFormattedDataset(normalizedData);
      if (props?.groupby) {
        setGroupedData(getGroupedData(normalizedData));
      }
      setIsOpen(true);
      setMenuOpen(true);
    } else {
      setFormattedDataset([]);
      setIsOpen(false);
      setMenuOpen(false);
    }

    // Focus back on input
    inputRef.current?.focus();
  };

  const handleClickAway = (e: MouseEvent | TouchEvent) => {
    setIsOpen(false);
    setMenuOpen(false);
    handleBlur(e as unknown as React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>);
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // For autocomplete type - show all options on focus
    if (type === "autocomplete") {
      // If we already have results, show them
      if (formattedDataset.length > 0 && !selectedItem) {
        setIsOpen(true);
        setMenuOpen(true);
      }
      // Show all data on focus (use normalizedData which is already computed)
      else if (normalizedData && normalizedData.length > 0) {
        setFormattedDataset(normalizedData);
        // Update grouped data if groupby is specified
        if (props?.groupby) {
          setGroupedData(getGroupedData(normalizedData));
        }
        setIsOpen(true);
        setMenuOpen(true);
      }
    }

    // Call onFocus handler if provided
    if (onFocus && listener?.Widgets && name && name in listener.Widgets) {
      onFocus(event, listener.Widgets[name]);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // Don't close dropdown immediately to allow click events on menu items
    setTimeout(() => {
      const activeElement = document.activeElement as Node;
      if (
        document.activeElement !== dropdownRef.current &&
        !dropdownRef.current?.contains(activeElement) &&
        !searchButtonRef.current?.contains(activeElement)
      ) {
        setIsOpen(false);
        setMenuOpen(false);
      }
    }, 200);

    if (onBlur && listener?.Widgets && name && name in listener.Widgets) {
      onBlur(event, listener.Widgets[name]);
    }
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // Reset hasMoreData state before new search
    setHasMoreData(true);

    // For search type with searchon=iconclick or no searchon specified
    if (type === "search" && (!searchon || searchon === "onsearchiconclick")) {
      // First set loading state
      setLoadingItems(true);

      getDataSource(query);
    }

    // Call the onSearch handler if provided
    if (onSearch && listener?.Widgets && name && name in listener.Widgets) {
      onSearch(event, listener.Widgets[name]);
    }
  };

  const handleFocusNextItem = () => {
    // For autocomplete type, open dropdown if closed and no item is selected
    if (type === "autocomplete" && !menuOpen && query.length >= minchars && !selectedItem) {
      setIsOpen(true);
      setMenuOpen(true);

      // Load data if not loaded
      if (formattedDataset.length === 0) {
        getDataSource(query);
      }
    }

    // Focus on first menu item
    const matches = dropdownRef.current?.querySelectorAll("li") || [];
    if (matches.length > 0) {
      const firstMatch = matches[0] as HTMLElement;
      firstMatch.focus();
    }
  };

  function handleUpdateDatavalue(item: any) {
    const updatedItem = getSelectedItem(item);
    const value = datafield === "All Fields" ? updatedItem : updatedItem?.[datafield];
    if (listener?.onChange) {
      listener.onChange(props.fieldName || name, {
        datavalue: value,
      });
    }
  }

  function getSelectedItem(item: any) {
    return item?.dataObject?.dataObject || item?.dataObject || item;
  }

  const handleMatchSelect = (match: HTMLElement) => {
    if (readonly || disabled) {
      return;
    }
    const itemData = match.getAttribute("data-item");
    if (!itemData) return;

    try {
      const item = JSON.parse(itemData);

      const selectedItem = getSelectedItem(item);

      // Set display value in input
      const displayVal = getDisplayExpression?.(selectedItem) || item.displayValue || item.label;
      setQuery(displayVal);
      setIsOpen(false);
      setMenuOpen(false);
      setSelectedItem(item); // Set the selected item
      setFormattedDataset([]); // Clear the dropdown dataset
      if (onChange && listener?.Widgets && name && name in listener?.Widgets) {
        onChange(
          undefined as any,
          listener.Widgets[name],
          item.dataObject?.value,
          item.dataObject?.value
        );
      }

      handleUpdateDatavalue(item);

      // Trigger onSelect callback if provided
      if (onSelect && listener?.Widgets && name && name in listener.Widgets) {
        onSelect(
          new MouseEvent("click") as unknown as React.MouseEvent<HTMLLIElement>,
          listener.Widgets[name],
          item
        );
      }
    } catch (error) {
      console.error("Error parsing item data:", error);
    }
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>, item: any) => {
    handleMatchSelect(event.currentTarget);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (!loadingItems && !isScrolled && hasMoreData && !selectedItem) {
      const target = event.target as HTMLDivElement;
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
        setIsScrolled(true);
        getDataSource(query, true);
      }
    }
  };

  const renderGroupDivider = (groupKey: string) => {
    if (props.groupby && groupKey !== "ungrouped") {
      return (
        <MenuItem
          key={`header-${groupKey}`}
          onClick={handleMenuItemClick}
          dense
          className="list-group-header"
        >
          <Typography variant="h4" className="group-title" style={{ padding: "10px 16px" }}>
            {groupKey}
          </Typography>
        </MenuItem>
      );
    }
    return null;
  };

  const prepareDataItem = (item: any, index: number): DataSetItem => {
    // Handle primitive values
    if (typeof item !== "object" || item === null) {
      const stringValue = String(item);
      return {
        key: index,
        value: item,
        label: stringValue,
        displayValue: stringValue,
        displayImage: null,
        dataObject: item,
      };
    }

    // Return if already normalized
    const isNormalized = ["key", "value", "label", "displayValue"].every(prop =>
      item.hasOwnProperty(prop)
    );
    if (isNormalized) return item;

    // Helper to find first valid field value
    const findFieldValue = (fields: (string | null | undefined)[], fallback?: any) => {
      for (const field of fields.filter(Boolean)) {
        if (field && item.hasOwnProperty(field) && item[field] != null && item[field] !== "") {
          return item[field];
        }
      }
      return fallback;
    };

    // Get display value with priority: displayexpression > field names > first object value
    const getDisplayValue = () => {
      // Try displayexpression first
      if (displayexpression && typeof displayexpression === "function") {
        try {
          return displayexpression(item.dataObject ? item.dataObject : item);
        } catch (e) {
          console.warn("Error executing displayexpression:", e);
        }
      }

      // Try predefined field names
      const displayFields = [
        displaylabel,
        displayfield,
        "label",
        "name",
        "title",
        "text",
        "displayValue",
        "display",
      ];
      const fieldValue = findFieldValue(displayFields);
      if (fieldValue != null) return String(fieldValue);

      // Fallback to first object value
      const firstValue = Object.values(item).find(val => val != null);
      return firstValue ? String(firstValue) : "";
    };

    const displayValue = getDisplayValue();
    const keyFields = [
      datafield && datafield !== "All Fields" ? datafield : null,
      "id",
      "key",
      "value",
    ];
    const keyValue = findFieldValue(keyFields, index);
    let imageSrc = null;
    if (typeof displayimagesrc === "function") {
      imageSrc = displayimagesrc(item?.dataObject?.dataObject ?? item?.dataObject ?? item);
    } else {
      imageSrc =
        displayimagesrc && item.dataObject?.[displayimagesrc]
          ? item.dataObject?.[displayimagesrc]
          : null;
    }

    return {
      key: keyValue,
      value: item,
      label: displayValue,
      displayValue,
      displayImage: imageSrc,
      dataObject: item,
    };
  };

  // Add this helper function to highlight matching text
  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query || !text) return text;

    try {
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map((part, index) => {
        if (part.toLowerCase() === query.toLowerCase()) {
          return (
            <strong
              key={index}
              style={{ color: "var(--wm-search-dropdown-menu-item-color-matched)" }}
            >
              {part}
            </strong>
          );
        }
        return part;
      });
    } catch (e) {
      // If there's any error in regex, return original text
      return text;
    }
  };

  // Update the renderItem function to use highlighting
  const renderItem = (item: any, query: string, index: number) => {
    // Convert raw data item to our format
    const dataItem = prepareDataItem(item, index);

    // Get the display text
    const displayText =
      typeof dataItem.displayValue === "string"
        ? DOMPurify.sanitize(dataItem.displayValue)
        : String(dataItem.label);

    function handleClick(event: React.MouseEvent<HTMLLIElement>) {
      handleMenuItemClick(event, dataItem);
    }

    return (
      <MenuItem
        key={`item-${index}-${dataItem.key}`}
        onClick={handleClick}
        data-item={JSON.stringify(dataItem)}
        dense
        className="search-dropdown-item"
        style={{ padding: "10px 16px" }}
      >
        <Box component="a" style={{ textDecoration: "none", color: "inherit" }}>
          {dataItem.displayImage && (
            <Image
              src={dataItem.displayImage}
              alt=""
              width={parseInt(imagewidth) || 16}
              height={parseInt(imagewidth) || 16}
              style={{ marginRight: "8px", borderRadius: "100%" }}
            />
          )}
          {/* MUI anchor tag */}
          <Box component="span" className="" title={displayText}>
            {getDisplayExpression
              ? highlightMatch(getDisplayExpression(getSelectedItem(item)), query)
              : highlightMatch(displayText, query)}
          </Box>
        </Box>
      </MenuItem>
    );
  };

  // Update renderItems to handle non-array cases
  const renderItems = () => {
    let itemCount = 0;

    // If we have grouped data, render by groups
    if (props.groupby) {
      const groupKeys = Object.keys(groupedData || {});
      if (groupKeys.length === 0) {
        return null;
      }

      const renderedItems: React.ReactNode[] = [];

      groupKeys.forEach(groupKey => {
        // Add group divider if needed
        const divider = renderGroupDivider(groupKey);
        if (divider) {
          renderedItems.push(divider);
        }

        // Add items for this group
        const groupItems = groupedData?.[groupKey] || [];
        groupItems.forEach((item: any) => {
          if (itemCount < limit) {
            renderedItems.push(renderItem(item, query, itemCount));
            itemCount++;
          }
        });
      });

      return renderedItems;
    }

    // Ensure formattedDataset is an array before mapping
    const formattedArray = Array.isArray(formattedDataset) ? formattedDataset : [];
    return formattedArray
      .map((item, index) => {
        if (index < limit) {
          return renderItem(item, query, index);
        }
        return null;
      })
      .filter(Boolean); // Remove null values
  };

  const renderClearButton = () => {
    if (showclear && query !== "") {
      return (
        <Button
          className={clsx("btn btn-icon form-control-feedback clear-btn show-btn clear-btn", {
            "show-btn": !!query,
          })}
          aria-label="Clear"
          onClick={handleClearSearch}
          size="small"
        >
          <Box component="i" className={`app-icon ${clearsearchiconclass}`} />
        </Button>
      );
    }
    return null;
  };

  const renderSearchIcon = () => {
    if (showsearchicon) {
      return (
        <Button
          ref={searchButtonRef}
          className="app-search-button btn btn-icon"
          title="search"
          type="button"
          onClick={handleSearchClick}
          disabled={disabled}
          size="small"
        >
          <Box component="i" className={`app-icon ${searchiconclass}`} />
        </Button>
      );
    }
    return null;
  };

  const renderBackButton = () => {
    if (showbackbutton && backsearchiconclass) {
      return (
        <IconButton className="back-btn" aria-label="Back" onClick={handleClearSearch} size="small">
          <Box component="span" className={`app-icon ${backsearchiconclass}`} />
          <Box component="span" className="sr-only">
            Back button
          </Box>
        </IconButton>
      );
    }
    return null;
  };

  const renderLoadingIndicator = () => {
    if (loadingItems) {
      return (
        <Typography variant="body2" className="dropdown-status">
          <CircularProgress size={20} color="primary" style={{ marginRight: "8px" }} />
          {loadingdatamsg}
        </Typography>
      );
    }
    return null;
  };

  const renderNoResultsMessage = () => {
    if (!loadingItems && formattedDataset.length === 0 && query !== "" && !selectedItem) {
      return (
        <Typography variant="body2" className="dropdown-status" style={{ padding: "8px 16px" }}>
          No results found
        </Typography>
      );
    }
    return null;
  };

  const renderCompletionMessage = () => {
    // Show "No more data to load" message when there are results but no more data to load
    if (!loadingItems && formattedDataset.length > 0 && !selectedItem) {
      return (
        <Typography
          variant="body2"
          className="dropdown-status"
          style={{ padding: "8px 16px", textAlign: "center" }}
        >
          {datacompletemsg}
        </Typography>
      );
    }
    return null;
  };

  const renderDropdown = () => {
    // Don't show dropdown if an item is selected or if menu is not open
    if (!isOpen || !menuOpen || selectedItem) return null;

    return (
      <Popper
        open={isOpen && menuOpen}
        anchorEl={inputRef.current}
        placement={dropup ? "top-start" : "bottom-start"}
        style={{ zIndex: 1300, width: searchRef.current?.clientWidth }}
      >
        <Paper elevation={3} className="search-dropdown-paper">
          <Box
            component="div"
            ref={dropdownRef}
            onScroll={handleScroll}
            style={{
              maxHeight: "300px",
              overflow: "auto",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            className="search-dropdown-container"
          >
            <MenuList className="search-menu-list app-search dropdown-menu">
              {renderItems()}
              {renderNoResultsMessage()}
              {renderLoadingIndicator()}
              {renderCompletionMessage()}
            </MenuList>
          </Box>
        </Paper>
      </Popper>
    );
  };

  // Only include safe props in restProps to avoid React warnings
  const safeRestProps = Object.entries(restProps).reduce(
    (acc, [key, value]) => {
      // Filter out any props that might cause DOM warnings
      const invalidProps = [
        "validation",
        "datasetItems",
        "selectedItems",
        "displayValue",
        "onchange",
        "onblur",
        "groupedData",
        "handleHeaderClick",
        "toggleAllHeaders",
        "isDestroyed",
      ];
      if (!invalidProps.includes(key)) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        component="div"
        ref={searchRef}
        style={searchStyle}
        // Don't pass tabIndex to div when it contains focusable elements
        {...safeRestProps}
        className={clsx(DEFAULT_CLASS, className)}
        data-search-type={type}
        type={type}
        readonly={readonly}
      >
        {renderBackButton()}
        <Box component="span" className="sr-only">
          Back button
        </Box>
        <Box
          component="input"
          name={name}
          className={clsx("app-textbox form-control list-of-objs app-search-input")}
          type="text"
          focus-target="true"
          value={query}
          onChange={!readonly ? handleInputChange : undefined}
          disabled={disabled}
          tabIndex={tabindex}
          ref={inputRef}
          aria-label={arialabel}
          autoComplete="off"
          title={query}
          placeholder={placeholder}
          readOnly={readonly}
          onBlur={e => handleBlur(e)}
          onFocus={e => handleFocus(e)}
          onKeyDown={e => handleKeyDown(e as React.KeyboardEvent<HTMLDivElement>)}
        />
        {type === "autocomplete" ? null : (
          <Box component="span" className="input-group-addon">
            <Box component="form" noValidate autoComplete="off">
              {renderSearchIcon()}
            </Box>
          </Box>
        )}
        <Box component="span" className="sr-only">
          Clear button
        </Box>
        {showclear && showclear !== "false" ? renderClearButton() : null}
        {renderDropdown()}
      </Box>
    </ClickAwayListener>
  );
});

Search.displayName = "WmSearch";

export default withFormController(withBaseWrapper(Search));
