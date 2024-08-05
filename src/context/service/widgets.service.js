import { apiSlice } from "./api.service";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a goal
    createGoalWidgets: builder.mutation({
      query: (body) => ({
        url: "/v1/widget/goal/cretate",
        method: "POST",
        body,
      }),
    }),

    // Update a goal widget
    updateGoalWidget: builder.mutation({
      query: (body) => ({
        url: "/v1/widget/goal/update",
        method: "PUT",
        body,
      }),
    }),

    // Update Donation Widget
    updateDonationWidget: builder.mutation({
      query: (body) => ({
        url: "v1/widget/donation/update",
        method: "PUT",
        body,
      }),
    }),

    // Get top Stream widget settings
    getTopStreamWidget: builder.query({
      query: () => ({
        url: "/v1/widget/stream/top",
      }),
    }),
  }),
});

export const {
  useCreateGoalWidgetsMutation,
  useUpdateGoalWidgetMutation,
  useUpdateDonationWidgetMutation,
  useGetTopStreamWidgetQuery,
} = adminApi;
