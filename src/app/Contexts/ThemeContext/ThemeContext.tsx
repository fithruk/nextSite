"use client";
import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../../../theme/theme";

const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: "light",
});

type ThemeProviderType = {
  children: React.ReactNode;
};

type ModeTypes = "light" | "dark";

const useThemeMode = () => useContext(ThemeModeContext);

const ThemeProvider = ({ children }: ThemeProviderType) => {
  const [mode, setMode] = useState<ModeTypes>("light");
  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export { ThemeProvider, useThemeMode };
