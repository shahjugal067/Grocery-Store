

import { apiSlice } from "./apiSlice";
import { USER_URL } from "../features/constants";

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url:`${USER_URL}/login`,
                method:'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'POST',
            }),
        }),
        register: builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/register`,
                method:'POST',
                body: data,
            }),
        }),
        profile: builder.mutation({
            query: (data) =>({
                url:`${USER_URL}/profile`,
                method:'PUT',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query:()=>({
                url:`${USER_URL}`,
            }),
            providesTags:['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) =>({
                url:`${USER_URL}/${userId}`,
                method:'DELETE',
            }),
        }),

        getUserDetails: builder.query({
            query: (id) =>({
                url:`${USER_URL}/${id}`,
            }),
            keepUnusedDataFor:5,
        }),
        updateUser: builder.mutation({
            query: (data) =>({
                url:`${USER_URL}/${data.userId}`,
                method:'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation,
    useGetUsersQuery,useDeleteUserMutation,useGetUserDetailsQuery,useUpdateUserMutation,
} = userSlice;
