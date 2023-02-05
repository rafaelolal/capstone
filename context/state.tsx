import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ContextType = {
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>;
};

let AppContext: Context<ContextType>;

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState("");

  const sharedState = {
    unit,
    setUnit,
  };

  AppContext = createContext(sharedState);

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
