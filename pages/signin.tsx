import { useForm } from "react-hook-form"
import axios from "axios"
import { routes } from "utils"

function Signin() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const response = await axios.post(routes.SIGNIN, data)
    console.log({ response })
  }

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
