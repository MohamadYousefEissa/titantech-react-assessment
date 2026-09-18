import type { Product } from "@/@types/product";
import { Rating, Tabs, Tab, Box, Avatar, Badge } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const SingleProductDetailsTabs = ({ product }: { product: Product }) => {
  const { i18n, t } = useTranslation();

  const [tabValue, setTabValue] = useState(0);

  const specifications = [
    {
      label: t("single-product-page.tabs.brand"),
      value: product.brand,
    },
    {
      label: t("single-product-page.sku"),
      value: product.sku,
      valueClassName: "font-mono",
    },
    {
      label: t("single-product-page.tabs.weight"),
      value: `${product.weight} ${t("single-product-page.tabs.kg")}`,
    },
    {
      label: t("single-product-page.tabs.dimensions"),
      value: `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} ${t("single-product-page.tabs.cm")}`,
    },
  ];

  return (
    <section className="mt-10">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={(_, val) => setTabValue(val)}
          aria-label="Product detail tabs"
          variant="scrollable"
        >
          <Tab
            label={t("single-product-page.tabs.technical")}
            id="product-tab-0"
          />
          <Tab
            iconPosition="end"
            icon={
              <Badge
                badgeContent={product.reviews.length}
                color="primary"
                className="ltr:ml-4! rtl:mr-4!"
              />
            }
            label={t("single-product-page.tabs.reviews")}
            id="product-tab-1"
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={tabValue} index={0}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 rounded-xl border border-border-muted space-y-3">
            {specifications.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between items-center text-sm py-1 border-b last:border-0 border-border-muted"
              >
                <span className="font-medium">{spec.label}</span>
                <span className={`font-semibold ${spec.valueClassName || ""}`}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl border border-border-muted flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-medium  uppercase tracking-wide">
                {t("single-product-page.tabs.barcode.title")}
              </p>
              <p className="text-lg font-mono font-bold tracking-wider">
                {product.meta.barcode}
              </p>
              <p className="text-xs ">
                {t("single-product-page.tabs.barcode.description")}
              </p>
            </div>
            <div className="p-2 bg-white rounded-lg border border-black/10 dark:border-0 shadow-sm shrink-0">
              <img
                src={product.meta.qrCode}
                alt="Product QR Code"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border-muted text-xs  space-y-1">
            <div className="flex justify-between">
              <span>{t("single-product-page.tabs.created-date")}:</span>
              <span className="font-medium">
                {formatDate(product.meta.createdAt, i18n.language)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t("single-product-page.tabs.last-update")}:</span>
              <span className="font-medium">
                {formatDate(product.meta.updatedAt, i18n.language)}
              </span>
            </div>
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} index={1}>
        {/* Individual Review Cards */}
        <div className="grid grid-cols-1 gap-4">
          {product.reviews.map((review, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-border-muted space-y-3"
            >
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    sx={{
                      bgcolor: stringToColor(review.reviewerName),
                      width: 38,
                      height: 38,
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    {review.reviewerName.charAt(0)}
                  </Avatar>
                  <div>
                    <h6 className="text-sm font-bold">{review.reviewerName}</h6>
                    <span className="text-xs ">{review.reviewerEmail}</span>
                  </div>
                </div>

                <span className="text-xs font-medium">
                  {formatDate(review.date, i18n.language)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Rating value={review.rating} readOnly size="small" />
                <span className="text-xs font-medium text-muted">
                  ({review.rating.toFixed(1)})
                </span>
              </div>

              <p className="text-sm leading-relaxed italic">{review.comment}</p>
            </div>
          ))}
        </div>
      </CustomTabPanel>
    </section>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      tabIndex={0}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box className="pt-6">{children}</Box>}
    </div>
  );
}

function formatDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function stringToColor(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}
