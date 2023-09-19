import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://repairshop-6cf8.onrender.com",
  // baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReFresh = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    console.log("sending refresh");

    const refresh = await baseQuery("/auth/refresh", api, extraOptions);
    if (refresh?.data?.accessToken) {
      api.dispatch(setCredentials({ ...refresh.data }));
      result = await baseQuery(args, api, extraOptions);
    } else if (refresh?.error?.status === 403) {
      refresh.error.data.message = "Your Login is Expired";
      return refresh;
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReFresh,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
