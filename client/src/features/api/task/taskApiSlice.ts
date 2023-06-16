import { ITask } from "../../../interfaces/task.interface";
import { IAccount } from "../../../interfaces/user.interface";
import { apiSlice } from "../apiSlice";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITask[], void>({
      query: () => "task/all",
      providesTags: ["Task"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // socket.on("addTask", (data: ITask) => {
          //   updateCachedData((draft) => {
          //     // draft.push(data);
          //     console.log(draft);
          //   });
          // });

          socket.on("assignTask", (data: ITask) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === data._id);
              if (index !== -1) {
                draft.splice(index, 1);
              } else {
                draft.push(data);
              }
            });
          });
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
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
      // ??? queryfullfilled return server response
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          socket.emit("assign", updatedTask);
          const patchResult = dispatch(
            taskApiSlice.util.updateQueryData("getAllTasks", id, (draft) => {
              Object.assign(draft, updatedTask);
            })
          );
          console.log(patchResult);
        } catch {}
      },
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
