import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetCategoriesQuery } from "@/services/products";
import { Autocomplete, Skeleton, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  updateProductsCategory,
  updateProductsPage,
  updateProductsSearchValue,
} from "../../ProductsSlice";

export const ProductsCategoriesFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const category = useAppSelector((state) => state.products.category);
  const { data, isLoading } = useGetCategoriesQuery();

  const handleChange = (val: string) => {
    dispatch(updateProductsCategory(val === "all" ? "" : val));
    dispatch(updateProductsPage(1));
    dispatch(updateProductsSearchValue(""));
  };

  if (isLoading) return <Skeleton width={200} style={{ fontSize: "45px" }} />;

  if (data)
    return (
      <Autocomplete
        disableClearable
        disablePortal
        options={["all", ...data]}
        noOptionsText={t("empty.categories.title")}
        //   @ts-expect-error No type
        getOptionLabel={(option) => t(`categories.${option}`)}
        size="small"
        value={category || "all"}
        onChange={(_, newValue) => {
          handleChange(newValue);
        }}
        className={`flex-1 max-w-40 min-w-40 ${category ? "border border-primary rounded-xl" : ""}`}
        renderInput={(params) => (
          <TextField {...params} aria-label="categories" />
        )}
      />
    );
};
