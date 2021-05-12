import { useQuery } from "react-query"

import { useAuthClient } from "~/context/auth-context"
import { Response } from "~/types/common"
import { dashboard } from "~/utils/api-routes"

function useDashboardQuery(id: string) {
  const client = useAuthClient()
  return useQuery(["dashboard-query", id], async () => {
    if (!id) return
    return await client
      .get<Response>(dashboard.VIEW(id))
      .then((res) => res.data)
  })
}

export { useDashboardQuery }
