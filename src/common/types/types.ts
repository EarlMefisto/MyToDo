export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
//idle - запрос еще не начался;
//loading - запрос в процессе выполнения;
//succeeded - запрос успешно завершен;
//failed - запрос не удался.
