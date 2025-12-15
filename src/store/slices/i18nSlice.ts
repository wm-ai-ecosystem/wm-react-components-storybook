import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toLower from "lodash-es/toLower";
import map from "lodash-es/map";
import { includes, intersection, isObject } from "lodash-es";
import { getSessionStorageItem, setSessionStorageItem } from "@wavemaker/react-runtime/core/util";
import { setCSS } from "@wavemaker/react-runtime/core/util/dom";
import { store } from "@wavemaker/react-runtime/store";
import appstore from "@wavemaker/react-runtime/core/appstore";

const APP_LOCALE_ROOT_PATH = "/resources/i18n";

const RTL_LANGUAGE_CODES = [
  "ar",
  "ar-001",
  "ar-ae",
  "ar-bh",
  "ar-dz",
  "ar-eg",
  "ar-iq",
  "ar-jo",
  "ar-kw",
  "ar-lb",
  "ar-ly",
  "ar-ma",
  "ar-om",
  "ar-qa",
  "ar-sa",
  "ar-sd",
  "ar-sy",
  "ar-tn",
  "ar-ye",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi",
];

export interface I18nState {
  selectedLocale: string;
  defaultSupportedLocale: string;
  appLocale: any;
  dateFormat: string;
  timeFormat: string;
  dateTimeFormat: string;
  currencyCode: string;
  timezone: string;
  isLoading: boolean;
  error: string | null;
  prefabMessages: Record<string, string>;
}

const initialState: I18nState = {
  selectedLocale: "",
  defaultSupportedLocale: "en",
  appLocale: {},
  dateFormat: "MMM d, y",
  timeFormat: "h:mm:ss a",
  dateTimeFormat: "MMM d, y h:mm:ss a",
  currencyCode: "USD",
  timezone: "UTC",
  isLoading: false,
  error: null,
  prefabMessages: {},
};

// check and change the direction
function updateLocaleDirection(locale: string) {
  let direction: "ltr" | "rtl" = "ltr";
  if (RTL_LANGUAGE_CODES.includes(locale)) {
    direction = "rtl";
  }
  setCSS(document.body, "direction", direction);
}

// Async thunk for loading locale bundle
export const loadLocaleBundle = createAsyncThunk(
  "i18n/loadLocaleBundle",
  async (_, { rejectWithValue }) => {
    const appProperties = store.getState().info.appConfig.appProperties;
    function getAcceptedLanguages() {
      let languages: any = decodeURIComponent(appProperties.preferredLanguage || "");

      languages = languages?.split(",")?.map(function (locale: string) {
        return locale?.split(";")[0];
      });
      return map(languages, toLower);
    }
    const _acceptLang = getAcceptedLanguages();
    const _defaultLanguage = appProperties.defaultLanguage;
    _acceptLang.push(_defaultLanguage);

    // checks whether user preference is based on browser set languages or default language set in project
    let preferBrowserLang = appProperties.preferBrowserLang;
    if (!preferBrowserLang) {
      // when preferBrowserLang is not defined, set to its default value
      preferBrowserLang = true;
    } else {
      // convert stringified boolean values recieved from BE to booleans
      preferBrowserLang = preferBrowserLang === "true" || preferBrowserLang === true ? true : false;
    }

    let _supportedLang = Object?.keys(appProperties.supportedLanguages) || [
      initialState.defaultSupportedLocale,
    ];
    let _selectedDefaultLang = preferBrowserLang ? undefined : _defaultLanguage;

    const sessionLanguage = getSessionStorageItem("selectedLocale");

    let localLanguage = includes(_supportedLang, sessionLanguage) && sessionLanguage;

    let locale =
      localLanguage ||
      _selectedDefaultLang ||
      intersection(_acceptLang, _supportedLang)[0] ||
      initialState.defaultSupportedLocale;

    try {
      const url = store.getState().info.appConfig.url;
      const path = `${url + APP_LOCALE_ROOT_PATH}/${locale}.json`;
      const response = await axios.get(path);

      // update session language
      setSessionStorageItem("selectedLocale", locale);
      // change direction if required
      updateLocaleDirection(locale);
      appstore.set("i18nService", response.data);
      return { data: response.data, locale };
    } catch (error) {
      console.warn(`Error loading locale resource: ${error}`);
      return rejectWithValue("Failed to load locale bundle");
    }
  }
);

// Async thunk to set locale and load locale bundle
export const setSelectedLocaleAndLoadBundle = createAsyncThunk(
  "i18n/setSelectedLocaleAndLoadBundle",
  async ({ locale }: { locale: string | { datavalue: string } }, { dispatch, getState }) => {
    let localeValue = isObject(locale)
      ? (locale as { datavalue: string }).datavalue
      : (locale as string);
    const appProperties = store.getState().info.appConfig.appProperties;

    const supportedLocales = Object.keys(appProperties.supportedLanguages);

    if (!includes(supportedLocales, localeValue)) {
      return null;
    }

    if (!localeValue || localeValue === (getState() as any).i18n.selectedLocale) {
      return null;
    }
    const currentLocale = getSessionStorageItem("selectedLocale");
    if (currentLocale === localeValue) {
      return null;
    }

    // Update session storage with new locale
    setSessionStorageItem("selectedLocale", localeValue);

    // Change direction if required
    updateLocaleDirection(localeValue);

    // Load the locale bundle
    await dispatch(loadLocaleBundle());

    return localeValue;
  }
);

const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setAppLocale: (state, action) => {
      state.appLocale = action.payload;
    },
    setDateFormat: (state, action) => {
      state.dateFormat = action.payload;
      state.dateTimeFormat = `${action.payload} ${state.timeFormat}`;
    },
    setTimeFormat: (state, action) => {
      state.timeFormat = action.payload;
      state.dateTimeFormat = `${state.dateFormat} ${action.payload}`;
    },
    setCurrencyCode: (state, action) => {
      state.currencyCode = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadLocaleBundle.fulfilled, (state, action) => {
        state.appLocale = action.payload.data.messages || {};
        state.dateFormat = action.payload.data.formats?.date || state.dateFormat;
        state.timeFormat = action.payload.data.formats?.time || state.timeFormat;
        state.currencyCode = action.payload.data.formats?.currency || state.currencyCode;
        state.dateTimeFormat = `${state.dateFormat} ${state.timeFormat}`;
        state.prefabMessages = action.payload.data.prefabMessages || {};
        state.selectedLocale = action.payload.locale || state.selectedLocale;
      })
      .addCase(loadLocaleBundle.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setTimezone, setAppLocale, setDateFormat, setTimeFormat, setCurrencyCode } =
  i18nSlice.actions;

export default i18nSlice.reducer;
