import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"
import { LoginArgs, LoginResponse, MeResponse } from "./authApi.types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<MeResponse>, void>({
      query: () => "auth/me",
    }),
    login: builder.mutation<BaseResponse<LoginResponse>, LoginArgs>({
      query: (body) => ({
        method: "POST",
        url: "auth/login",
        body,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi
