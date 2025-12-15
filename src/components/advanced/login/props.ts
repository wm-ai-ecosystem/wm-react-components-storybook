import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { IEventSource } from "../../dialogs/login-dialog/props";

export interface WmLoginProps extends BaseProps {
  name: string;
  show?: boolean;
  errormessage?: string;
  eventsource?: IEventSource;
  messagelistener?: (message: any) => void;
  onSubmit?: (event: Event, widget: any) => void;
  onBeforerender?: (event: Event, widget: any) => void;
  onSuccess?: (event: Event, widget: any) => void;
  onError?: (event: Event, widget: any) => void;
}
