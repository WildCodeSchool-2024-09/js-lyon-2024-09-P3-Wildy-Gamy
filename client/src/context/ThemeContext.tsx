import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface ThemeContextValue {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
export function ThemeProvider({ children }: ContextProviderProps) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (value == null) {
    throw new Error("useTheme has to be used within <ThemeProvider>");
  }
  return value;
};
