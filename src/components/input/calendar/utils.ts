import moment from "moment-timezone";
import { includes, isEmpty, get, mapKeys, cloneDeep, extend, isObject, isDate } from "lodash";
// Helper functions

const dateFormats = [
  "yyyy-MM-dd",
  "yyyy-M-dd",
  "M-dd-yyyy",
  "MM-dd-yy",
  "yyyy, dd MMMM",
  "yyyy, MMM dd",
  "MM/dd/yyyy",
  "M/d/yyyy",
  "EEE, dd MMM yyyy",
  "EEE MMM dd yyyy",
  "EEEE, MMMM dd, yyyy",
  "timestamp",
];

export const getEventMomentValue = (value: any, key: string) => {
  let isDateValue = false;
  dateFormats.forEach(format => {
    if (moment(value, format.toUpperCase(), true).isValid()) {
      isDateValue = true;
      return false;
    }
  });
  // if the value is date then for end date the value should be end of the day as the calendar is approximating it to the start.
  if (isDateValue && key === "end") {
    return moment(value).endOf("day");
  }
  return moment(value);
};

export const getUTCDateTime = (dateObj: any) => {
  dateObj = moment(dateObj);
  const year = dateObj.format("YYYY"),
    month = dateObj.format("MM") - 1,
    day = dateObj.format("DD"),
    hours = dateObj.format("HH"),
    minutes = dateObj.format("mm"),
    seconds = dateObj.format("ss");
  return new Date(year, month, day, hours, minutes, seconds);
};

// Helper function to calculate height for event limit
export const calculateHeight = (height: any) => {
  if (!height) return 600;
  let computedHeight;
  if (typeof height === "string" && includes(height, "%")) {
    // Handle percentage heights - for now, use a default pixel value
    computedHeight = 600;
  } else {
    computedHeight = parseInt(String(height).replace(/px/g, ""), 10) || 600;
  }
  return computedHeight;
};

// View types constants
export const VIEW_TYPES = {
  BASIC: "basic",
  AGENDA: "agenda",
  LIST: "list",
};
export const defaultHeaderOptions = {
  start: "prev next today",
  center: "title",
  end: "dayGridMonth dayGridWeek dayGridDay",
};
export const BUTTON_TEXT = {
  YEAR: "Year",
  MONTH: "Month",
  WEEK: "Week",
  DAY: "Day",
  TODAY: "Today",
};

export const SELECTION_MODES = {
  NONE: "none",
  SINGLE: "single",
  MULTIPLE: "multiple",
};

export const NEXT_DAY_THRESHOLD = {
  START: "00:00",
  END: "24:00",
};

// Helper function to get view type based on view key and calendar type
export const getViewType = (viewKey: string, type: string): string => {
  let result: string;

  if (viewKey === "month") {
    result = type === VIEW_TYPES.LIST ? "listMonth" : "dayGridMonth";
  } else if (viewKey === "week") {
    result =
      type === VIEW_TYPES.BASIC
        ? "dayGridWeek"
        : type === VIEW_TYPES.LIST
          ? "listWeek"
          : "timeGridWeek";
  } else if (viewKey === "day") {
    result =
      type === VIEW_TYPES.BASIC
        ? "dayGridDay"
        : type === VIEW_TYPES.LIST
          ? "listDay"
          : "timeGridDay";
  } else if (viewKey === "year") {
    result = type === VIEW_TYPES.LIST ? "listYear" : "";
  } else {
    result = viewKey;
  }

  return result;
};

// Get the current locale from session storage
export const getSessionLocale = (): string => {
  try {
    return window.sessionStorage?.getItem("selectedLocale") || "en";
  } catch (e) {
    return "en";
  }
};

// Helper function to convert event object for backward compatibility
export const convertEventObj = (eventObj: any): any => {
  if (!eventObj.extendedProps?._eventMetadata) {
    return eventObj;
  }

  const _eventMetadata = eventObj.extendedProps._eventMetadata;
  Object.setPrototypeOf(_eventMetadata, eventObj);

  return _eventMetadata;
};

// Helper function to convert event object for old and new data
export const convertEventObjForOldAndNewData = (eventObj: any): any => {
  const _eventMetadata = eventObj.extendedProps || {};
  const result = { ...eventObj };
  extend(result, _eventMetadata);

  return result;
};

// Helper function to filter events based on selected date range
export const filterEventsByDateRange = (
  dataset: any,
  start: Date,
  end: Date,
  eventstart: string = "start",
  eventend: string = "end"
): any[] => {
  if (!dataset) {
    return [];
  }

  const filteredDates: any[] = [];
  const eventStartKey = eventstart || "start";
  const eventEndKey = eventend || "end";
  const startDate = moment(new Date(start)).format("MM/DD/YYYY");
  const endDate = moment(new Date(end)).subtract(1, "days").format("MM/DD/YYYY");

  const datasetArray = dataset.data || dataset;

  if (Array.isArray(datasetArray)) {
    datasetArray.forEach((value: any) => {
      if (!value[eventStartKey]) {
        return;
      }

      const eventStartDate = moment(new Date(value[eventStartKey])).format("MM/DD/YYYY");
      const eventEndDate = moment(new Date(value[eventEndKey] || value[eventStartKey])).format(
        "MM/DD/YYYY"
      );
      const eventExists =
        moment(eventStartDate).isSameOrAfter(startDate) &&
        moment(eventEndDate).isSameOrBefore(endDate);

      if (eventExists) {
        filteredDates.push(value);
      }
    });
  }

  return filteredDates;
};

// Construct calendar dataset
export const constructCalendarDataset = (
  eventSource: any[],
  eventtitle: string = "title",
  eventallday: string = "allday",
  eventstart: string = "start",
  eventend: string = "end",
  eventclass: string = "className"
): any[] => {
  if (!eventSource || !Array.isArray(eventSource)) return [];

  const properties = {
    title: eventtitle || "title",
    allDay: eventallday || "allday",
    start: eventstart || "start",
    end: eventend || "end",
    className: eventclass || "className",
  };

  const processedEvents = eventSource.map((obj: any) => {
    const newObj = { ...obj };
    newObj._eventMetadata = cloneDeep(obj);

    if (isEmpty(newObj._eventMetadata.url)) {
      delete newObj._eventMetadata.url;
    }

    if (isEmpty(newObj.url)) {
      delete newObj.url;
    }

    mapKeys(properties, (value: string, key: string) => {
      let objVal: any;

      if (key === "title") {
        objVal = get(newObj, value);
      } else if (key === "allDay") {
        objVal = !!get(newObj, value);
      } else {
        objVal = get(newObj, value);
      }

      if (objVal !== undefined && objVal !== null && objVal !== "") {
        (newObj as any)[key] = objVal;
      }
    });

    return newObj;
  });

  return processedEvents;
};

// Calendar utility functions
export const selectDate = (calendarInstance: any, datavalue: any) => {
  if (!calendarInstance || !datavalue) return;

  let start, end;

  if (isObject(datavalue) && !isDate(datavalue)) {
    start = moment((datavalue as any).start);
    end = moment((datavalue as any).end);
  } else {
    start = moment(datavalue);
    end = moment(datavalue).add(1, "day").startOf("day");
  }

  calendarInstance.gotoDate(moment(start).toDate());
  calendarInstance.select(start.toDate(), end.toDate());
};

// Go to a specific date
export const gotoDate = (calendarInstance: any, datavalue: any) => {
  if (!calendarInstance || !datavalue) return;

  calendarInstance.gotoDate(moment(datavalue).toDate());
};

// Go to the next year
export const gotoNextYear = (calendarInstance: any) => {
  if (!calendarInstance) return;

  const date = moment(calendarInstance.getDate()).add(1, "year").toDate();
  calendarInstance.gotoDate(date);
};

// Go to the previous year
export const gotoPrevYear = (calendarInstance: any) => {
  if (!calendarInstance) return;

  const date = moment(calendarInstance.getDate()).subtract(1, "year").toDate();
  calendarInstance.gotoDate(date);
};

// Go to a specific month
export const gotoMonth = (calendarInstance: any, monthVal: number) => {
  if (!calendarInstance) return;

  const presentDay = calendarInstance.getDate();
  const presentMonthVal = presentDay.getMonth();
  const presentDayMoment = moment(presentDay);

  if (presentMonthVal < monthVal) {
    calendarInstance.gotoDate(presentDayMoment.add(monthVal - presentMonthVal - 1, "M").toDate());
  } else {
    calendarInstance.gotoDate(
      presentDayMoment.subtract(presentMonthVal - monthVal + 1, "M").toDate()
    );
  }
};

// Go to the next month
export const gotoNextMonth = (calendarInstance: any) => {
  if (!calendarInstance) return;

  const presentDay = moment(calendarInstance.getDate());
  calendarInstance.gotoDate(presentDay.add(1, "M").toDate());
};

// Go to the previous month
export const gotoPrevMonth = (calendarInstance: any) => {
  if (!calendarInstance) return;

  const presentDay = moment(calendarInstance.getDate());
  calendarInstance.gotoDate(presentDay.subtract(1, "M").toDate());
};

// Unselect all selected dates
export const unselect = (calendarInstance: any) => {
  if (!calendarInstance) return;

  calendarInstance.unselect();
};

// Re-render events
export const rerenderEvents = (calendarInstance: any) => {
  if (!calendarInstance) return;

  calendarInstance.render();
};

// Add external event source
export const addEventSource = (calendarInstance: any, eventObject: any) => {
  if (!calendarInstance || isEmpty(eventObject)) {
    console.warn(
      "addEventSource method requires an object as a parameter or calendar is not initialized."
    );
    return;
  }

  if (eventObject.source === "google") {
    if (!eventObject.googleCalendarApiKey || !eventObject.googleCalendarId) {
      console.warn(
        "For google calendar integration, 'googleCalendarApiKey' and 'googleCalendarId' should be passed in the parameter object."
      );
      return;
    }

    calendarInstance.setOption("googleCalendarApiKey", eventObject.googleCalendarApiKey);
    calendarInstance.addEventSource({
      googleCalendarId: eventObject.googleCalendarId,
    });
  }
};

// Override default options
export const overrideDefaults = (calendarInstance: any, options: any) => {
  if (!calendarInstance || !isObject(options)) return;

  Object.entries(options).forEach(([key, value]) => {
    (calendarInstance as any).setOption(key, value);
  });
};

// Get default date
export const getDefaultDate = (datavalue: any) => {
  if (datavalue) {
    return new Date(datavalue);
  }
  return null;
};

// Get calendar library
export const getLib = () => {
  return "fullcalendar";
};

// Get default options
export const getDefaultOptions = (calendarOptions: any) => {
  return calendarOptions;
};

// Apply calendar options
export const applyCalendarOptions = (
  calendarInstance: any,
  operationType: string,
  argumentKey?: any,
  argumentValue?: any,
  getViewType?: any,
  calendartype?: string
): void => {
  if (!calendarInstance) {
    return;
  }
  switch (operationType) {
    case "render":
      calendarInstance.render();
      break;
    case "option":
      calendarInstance.setOption(argumentKey, argumentValue);
      break;
    case "changeView":
      if (getViewType && calendartype) {
        const view = getViewType(argumentKey, calendartype);
        calendarInstance.changeView(view);
      }
      break;
  }
};
