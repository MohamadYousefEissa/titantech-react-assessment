import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProductSort = "oldest" | "newest" | "asc" | "desc";

interface CounterState {
  searchInputValue: string;
  page: number;
  category: string;
  sort: ProductSort;
}

const initialState: CounterState = {
  searchInputValue: "",
  page: 1,
  category: "",
  sort: "newest",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsSearchValue: (state, action: PayloadAction<string>) => {
      state.searchInputValue = action.payload;
    },
    updateProductsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateProductsCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    updateProductsSort: (state, action: PayloadAction<ProductSort>) => {
      state.sort = action.payload;
    },
    resetFilterAndSearchValue: (state) => {
      state.page = 1;
      state.searchInputValue = "";
      state.category = "";
      state.sort = "newest";
    },
  },
});

export const {
  updateProductsSearchValue,
  updateProductsPage,
  updateProductsCategory,
  updateProductsSort,
  resetFilterAndSearchValue,
} = productsSlice.actions;

export default productsSlice.reducer;
