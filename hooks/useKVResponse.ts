import { useEffect, useState } from "react"
import { useKVContext } from "~/modules/kv/context"
import { TOptions } from "~/types/kv"

function useKVResponse<TData>(screen: TOptions, initialValue: TData) {
  const { state } = useKVContext()
  const [data, setData] = useState<TData>(initialValue)

  useEffect(() => {
    if (state.selectedOption === screen) {
      setData(state.selectedOptionResponse)
    }
  }, [state.selectedOption, state.selectedOptionResponse])

  return data
}

export { useKVResponse }
