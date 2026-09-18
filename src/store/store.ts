import { productsSlice } from "@/features/products/ProductsSlice";
import { productsApi } from "@/features/products/ProductsService";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,

    products: productsSlice.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
