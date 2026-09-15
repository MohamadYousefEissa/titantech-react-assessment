import { Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import HeroImage from "@/assets/images/";

export const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="h-dvh flex items-center gap-10">
      <Container>
        <div>
          <h1 className="text-5xl sm:text-6xl leading-tight font-bold">
            <span className="block">{t("home.hero.everything")}</span>
            <span className="block text-primary">
              {t("home.hero.delivered")}
            </span>
          </h1>

          <p className="text-lg max-w-xl mt-5 text-muted">
            {t("home.hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
            >
              {t("home.hero.view-products-btn")}
            </Button>
            <Button variant="outlined" size="large" href="#categories">
              {t("home.hero.browse-btn")}
            </Button>
          </div>
        </div>
        <div className="flex-1">{/* <img src={HeroImage} alt="" /> */}</div>
      </Container>
    </section>
  );
};
