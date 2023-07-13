import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    // baseUrl: `${import.meta.env.VITE_LOCAL_SERVER}/api`,
    credentials: "include",
  }),
  tagTypes: ["Task", "User", "Account", "Trainee", "Sheet"],
  endpoints: (builder) => ({}),
});
