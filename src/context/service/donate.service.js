import { apiSlice } from "./api.service";

export const donateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Top Donaters
    getTopDonaters: builder.query({
      query: () => "/v1/donater/top",
    }),

    // Update donation page
    updateDonationPage: builder.mutation({
      query: (body) => ({
        url: "v1/donation/page/update",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useGetTopDonatersQuery, useUpdateDonationPageMutation } =
  donateApi;
