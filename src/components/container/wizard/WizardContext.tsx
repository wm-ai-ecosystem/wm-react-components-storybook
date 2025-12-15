import { createContext, useContext } from "react";
import { WizardContextType } from "./props";

const WizardContext = createContext<WizardContextType | null>(null);

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizardContext must be used within a WizardProvider");
  }
  return context;
};
export default WizardContext;
