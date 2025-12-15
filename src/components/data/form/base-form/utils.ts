import { forEach, split } from "lodash-es";
import { REGEX } from "./constant";

let userAgent = "";

if (typeof window !== "undefined") {
  userAgent = window.navigator.userAgent;
}

export const isAndroid = () => REGEX.ANDROID.test(userAgent);

export const getFieldLayoutConfig = (
  captionWidth: string,
  captionPosition: string,
  os: string
): any => {
  let captionCls = "",
    widgetCls = "";

  captionPosition = captionPosition || "top";

  if (captionPosition === "top" || captionPosition === "floating") {
    if ((os && os === "android") || isAndroid()) {
      // Is android or not a mobile application
      captionCls = widgetCls = "col-xs-12";
    }
  } else if (captionWidth) {
    // handling itemsperrow containing string of classes
    forEach(split(captionWidth, " "), function (cls) {
      const keys = split(cls, "-"),
        tier = keys[0];
      let _captionWidth, widgetWidth;
      _captionWidth = parseInt(keys[1], 10);
      widgetWidth = 12 - _captionWidth;
      widgetWidth = widgetWidth <= 0 ? 12 : widgetWidth;
      captionCls += " " + "col-" + tier + "-" + _captionWidth;
      widgetCls += " " + "col-" + tier + "-" + widgetWidth;
    });
  }
  return {
    captionCls: captionCls,
    widgetCls: widgetCls,
  };
};
