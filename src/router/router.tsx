import { createBrowserRouter } from "react-router-dom";
import Root from "@/Root";
import HomePage from "@/pages/home/HomePage";
import ProductsPage from "@/pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products", element: <ProductsPage /> },
    ],
  },
]);
