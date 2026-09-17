import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  updateProductsCategory,
  updateProductsPage,
  updateProductsSearchValue,
} from "../ProductsSlice";
import { useTranslation } from "react-i18next";

export const ProductSearchInput = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const searchInputValue = useAppSelector(
    (state) => state.products.searchInputValue,
  );
  const [localValue, setLocalValue] = useState("");
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setTimeout(() => {
      setLocalValue(searchInputValue);
    });
  }, [searchInputValue]);

  const handleChangeValue = (ev: ChangeEvent<HTMLInputElement>) => {
    const newValue = ev.target.value;
    setLocalValue(newValue);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      dispatch(updateProductsPage(1));
      dispatch(updateProductsSearchValue(newValue));
      dispatch(updateProductsCategory(""));
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const clearInput = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLocalValue("");
    dispatch(updateProductsSearchValue(""));
  };

  return (
    <TextField
      id="search-products-input"
      aria-label="search for products"
      placeholder={t("products-page.search-input.placeholder")}
      variant="outlined"
      className="w-full"
      autoComplete="off"
      value={localValue}
      onChange={handleChangeValue}
      slotProps={{
        htmlInput: { style: { padding: "14px" } },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: localValue.length > 0 && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={clearInput}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
