/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Root from "@/Root";

const HomePage = lazy(() => import("@/features/home/HomePage"));
const ProductsPage = lazy(
  () => import("@/features/products/pages/ProductsPage"),
);
const SingleProductPage = lazy(
  () =>
    import("@/features/products/pages/single-product-page/SingleProductPage"),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
      { path: "/products/:id", element: <SingleProductPage /> },
    ],
  },
]);
