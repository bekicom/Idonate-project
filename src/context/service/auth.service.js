import { apiSlice } from "./api.service";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // REGISTER USER
    register: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/register",
        method: "POST",
        body,
      }),
    }),

    // SINGIN || LOGIN USER
    singIn: builder.mutation({
      query: (body) => ({
        url: "/v1/auth/login",
        method: "POST",
        body,
      }),
    }),

    // Refresh token
    refreshToken: builder.mutation({
      query: () => ({
        url: "/v1/auth/refresh",
        method: "POST",
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/v1/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSingInMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = userApi;
