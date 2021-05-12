import * as React from "react"

import { ValueOf } from "~/types/common"
import {
  TCompactResponseData,
  TDeleteResponseData,
  TGetResponseData,
  TOptions,
  TPutResponseData,
} from "~/types/kv"
import createNamedContext from "~/utils/create-named-context"

type TSelectedOptionResponse =
  | TGetResponseData
  | TPutResponseData
  | TDeleteResponseData
  | TCompactResponseData

type TKVContext = {
  state: TState
  selectOption: (option: TOptions) => void
  setResponse: (response: TSelectedOptionResponse) => void
}

const KVContext = createNamedContext<TKVContext | null>("KVContext", null)

type TState = {
  selectedOption: TOptions
  selectedOptionResponse?: TSelectedOptionResponse
}

const ACTIONS = {
  SET_SELECTED_OPTION: "set-selected-option",
  SET_SELECTED_OPTION_RESPONSE: "set-selected-option-response",
} as const

type TAction = { type: ValueOf<typeof ACTIONS>; payload?: any }

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case ACTIONS["SET_SELECTED_OPTION"]: {
      return {
        ...state,
        selectedOption: action.payload,
        selectedOptionResponse: undefined,
      }
    }
    case ACTIONS["SET_SELECTED_OPTION_RESPONSE"]: {
      return { ...state, selectedOptionResponse: action.payload }
    }

    default:
      throw new Error(`Wrong action type in KVContext reducer`)
  }
}

const initialState: TState = {
  selectedOption: "Get",
}

function KVContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const selectOption = React.useCallback((option: TOptions) => {
    dispatch({ type: ACTIONS["SET_SELECTED_OPTION"], payload: option })
  }, [])

  const setResponse = React.useCallback((response: TSelectedOptionResponse) => {
    dispatch({
      type: ACTIONS["SET_SELECTED_OPTION_RESPONSE"],
      payload: response,
    })
  }, [])

  const value = React.useMemo(() => ({ state, selectOption, setResponse }), [
    state,
    selectOption,
    setResponse,
  ])

  return <KVContext.Provider value={value}>{children}</KVContext.Provider>
}

function useKVContext() {
  const context = React.useContext(KVContext)
  if (context === null) {
    throw new Error(`useKVContext can only be used within a KVContextProvider`)
  }
  return context
}

export { KVContextProvider, useKVContext }
