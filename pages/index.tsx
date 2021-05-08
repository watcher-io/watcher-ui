import { useRouter } from "next/router"
import * as React from "react"
import { useIsomorphicLayoutEffect } from "~/hooks"

export default function Home() {
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    router.replace("/cluster-profiles")
  })

  return <div>Re-routing...</div>
}
