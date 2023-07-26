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

    readNotification: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notif/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),

    readAllNotification: builder.mutation({
      query: (notification) => ({
        url: "/readall",
        method: "PUT",
        body: notification,
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
