import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Pagination, PaginationItem } from "@mui/material";
import { updateProductsPage } from "../ProductsSlice";
import { useTranslation } from "react-i18next";

export const ProductsPagination = ({ count }: { count: number }) => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const page = useAppSelector((state) => state.products.page);

  const handleChange = (val: number) => {
    dispatch(updateProductsPage(val));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <Pagination
      showFirstButton
      showLastButton
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          className={
            item.type === "first" || item.type === "last"
              ? "max-sm:hidden!"
              : ""
          }
          slotProps={
            i18n.dir() === "rtl"
              ? {
                  next: { style: { rotate: "180deg" } },
                  previous: { style: { rotate: "180deg" } },
                  first: { style: { rotate: "180deg" } },
                  last: { style: { rotate: "180deg" } },
                }
              : undefined
          }
          {...item}
        />
      )}
      count={count}
      page={page}
      onChange={(_, val) => handleChange(val)}
    />
  );
};
