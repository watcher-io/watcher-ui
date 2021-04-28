export type Response<TData = any> = {
  response_message: string
  data: TData
}

export type ValueOf<T> = T[keyof T]

export type ElementType<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer ElementType> ? ElementType : never
