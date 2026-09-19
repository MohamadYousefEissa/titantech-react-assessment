import ThemeSwitcher from "./ThemeSwitcher";
import { Button, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/merge-classes";
import { LogButton } from "./LogButton";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppSelector } from "@/hooks/redux";
import LogoImg from "@/assets/images/shopware-logo.svg";

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.auth.user);

  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafId = useRef<number>(null);

  const LINKS = [
    { label: t("header.links.home"), to: "/" },
    { label: t("header.links.products"), to: "/products" },
    { label: t("header.links.users"), to: "/users", requireAuth: true },
  ];

  const handleScroll = useCallback(() => {
    // Skip if animation frame is already scheduled
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      const hasScrolled = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled(hasScrolled);
      rafId.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileNavOpened(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMobileNavOpened)
      document.body.classList.add("max-lg:overflow-hidden");
    else document.body.classList.remove("max-lg:overflow-hidden");
    return () => {
      document.body.classList.remove("max-lg:overflow-hidden");
    };
  }, [isMobileNavOpened]);

  return (
    <header className="fixed w-full top-0 left-0 z-10 mui-fixed">
      <nav
        className={cn(
          "bg-background-default lg:bg-background-default/50 lg:backdrop-blur-md  border-b transition-[padding] duration-300",
          isScrolled ? "border-border-muted py-3" : "border-transparent py-6",
        )}
      >
        <Container>
          <div className="flex lg:grid justify-between grid-cols-3 items-center">
            <div className="text-xl font-bold">
              <Link to="/">
                <img src={LogoImg} alt="logo" className="w-30 sm:w-40" />
              </Link>
            </div>

            <ul
              className={cn(
                "flex flex-col lg:flex-row items-center gap-4 justify-self-center left-0",
                "max-lg:bg-background-default max-lg:w-full max-lg:fixed transition-[visibility,opacity,translate] duration-200 max-lg:p-2",
                isMobileNavOpened
                  ? ""
                  : "max-lg:invisible max-lg:opacity-0 max-lg:ltr:-translate-x-20 max-lg:rtl:translate-x-20",
                isScrolled
                  ? "top-[64px] max-lg:h-[calc(100dvh-64px)]"
                  : "top-[88px] max-lg:h-[calc(100dvh-88px)]",
              )}
            >
              {LINKS.map((l) =>
                !user && l.requireAuth ? null : (
                  <li key={l.label} className="w-full">
                    <Button
                      fullWidth
                      component={Link}
                      to={l.to}
                      color="inherit"
                      variant="text"
                      onClick={() => setIsMobileNavOpened(false)}
                      className={cn(
                        isScrolled ? "" : "lg:font-medium!",
                        "max-lg:text-lg! max-lg:py-5! max-lg:font-medium!",
                      )}
                    >
                      {l.label}
                    </Button>
                  </li>
                ),
              )}
            </ul>

            <div className="lg:hidden flex items-center">
              <ThemeSwitcher />
              <LanguageSelector />
              <IconButton
                color="inherit"
                onClick={() => setIsMobileNavOpened((prev) => !prev)}
              >
                {isMobileNavOpened ? <ClearIcon /> : <MenuIcon />}
              </IconButton>
            </div>

            <div className="max-lg:hidden flex items-center justify-self-end">
              <ThemeSwitcher />
              <LanguageSelector />

              <span className="ltr:ml-4 rtl:mr-4">
                <LogButton />
              </span>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
