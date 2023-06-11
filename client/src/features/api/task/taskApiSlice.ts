import { apiSlice } from "../apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => "tasks",
    }),
  }),
});

export const { useGetAllTasksQuery } = taskApiSlice;
