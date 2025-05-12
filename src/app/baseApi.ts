import { AUTH_TOKEN } from "@/common/constants"
import { handleError } from "@/common/utils"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: async (args, api, extraOptions) => {
    // await new Promise((resolve) => setTimeout(resolve, 3000))
    const result = await fetchBaseQuery({
      //замена instance
      baseUrl: import.meta.env.VITE_BASE_URL,
      // передача куки
      credentials: "include",
      prepareHeaders: (headers) => {
        headers.set("API-KEY", import.meta.env.VITE_API_KEY)
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        )
      },
    })(args, api, extraOptions)
    handleError(api, result)
    return result
  },
  //строка или объект, позволяющий именовать определенные типы данных
  //и инвалидировать части кэша. При инвалидации кэш-тега
  //RTK Query автоматически повторно запрашивает данные с помощью эндпоинтов,
  //помеченных этим тегом
  //массив имен тегов для типа данных
  tagTypes: ["Todolist", "Task"],
  endpoints: () => ({}),
  // срок хранения кэша
  keepUnusedDataFor: 1000,
})
