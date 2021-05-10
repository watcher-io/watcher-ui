import * as React from "react"
import { ValueOf } from "~/types/common"
import {
  TCompactRequest,
  TDeleteRequest,
  TGetRequest,
  TOptions,
  TPutRequest,
} from "~/types/kv"
import createNamedContext from "~/utils/create-named-context"

type TSelectedOptionValues =
  | TGetRequest
  | TPutRequest
  | TDeleteRequest
  | TCompactRequest

type TKVContext = {
  state: TState
  selectedOptionValues?: TSelectedOptionValues
  selectOption: (option: TOptions) => void
  setValuesForSelectedOptions: (values: TSelectedOptionValues) => void
}

const KVContext = createNamedContext<TKVContext | null>("KVContext", null)

type TState = {
  selectedOption: TOptions
}

const ACTIONS = {
  SET_SELECTED_OPTION: "set-selected-option",
  SET_VALUES_FOR_SELECTED_OPTION: "set-selected-options-value",
} as const

type TAction = { type: ValueOf<typeof ACTIONS>; payload?: any }

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case ACTIONS["SET_SELECTED_OPTION"]: {
      return { ...state, selectedOption: action.payload }
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

  const setValuesForSelectedOptions = React.useCallback(
    (values: TSelectedOptionValues) => {
      dispatch({
        type: ACTIONS["SET_VALUES_FOR_SELECTED_OPTION"],
        payload: values,
      })
    },
    []
  )

  const value = React.useMemo(
    () => ({ state, selectOption, setValuesForSelectedOptions }),
    [state, selectOption, setValuesForSelectedOptions]
  )

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
