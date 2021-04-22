import { useRouter } from "next/router"
import * as React from "react"
import { useAuthCheck } from "~/context/auth-context"
import { useIsomorphicLayoutEffect } from "~/hooks"

export default function Home() {
  useAuthCheck()
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    router.replace("/cluster-profiles")
  })

  return <div>Re-routing...</div>
}
