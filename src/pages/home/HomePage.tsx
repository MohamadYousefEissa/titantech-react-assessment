import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { HomeHeroSection } from "./HeroSection";
import { useGetProductsByCategoryQuery } from "@/services/products";
import { PreferenceDialog } from "@/components/PreferenceDialog";
import { useContext } from "react";
import { PreferenceContext } from "@/contexts/preference-context";
import { HomeCategorySection } from "./CategorySection";

const slugs = {
  male: ["mens-watches", "mens-shirts", "mens-shoes"],
  female: ["womens-jewellery", "kitchen-accessories", "womens-bags"],
} as const;

export default function HomePage() {
  const { t } = useTranslation();
  const { data } = useContext(PreferenceContext);

  const response_1 = useGetProductsByCategoryQuery({
    slug: data.gender ? slugs[data.gender][0] : "fragrances",
    limit: 6,
  });

  const response_2 = useGetProductsByCategoryQuery({
    slug: data.gender ? slugs[data.gender][1] : slugs.male[0],
    limit: 6,
  });

  const response_3 = useGetProductsByCategoryQuery({
    slug: data.gender ? slugs[data.gender][2] : slugs.female[0],
    limit: 6,
  });

  return (
    <>
      <PreferenceDialog />
      <HomeHeroSection />

      <section
        id="categories"
        className="py-20 scroll-m-10  bg-background-secondary"
      >
        <Container>
          <p className="text-3xl font-bold">
            {t("home.categories-section.title")}
          </p>

          <HomeCategorySection
            isLoading={response_1.isLoading}
            isError={response_1.isError}
            slug={response_1.originalArgs?.slug}
            products={response_1.data?.products || []}
          />
          <HomeCategorySection
            isLoading={response_2.isLoading}
            isError={response_2.isError}
            slug={response_2.originalArgs?.slug}
            products={response_2.data?.products || []}
          />
          <HomeCategorySection
            isLoading={response_3.isLoading}
            isError={response_3.isError}
            slug={response_3.originalArgs?.slug}
            products={response_3.data?.products || []}
          />
        </Container>
      </section>
    </>
  );
}
