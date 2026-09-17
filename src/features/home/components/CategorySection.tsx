import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Skeleton } from "@mui/material";
import { ApiErrorFallback } from "@/components/ErrorFallback";
import { useGetProductsByCategoryQuery } from "@/features/products/ProductsService";
import { useTranslation } from "react-i18next";
import { ProductsEmptyFallback } from "@/features/products/components/EmptyFallback";

export const HomeCategorySection = ({ slug }: { slug: string }) => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetProductsByCategoryQuery({
    slug,
    limit: 6,
  });

  if (isLoading)
    return (
      <div className="py-10">
        <Skeleton variant="text" sx={{ fontSize: "20px" }} className="w-60" />
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
    <>
      <p className="text-xl font-bold uppercase w-fit">
        {/* @ts-expect-error No type defined for slug */}
        {t(`categories.${slug}`)}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {data?.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};
