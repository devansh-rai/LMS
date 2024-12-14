// /* eslint-disable no-unused-vars */
// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import { userLoggedIn, userLoggedOut } from "../authSlice";

// const USER_API = "http://localhost:3000/api/v1/user/"

// export const authApi = createApi({
//     reducerPath:"authApi",
//     baseQuery:fetchBaseQuery({
//         baseUrl:USER_API,
//         credentials:'include'
//     }),
//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//             query: (inputData) => ({
//                 url:"register",
//                 method:"POST",
//                 body:inputData
//             })
//         }),
//         loginUser: builder.mutation({
//             query: (inputData) => ({
//                 url:"login",
//                 method:"POST",
//                 body:inputData
//             }),
//             async onQueryStarted(_, {queryFulfilled, dispatch}) {
//                 try {
//                     const result = await queryFulfilled;
//                     dispatch(userLoggedIn({user:result.data.user}));
//                 } catch (error) {
//                     console.log(error);
//                     console.log("Login failed");
//                 }
//             }
//         }),
//         logoutUser: builder.mutation({
//             query: () => ({
//                 url:"logout",
//                 method:"GET"
//             }),
//             async onQueryStarted(_, {queryFulfilled, dispatch}) {
//                 try { 
//                     await queryFulfilled;    // extra added
//                     dispatch(userLoggedOut());
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//         }),
//         loadUser: builder.query({
//             query: () => ({
//                 url:"profile",
//                 method:"GET"
//             }),
//             async onQueryStarted(_, {queryFulfilled, dispatch}) {
//                 try {
//                     const result = await queryFulfilled;
//                     dispatch(userLoggedIn({user:result.data.user}));
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//         }),
//         updateUser: builder.mutation({
//             query: (formData) => ({
//                 url:"profile/update",
//                 method:"PUT",
//                 body:formData,
//                 // credentials:"include"
//             })
//         })
//     })
// });
// export const {
//     useRegisterUserMutation,
//     useLoginUserMutation,
//     useLogoutUserMutation,
//     useLoadUserQuery,
//     useUpdateUserMutation
// } = authApi;





import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:3000/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error("Load user failed:", error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
} = authApi;
