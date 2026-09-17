import { ApiErrorFallback } from "@/components/ErrorFallback";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { ProductSearchInput } from "@/features/products/components/SearchInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useSearchForProductsQuery } from "@/features/products/ProductsService";
import { Button, Container } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { ProductsEmptyFallback } from "./components/EmptyFallback";
import { ProductsPagination } from "./components/Pagination";
import { ProductsCategoriesFilter } from "./components/filter/CategoriesFilter";
import FilterIcon from "@mui/icons-material/FilterAlt";
import { SortFilter } from "./components/filter/SortFilter";
import { useEffect } from "react";
import { resetFilterAndSearchValue } from "./ProductsSlice";
import ClearIcon from "@mui/icons-material/Clear";

const LIMIT = 20;

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const { page, searchInputValue, category, sort } = useAppSelector(
    (state) => state.products,
  );

  const { data, isFetching, isError, isLoading } = useSearchForProductsQuery({
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

    if (isError) return <ApiErrorFallback />;

    if (data?.products.length === 0) return <ProductsEmptyFallback />;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {data?.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  };

  return (
    <section className="pt-40 pb-20">
      <Container>
        <h1 className="text-4xl font-bold">
          <Trans
            i18n={i18n}
            i18nKey="products-page.title"
            components={{
              highlight: <span className="text-primary" />,
            }}
          />
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          {t("products-page.description")}
        </p>
        <div className="mt-8">
          <ProductSearchInput />
        </div>

        <div className="flex gap-4 items-center mt-4 overflow-x-auto scrollbar-none">
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
        </div>

        {data && (
          <p className="mt-10 font-light text-sm text-muted">
            {t("products-page.pagination-text", {
              start,
              end,
              total: data?.total,
            })}
          </p>
        )}

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
