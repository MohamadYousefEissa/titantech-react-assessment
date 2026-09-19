import type { Product } from "@/@types/product";
import { Button, Card, Chip, Rating, Skeleton } from "@mui/material";
import CartIcon from "@mui/icons-material/ShoppingCart";
import RightIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/redux";

export const ProductCard = ({
  product,
  variant = "outlined",
}: {
  product: Product;
  variant?: "outlined" | "elevation";
}) => {
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.auth.user);

  const priceAfterDiscount =
    product.discountPercentage &&
    product.price - (product.discountPercentage * product.price) / 100;

  return (
    <Card variant={variant} className="flex flex-col">
      <Link to={`/products/${product.id}`} className="group">
        <div className="flex justify-center border-b border-border-muted overflow-clip relative">
          <img
            loading="lazy"
            src={product.thumbnail}
            alt={`${product.title} image`}
            width={200}
            height={200}
            className="group-hover:scale-105 transition-transform duration-200"
          />

          {product.discountPercentage && (
            <Chip
              label={`-${product.discountPercentage}% ${t("single-product-page.off")}`}
              size="small"
              variant="outlined"
              color="warning"
              className="font-bold text-sm absolute top-4 ltr:left-4 rtl:right-4"
              sx={{ fontSize: "12px" }}
            />
          )}
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs tracking-widest font-medium uppercase text-primary">
          {product.brand}
        </p>
        <p className="font-medium text-lg mt-2">{product.title}</p>
        <p className="mt-2 text-muted line-clamp-3">{product.description}</p>

        <div className="flex items-center mt-2 gap-1">
          <Rating name="read-only" value={product.rating} readOnly />
          <span className="text-xs text-muted mt-0.5">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <p className="text-lg text-success font-bold">
            ${priceAfterDiscount?.toFixed(2) || product.price}
          </p>
          {priceAfterDiscount && (
            <p className="line-through text-muted">${product.price}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-5 mt-auto">
          {user && product.availabilityStatus !== "Out of Stock" ? (
            <Button variant="text" startIcon={<CartIcon />}>
              {t("product-card.add-to-cart")}
            </Button>
          ) : (
            <span />
          )}
          <Button
            aria-label="show product details"
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
