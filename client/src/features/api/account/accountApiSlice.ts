import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { IAccount } from "../../../interfaces/user.interface";
import { ITask } from "../../../interfaces/task.interface";
// ? endpoint must be in env

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAccount: builder.query<IAccount[], void>({
      query: () => "/account/all",
      providesTags: ["Account"],
    }),

    addAccount: builder.mutation<IAccount, Omit<IAccount, "id">>({
      query: (data) => ({
        url: "/account/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),

    updateSupervisor: builder.mutation<IAccount, IAccount>({
      query: (data) => ({
        url: `/account/${data._id}`,
        method: "PUT",
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
    }),
  }),
});

export const {
  useGetAllAccountQuery,
  useRefetchQuery,
  useAddAccountMutation,
  useUpdateCourseViewMutation,
  useUpdateSupervisorMutation,
} = accountApiSlice;
