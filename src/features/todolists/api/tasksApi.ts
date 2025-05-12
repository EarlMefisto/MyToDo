import type { BaseResponse } from "@/common/types"
import type {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from "./tasksApi.types"
import { baseApi } from "@/app/baseApi"
import { PAGE_SIZE } from "@/common/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<
      GetTasksResponse,
      { todolistId: string; params: { page: number } }
    >({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_result, _error, { todolistId }) => [
        { type: "Task", id: todolistId },
      ],
    }),
    createTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        method: "POST",
        url: `/todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [
        { type: "Task", id: todolistId },
      ],
    }),
    deleteTask: builder.mutation<
      BaseResponse,
      { todolistId: string; taskId: string }
    >({
      query: ({ todolistId, taskId }) => ({
        method: "DELETE",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [
        { type: "Task", id: todolistId },
      ],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      {
        todolistId: string
        taskId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      async onQueryStarted(
        { todolistId, taskId, model },
        { queryFulfilled, getState, dispatch },
      ) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(
          getState(),
          "getTasks",
        )
        let patchResult: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResult.push(
            dispatch(
              tasksApi.util.updateQueryData(
                "getTasks",
                { todolistId, params: { page: params.page } },
                (state) => {
                  const index = state.items.findIndex(
                    (task) => task.id === taskId,
                  )
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model }
                  }
                },
              ),
            ),
          )
        })
        try {
          await queryFulfilled
        } catch (error) {
          patchResult.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_result, _error, { todolistId }) => [
        { type: "Task", id: todolistId },
      ],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi
