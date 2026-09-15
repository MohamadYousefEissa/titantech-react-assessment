// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductsApiResponse } from "@/@types/product";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/products`,
  }),
  endpoints: (builder) => ({
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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsByCategoryQuery } = productsApi;
