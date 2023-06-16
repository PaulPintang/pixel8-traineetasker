import { ITask } from "../../../interfaces/task.interface";
import { IAccount } from "../../../interfaces/user.interface";
import { apiSlice } from "../apiSlice";
import { socket } from "../../../utils/socketConnect";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITask[], void>({
      query: () => "task/all",
      // transformResponse: (response: { data: ITask[] }, meta, arg) => {
      //   // Filter the response based on query parameter
      //   const filteredData = response.data.filter(
      //     (task) => task.assign === arg.name
      //   );
      //   return { data: filteredData };
      // },
      providesTags: ["Task"],
      async onCacheEntryAdded(
        user,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // ! problem. the return tasks by the server is base on assign task.
          // ? the problem is every socket emit, the cachedata is diffirent fron other user role.
          // ? so updating cache and finding the data that being change will not found on trainee user
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // * problem occur here
          socket.on("assignTask", (data: { _id: string; name: string }) => {
            updateCachedData((draft) => {
              // ? bug here, if you reassign and click assign with nothing chage it will push to cache
              // ? FIXED: check if the task.assign and value of select is equal, hide button or disable it
              const index = draft.findIndex((task) => task._id === data._id);
              if (index !== -1) {
                draft.splice(index, 1);
              } else {
                draft.push(data);
              }
            });
          });
          // * problem occur here
          socket.on("deleteTask", (data: { _id: string }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === data._id);
              console.log("pota", index);
              if (index !== -1) draft.splice(index, 1);
            });
          });
          socket.on("taskStatus", (data: ITask) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === data._id);
              if (index !== -1) draft[index] = data;
            });
            console.log(data);
          });
          socket.on(
            "taskComment",
            (data: { msg: string; by: string; _id: string }) => {
              updateCachedData((draft) => {
                const index = draft.findIndex((task) => task._id === data._id);
                if (index !== -1)
                  draft[index].comments?.push({ msg: data.msg, by: data.by });
              });
              console.log(data);
            }
          );
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
          const { data: assignedTask } = await queryFulfilled;
          dispatch(
            taskApiSlice.util.updateQueryData("getAllTasks", data, (draft) => {
              console.log("potang maray", data);
              Object.assign(draft, assignedTask);
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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
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

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
      // ??? queryfulfilled return server response
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: deletedTask } = await queryFulfilled;
          dispatch(
            taskApiSlice.util.updateQueryData("getAllTasks", data, (draft) => {
              Object.assign(draft, deletedTask);
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useAssignTaskMutation,
  useTaskStatusMutation,
  useCommentOnTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
