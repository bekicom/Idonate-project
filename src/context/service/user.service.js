import { apiSlice } from "./api.service";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // update user
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/v1/user/update",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
