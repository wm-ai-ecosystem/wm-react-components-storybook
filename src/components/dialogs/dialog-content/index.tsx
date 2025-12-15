import DialogContent from "@mui/material/DialogContent";
import withBaseWrapper, { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "modal-content";

export const WmDialogContent = ({ children, sheet, sheetposition, styles }: BaseProps) => {
  return (
    <DialogContent
      className={DEFAULT_CLASS}
      style={{
        ...styles,
        ...(sheet && {
          borderRadius: 0,
        }),
        ...((sheetposition === "top" || sheetposition === "bottom") && {
          width: "var(--wm-modal-full-screen-width)",
        }),
      }}
    >
      {children}
    </DialogContent>
  );
};

export default withBaseWrapper(WmDialogContent);
