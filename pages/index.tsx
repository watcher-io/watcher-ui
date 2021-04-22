import { useRouter } from "next/router"
import * as React from "react"
import { useAuthContext } from "~/context/auth-context"
import { useIsomorphicLayoutEffect } from "~/hooks"

export default function Home() {
  const { user } = useAuthContext()
  const router = useRouter()

  React.useEffect(() => {
    if (!user) {
      router.replace("/signin")
    }
  }, [user])

  useIsomorphicLayoutEffect(() => {
    router.replace("/cluster-profiles")
  })

  return <div>Re-routing...</div>
}
