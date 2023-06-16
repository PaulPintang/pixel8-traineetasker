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

          socket.on("assignTask", (data: { _id: string; name: string }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === data._id);
              if (index !== -1) {
                draft.splice(index, 1);
              } else {
                draft.push(data);
              }
            });
          });
          socket.on("taskStatus", (data: ITask) => {
            updateCachedData((draft) => {
              console.log("TASKid", data._id);
              const index = draft.findIndex((task) => task._id === data._id);
              console.log("INDEX", index);
              if (index !== -1) draft[index].status = data.status;
            });
            console.log(data);
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
      // ??? queryfulfilled return server response
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          socket.emit("assign", updatedTask);
          dispatch(
            taskApiSlice.util.updateQueryData("getAllTasks", data, (draft) => {
              Object.assign(draft, updatedTask);
            })
          );
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
      // ??? queryfulfilled return server response
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          socket.emit("status", updatedTask);
          dispatch(
            taskApiSlice.util.updateQueryData("getAllTasks", data, (draft) => {
              Object.assign(draft, updatedTask);
            })
          );
        } catch {}
      },
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
