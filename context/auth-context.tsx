import * as React from "react"
import { createNamedContext } from "~/utils"
import { User } from "~/types/auth"
import { useLocalStorage } from "~/hooks"
import { useRouter } from "next/router"

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
      router.replace("/signin")
    }
  }, [user])
}

export { AuthContextProvider, useAuthContext, useAuthCheck }
