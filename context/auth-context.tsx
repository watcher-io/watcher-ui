import * as React from "react"
import { createNamedContext } from "~/utils"
import { User } from "~/types/auth"
import { useLocalStorage } from "~/hooks"
import { useRouter } from "next/router"
import axios, { AxiosRequestConfig } from "axios"

interface AuthContextProps {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const AuthContext = createNamedContext<AuthContextProps | null>(
  "AuthContext",
  null
)

function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useLocalStorage<User | null>("watcher-auth", null)

  const value = React.useMemo(() => ({ user, setUser }), [user, setUser])

  return <AuthContext.Provider value={value} children={children} />
}

function useAuthContext() {
  const context = React.useContext(AuthContext)
  if (context === null) {
    throw new Error(`useAuthContext must be used inside AuthContextProvider`)
  }
  return context
}

function useAuthCheck() {
  const router = useRouter()
  const { user } = useAuthContext()
  React.useEffect(() => {
    if (!user) {
      if (router.asPath === "/register") return
      router.replace("/signin")
    }
  }, [user])
}

function useAuthClient(config?: AxiosRequestConfig) {
  const { user } = useAuthContext()
  const client = React.useMemo(() => {
    const axiosInstance = axios.create({
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Auth ${user?.access_token}`,
      },
    })
    return axiosInstance
  }, [user])

  return client
}

export { AuthContextProvider, useAuthContext, useAuthCheck, useAuthClient }
