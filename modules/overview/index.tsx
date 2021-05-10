import Layout from "~/components/layout"
import Graph from "./components/graph"
import { useDashboardQuery } from "./query-utils"
import { useRouter } from "next/router"

function Overview() {
  const router = useRouter()
  const { profileId } = router.query
  const { data } = useDashboardQuery(profileId as string)
  console.log({ data: data.data })
  return (
    <Layout sidenav>
      <div className="flex gap-2 w-full h-full text-skin-base">
        <div className="flex-3">
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex-1 flex w-full h-full gap-8">
              <div className="flex-1 w-full h-full py-4 px-6">
                <div className="bg-skin-main w-full h-full rounded-lg">
                  has leader?
                </div>
              </div>
              <div className="flex-1 w-full h-full py-4 px-6">
                <div className="bg-skin-main w-full h-full rounded-lg">
                  # nodes
                </div>
              </div>
            </div>
            <div className="flex-3 px-6 py-2">
              <div className="bg-skin-main w-full h-full rounded-lg">
                <Graph />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-2 flex flex-col w-full h-full gap-2 pt-4 pb-2">
          <div className="flex-2 bg-skin-main rounded-lg">profile details</div>
          <div className="flex-3 bg-skin-main rounded-lg">node details</div>
        </div>
      </div>
    </Layout>
  )
}

export default Overview
