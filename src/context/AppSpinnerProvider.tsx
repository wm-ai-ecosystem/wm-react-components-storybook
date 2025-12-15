import React, { useContext, useState } from "react";
import AppSpinner from "@/components/common/app-spinner";

export interface DisplayOptions {
  content?: React.ReactNode;
  message?: string;
  spinner?: any;
}

export interface SpinnerService {
  show: (message: string) => any;
  hide: () => any;
}

const AppSpinnerContext = React.createContext<SpinnerService>(null as any);

const AppSpinnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [spinnerShow, setSpinnerShow] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState<string>("");

  function show(message: string) {
    setSpinnerShow(true);
    setSpinnerMessage(message);
  }

  function hide() {
    setSpinnerShow(false);
    setSpinnerMessage("");
  }

  return (
    <AppSpinnerContext.Provider value={{ show, hide }}>
      <AppSpinner show={spinnerShow} message={spinnerMessage} />
      {children}
    </AppSpinnerContext.Provider>
  );
};

export default AppSpinnerProvider;

export const useAppSpinner = () => {
  return useContext(AppSpinnerContext);
};
