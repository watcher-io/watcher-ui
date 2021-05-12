import { useEffect, useState } from "react"

import { useKVContext } from "~/modules/kv/context"
import {
  TCompactResponseData,
  TDeleteResponseData,
  TGetResponseData,
  TOptions,
  TPutResponseData,
} from "~/types/kv"

function useKVResponse<
  TData extends
    | TGetResponseData
    | TPutResponseData
    | TDeleteResponseData
    | TCompactResponseData
>(screen: TOptions, initialValue: TData) {
  const { state } = useKVContext()
  const [data, setData] = useState<TData>(initialValue)

  useEffect(() => {
    if (state.selectedOption === screen) {
      // TODO: Fix this
      //@ts-expect-error
      setData(state.selectedOptionResponse)
    }
  }, [state.selectedOption, state.selectedOptionResponse])

  return data
}

export { useKVResponse }
