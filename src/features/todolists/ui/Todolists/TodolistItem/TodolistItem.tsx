import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import type { DomainTodolist } from "@/features/todolists/lib/types"
import { useCreateTaskMutation } from "@/features/todolists/api/tasksApi"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [createTask] = useCreateTaskMutation()

  const createTaskHandler = (title: string) => {
    createTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm
        onCreateItem={createTaskHandler}
      />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
