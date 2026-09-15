import type { Product } from "@/@types/product";
import { Button, Card, Rating, Skeleton } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import RightIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProductCard = ({
  product,
  variant = "outlined",
}: {
  product: Product;
  variant?: "outlined" | "elevation";
}) => {
  const { t } = useTranslation();

  return (
    <Card variant={variant} className="flex flex-col">
      <Link to={`/products/${product.id}`} className="group">
        <div className="flex justify-center border-b border-black/10 dark:border-white/10 overflow-clip">
          <img
            src={product.thumbnail}
            alt={`${product.title} image`}
            width={200}
            className="group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-medium text-lg">{product.title}</p>
        <p className="mt-2 text-muted line-clamp-3">{product.description}</p>

        <div className="flex items-center mt-2 gap-2">
          <Rating name="read-only" value={product.rating} readOnly />
          <span className="text-xs text-text-disabled mt-0.5">
            ({product.reviews.length})
          </span>
        </div>

        <div className="flex items-center justify-between pt-5 mt-auto">
          <Button variant="text" startIcon={<CartIcon />}>
            {t("product-card.add-to-cart")}
          </Button>

          <Button
            component={Link}
            to={`/products/${product.id}`}
            variant="text"
            className="group"
            endIcon={
              <RightIcon
                style={{ fontSize: "16px" }}
                className="ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform! duration-200 rtl:rotate-180"
              />
            }
          >
            {t("product-card.view-btn")}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rounded" className="w-full" height={200} />
      <div className="mt-4">
        <Skeleton variant="text" sx={{ fontSize: "20px" }} className="w-40" />
        <div className="mt-2 flex flex-col gap-1">
          <Skeleton
            variant="text"
            sx={{ fontSize: "12px" }}
            className="w-[90%]"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "12px" }}
            className="w-[80%]"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "12px" }}
            className="w-[50%]"
          />
        </div>
        <div className="mt-5 flex justify-between">
          <Skeleton variant="rounded" className="w-20" height={34} />
          <Skeleton variant="rounded" className="w-20" height={34} />
        </div>
      </div>
    </div>
  );
};
