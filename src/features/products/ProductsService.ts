import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductsApiResponse } from "@/@types/product";
import type { ProductSort } from "@/features/products/ProductsSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/products`,
  }),
  endpoints: (builder) => ({
    // for get products by category (used in home page)
    getProductsByCategory: builder.query<
      ProductsApiResponse,
      { slug: string; limit?: number }
    >({
      query: ({ limit, slug }) => {
        const params = new URLSearchParams();

        if (limit) params.set("limit", limit.toString());

        return `category/${slug}?${params.toString()}`;
      },
    }),

    // for search and filter products (used in producs page)
    searchForProducts: builder.query<
      ProductsApiResponse,
      {
        limit?: number;
        skip?: number;
        search: string;
        category?: string;
        sort?: ProductSort;
      }
    >({
      query: ({ limit, skip, search, category, sort }) => {
        const params = new URLSearchParams();

        let path = "search";

        if (limit) params.set("limit", limit.toString());
        if (skip) params.set("skip", skip.toString());
        if (search) params.set("q", search.toString());
        if (sort === "oldest") {
          params.set("sortBy", "id");
          params.set("order", "asc");
        } else if (sort === "newest") {
          params.set("sortBy", "id");
          params.set("order", "desc");
        } else if (sort === "asc") {
          params.set("sortBy", "title");
          params.set("order", "asc");
        } else if (sort === "desc") {
          params.set("sortBy", "title");
          params.set("order", "desc");
        }
        if (category) path = `category/${category}`;

        return `${path}?${params.toString()}`;
      },
      // keepUnusedDataFor: 15, // Cache for 15 seconds the default is 60.
    }),

    getCategories: builder.query<string[], void>({
      query: () => "category-list",
    }),

    getSingleProduct: builder.query<Product, { id: string }>({
      query: ({ id }) => id,
    }),
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useSearchForProductsQuery,
  useGetCategoriesQuery,
  useGetSingleProductQuery,
} = productsApi;
