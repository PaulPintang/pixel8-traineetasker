import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { IAccount } from "../../../interfaces/user.interface";
import { socket } from "../../../utils/socketConnect";
// ? endpoint must be in env

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAccount, IAccount>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User", "Trainee", "Account", "Task"],
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        console.log("pota ka", data);
        try {
          const { data: user } = await queryFulfilled;
          socket.emit("courseRoom", user.course);
          socket.emit("roleRoom", user.role);
        } catch {}
      },
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useLogoutUserMutation } = authApiSlice;
