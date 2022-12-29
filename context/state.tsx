import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { MyToastType } from "../types/toast";
import ToastList from "../components/toasts/toast-list";

type ToastListType = MyToastType[];
type ContextType = {
  unit: string | null;
  setUnit: Dispatch<SetStateAction<string | null>>;
  addToast: (toast: MyToastType) => void;
};

let AppContext: Context<ContextType>;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastListType>([]);

  const sharedState = {
    unit,
    setUnit,
    addToast,
  };

  AppContext = createContext(sharedState);

  function addToast(toast: MyToastType) {
    setToasts(toasts.concat([toast]));
  }

  function removeToast() {
    setToasts(toasts.slice(1, toasts.length));
  }

  return (
    <>
      {toasts && <ToastList toasts={toasts} removeToast={removeToast} />}
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
