import { useCallback, useContext, useMemo, useReducer } from "react"

import { ValueOf } from "~/types/common"
import { TClusterOverview } from "~/types/overview"
import { createNamedContext } from "~/utils"

type TOverviewContext = {
  state: TState
  setDashboardData: (data: TClusterOverview) => void
  setSelectedNode: (nodeId: number) => void
}

const ClusterOverviewContext = createNamedContext<TOverviewContext | undefined>(
  "ClusterOverviewContext",
  undefined
)

const ACTIONS = {
  SET_DASHBOARD_DATA: "set-dashboard-data",
  SET_SELECTED_NODE: "set-selected-node",
} as const

type TState = {
  dashboardData: TClusterOverview | undefined
  selectedNode: number | undefined
}
type TAction = {
  type: ValueOf<typeof ACTIONS>
  payload?: any
}

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case ACTIONS["SET_DASHBOARD_DATA"]: {
      return { ...state, dashboardData: action.payload }
    }
    case ACTIONS["SET_SELECTED_NODE"]: {
      return { ...state, selectedNode: action.payload }
    }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

const initialState: TState = {
  dashboardData: undefined,
  selectedNode: undefined,
}

function OverviewContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setDashboardData = useCallback((data: TClusterOverview) => {
    dispatch({ type: ACTIONS["SET_DASHBOARD_DATA"], payload: data })
  }, [])

  const setSelectedNode = useCallback((nodeId: number) => {
    dispatch({ type: ACTIONS["SET_SELECTED_NODE"], payload: nodeId })
  }, [])

  const value = useMemo(() => ({ state, setDashboardData, setSelectedNode }), [
    state,
    setDashboardData,
    setSelectedNode,
  ])
  return (
    <ClusterOverviewContext.Provider value={value}>
      {children}
    </ClusterOverviewContext.Provider>
  )
}

function useOverviewContext() {
  const context = useContext(ClusterOverviewContext)
  if (!context) {
    throw new Error(
      `useOverviewContext must be used within OverviewContextProvider`
    )
  }
  return context
}

export { OverviewContextProvider, useOverviewContext }
