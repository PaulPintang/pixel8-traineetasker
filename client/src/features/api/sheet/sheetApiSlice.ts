import { apiSlice } from "../apiSlice";

export const sheetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSheets: builder.query({
      query: () => "sheets",
    }),
  }),
});

export const { useGetSheetsQuery } = sheetApiSlice;
