import { Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { parentVariants, variants } from "@/utils/motion";

export const HomeHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="h-dvh flex items-center gap-10 max-sm:mt-10">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={parentVariants}
        >
          <motion.h1
            variants={variants}
            className="text-5xl sm:text-6xl leading-tight font-bold"
          >
            <span className="block">{t("home.hero.everything")}</span>
            <span className="block text-primary">
              {t("home.hero.delivered")}
            </span>
          </motion.h1>

          <motion.p
            variants={variants}
            className="text-lg max-w-xl mt-5 text-muted"
          >
            {t("home.hero.description")}
          </motion.p>

          <motion.div
            variants={variants}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
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
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
