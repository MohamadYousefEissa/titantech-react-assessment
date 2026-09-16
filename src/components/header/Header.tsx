import ThemeSwitcher from "./ThemeSwitcher";
import { Button, Container, useColorScheme } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/merge-classes";

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const rafId = useRef<number>(null);

  const LINKS = [
    { label: t("header.links.home"), to: "/" },
    { label: t("header.links.products"), to: "/products" },
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

  return (
    <header className="fixed w-full top-0 left-0 z-10 mui-fixed">
      <nav
        className={cn(
          "bg-background-default/50 backdrop-blur-md  border-black/10 dark:border-white/10 transition-[padding] duration-300",
          isScrolled ? "border-b py-3" : "py-6",
        )}
      >
        <Container>
          <div className="grid grid-cols-3 items-center">
            <div className="text-2xl font-bold">
              <Link to="/">E-commerce</Link>
            </div>

            <ul className="flex items-center gap-4 justify-self-center">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Button
                    component={Link}
                    to={l.to}
                    color="inherit"
                    variant="text"
                    className={isScrolled ? "" : "font-medium!"}
                  >
                    {l.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-self-end">
              <ThemeSwitcher />
              <LanguageSelector />

              <span className="ltr:ml-4 rtl:mr-4">
                <Button
                  component={Link}
                  to="/login"
                  variant={colorScheme === "light" ? "contained" : "outlined"}
                  endIcon={<LoginIcon className="rtl:rotate-180" />}
                >
                  {t("header.login")}
                </Button>
              </span>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
