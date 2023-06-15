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
    assignTask: builder.mutation({
      query: (data) => ({
        url: "/task/assign",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    taskStatus: builder.mutation({
      query: (data) => ({
        url: "/task/status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    commentOnTask: builder.mutation({
      query: (data) => ({
        url: "/task/comment",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useAssignTaskMutation,
  useTaskStatusMutation,
  useCommentOnTaskMutation,
} = taskApiSlice;
