import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HomeHeroSection } from "./components/HeroSection";
import { PreferenceDialog } from "@/components/PreferenceDialog";
import { useContext } from "react";
import { PreferenceContext } from "@/contexts/preference-context";
import { HomeCategorySection } from "./components/CategorySection";

const SLUGS = {
  male: ["mens-watches", "mens-shirts", "mens-shoes"],
  female: ["womens-jewellery", "kitchen-accessories", "womens-bags"],
  default: ["fragrances", "mens-watches", "womens-jewellery"],
} as const;

export default function HomePage() {
  const { t } = useTranslation();
  const { data } = useContext(PreferenceContext);

  const activeSlugs =
    data.gender && SLUGS[data.gender] ? SLUGS[data.gender] : SLUGS.default;

  return (
    <>
      <PreferenceDialog />
      <HomeHeroSection />

      <section id="categories" className="scroll-mt-10">
        <div className="bg-background-secondary pt-20">
          <Container>
            <p className="text-3xl font-bold">
              {t("home.categories-section.title")}
            </p>
          </Container>
        </div>

        {activeSlugs.map((slug, i) => (
          <section
            id={slug}
            key={slug}
            className={`py-20 ${
              i % 2 === 0 ? "bg-background-secondary" : "bg-background-paper"
            }`}
          >
            <Container>
              <HomeCategorySection slug={slug} />
            </Container>
          </section>
        ))}
      </section>
    </>
  );
}
