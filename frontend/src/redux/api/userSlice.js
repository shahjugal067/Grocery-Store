

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
    }),
});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useProfileMutation} = userSlice;
