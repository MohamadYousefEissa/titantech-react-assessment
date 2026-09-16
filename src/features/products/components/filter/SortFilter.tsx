import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { updateProductsSort } from "../../ProductsSlice";

const SORTS = ["oldest", "newest", "asc", "desc"] as const;

export const SortFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const sort = useAppSelector((state) => state.products.sort);

  return (
    <Select
      id="sort-filter"
      value={sort}
      size="small"
      onChange={(ev) => dispatch(updateProductsSort(ev.target.value))}
      className={`flex-1 max-w-34 min-w-34  ${sort !== "oldest" ? "border border-primary" : ""}`}
    >
      {SORTS.map((s) => (
        <MenuItem key={s} value={s}>
          {t(`products-page.sort.${s}`)}
        </MenuItem>
      ))}
    </Select>
  );
};
