import { createContext, useEffect, useState, type ReactNode } from "react";

export type Gender = "male" | "female" | "";

interface PreferenceState {
  hasSetPreference: boolean;
  gender: Gender;
}

interface PreferenceContextType {
  data: PreferenceState;
  setData: React.Dispatch<React.SetStateAction<PreferenceState>>;
}

const initialData: PreferenceState = {
  hasSetPreference: false,
  gender: "",
};

// eslint-disable-next-line react-refresh/only-export-components
export const PreferenceContext = createContext<PreferenceContextType>({
  data: initialData,
  setData: () => {},
});

export const PreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PreferenceState>(initialData);

  useEffect(() => {
    const gender = localStorage.getItem("userGender") || "";
    const hasSetPreference = Boolean(localStorage.getItem("hasSetPreference"));

    setTimeout(() => {
      setData({ hasSetPreference, gender: gender as Gender });
    });
  }, []);

  return (
    <PreferenceContext.Provider value={{ data, setData }}>
      {children}
    </PreferenceContext.Provider>
  );
};
