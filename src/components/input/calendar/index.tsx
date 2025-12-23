import React, { useRef, useState, useEffect, useCallback, useMemo, forwardRef } from "react";
import moment from "moment-timezone";
import { Box } from "@mui/material";
import { get, each, includes } from "lodash";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import momentPlugin from "@fullcalendar/moment";
import {
  getEventMomentValue,
  getUTCDateTime,
  calculateHeight,
  getViewType,
  VIEW_TYPES,
  getSessionLocale,
  convertEventObj,
  convertEventObjForOldAndNewData,
  filterEventsByDateRange,
  constructCalendarDataset,
  defaultHeaderOptions,
  BUTTON_TEXT,
  SELECTION_MODES,
  NEXT_DAY_THRESHOLD,
  selectDate as selectDateUtil,
  gotoDate as gotoDateUtil,
  gotoNextYear as gotoNextYearUtil,
  gotoPrevYear as gotoPrevYearUtil,
  gotoMonth as gotoMonthUtil,
  gotoNextMonth as gotoNextMonthUtil,
  gotoPrevMonth as gotoPrevMonthUtil,
  unselect as unselectUtil,
  rerenderEvents as rerenderEventsUtil,
  addEventSource as addEventSourceUtil,
  overrideDefaults as overrideDefaultsUtil,
  getDefaultDate as getDefaultDateUtil,
  getLib as getLibUtil,
  getDefaultOptions as getDefaultOptionsUtil,
  applyCalendarOptions as applyCalendarOptionsUtil,
} from "./utils";
import { WmCalendarProps } from "./props";
import {
  EventDropArg,
  EventClickArg,
  DateSelectArg,
  EventMountArg,
  ViewMountArg,
  DatesSetArg,
} from "@fullcalendar/core";

const WmCalendar = forwardRef<HTMLDivElement, WmCalendarProps>((props, ref) => {
  const {
    name,
    dataset,
    datavalue,
    eventtitle = "title",
    eventstart = "start",
    eventend = "end",
    eventallday = "allday",
    eventclass = "className",
    tabindex = 0,
    controls = "navigation, today, year, month, week, day",
    calendartype = "basic",
    view = "month",
    selectionmode = "none",
    show = true,
    height,
    width,
    onSelect,
    onBeforerender,
    onEventdrop,
    onEventresize,
    onEventclick,
    onEventrender,
    onViewrender,
    onDateclick,
    listener,
  } = props;

  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInstanceRef = useRef<Calendar | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [selectedEventsInRange, setSelectedEventsInRange] = useState<any>(null);
  const [currentView, setCurrentView] = useState<any>(null);
  const [dataSetEvents, setDataSetEvents] = useState<any>({ events: [] });
  const [calendarReady, setCalendarReady] = useState(false);

  const updateCalendarHeaderOptions = useCallback(() => {
    if (!calendarInstanceRef.current) return;
    const ctrls = controls;
    const viewType = calendartype;
    const regEx = new RegExp("\\bday\\b", "g");
    let left = "";
    let right = "";
    if (ctrls && viewType) {
      if (includes(ctrls, "navigation")) {
        left += " prev next";
      }
      if (includes(ctrls, "today")) {
        left += " today";
      }
      if (includes(ctrls, "year")) {
        right += viewType === VIEW_TYPES.LIST ? "listYear" : "";
      }
      if (includes(ctrls, "month")) {
        right += viewType === VIEW_TYPES.LIST ? " listMonth" : " dayGridMonth";
      }
      if (includes(ctrls, "week")) {
        right +=
          viewType === VIEW_TYPES.BASIC
            ? " dayGridWeek"
            : viewType === VIEW_TYPES.LIST
              ? " listWeek"
              : " timeGridWeek";
      }
      if (regEx.test(ctrls)) {
        right +=
          viewType === VIEW_TYPES.BASIC
            ? " dayGridDay"
            : viewType === VIEW_TYPES.LIST
              ? " listDay"
              : " timeGridDay";
      }
      if (left.charAt(0) === " ") {
        left = left.substring(1);
      }
      if (right.charAt(0) === " ") {
        right = right.substring(1);
      }
      calendarInstanceRef.current.setOption("headerToolbar", {
        ...calendarInstanceRef.current.getOption("headerToolbar"),
        start: left,
        end: right,
      });
    }
  }, [calendartype, controls]);

  const invokeCallback = useCallback(
    (eventName: String, eventData: any) => {
      const { $start, $end, $view, $data, $event, $newData, $oldData, $delta, $revertFunc, $ui } =
        eventData;
      switch (eventName) {
        case "select":
          onSelect?.($start, $end, $view, $data);
          break;
        case "beforerender":
          onBeforerender?.(eventData, listener?.Widgets[name]);
          break;
        case "eventdrop":
          onEventdrop?.($event, $newData, $oldData, $delta, $revertFunc, $ui, $view);
          break;
        case "eventresize":
          onEventresize?.($event, $newData, $oldData, $delta, $revertFunc, $ui, $view);
          break;
        case "eventclick":
          onEventclick?.($event, $data, $view);
          break;
        case "eventrender":
          onEventrender?.($event, $data, $view);
          break;
        case "viewrender":
          onViewrender?.(eventData.$view);
          break;
        case "dateclick":
          onDateclick?.(eventData.$dateInfo);
          break;
      }
    },
    [
      onSelect,
      onBeforerender,
      onEventdrop,
      onEventresize,
      onEventclick,
      onEventrender,
      onViewrender,
      onDateclick,
    ]
  );

  const calendarHeight = useMemo(() => calculateHeight(height), [height]);

  const calendarOptions = useMemo(() => {
    const computedHeight = calendarHeight;
    const eventLimit = Math.floor(computedHeight / 200) + 1;
    return {
      calendar: {
        height: computedHeight,
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
          googleCalendarPlugin,
          momentPlugin,
        ],
        editable: true,
        locale: getSessionLocale(),
        selectable: selectionmode !== SELECTION_MODES.NONE,
        longPressDelay: 1000,
        headerToolbar: defaultHeaderOptions,
        nextDayThreshold: NEXT_DAY_THRESHOLD.START,
        eventSources: [dataSetEvents],
        views: {
          month: {
            dayMaxEvents: eventLimit,
            dayMaxEventRows: true,
          },
        },
        unselectAuto: false,
        initialView: getViewType(view, calendartype),
        selectConstraint:
          selectionmode === SELECTION_MODES.SINGLE
            ? {
                startTime: "00:00",
                endTime: "24:00",
              }
            : {},
        selectAllow: selectionmode === SELECTION_MODES.MULTIPLE ? () => true : undefined,
        buttonText: {
          year: get(window, "app.appLocale.LABEL_CALENDAR_YEAR", BUTTON_TEXT.YEAR),
          month: get(window, "app.appLocale.LABEL_CALENDAR_MONTH", BUTTON_TEXT.MONTH),
          week: get(window, "app.appLocale.LABEL_CALENDAR_WEEK", BUTTON_TEXT.WEEK),
          day: get(window, "app.appLocale.LABEL_CALENDAR_DAY", BUTTON_TEXT.DAY),
          today: get(window, "app.appLocale.LABEL_CALENDAR_TODAY", BUTTON_TEXT.TODAY),
          listYear: get(window, "app.appLocale.LABEL_CALENDAR_YEAR", BUTTON_TEXT.YEAR),
          listMonth: get(window, "app.appLocale.LABEL_CALENDAR_MONTH", BUTTON_TEXT.MONTH),
          listWeek: get(window, "app.appLocale.LABEL_CALENDAR_WEEK", BUTTON_TEXT.WEEK),
          listDay: get(window, "app.appLocale.LABEL_CALENDAR_DAY", BUTTON_TEXT.DAY),
        },
      },
    };
  }, [calendartype, selectionmode, view, dataSetEvents, calendarHeight, getViewType]);

  const eventHandlers = useMemo(
    () => ({
      eventDrop: (eventDropInfo: EventDropArg) => {
        const newDataObj = convertEventObjForOldAndNewData(eventDropInfo.event);
        const oldDataObj = convertEventObjForOldAndNewData(eventDropInfo.oldEvent);
        invokeCallback("eventdrop", {
          $event: eventDropInfo.jsEvent,
          $newData: newDataObj,
          $oldData: oldDataObj,
          $delta: eventDropInfo.delta,
          $revertFunc: eventDropInfo.revert,
          $ui: {},
          $view: eventDropInfo.view,
        });
      },
      eventResize: (eventResizeInfo: any) => {
        const newDataObj = convertEventObjForOldAndNewData(eventResizeInfo.event);
        const oldDataObj = convertEventObjForOldAndNewData(eventResizeInfo.oldEvent);
        invokeCallback("eventresize", {
          $event: eventResizeInfo.jsEvent,
          $newData: newDataObj,
          $oldData: oldDataObj,
          $delta: eventResizeInfo.delta,
          $revertFunc: eventResizeInfo.revert,
          $ui: {},
          $view: eventResizeInfo.view,
        });
      },
      eventClick: (eventClickInfo: EventClickArg) => {
        const eventObj = convertEventObj(eventClickInfo.event);
        invokeCallback("eventclick", {
          $event: eventClickInfo.jsEvent,
          $data: eventObj,
          $view: eventClickInfo.view,
        });
      },
      select: (selectionInfo: DateSelectArg) => {
        const selectDates = {
          start: getUTCDateTime(selectionInfo.start),
          end: getUTCDateTime(selectionInfo.end),
        };
        const filteredData = filterEventsByDateRange(
          dataset,
          selectionInfo.start,
          selectionInfo.end,
          eventstart,
          eventend
        );
        setSelectedDateRange(selectDates);
        setSelectedEventsInRange(filteredData);
        invokeCallback("select", {
          $start: selectionInfo.start.valueOf(),
          $end: selectionInfo.end.valueOf(),
          $view: selectionInfo.view,
          $data: filteredData,
        });
      },
      eventDidMount: (event: EventMountArg) => {
        const eventObj = convertEventObj(event.event);
        setTimeout(() => {
          if (calendartype === VIEW_TYPES.LIST) {
            const fcListTable = document.querySelector(".fc-list-table");
            if (fcListTable && !fcListTable.classList.contains("table")) {
              fcListTable.classList.add("table");
            }
          }
        }, 0);
        invokeCallback("eventrender", {
          $event: event.el,
          $data: eventObj,
          $view: event.view,
        });
      },
      viewDidMount: (viewInfo: ViewMountArg) => {
        setTimeout(() => {
          if (calendartype === VIEW_TYPES.LIST) {
            const fcListTable = document.querySelector(".fc-list-table");
            if (fcListTable && !fcListTable.classList.contains("table")) {
              fcListTable.classList.add("table");
            }
          }
        }, 0);
        if (calendarInstanceRef.current) {
          renderEventDataSet();
        }
        if (onViewrender) {
          onViewrender(viewInfo);
        }
      },
      datesSet: (data: DatesSetArg) => {
        setCurrentView({
          start: moment(data.start).format("YYYY-MM-DD"),
          end: moment(data.end).format("YYYY-MM-DD"),
        });
      },
      dateClick: (info: any) => {
        const dateInfo = getUTCDateTime(info.date).valueOf();
        invokeCallback("dateclick", { $dateInfo: dateInfo });
      },
    }),
    [
      calendartype,
      invokeCallback,
      convertEventObj,
      convertEventObjForOldAndNewData,
      filterEventsByDateRange,
    ]
  );

  useEffect(() => {
    if (!dataset) {
      setDataSetEvents({ events: [] });
      return;
    }
    let dataSet;
    if (Array.isArray(dataset)) {
      dataSet = dataset;
    } else if (dataset.data && Array.isArray(dataset.data)) {
      dataSet = dataset.data;
    } else if (typeof dataset === "object") {
      dataSet = [dataset]; // Handle single object as array
    } else {
      dataSet = [];
    }
    const processedDataSet = constructCalendarDataset(
      [...dataSet],
      eventtitle,
      eventallday,
      eventstart,
      eventend,
      eventclass
    );
    const filteredEvents = processedDataSet.filter((event: any) => {
      event.start = event.start || event.end;
      return !!event.start;
    });
    setDataSetEvents({ events: filteredEvents });
    if (calendarInstanceRef.current) {
      renderEventDataSet(filteredEvents);
    }
  }, [dataset, constructCalendarDataset]);

  useEffect(() => {
    if (calendarInstanceRef.current) {
      updateCalendarHeaderOptions();
    }
  }, [controls, calendartype, updateCalendarHeaderOptions]);

  useEffect(() => {
    if (!calendarInstanceRef.current) return;
    const newView = getViewType(view, calendartype);
    calendarInstanceRef.current.changeView(newView);
  }, [view, calendartype, getViewType]);

  useEffect(() => {
    if (!calendarInstanceRef.current) return;
    calendarInstanceRef.current.setOption("selectable", selectionmode !== SELECTION_MODES.NONE);
    if (selectionmode === SELECTION_MODES.SINGLE) {
      calendarInstanceRef.current.setOption("selectConstraint", {
        startTime: "00:00",
        endTime: "24:00",
      });
      calendarInstanceRef.current.setOption("selectAllow", undefined);
    } else if (selectionmode === SELECTION_MODES.MULTIPLE) {
      calendarInstanceRef.current.setOption("selectConstraint", {});
      calendarInstanceRef.current.setOption("selectAllow", () => true);
    } else {
      calendarInstanceRef.current.setOption("selectConstraint", {});
      calendarInstanceRef.current.setOption("selectAllow", undefined);
    }
  }, [selectionmode]);

  useEffect(() => {
    if (!calendarInstanceRef.current) return;
    const newHeight = calculateHeight(height);
    calendarInstanceRef.current.setOption("height", newHeight);
  }, [height]);

  const renderEventDataSet = useCallback(
    (events: any = dataSetEvents.events) => {
      if (!calendarInstanceRef.current) return;
      calendarInstanceRef.current.batchRendering(() => {
        const currentEvents = calendarInstanceRef.current!.getEvents();
        for (let i = 0; i < currentEvents.length; i++) {
          currentEvents[i].remove();
        }
        const eventsToAdd = events || dataSetEvents.events;
        each(eventsToAdd, (event: any) => {
          try {
            calendarInstanceRef.current!.addEvent(event);
          } catch (e) {
            console.warn("Failed to add event:", event, e);
          }
        });
      });
    },
    [dataSetEvents.events]
  );

  useEffect(() => {
    if (!calendarRef.current || !show) return;
    const calendarInstance = new Calendar(calendarRef.current, {
      ...calendarOptions.calendar,
      ...eventHandlers,
    });
    calendarInstanceRef.current = calendarInstance;
    setCalendarReady(true);
    invokeCallback("beforerender", { $event: {} });
    calendarInstance.render();
    const timeoutId = setTimeout(() => {
      const initialView = getViewType(view, calendartype);
      calendarInstance.changeView(initialView);
    }, 50);
    return () => {
      clearTimeout(timeoutId);
      if (calendarInstanceRef.current) {
        calendarInstanceRef.current.destroy();
        calendarInstanceRef.current = null;
      }
      setCalendarReady(false);
    };
  }, [show]);

  useEffect(() => {
    if (calendarReady && calendarInstanceRef.current) {
      renderEventDataSet();
    }
  }, [calendarReady, dataSetEvents.events]);

  useEffect(() => {
    if (!calendarInstanceRef.current) return;
    calendarInstanceRef.current.setOption("height", calendarHeight);
    calendarInstanceRef.current.setOption("locale", getSessionLocale());
    calendarInstanceRef.current.setOption("selectable", selectionmode !== SELECTION_MODES.NONE);
    if (selectionmode === SELECTION_MODES.SINGLE) {
      calendarInstanceRef.current.setOption("selectConstraint", {
        startTime: "00:00",
        endTime: "24:00",
      });
    } else if (selectionmode === SELECTION_MODES.MULTIPLE) {
      calendarInstanceRef.current.setOption("selectConstraint", {});
      calendarInstanceRef.current.setOption("selectAllow", () => true);
    } else {
      calendarInstanceRef.current.setOption("selectConstraint", {});
    }
    const currentView = getViewType(view, calendartype);
    calendarInstanceRef.current.changeView(currentView);
    updateCalendarHeaderOptions();
  }, [calendarHeight, selectionmode, view, calendartype, getViewType, updateCalendarHeaderOptions]);
  useEffect(() => {
    const handleLocaleChange = (localeData: any) => {
      if (!calendarInstanceRef.current) return;
      const buttonText = {
        year: get(window, "app.appLocale.LABEL_CALENDAR_YEAR", BUTTON_TEXT.YEAR),
        month: get(window, "app.appLocale.LABEL_CALENDAR_MONTH", BUTTON_TEXT.MONTH),
        week: get(window, "app.appLocale.LABEL_CALENDAR_WEEK", BUTTON_TEXT.WEEK),
        day: get(window, "app.appLocale.LABEL_CALENDAR_DAY", BUTTON_TEXT.DAY),
        today: get(window, "app.appLocale.LABEL_CALENDAR_TODAY", BUTTON_TEXT.TODAY),
        listYear: get(window, "app.appLocale.LABEL_CALENDAR_YEAR", BUTTON_TEXT.YEAR),
        listMonth: get(window, "app.appLocale.LABEL_CALENDAR_MONTH", BUTTON_TEXT.MONTH),
        listWeek: get(window, "app.appLocale.LABEL_CALENDAR_WEEK", BUTTON_TEXT.WEEK),
        listDay: get(window, "app.appLocale.LABEL_CALENDAR_DAY", BUTTON_TEXT.DAY),
      };
      calendarInstanceRef.current.setOption("buttonText", buttonText);
      calendarInstanceRef.current.setOption("locale", localeData.fullCalendar || "en");
      calendarInstanceRef.current.render();
    };
    const appInstance = window.app;
    if (appInstance && appInstance.subscribe) {
      const unsubscribe = appInstance.subscribe("locale-changed", handleLocaleChange);
      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  const selectDate = useCallback(() => {
    selectDateUtil(calendarInstanceRef.current, datavalue);
  }, [datavalue]);

  const gotoDate = useCallback(() => {
    gotoDateUtil(calendarInstanceRef.current, datavalue);
  }, [datavalue]);

  const gotoNextYear = useCallback(() => {
    gotoNextYearUtil(calendarInstanceRef.current);
  }, []);

  const gotoPrevYear = useCallback(() => {
    gotoPrevYearUtil(calendarInstanceRef.current);
  }, []);

  const gotoMonth = useCallback((monthVal: number) => {
    gotoMonthUtil(calendarInstanceRef.current, monthVal);
  }, []);

  const gotoNextMonth = useCallback(() => {
    gotoNextMonthUtil(calendarInstanceRef.current);
  }, []);

  const gotoPrevMonth = useCallback(() => {
    gotoPrevMonthUtil(calendarInstanceRef.current);
  }, []);

  const unselect = useCallback(() => {
    unselectUtil(calendarInstanceRef.current);
  }, []);

  const rerenderEvents = useCallback(() => {
    rerenderEventsUtil(calendarInstanceRef.current);
  }, []);

  const addEventSource = useCallback((eventObject: any) => {
    addEventSourceUtil(calendarInstanceRef.current, eventObject);
  }, []);

  const overrideDefaults = useCallback((options: any) => {
    overrideDefaultsUtil(calendarInstanceRef.current, options);
  }, []);

  const getDefaultDate = useCallback(() => {
    return getDefaultDateUtil(datavalue);
  }, [datavalue]);

  const getLib = useCallback(() => {
    return getLibUtil();
  }, []);

  const getDefaultOptions = useCallback(() => {
    return getDefaultOptionsUtil(calendarOptions);
  }, [calendarOptions]);

  const applyCalendarOptions = useCallback(
    (operationType: string, argumentKey?: any, argumentValue?: any): void => {
      applyCalendarOptionsUtil(
        calendarInstanceRef.current,
        operationType,
        argumentKey,
        argumentValue,
        getViewType,
        calendartype
      );
    },
    [getViewType, calendartype]
  );

  useEffect(() => {
    if (props?.listener?.onChange) {
      props.listener.onChange(name, {
        selectDate,
        gotoDate,
        gotoMonth,
        gotoNextMonth,
        gotoPrevMonth,
        gotoNextYear,
        gotoPrevYear,
        rerenderEvents,
        unselect,
        addEventSource,
        overrideDefaults,
        getDefaultDate,
        getLib,
        getDefaultOptions,
        calendarOptions,
        applyCalendarOptions,
        getEventMomentValue,
        selectedDateRange,
        selectedEventsInRange,
        currentView,
      });
    }
  }, [
    selectDate,
    gotoDate,
    gotoMonth,
    gotoNextMonth,
    gotoPrevMonth,
    gotoNextYear,
    gotoPrevYear,
    rerenderEvents,
    getEventMomentValue,
    selectedDateRange,
    selectedEventsInRange,
    currentView,
  ]);

  const componentProps = {
    name: name,
    view: view,
    calendartype: calendartype,
    selectionmode: selectionmode,
    tabIndex: tabindex,
    controls: controls,
    height: height,
    width: width,
    style: { width: "100%" },
    "data-widget-id": props["data-widget-id"],
    "aria-label": view ? view + " view" : "month view",
  };
  return (
    <Box hidden={props.hidden ?? false} className="app-calendar" {...componentProps}>
      <Box className={props.className} ref={calendarRef}></Box>
    </Box>
  );
});

WmCalendar.displayName = "WmCalendar";
export default withBaseWrapper(WmCalendar);
