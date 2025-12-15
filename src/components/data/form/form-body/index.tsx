import clsx from "clsx";
import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

const DEFAULT_CLASS = "panel-body form-body";

export function FormBody(props: BaseProps) {
  const { children, className, styles, ...rest } = props;
  return (
    <div className={clsx(DEFAULT_CLASS, className)} style={styles} {...rest}>
      {children}
    </div>
  );
}

export default FormBody;
