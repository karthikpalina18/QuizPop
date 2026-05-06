/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("qp-theme") || "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light", "eco");
    if (theme === "dark") root.classList.add("dark");
    if (theme === "eco") root.classList.add("eco");
    localStorage.setItem("qp-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);