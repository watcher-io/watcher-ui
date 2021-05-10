import { useQuery } from "react-query"
import { dashboard } from "~/utils/api-routes"
import { useAuthClient } from "~/context/auth-context"
import { Response } from "~/types/common"

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
