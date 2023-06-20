import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { IAccount } from "../../../interfaces/user.interface";
import { ITask } from "../../../interfaces/task.interface";
import { JoinRoom } from "../../../utils/socketConnect";
// ? endpoint must be in env

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccount: builder.query<IAccount[], void>({
      query: () => "/account/all",
      providesTags: ["Account"],
    }),

    addAccount: builder.mutation({
      query: (data) => ({
        url: "/account/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    updateAccount: builder.mutation<IAccount, IAccount>({
      query: (data) => ({
        url: `/account/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    deleteAccount: builder.mutation({
      query: (data) => ({
        url: `/account/delete/${data._id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    updateCourseView: builder.mutation<IAccount, IAccount>({
      query: (data) => ({
        url: `/account/view/${data.course}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Account", "Task"],
    }),

    refetch: builder.query<IAccount, void>({
      query: () => "/account",
      providesTags: ["Account"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: account } = await queryFulfilled;
          // this execute after login and page refresh
          JoinRoom(account.course!, account.role!);
        } catch {}
      },
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useRefetchQuery,
  useAddAccountMutation,
  useUpdateCourseViewMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApiSlice;
