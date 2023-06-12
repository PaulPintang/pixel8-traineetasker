import { method } from "lodash";
import { apiSlice } from "../apiSlice";
import { IUser } from "../../../interfaces/user.interface";
// ? endpoint must be in env

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    creatUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: "user/create",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: (data) => ({
        url: `user/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreatUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
