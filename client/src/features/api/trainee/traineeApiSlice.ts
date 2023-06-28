import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { ITrainee } from "../../../interfaces/user.interface";
import { ISheets } from "../../../interfaces/records.interface";
import { JoinRoom } from "../../../utils/socketConnect";
// ? endpoint must be in env

export const traineeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainee: builder.query<ITrainee[], string>({
      query: (course) => ({
        url: `/trainee/${course}`,
        providesTags: ["Trainee"],
      }),
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
    addTaskTimesheet: builder.mutation<
      ITrainee,
      { sheet: ISheets; rooms: string[] }
    >({
      query: ({ sheet }) => ({
        url: "/trainee/timesheet",
        method: "PUT",
        body: sheet,
      }),
      invalidatesTags: ["Trainee"],
    }),
    addDtr: builder.mutation<ITrainee, void>({
      query: () => ({
        url: "/trainee/dtr",
        method: "PUT",
      }),
      invalidatesTags: ["Trainee"],
    }),
    updateDtr: builder.mutation<ITrainee, void>({
      query: () => ({
        url: "/trainee/dtr/inout",
        method: "PUT",
      }),
      invalidatesTags: ["Trainee", "Task"],
    }),
  }),
});

export const {
  useGetAllTraineeQuery,
  useAddTraineeMutation,
  useGetTraineeProfileQuery,
  useAddTaskTimesheetMutation,
  useAddDtrMutation,
  useUpdateDtrMutation,
} = traineeApiSlice;
