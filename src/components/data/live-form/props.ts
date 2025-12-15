import FormProps from "@wavemaker/react-runtime/components/data/form/props";

export default interface WmLiveFormProps extends FormProps {}

export const DEFAULT_PROPS: Partial<WmLiveFormProps> = {
  validationtype: "default",
  defaultmode: "View",
  formlayout: "inline",
  insertmessage: "Record added successfully",
  updatemessage: "Record updated successfully",
  deletemessage: "Record deleted successfully",
  errormessage: "An error occured. Please try again!",
  messagelayout: "Toaster",
};
