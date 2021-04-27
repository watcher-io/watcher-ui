import type { Response } from "./common"

export type User = {
  access_token: string
  user_name: string
  first_name: string
  last_name: string
}

export type LoginRequest = {
  user_name: string
  password: string
}

export type LoginResponse = Response<User>

export type CreateUserRequest = {
  password: string
  first_name: string
  last_name: string
}

export type CreateUserRequestError = {
  response_message: string
}

export type CreateUserResponse = Response<
  Omit<User, "access_token"> & { id: string }
>
