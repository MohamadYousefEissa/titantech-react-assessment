import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { PreferenceProvider } from "./contexts/preference-context";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

export default function Providers({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <Provider store={store}>
      <PreferenceProvider>
        <CacheProvider value={i18n.dir() === "ltr" ? ltrCache : rtlCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </PreferenceProvider>
    </Provider>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  cssVariables: { colorSchemeSelector: "class" },

  typography: {
    fontFamily: ["Roboto", "NotoKufi", "sans-serif"].join(","),
    button: {
      textTransform: "none", // Remove all-caps text on buttons
      fontWeight: 400,
    },
    allVariants: { borderRadius: "8px" },
  },

  shape: { borderRadius: "12px" },

  components: {
    MuiAutocomplete: {
      styleOverrides: {
        listbox: { display: "grid", gap: "3px", padding: "6px" },
        option: {
          borderRadius: "8px",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        classes: { paper: "dark:bg-black!" },
      },
      styleOverrides: {
        list: {
          display: "flex",
          flexDirection: "column",
          padding: "6px",
          gap: "3px",
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        classes: { paper: "dark:bg-black!" },
      },
    },
  },
});
