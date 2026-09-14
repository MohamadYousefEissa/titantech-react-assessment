import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: ["Roboto", "NotoKufi", "sans-serif"].join(","),
  },
  cssVariables: { colorSchemeSelector: "class" },
});

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrCache = createCache({
  key: "mui",
});

function App() {
  const { i18n } = useTranslation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CacheProvider value={i18n.dir() === "ltr" ? ltrCache : rtlCache}>
          <RouterProvider router={router} />
          <CssBaseline />
        </CacheProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
