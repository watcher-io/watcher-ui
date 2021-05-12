import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"

import { useUserExistsQuery } from "~/hooks/useUserExistsQuery"
import type { CreateUserRequest, CreateUserRequestError } from "~/types/auth"
import { auth } from "~/utils/api-routes"

type RequestData = {
  firstName: string
  lastName: string
  password: string
}

async function registerUser(payload: CreateUserRequest) {
  return await axios.post<CreateUserRequest>(auth.REGISTER_USER, payload)
}

function Signin() {
  const { register, handleSubmit } = useForm()
  const loginMutation = useMutation(registerUser)
  const router = useRouter()
  const { data: userCheckResponse } = useUserExistsQuery()

  const onSubmit = async (requestData: RequestData) => {
    loginMutation.mutate(
      {
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        password: requestData.password,
      },
      {
        onSuccess: () => {
          // redirect to signin page if user successfully created
          router.push("/signin")
        },
        onError: ({
          response,
        }: {
          response: { data: CreateUserRequestError }
        }) => {
          // TODO: Show notification
          console.log({ data: response.data })
        },
      }
    )
  }

  useEffect(() => {
    if (userCheckResponse && userCheckResponse.data) {
      router.push("/signin")
    }
  }, [userCheckResponse])

  return (
    <div className="min-h-screen w-full bg-skin-fill grid place-items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-skin-base text-2xl">Sign up for Watcher</div>
        <div className="mt-6 bg-skin-main p-2 rounded-md flex justify-center">
          <form className="py-4 px-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-skin-base" htmlFor="username">
                Username
              </label>
              <input
                name="username"
                id="username"
                defaultValue="admin"
                disabled
                aria-disabled="true"
                className="w-full px-4 py-1 rounded-md bg-skin-fill text-skin-muted mt-2 border"
              />
            </div>
            <div className="mt-6">
              <label className="block text-skin-base" htmlFor="firstName">
                First Name
              </label>
              <input
                name="firstName"
                id="firstName"
                className="w-full px-4 py-1 rounded-md bg-skin-fill text-skin-muted mt-2 border"
                {...register("firstName", { required: true })}
                required
              />
            </div>
            <div className="mt-6">
              <label className="block text-skin-base" htmlFor="lastName">
                Last Name
              </label>
              <input
                name="lastName"
                id="lastName"
                className="w-full px-4 py-1 rounded-md bg-skin-fill text-skin-muted mt-2 border"
                {...register("lastName", { required: true })}
                required
              />
            </div>
            <div className="mt-6">
              <label className="block text-skin-base" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="w-full px-4 py-1 rounded-md bg-skin-fill text-skin-muted mt-2 border"
                {...register("password", { required: true })}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 block bg-skin-button-accent text-skin-base font-semibold rounded-md px-4 py-1 w-full"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
