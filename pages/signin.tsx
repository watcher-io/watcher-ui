import { useForm } from "react-hook-form"
import axios from "axios"
import { routes } from "~/utils"
import { useMutation } from "react-query"
import { LoginRequest, LoginResponse } from "~/types/auth"
import { useAuthContext } from "~/context/auth-context"
import { useRouter } from "next/router"
import { useIsomorphicLayoutEffect } from "~/hooks"

type RequestData = Pick<LoginRequest, "password">

async function login({ password }: RequestData) {
  return await axios.post<LoginResponse>(routes.SIGNIN, {
    user_name: "admin",
    password,
  })
}

function Signin() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const { user, setUser } = useAuthContext()

  const loginMutation = useMutation(login)

  const onSubmit = async (requestData: RequestData) => {
    loginMutation.mutate(requestData, {
      onSuccess: ({ data: { data } }) => {
        setUser(data)
      },
      // TODO: Handle onError
    })
  }

  useIsomorphicLayoutEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user])

  return (
    <div className="min-h-screen w-full bg-skin-fill grid place-items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="text-skin-base text-2xl">Sign in to Watcher</div>
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
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
