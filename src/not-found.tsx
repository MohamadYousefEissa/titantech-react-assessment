import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
        <div className="relative mb-6">
          <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight select-none bg-clip-text text-transparent bg-linear-to-b from-black/10 to-primary drop-shadow-2xl">
            404
          </h1>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold mb-4 max-w-lg">
          {t("not-found.title")}
        </h2>
        <p className="text-muted text-base sm:text-lg max-w-md mb-8">
          {t("not-found.description")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Button component={Link} variant="contained" size="large" to="/">
            {t("not-found.back-home")}
          </Button>
          <Button variant="outlined" size="large" onClick={handleGoBack}>
            {t("not-found.prev-page")}
          </Button>
        </div>
      </div>
    </div>
  );
}
