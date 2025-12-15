import { createContext, useContext } from "react";
import BaseAppProps from "@wavemaker/react-runtime/higherOrder/BaseAppProps";

interface AppProviderProps {
  state: BaseAppProps;
  proxy: any;
}

const AppContext = createContext<AppProviderProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext)?.state;
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context || {};
};

export const useAppProxy = () => {
  const context = useContext(AppContext)?.proxy;
  if (context === undefined) {
    throw new Error("useAppProxy must be used within an AppProvider");
  }
  return context;
};

export default AppContext;
