import type { Cart } from "@/@types/cart";
import { DEFAULT_ERROR_MESSAGE } from "@/data/constant";
import { api } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { logout } from "../auth/AuthSlice";

export const getUserCart = createAsyncThunk(
  "cart/get",
  async (userId: number, { rejectWithValue }) => {
    try {
      const { data } = await api.get<{ carts: Cart[] }>(
        `/carts/user/${userId}`,
      );

      return data.carts[0] || null; // just return the first cart for this demo app
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to get user cart",
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/update",
  async (
    {
      userId,
      products,
    }: { userId: number; products: { id: number; quantity: number }[] },
    { rejectWithValue },
  ) => {
    const productMap = new Map<number, { id: number; quantity: number }>();

    for (const p of products) {
      const existing = productMap.get(p.id);
      if (existing) {
        existing.quantity += p.quantity;
      } else {
        productMap.set(p.id, { id: p.id, quantity: p.quantity });
      }
    }

    const newProducts = Array.from(productMap.values());

    try {
      const { data } = await api.put<Cart>(`/carts/${userId}`, {
        userId,
        products: newProducts,
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to update cart",
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  },
);

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout, () => {
        // this clear the cart when logout
        return initialState;
      });
  },
});

// export const {} = cartSlice.actions;

export default cartSlice.reducer;
