/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Root from "@/Root";
import NotFoundPage from "@/not-found";
import { AuthMiddleware } from "@/middlewares/Auth";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const ProductsPage = lazy(
  () => import("@/features/products/pages/ProductsPage"),
);
const SingleProductPage = lazy(
  () =>
    import("@/features/products/pages/single-product-page/SingleProductPage"),
);
const LoginPage = lazy(() => import("@/features/auth/LoginPage"));
const UsersPage = lazy(() => import("@/features/users/pages/UsersPage"));
const SingleUserPage = lazy(
  () => import("@/features/users/pages/SingleUserPage"),
);
const CartPage = lazy(() => import("@/features/cart/CartPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <SingleProductPage /> },
      { path: "/login", element: <LoginPage /> },

      {
        element: <AuthMiddleware />,
        children: [
          { path: "/users", element: <UsersPage /> },
          { path: "/users/:id", element: <SingleUserPage /> },
          { path: "/cart", element: <CartPage /> },
        ],
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
