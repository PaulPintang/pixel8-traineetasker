import { apiSlice } from "../apiSlice";
import { ITrainee } from "../../../interfaces/user.interface";
import { JoinRoom } from "../../../utils/socketConnect";
import { socket } from "../../../utils/socketConnect";

export const traineeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainee: builder.query<ITrainee[], string>({
      query: (course) => `/trainee/${course}`,
      providesTags: ["Trainee"],
      async onCacheEntryAdded(
        course,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          socket.on("addTimeSheet", (data) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(
                (trainee) => trainee._id === data._id
              );
              if (index !== -1) draft[index].timesheet = data.timesheet;
            });
          });

          socket.on("dailyTimeRecord", (data) => {
            console.log("DATA EMITTED:", data);
            updateCachedData((draft) => {
              const index = draft.findIndex(
                (trainee) => trainee._id === data._id
              );
              if (index !== -1) draft[index].dtr = data.dtr;
            });
          });
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getTraineeProfile: builder.query<ITrainee, string | void>({
      query: (id) => ({
        url: `/trainee/profile/${id}`,
        providesTags: ["Trainee"],
      }),
    }),
    addTrainee: builder.mutation<ITrainee, ITrainee>({
      query: (data) => ({
        url: "/trainee/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trainee"],
      async onQueryStarted(arg, api) {
        try {
          const { data: trainee } = await api.queryFulfilled;
          JoinRoom(trainee.course!, trainee.role!);
        } catch {}
      },
    }),
    addTaskTimesheet: builder.mutation({
      query: ({ sheet }) => ({
        url: "/trainee/timesheet",
        method: "PUT",
        body: sheet,
      }),
      invalidatesTags: ["Trainee"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: profile } = await queryFulfilled;
          socket.emit("sheet", {
            trainee: profile,
            rooms: arg.rooms,
          });
        } catch {}
      },
    }),
    updateDtr: builder.mutation({
      query: () => ({
        url: "/trainee/dtr/inout",
        method: "PUT",
      }),
      invalidatesTags: ["Trainee"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: profile } = await queryFulfilled;
          console.log("emitted", profile);
          socket.emit("dtr", {
            trainee: profile,
            rooms: arg.rooms,
          });
        } catch {}
      },
    }),
  }),
});

export const {
  useGetAllTraineeQuery,
  useAddTraineeMutation,
  useGetTraineeProfileQuery,
  useAddTaskTimesheetMutation,
  useUpdateDtrMutation,
} = traineeApiSlice;
