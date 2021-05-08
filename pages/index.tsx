import { useRouter } from "next/router"
import * as React from "react"
import { useAuthContext } from "~/context/auth-context"
import { useIsomorphicLayoutEffect } from "~/hooks"

export default function Home() {
  const router = useRouter()
  const { user } = useAuthContext()

  useIsomorphicLayoutEffect(() => {
    if (user) {
      router.replace("/cluster-profiles")
    } else {
      router.replace("/signin")
    }
  })

  return <div>Re-routing...</div>
}
