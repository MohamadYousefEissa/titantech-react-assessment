import { Button, Card, Chip, Container, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "./ProductsService";
import { ApiErrorFallback } from "@/components/ErrorFallback";
import { ProductImagesCarousel } from "./components/ImagesCarousel";
import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import NumberSpinner from "./components/NumberSpinner";
import { useEffect, useState } from "react";
import CartIcon from "@mui/icons-material/ShoppingCart";
import ShipIcon from "@mui/icons-material/LocalShipping";
import ShieldIcon from "@mui/icons-material/SafetyCheck";

export default function SingleProductPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductQuery({ id });
  console.log(product);

  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product)
      setTimeout(() => {
        setQuantity(product.minimumOrderQuantity);
      });
  }, [product]);

  if (isLoading) return;

  if (isError) return <ApiErrorFallback />;

  if (!product) return;

  const priceAfterDiscount =
    product.discountPercentage &&
    product.price - (product.discountPercentage * product.price) / 100;

  const totalPrice = priceAfterDiscount
    ? priceAfterDiscount * quantity
    : product.price * quantity;

  return (
    <section className="pt-40 pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <ProductImagesCarousel slides={product.images} />

          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs tracking-widest font-medium uppercase text-primary">
                {product.brand}
              </p>
              <p
                className="text-xs text-muted font-light"
                style={{ fontFamily: "monospace, Inter, sans-serif" }}
              >
                SKU: {product.sku}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-between">
              <p className="text-2xl sm:text-3xl font-bold mt-2">
                {product.title}
              </p>

              <Chip
                label={`-${product.discountPercentage}% OFF`}
                size="small"
                color="success"
                className="font-bold"
              />
            </div>

            <div className="flex items-center mt-2 gap-2">
              <Rating name="read-only" value={product.rating} readOnly />
              <span className="text-muted">{product.rating}</span>
            </div>

            <Card variant="outlined" className="mt-6 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-end gap-2">
                    <p className="text-2xl font-bold">
                      ${priceAfterDiscount?.toFixed(2) || product.price}
                    </p>
                    {priceAfterDiscount && (
                      <p className="text-lg line-through text-muted">
                        ${product.price}
                      </p>
                    )}
                  </div>
                  {priceAfterDiscount && (
                    <p className="mt-1 text-success text-sm flex items-center gap-1 font-medium">
                      <CheckIcon style={{ fontSize: "14px" }} /> Special
                      promotion applied
                    </p>
                  )}
                </div>

                <div>
                  <Chip
                    label={product.availabilityStatus}
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                  <p className="text-xs text-muted mt-2">
                    {product.stock} items left
                  </p>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-muted">{product.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map((t) => (
                <Chip label={`#${t}`} size="small" />
              ))}
            </div>

            <hr className="my-6 text-black/10 dark:text-white/10" />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text font-bold">Quantity:</p>
              <p className="text-xs text-muted">
                Min order: {product.minimumOrderQuantity} units
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <NumberSpinner
                aria-label="quantity"
                size="small"
                min={product.minimumOrderQuantity}
                max={product.stock}
                value={quantity}
                onValueChange={(val) => val && setQuantity(val)}
              />

              <div>
                <p className="text-xs text-muted text-end">Total Price: </p>
                <p className="font-bold text-xl">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="contained" size="large" startIcon={<CartIcon />}>
                Add To Cart
              </Button>
              <Button variant="outlined" size="large">
                Buy Now{" "}
              </Button>
            </div>

            <hr className="my-6 text-black/10 dark:text-white/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted">
              <p>
                <ShipIcon fontSize="small" /> Ships in 2 weeks
              </p>
              <p>
                <ShieldIcon fontSize="small" /> 1 year warranty
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
