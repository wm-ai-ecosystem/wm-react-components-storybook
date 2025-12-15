"use client";
import { useEffect } from "react";
import { useAppSelector } from "../store";
import moment from "moment-timezone";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const loadedLocales = new Set<string>(["en"]);

const loadMomentLocale = (locale: string): boolean => {
  if (!locale || locale === "en") {
    return true;
  }

  const normalizedLocale = locale.toLowerCase();

  if (loadedLocales.has(normalizedLocale)) {
    return true;
  }

  try {
    require(`moment/locale/${normalizedLocale}.js`);
    loadedLocales.add(normalizedLocale);
    return true;
  } catch (error) {
    const baseLocale = normalizedLocale.split("-")[0];
    if (baseLocale !== normalizedLocale && baseLocale !== "en" && !loadedLocales.has(baseLocale)) {
      try {
        require(`moment/locale/${baseLocale}.js`);
        loadedLocales.add(baseLocale);
        return true;
      } catch (baseError) {
        return false;
      }
    }
    return false;
  }
};

const CustomLocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const selectedLocale = useAppSelector((state: any) => state.i18n.selectedLocale);

  useEffect(() => {
    if (!selectedLocale) {
      return;
    }

    const localeLoadSuccess = loadMomentLocale(selectedLocale);

    moment.locale(selectedLocale);
    if (localeLoadSuccess) {
      moment.updateLocale(selectedLocale, {
        monthsShort: Array.from({ length: 12 }, (_, i) => moment().month(i).format("MMM")),
        months: Array.from({ length: 12 }, (_, i) => moment().month(i).format("MMMM")),
      });
    }
  }, [selectedLocale]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterMoment}
      adapterLocale={selectedLocale}
      localeText={{
        calendarViewSwitchingButtonAriaLabel: view =>
          view === "year"
            ? "year view is open, switch to calendar view"
            : "calendar view is open, switch to year view",
      }}
    >
      {children}
    </LocalizationProvider>
  );
};

export default CustomLocalizationProvider;
