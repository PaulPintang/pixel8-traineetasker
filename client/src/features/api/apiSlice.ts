import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://traineetasker-server.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["Task", "User", "Account", "Trainee", "Sheet"],
  endpoints: (builder) => ({}),
});
