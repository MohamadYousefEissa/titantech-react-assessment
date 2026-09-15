import type { Product } from "@/@types/product";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Skeleton } from "@mui/material";
import GridIcon from "@mui/icons-material/GridOff";
import { ApiErrorFallback } from "@/components/ErrorFallback";

export const HomeCategorySection = ({
  slug = "",
  products,
  isLoading,
  isError,
}: {
  slug: string | undefined;
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}) => {
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

  if (products.length === 0)
    return (
      <div className="py-10 h-[40vh] flex flex-col gap-4 justify-center items-center">
        <GridIcon fontSize="large" />
        <p className="text-xl font-medium">No Products</p>
      </div>
    );

  if (isError) return <ApiErrorFallback />;

  return (
    <section id={slug} className="py-10">
      <p className="text-xl font-bold mt-10 border-b-4 uppercase border-primary border-dotted w-fit">
        {slug.replaceAll("-", " ")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
