import List from "@mui/material/List"
import { useEffect, useState } from "react"
import { TaskStatus } from "@/common/enums"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi"
import { DomainTodolist } from "@/features/todolists/lib/types"
import { useAppDispatch } from "@/common/hooks"
import { setAppErrorAC } from "@/app/appSlice"
import { TasksSkeleton } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem"
import { TasksPagination } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetTasksQuery({
    todolistId: id,
    params: { page },
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!error) {
      return
    }
    if ("status" in error) {
      // проверка на FetchBaseQueryError
      const errorMessage =
        "error" in error ? error.error : JSON.stringify(error.data)
      dispatch(setAppErrorAC({ error: errorMessage }))
    } else {
      // проверка на SerializedError
      dispatch(setAppErrorAC({ error: error.message || "Some error occurred" }))
    }
  }, [error])

  let filteredTasks = data?.items
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "completed") {
    filteredTasks = filteredTasks?.filter(
      (t) => t.status === TaskStatus.Completed,
    )
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {filteredTasks?.map((task) => (
              <TaskItem key={task.id} task={task} todolist={todolist} />
            ))}
          </List>
          <TasksPagination
            totalCount={data?.totalCount || 0}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  )
}
