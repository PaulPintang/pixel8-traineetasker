import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { ITrainee } from "../../../interfaces/user.interface";
// ? endpoint must be in env

export const traineeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainee: builder.query<ITrainee[], string>({
      query: (course) => ({
        url: `/trainee/${course}`,
        providesTags: ["Trainee"],
      }),
    }),
    getTrainee: builder.query<ITrainee, string>({
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
    }),
  }),
});

export const {
  useGetAllTraineeQuery,
  useAddTraineeMutation,
  useGetTraineeQuery,
} = traineeApiSlice;
