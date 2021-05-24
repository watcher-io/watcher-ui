import { useRouter } from "next/router"
import { useEffect } from "react"

import Graph from "./components/graph"
import { OverviewContextProvider, useOverviewContext } from "./context"
import { useDashboardQuery } from "./query-utils"

import Layout from "~/components/layout"

function ProfileDetails() {
  const { state } = useOverviewContext()

  const { selectedNode } = state

  return (
    <>
      {selectedNode ? (
        <>
          <p>ID: {selectedNode.id}</p>
          <p>Name: {selectedNode.name}</p>
          <p>Peer URLs: {JSON.stringify(selectedNode.peer_urls)}</p>
          <p>Client URLs: {JSON.stringify(selectedNode.client_urls)}</p>
          <p>Is Learner: {JSON.stringify(selectedNode.is_learner)}</p>
          <p>Version: {selectedNode.version}</p>
          <p>DB Size: {selectedNode.db_size}</p>
          <p>Raft Index: {selectedNode.raft_index}</p>
          <p>Raft Term: {selectedNode.raft_term}</p>
        </>
      ) : (
        <p>Select a node</p>
      )}
    </>
  )
}

function Overview() {
  const router = useRouter()
  const { profileId } = router.query
  const { data } = useDashboardQuery(profileId as string)
  const { setDashboardData, state } = useOverviewContext()

  const { dashboardData } = state

  useEffect(() => {
    setDashboardData(data)
  }, [data])

  return (
    <Layout sidenav>
      <div className="flex flex-col gap-2 w-full h-full text-skin-base">
        <div className="flex w-full h-32 gap-4 px-6">
          <div className="h-full w-52">
            <div className="bg-skin-main w-full h-full rounded-lg flex flex-col p-2">
              <div className="mx-auto">cluster has leader</div>
              <div className="flex-1 flex justify-center items-center">
                {dashboardData?.leader ? "YES" : "NO"}
              </div>
            </div>
          </div>
          <div className="h-full w-52">
            <div className="bg-skin-main w-full h-full rounded-lg flex flex-col p-2">
              <div className="mx-auto">no. of cluster members</div>
              <div className="flex-1 flex justify-center items-center">
                {dashboardData?.members ? dashboardData.members.length : 0}
              </div>
            </div>
          </div>
          <div className="h-full w-52">
            <div className="bg-skin-main w-full h-full rounded-lg flex flex-col p-2">
              <div className="mx-auto">cluster snapshot</div>
              <div className="flex-1 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-4 px-6 py-2">
          <div className="flex-3 ">
            <div className="relative bg-skin-main w-full h-full rounded-lg">
              <Graph />
            </div>
          </div>

          <div className="flex-2 flex flex-col w-full h-full gap-2">
            <div className="bg-skin-main rounded-lg p-4">
              <ProfileDetails />
            </div>
            <div className="w-full h-10 bg-skin-main rounded-lg flex gap-2 items-center px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function OverviewWithContext() {
  return (
    <OverviewContextProvider>
      <Overview />
    </OverviewContextProvider>
  )
}

export default OverviewWithContext
