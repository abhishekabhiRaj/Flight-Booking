import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key = "22444f78447824223cefc48062"; // Use 'const' instead of 'let' for fixed values

export const blogListApi = createApi({
  reducerPath: "blogListApi", // Fixed incorrect reducerPath (was "flightApi")
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://triwize.ghost.io/ghost/api/v3/content/posts/",
    baseUrl: "https://demo.ghost.io/ghost/api/content/posts/",
    // baseUrl: "https://triwize.ghost.io/",
  }),
  endpoints: (builder) => ({
    blogList: builder.mutation<any, Record<string, any>>({
      query: ({ body, page = 1 }) => ({
        // url: `ghost/api/content/posts/?key=${key}`,
        url: `?key=${key}&include=tags,authors&limit=6&page=${page}`,
        method: "GET",
      }),
    }),

    // Fetch a single blog post by ID
    blogPostById: builder.query<any, string>({
      query: (id) => ({
        // url: `ghost/api/content/posts/${id}/?key=${key}`,
        url: `/${id}/?key=${key}`,
        method: "GET",
      }),
    }),
    //
    // new
    blogByTagSlug: builder.mutation<any, Record<string, any>>({
      query: ({ body, page = 1, slug }) => ({
        // url: `ghost/api/content/posts/?key=${key}`,
        url: `?key=${key}&include=tags&limit=6&filter=tag:${slug}&page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBlogListMutation,
  useBlogPostByIdQuery,
  useBlogByTagSlugMutation,
} = blogListApi;
