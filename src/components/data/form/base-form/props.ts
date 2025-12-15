import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

interface BaseFormProps extends BaseProps {
  captionwidth: string;
  captionposition: "left" | "right" | "top" | "bottom";
  captionalign: "left" | "center" | "right";
  autocomplete: "on" | "off";
  method: "post" | "put" | "delete";
  messagelayout: "Inline" | "Toaster";
  postmessage: string;
  errormessage: string;
  tabindex: number;
  validationtype: string;
  collapsible: boolean;
  expanded: boolean;
  isInsideWizard?: boolean;
  onReset: () => void;
  action: (event: React.FormEvent<HTMLFormElement>, widget: any) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => void;
  onError: (event: React.FormEvent<HTMLFormElement>, widget: any, error: any) => void;
  onSuccess: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => void;
  formSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    widget: any,
    data: any,
    operation?: any
  ) => void;
  onChange: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => void;
  onBeforeSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    widget: any,
    data: any
  ) => boolean | string | object | Promise<boolean | string | object>;
}

export const defaultProps: Partial<BaseFormProps> = {
  captionwidth: "xs-12 sm-3 md-3 lg-3",
  captionposition: "left",
  captionalign: "left",
  autocomplete: "off",
  method: "post",
  messagelayout: "Inline",
  postmessage: "Data posted successfully",
  errormessage: "An error occurred. Please try again!",
  tabindex: 0,
  validationtype: "default",
  collapsible: false,
  expanded: true,
  onReset: () => {},
  onSubmit: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => {},
  onError: (event: React.FormEvent<HTMLFormElement>, widget: any, error: any) => {},
  onSuccess: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => {},
  formsubmit: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => {},
  onChange: (event: React.FormEvent<HTMLFormElement>, widget: any, data: any) => {},
  onBeforeSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    widget: any,
    data: any
  ): boolean | string | object | Promise<boolean | string | object> => {
    return true;
  },
};

export default BaseFormProps;
