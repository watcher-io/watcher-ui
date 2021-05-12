import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs"
import * as React from "react"

import { useKVResponse } from "~/hooks/useKVResponse"
import { TDeleteResponseData } from "~/types/kv"

interface DeleteHeaderPanelProps {
  data: TDeleteResponseData["header"]
}
function DeleteHeaderPanel({ data }: DeleteHeaderPanelProps) {
  return (
    <div className="w-full text-skin-base">
      <div className="w-full flex gap-2">
        <div className="w-20">Cluster ID</div>
        <div className="flex-1">{`: ${data.cluster_id}`}</div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-20">Member ID</div>
        <div className="flex-1">{`: ${data.member_id}`}</div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-20">Raft Term</div>
        <div className="flex-1">{`: ${data.raft_term}`}</div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-20">Revision</div>
        <div className="flex-1">{`: ${data.revision}`}</div>
      </div>
    </div>
  )
}

interface DeleteResultPanelProps {
  count: TDeleteResponseData["count"]
}
function DeleteResultPanel({ count }: DeleteResultPanelProps) {
  return (
    <div>
      <div className="w-full flex gap-2">
        <div className="w-40">Deleted Key Count</div>
        <div className="flex-1">{`: ${count}`}</div>
      </div>
    </div>
  )
}

function Delete() {
  const deleteResponse = useKVResponse<TDeleteResponseData | null>(
    "Delete",
    null
  )
  return (
    <div className="w-full bg-skin-main rounded-lg p-4 text-skin-base">
      {deleteResponse ? (
        <Tabs>
          {({ selectedIndex }) => (
            <React.Fragment>
              <TabList className="flex gap-2">
                <Tab
                  className={`rounded-lg w-20 bg-skin-fill opacity-80 hover:opacity-100 p-1 ${
                    selectedIndex === 0 ? "opacity-100" : ""
                  }`}
                >
                  Header
                </Tab>
                <Tab
                  className={`rounded-lg w-20 bg-skin-fill opacity-80 hover:opacity-100 p-1 ${
                    selectedIndex === 1 ? "opacity-100" : ""
                  }`}
                >
                  Result
                </Tab>
              </TabList>
              <TabPanels className="pt-2">
                <TabPanel>
                  <DeleteHeaderPanel data={deleteResponse["header"]} />
                </TabPanel>
                <TabPanel>
                  <DeleteResultPanel count={deleteResponse["count"]} />
                </TabPanel>
              </TabPanels>
            </React.Fragment>
          )}
        </Tabs>
      ) : (
        <p>Make a request</p>
      )}
    </div>
  )
}

export default Delete
