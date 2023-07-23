import { apiSlice } from "../apiSlice";
import { IAccount, ITrainee } from "../../../interfaces/user.interface";
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

          socket.on("addNewTrainee", (trainee) => {
            updateCachedData((draft) => {
              draft.push(trainee);
            });
          });

          socket.on("profileUpdate", (profile) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(
                (trainee) => trainee._id === profile._id
              );
              if (index !== -1) {
                draft[index].dtr = profile.dtr;
                draft[index].timesheet = profile.timesheet;
                draft[index].hours = profile.hours;
              }
            });
          });
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getTraineeProfile: builder.query<ITrainee, void>({
      query: () => "/trainee/profile/info",
      providesTags: ["Profile"],
    }),
    addTrainee: builder.mutation({
      query: (data) => ({
        url: "/trainee/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Trainee"],
      async onQueryStarted(traineeInfo, api) {
        try {
          const { data: trainee } = await api.queryFulfilled;
          // JoinRoom(trainee.course!, trainee.role!);
          socket.emit("newTrainee", {
            trainee: trainee.newTrainee,
            rooms: [traineeInfo.course],
          });
        } catch {}
      },
    }),
    addTaskTimesheet: builder.mutation({
      query: ({ sheet }) => ({
        url: "/trainee/timesheet",
        method: "PUT",
        body: sheet,
      }),
      invalidatesTags: ["Trainee", "Profile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: profile } = await queryFulfilled;
          socket.emit("profile", {
            trainee: profile,
            rooms: arg.rooms,
          });
        } catch {}
      },
    }),
    updateDtr: builder.mutation({
      query: () => ({
        url: "/trainee/dtr",
        method: "PUT",
      }),
      invalidatesTags: ["Trainee", "Task", "Profile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: profile } = await queryFulfilled;
          socket.emit("profile", {
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
