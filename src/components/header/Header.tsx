import ThemeSwitcher from "./ThemeSwitcher";
import { Button, Container, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";

export default function Header() {
  const { t } = useTranslation();

  const LINKS = [
    { label: t("header.links.home"), to: "/" },
    { label: t("header.links.products"), to: "/products" },
  ];

  return (
    <header className="sticky left-0 top-0">
      <nav className="bg-background-default/60 backdrop-blur-md border-b border-black/10 dark:border-white/10 p-2.5">
        <Container>
          <div className="grid grid-cols-3 items-center">
            <div className="text-2xl font-bold">
              <Link to="/">LOGO</Link>
            </div>

            <ul className="flex items-center gap-4 justify-self-center">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Button
                    component={Link}
                    to={l.to}
                    color="inherit"
                    variant="text"
                    style={{ textTransform: "none" }}
                  >
                    {l.label}
                  </Button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 justify-self-end">
              <LanguageSelector />

              <ThemeSwitcher />

              <Link to="/products">
                <IconButton color="inherit">
                  <LoginIcon />
                </IconButton>
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
