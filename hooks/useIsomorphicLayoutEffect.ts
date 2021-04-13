import { useEffect, useLayoutEffect } from "react"
import { isBrowser } from "~/utils/misc"

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
