import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { IAccount } from "../../../interfaces/user.interface";
// ? endpoint must be in env

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccount: builder.query<IAccount[], void>({
      query: () => "/account/all",
      providesTags: ["Account"],
    }),

    // addAccount: builder.mutation<IAccount, IAccount>({
    //   query: (data) => ({
    //     url: "/account/add",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Account"],
    // }),

    addAccount: builder.mutation<IAccount, Omit<IAccount, "id">>({
      query: (data) => ({
        url: "/account/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    refetch: builder.mutation<IAccount, IAccount>({
      query: (user) => ({
        url: "/account",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useRefetchMutation,
  useAddAccountMutation,
} = accountApiSlice;
