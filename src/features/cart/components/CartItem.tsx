import type { CartItem } from "@/@types/cart";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { updateCart } from "../CartSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export const CartItemComponent = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const user = useAppSelector((state) => state.auth.user);
  const { cart, isLoading } = useAppSelector((state) => state.cart);

  const handleUpdateCart = (increment: boolean) => {
    const changedProduct = { id: item.id, quantity: increment ? 1 : -1 };

    return [...cart!.products, changedProduct].map(({ id, quantity }) => ({
      id,
      quantity,
    }));
  };

  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-border-muted last:border-b-0"
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg border border-border-muted"
        />
        <div>
          <Link
            to={`/products/${item.id}`}
            className="font-semibold line-clamp-1"
          >
            {item.title}
          </Link>
          <p className="text-muted text-sm">
            {t("cart-page.unit-price")}: ${item.price}
          </p>
          {item.discountPercentage ? (
            <span className="inline-block text-xs text-success font-bold mt-1">
              {item.discountPercentage}% OFF
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
        <div className="flex items-center border border-border-muted rounded-lg">
          <IconButton
            size="small"
            aria-label="decrement quantity"
            disabled={isLoading}
            onClick={() =>
              item.quantity <= 1
                ? dispatch(
                    updateCart({
                      userId: user!.id,
                      products: cart!.products.filter((p) => p.id !== item.id),
                    }),
                  )
                : dispatch(
                    updateCart({
                      userId: user!.id,
                      products: handleUpdateCart(false),
                    }),
                  )
            }
          >
            {item.quantity <= 1 ? (
              <DeleteOutlineIcon fontSize="small" />
            ) : (
              <RemoveIcon fontSize="small" />
            )}
          </IconButton>
          <span className="px-3 text-sm font-medium">{item.quantity}</span>
          <IconButton
            size="small"
            aria-label="increment quantity"
            disabled={isLoading}
            onClick={() =>
              dispatch(
                updateCart({
                  userId: user!.id,
                  products: handleUpdateCart(true),
                }),
              )
            }
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>

        <div className="text-right ltr:text-right rtl:text-left">
          <p className="font-bold text-sm">
            ${(item.discountedTotal || item.total).toFixed(2)}
          </p>
        </div>

        <IconButton
          aria-label="delete item"
          color="error"
          size="small"
          disabled={isLoading}
          onClick={() =>
            dispatch(
              updateCart({
                userId: user!.id,
                products: cart!.products.filter((p) => p.id !== item.id),
              }),
            )
          }
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};
