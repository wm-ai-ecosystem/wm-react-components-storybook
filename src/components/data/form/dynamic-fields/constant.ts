import WmText from "@/components/input/text";
import WmTextarea from "@/components/input/textarea";
import WmNumber from "@/components/input/number";
import WmCurrency from "@/components/input/currency";
import WmSelect from "@/components/input/select";
import WmSlider from "@/components/input/slider";
import WmRating from "@/components/input/rating";

// Default input components
import WmCheckbox from "@/components/input/default/checkbox";
import WmCheckboxset from "@/components/input/default/checkboxset";
import WmRadioset from "@/components/input/default/radioset";
import WmSwitch from "@/components/input/default/switch";

// Date/Time components
import WmDate from "@/components/input/epoch/date";
import WmDatetime from "@/components/input/epoch/datetime";
import WmTime from "@/components/input/epoch/time";

// Other input components
import WmChips from "@/components/input/chips";
import WmColorPicker from "@/components/input/color-picker";
import WmFileupload from "@/components/input/fileupload";
import WmCalendar from "@/components/input/calendar";

export const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  text: WmText,
  textarea: WmTextarea,
  number: WmNumber,
  currency: WmCurrency,
  select: WmSelect,
  slider: WmSlider,
  rating: WmRating,
  checkbox: WmCheckbox,
  checkboxset: WmCheckboxset,
  radioset: WmRadioset,
  switch: WmSwitch,
  date: WmDate,
  datetime: WmDatetime,
  time: WmTime,
  chips: WmChips,
  colorpicker: WmColorPicker,
  fileupload: WmFileupload,
  calendar: WmCalendar,
};
