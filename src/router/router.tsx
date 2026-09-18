/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Root from "@/Root";
import NotFoundPage from "@/not-found";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const ProductsPage = lazy(
  () => import("@/features/products/pages/ProductsPage"),
);
const SingleProductPage = lazy(
  () =>
    import("@/features/products/pages/single-product-page/SingleProductPage"),
);
const LoginPage = lazy(() => import("@/features/auth/LoginPage"));

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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
