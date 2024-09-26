import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 5,
  tagTypes: ["userInfo", "collection", "tasks"],
  baseQuery,
  endpoints: () => ({}),
});
