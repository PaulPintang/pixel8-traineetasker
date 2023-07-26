import { apiSlice } from "../apiSlice";
import { Notification } from "../../../interfaces/records.interface";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<Notification[], void>({
      query: () => "/notif/all",
      providesTags: ["Notification"],
    }),

    pushNotification: builder.mutation({
      query: (notification) => ({
        url: "/notif/add",
        method: "POST",
        body: notification,
      }),
      invalidatesTags: ["Notification"],
    }),

    readNotification: builder.mutation<Notification, { _id: string }>({
      query: ({ _id }) => ({
        url: `/notif/read/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),

    readAllNotification: builder.mutation({
      query: () => ({
        url: "/notif/readall",
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  usePushNotificationMutation,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} = accountApiSlice;
