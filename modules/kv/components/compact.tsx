import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs"
import * as React from "react"

import { useKVResponse } from "~/hooks/useKVResponse"
import { TCompactResponseData } from "~/types/kv"

interface CompactHeaderPanelProps {
  data: TCompactResponseData["header"]
}
function CompactHeaderPanel({ data }: CompactHeaderPanelProps) {
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

function Compact() {
  const compactResponse = useKVResponse<TCompactResponseData | null>(
    "Compact",
    null
  )
  return (
    <div className="w-full bg-skin-main rounded-lg p-4 text-skin-base">
      {compactResponse ? (
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
              </TabList>
              <TabPanels className="pt-2">
                <TabPanel>
                  <CompactHeaderPanel data={compactResponse["header"]} />
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

export default Compact
