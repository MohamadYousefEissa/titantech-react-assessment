import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useColorScheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "./hooks/redux";
import { checkUserAuth } from "./features/auth/AuthSlice";

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Check if we should restore scroll position
    if (state && state.scrollPosition) {
      window.scrollTo(0, state.scrollPosition);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, state]);

  return null;
};

export default function Root() {
  const { colorScheme } = useColorScheme();
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    dispatch(checkUserAuth()).then(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return;

  return (
    <>
      <ScrollToTop />
      <ToastContainer
        theme={colorScheme}
        hideProgressBar
        draggable
        rtl={isRTL}
        position={isRTL ? "bottom-left" : "bottom-right"}
        toastClassName="border border-border-muted text-black! dark:text-white! rounded-xl!"
      />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
