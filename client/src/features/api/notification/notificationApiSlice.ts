import { apiSlice } from "../apiSlice";
import { Notification } from "../../../interfaces/records.interface";
import { socket } from "../../../utils/socketConnect";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<Notification[], void>({
      query: () => "/notif/all",
      providesTags: ["Notification"],
      async onCacheEntryAdded(
        user,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on("newTaskNotification", (notification) => {
            updateCachedData((draft) => {
              draft.push(notification);
            });
          });
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    pushNotification: builder.mutation({
      query: ({ notification }) => ({
        url: "/notif/add",
        method: "POST",
        body: notification,
      }),
      invalidatesTags: ["Notification"],
      async onQueryStarted({ rooms }, { dispatch, queryFulfilled }) {
        try {
          const { data: notification } = await queryFulfilled;
          socket.emit("newTask", {
            notification,
            rooms,
          });
        } catch {}
      },
    }),

    readNotification: builder.mutation<Notification, { _id: string }>({
      query: ({ _id }) => ({
        url: `/notif/read/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),

    readAllNotification: builder.mutation<
      Notification,
      { task: string } | void
    >({
      query: (toread) => ({
        url: "/notif/readall",
        method: "PUT",
        body: toread,
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
