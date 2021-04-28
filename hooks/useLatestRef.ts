import { useRef } from "react"
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect"

function useLatestRef<T>(value: T = null) {
  const ref = useRef<T>(value)

  useIsomorphicLayoutEffect(() => {
    ref.current = value
  })

  return ref
}

export default useLatestRef
