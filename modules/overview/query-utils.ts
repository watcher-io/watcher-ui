import { useQuery } from "react-query"

import { useAuthClient } from "~/context/auth-context"
import { TDashboardResponse } from "~/types/overview"
import { dashboard } from "~/utils/api-routes"

function useDashboardQuery(id: string) {
  const client = useAuthClient()
  return useQuery(["dashboard-query", id], async () => {
    if (!id) return
    return await client
      .get<TDashboardResponse>(dashboard.VIEW(id))
      .then((res) => res.data.data)
  })
}

export { useDashboardQuery }
