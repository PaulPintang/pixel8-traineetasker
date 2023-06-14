import { ITask } from "../../../interfaces/task.interface";
import { apiSlice } from "../apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITask[], void>({
      query: () => "task/all",
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<ITask, Omit<ITask, "id">>({
      query: (data) => ({
        url: "/task/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetAllTasksQuery, useAddTaskMutation } = taskApiSlice;
