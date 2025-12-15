import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface IEventSource {
  invoke: (
    params: { formData?: any },
    onSuccess: () => void,
    onError: (error?: any) => void
  ) => void;
}

export interface IFormData {
  values: Record<string, any>;
  isValid: boolean;
}

export interface ILoginMessage {
  type?: string;
  caption?: any;
  show?: boolean;
}

export interface WmLoginDialogProps extends BaseProps {
  name: string;
  title?: string;
  iconclass?: string;
  errormessage?: string;
  eventsource?: IEventSource;
  onSubmit?: (event: Event, widget: any) => void;
  onOpened?: (event: Event, widget: any) => void;
  onClose?: (event: Event, widget: any) => void;
  onSuccess?: (event: Event, widget: any) => void;
  onError?: (event: Event, widget: any) => void;
  logintext?: string;
  canceltext?: string;
}
