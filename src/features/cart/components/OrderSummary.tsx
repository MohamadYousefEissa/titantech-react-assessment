import type { Cart } from "@/@types/cart";
import { Divider, Card, CardContent, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const OrderSummary = ({ cart }: { cart: Cart }) => {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" className="border-border-muted">
      <CardContent className="space-y-4">
        <p className="font-bold text-xl">{t("cart-page.order-summary")}</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t("cart-page.total-products")}</span>
            <span className="font-medium">{cart.products.length}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("cart-page.total-quantity")}</span>
            <span className="font-medium">{cart.totalQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span>{t("cart-page.subtotal")}</span>
            <span className="font-medium">${cart.total.toFixed(2)}</span>
          </div>
          {cart.total > cart.discountedTotal && (
            <div className="flex justify-between text-success font-medium">
              <span>{t("cart-page.discount-savings")}</span>
              <span>
                -$
                {(cart.total - cart.discountedTotal).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <Divider className="my-2" />

        <div className="flex justify-between items-center text-lg font-bold mt-2">
          <span>{t("cart-page.total")}</span>
          <span>${cart.discountedTotal.toFixed(2)}</span>
        </div>

        <Button variant="contained" size="large" className="w-full">
          {t("cart-page.proceed")}
        </Button>
      </CardContent>
    </Card>
  );
};
