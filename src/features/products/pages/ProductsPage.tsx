import { ApiErrorFallback } from "@/components/ErrorFallback";
import {
  ProductCard,
  ProductCardSkeleton,
} from "@/features/products/components/ProductCard";
import { ProductSearchInput } from "@/features/products/components/SearchInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useSearchForProductsQuery } from "@/features/products/ProductsService";
import { Button, Container } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { EmptyFallback } from "../../../components/EmptyFallback";
import { ProductsPagination } from "../components/Pagination";
import { ProductsCategoriesFilter } from "../components/filter/CategoriesFilter";
import FilterIcon from "@mui/icons-material/FilterAlt";
import { SortFilter } from "../components/filter/SortFilter";
import { useEffect } from "react";
import { resetFilterAndSearchValue } from "../ProductsSlice";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "motion/react";
import { parentVariants, variants } from "@/utils/motion";

const LIMIT = 20;

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const { page, searchInputValue, category, sort } = useAppSelector(
    (state) => state.products,
  );

  const { data, isFetching, isError, isLoading, refetch } =
    useSearchForProductsQuery({
      search: searchInputValue,
      limit: LIMIT,
      skip: page > 1 ? (page - 1) * LIMIT : undefined,
      category,
      sort,
    });

  const start = data && (data.total === 0 ? 0 : data.skip + 1);
  const end = data && Math.min(data.skip + data.limit, data.total);

  useEffect(() => {
    // reset store values on unmount
    return () => {
      dispatch(resetFilterAndSearchValue());
    };
  }, [dispatch]);

  const content = () => {
    if (isFetching)
      return (
        <div className="py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      );

    if (isError)
      return (
        <div className="mt-10">
          <ApiErrorFallback refetch={refetch} />
        </div>
      );

    if (data?.products.length === 0)
      return (
        <EmptyFallback
          title={t("empty.products.title")}
          description={t("empty.products.description")}
        />
      );
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {data?.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  };

  return (
    <section className="pt-30 sm:pt-40 pb-10">
      <title>{t("meta.withTitle", { text: t("header.links.products") })}</title>
      <meta name="description" content={t("products-page.description")} />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={parentVariants}
        >
          <motion.h1
            variants={variants}
            className="text-3xl sm:text-4xl font-bold"
          >
            <Trans
              i18n={i18n}
              i18nKey="products-page.title"
              components={{
                highlight: <span className="text-primary" />,
              }}
            />
          </motion.h1>
          <motion.p
            variants={variants}
            className="mt-4 max-w-2xl sm:text-lg text-muted"
          >
            {t("products-page.description")}
          </motion.p>
          <motion.div variants={variants} className="mt-8">
            <ProductSearchInput />
          </motion.div>

          <motion.div
            variants={variants}
            className="flex gap-4 items-center mt-4 overflow-x-auto scrollbar-none"
          >
            <p className="text-sm font-light text-muted text-nowrap">
              <FilterIcon style={{ fontSize: "16px" }} />{" "}
              {t("products-page.filters")}:
            </p>
            <ProductsCategoriesFilter />
            <SortFilter isLoading={isLoading} />
            {(searchInputValue.length > 0 || category || sort !== "newest") && (
              <Button
                startIcon={<ClearIcon style={{ fontSize: "16px" }} />}
                onClick={() => dispatch(resetFilterAndSearchValue())}
              >
                {t("products-page.clear")}
              </Button>
            )}
          </motion.div>

          {data && (
            <motion.p
              variants={variants}
              className="mt-10 font-light text-sm text-muted"
            >
              {t("products-page.pagination-text", {
                start,
                end,
                total: data?.total,
              })}
            </motion.p>
          )}
        </motion.div>

        {content()}

        {data && data.total > LIMIT && (
          <div className="mt-10 flex justify-center">
            <ProductsPagination count={Math.ceil(data.total / LIMIT)} />
          </div>
        )}
      </Container>
    </section>
  );
}
