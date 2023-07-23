import { ITask } from "../../../interfaces/task.interface";
import { apiSlice } from "../apiSlice";
import { socket } from "../../../utils/socketConnect";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.query<ITask[], void | ITask>({
      query: () => "task/all",
      transformResponse: (res: ITask[]) =>
        res
          .slice()
          .sort((a, b) =>
            b.timeline!.createdAt!.localeCompare(a.timeline!.createdAt!)
          ),
      providesTags: ["Task"],
      async onCacheEntryAdded(
        user,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          socket.on("assignTask", (response: ITask) => {
            updateCachedData((draft) => {
              const index = draft.findIndex(
                (task) => task._id === response._id
              );
              const found = index !== -1;
              if (found) {
                if (response.assign !== draft[index].assign) {
                  draft[index].assign = response.assign;
                } else {
                  draft.splice(index, 1);
                }
              } else {
                draft.push(response);
              }
            });
          });
          socket.on("deleteTask", (_id: string) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === _id);
              if (index !== -1) draft.splice(index, 1);
            });
          });
          socket.on("taskStatus", (data: ITask) => {
            console.log("yahh", data);
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === data._id);
              if (index !== -1) draft[index] = data;
            });
          });
          socket.on("taskComment", ({ _id, msg, by }) => {
            updateCachedData((draft) => {
              const index = draft.findIndex((task) => task._id === _id);
              if (index !== -1) draft[index].comments?.push({ msg, by });
            });
          });
          socket.on("addTask", (task) => {
            updateCachedData((draft) => {
              draft.push(task);
            });
          });
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    addTask: builder.mutation<ITask, ITask>({
      query: (data) => ({
        url: "/task/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newtask } = await queryFulfilled;
          socket.emit("add", {
            task: newtask,
            rooms: [newtask.course],
          });
        } catch {}
      },
    }),

    assignTask: builder.mutation({
      query: ({ task }) => ({
        url: "/task/assign",
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
      async onQueryStarted({ rooms }, { dispatch, queryFulfilled }) {
        try {
          const { data: task } = await queryFulfilled;
          socket.emit("assign", {
            task,
            rooms,
          });
        } catch {}
      },
    }),

    taskStatus: builder.mutation({
      query: ({ task }) => ({
        url: "/task/status",
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task", "Profile"],
      async onQueryStarted({ rooms }, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          socket.emit("status", {
            task: response.updatedTask,
            rooms,
          });
          if (response.updatedProfile) {
            socket.emit("profile", {
              trainee: response.updatedProfile,
              rooms,
            });
          }
        } catch {}
      },
    }),

    commentOnTask: builder.mutation({
      query: (data) => ({
        url: "/task/comment",
        method: "PUT",
        body: data.msg,
      }),
      invalidatesTags: ["Task"],
      async onQueryStarted({ msg, rooms }, { dispatch, queryFulfilled }) {
        try {
          socket.emit("comment", { msg, rooms });
        } catch {}
      },
    }),

    deleteTask: builder.mutation({
      query: ({ _id }) => ({
        url: `/task/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
      async onQueryStarted({ _id, rooms }, { dispatch, queryFulfilled }) {
        try {
          socket.emit("delete", {
            _id,
            rooms,
          });
        } catch {}
      },
    }),

    todoTask: builder.mutation({
      query: ({ _id, todos }) => ({
        url: `/task/todo/${_id}`,
        method: "PUT",
        body: todos,
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
  useDeleteTaskMutation,
  useTodoTaskMutation,
} = taskApiSlice;
