import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import { useEffect } from "react";

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
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
