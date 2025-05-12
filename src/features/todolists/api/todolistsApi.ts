import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import { baseApi } from "@/app/baseApi"
import { DomainTodolist } from "../lib/types"

//Вызов injectEndpoints добавит эндпоинты в исходное API
// и вернёт это же API с корректными типами для всех эндпоинтов
export const todolistsApi = baseApi.injectEndpoints({
  //сам запрос на сервер
  endpoints: (builder) => ({
    //в типизации: первое - то, что возвращается, второе - что приходит
    getTodolists: builder.query<DomainTodolist[], void>({
      //такая короткая запись возможна только! для query запроса
      query: () => `/todo-lists`,
      //   {
      //   return {
      //метод get всегда по умолчанию, поэтому можно не прописывать
      //     method: "GET",
      //     url: "/todo-lists",
      //   }
      // },
      //
      //transformResponse метод, позволяющий трансформировать данные,
      //приходящие с сервера перед кэшированием
      //первый аргумент - то, что возвращает query (база)
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((tl) => ({ ...tl, filter: "all"})),
      //перечисляющий набор тегов, описывающих получаемые в этом запросе данные
      providesTags: ["Todolist"],
    }),
    //mutation только для данных, которые будут меняться
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "POST",
        url: `/todo-lists`,
        body: { title },
      }),
      //перечисляющий набор тегов, которые инвалидируются при выполнении этих мутаций
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => ({
        method: "DELETE",
        url: `/todo-lists/${id}`,
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData(
            "getTodolists",
            undefined,
            (state) => {
              const index = state.findIndex((t) => t.id === id)
              if (index !== -1) {
                state.splice(index, 1)
              }
            },
          ),
        )
        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: builder.mutation<
      BaseResponse,
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `/todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

//кастомный хук для вызова endpoint со всеми необходимыми значениями
export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi
