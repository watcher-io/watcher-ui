import { useState, useCallback, useEffect } from "react"

import { isBrowser, noop } from "~/utils/misc"

function useLocalStorage<T>(key: string, initialValue: T) {
  if (!isBrowser) {
    return [initialValue, noop] as const
  }
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // if previous value exists in localStorage, return that value
      // else return the initialValue
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((currentValue: T) => T)) => {
      // updates the localStorage value and dispatches a StorageEvent
      // this synchronizes the state between multiple tabs
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        const serializedValue = JSON.stringify(valueToStore)
        window.localStorage.setItem(key, serializedValue)
        window.dispatchEvent(
          new StorageEvent("storage", { key, newValue: serializedValue })
        )
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue]
  )

  useEffect(() => {
    // Add an eventListener for the StorageEvent
    const eventListener = (event: StorageEvent) => {
      if (event.key === key) {
        const newValue = JSON.parse(event.newValue ?? "") as T
        if (storedValue !== newValue) {
          setStoredValue(newValue)
        }
      }
    }

    window.addEventListener("storage", eventListener)

    // remove the eventListener
    return () => {
      window.removeEventListener("storage", eventListener)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

export default useLocalStorage
