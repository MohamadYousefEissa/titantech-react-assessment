import { useAppSelector } from "@/hooks/redux";
import { Container, Paper } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { EmptyFallback } from "@/components/EmptyFallback";
import { useTranslation } from "react-i18next";
import { CartItemComponent } from "./components/CartItem";
import { OrderSummary } from "./components/OrderSummary";

export default function CartView() {
  const { t } = useTranslation();

  const cart = useAppSelector((state) => state.cart.cart);

  if (!cart) return;

  if (cart.products.length === 0)
    return (
      <div className="h-dvh flex items-center justify-center">
        <EmptyFallback
          title={t("empty.cart.title")}
          description={t("empty.cart.description")}
          Icon={<ShoppingBagOutlinedIcon style={{ fontSize: "50px" }} />}
        />
      </div>
    );

  return (
    <section className="pt-30 sm:pt-40 pb-10">
      <Container>
        <p className="font-bold text-3xl mb-2">{t("cart-page.title")}</p>

        <div className="space-y-6">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-border-muted">
            {cart.totalQuantity} {t("cart-page.items")}
          </span>

          <Paper variant="outlined" className="p-6 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.products.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>

              <div className="lg:col-span-1">
                <OrderSummary cart={cart} />
              </div>
            </div>
          </Paper>
        </div>
      </Container>
    </section>
  );
}
