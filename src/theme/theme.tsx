"use client";
import "@mui/material/styles";
import { createTheme } from "@mui/material";

//  --background-primary: #ffffff;
//   --background-secondary: #F4F9FD
//   --main-font-color: #0a1629;
//   --yellow: #FFBD21;
//   --pink: #DE92EB;
//   --blue: #3F8CFF;
//   --purple:#6D5DD3;

const COLORS = {
  backgroundPrimary: "#ffffff",
  backgroundSecondary: "#F4F9FD",
  mainFontColor: "#0a1629",
  yellow: "#FFBD21",
  pink: "#DE92EB",
  blue: "#3F8CFF",
  purple: "#6D5DD3",
  red: "#F65160",
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: COLORS.backgroundPrimary,
    },
    secondary: {
      main: COLORS.backgroundSecondary,
    },
    yellow: {
      main: COLORS.yellow,
    },
    pink: {
      main: COLORS.pink,
    },
    blue: {
      main: COLORS.blue,
    },
    purple: {
      main: COLORS.purple,
    },
    errorRed: {
      main: COLORS.red,
    },
  },
  typography: {
    fontFamily: "var(--main-font), Arial, sans-serif",
  },
  cssVariables: true,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.backgroundSecondary,
    },
    secondary: {
      main: COLORS.backgroundPrimary,
    },
    yellow: {
      main: COLORS.yellow,
    },
    pink: {
      main: COLORS.pink,
    },
    blue: {
      main: COLORS.blue,
    },
    purple: {
      main: COLORS.purple,
    },
    errorRed: {
      main: COLORS.red,
    },
  },
  typography: {
    fontFamily: "var(--main-font), Arial, sans-serif",
  },
  cssVariables: true,
});

declare module "@mui/material/styles" {
  interface Palette {
    yellow: Palette["primary"];
    pink: Palette["primary"];
    blue: Palette["primary"];
    purple: Palette["primary"];
    errorRed: Palette["primary"];
  }

  interface PaletteOptions {
    yellow?: PaletteOptions["primary"];
    pink?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
    purple?: PaletteOptions["primary"];
    errorRed?: PaletteOptions["primary"];
  }
}

export { lightTheme, darkTheme };
