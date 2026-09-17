import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { MenuItem, Select, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { updateProductsSort } from "../../ProductsSlice";

const SORTS = ["newest", "oldest", "asc", "desc"] as const;

export const SortFilter = ({ isLoading }: { isLoading: boolean }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const sort = useAppSelector((state) => state.products.sort);

  if (isLoading)
    return (
      <Skeleton variant="rounded" className="w-34" sx={{ height: "40px" }} />
    );

  return (
    <Select
      aria-label="filter by sort"
      value={sort}
      size="small"
      onChange={(ev) => dispatch(updateProductsSort(ev.target.value))}
      className={`flex-1 max-w-34 min-w-34  ${sort !== "newest" ? "border border-primary" : ""}`}
    >
      {SORTS.map((s) => (
        <MenuItem key={s} value={s}>
          {t(`products-page.sort.${s}`)}
        </MenuItem>
      ))}
    </Select>
  );
};
