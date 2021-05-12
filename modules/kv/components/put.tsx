import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs"
import * as React from "react"
import { useKVResponse } from "~/hooks/useKVResponse"
import { TPutResponseData } from "~/types/kv"

interface PutHeaderPanelProps {
  data: TPutResponseData["header"]
}
function PutHeaderPanel({ data }: PutHeaderPanelProps) {
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

interface PutResultPaneProps {
  data: TPutResponseData["previous_kv"]
}

function PutResultPanel({ data }: PutResultPaneProps) {
  return (
    <>
      <p className="text-base font-semibold">Previous Key Value</p>
      <div className="w-full text-skin-base">
        <div className="w-full flex gap-2">
          <div className="w-28">Key</div>
          <div className="flex-1">{`: ${data.key}`}</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Value</div>
          <div className="flex-1">{`: ${data.value}`}</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Version</div>
          <div className="flex-1">{`: ${data.version}`}</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Create revision</div>
          <div className="flex-1">{`: ${data.create_revision}`}</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Mod revision</div>
          <div className="flex-1">{`: ${data.mod_revision}`}</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Lease</div>
          <div className="flex-1">{`: ${data.lease}`}</div>
        </div>
      </div>
    </>
  )
}

function Put() {
  const putResponse = useKVResponse<TPutResponseData | undefined>(
    "Put",
    undefined
  )

  return (
    <div className="w-full bg-skin-main rounded-lg p-4 text-skin-base">
      {putResponse ? (
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
                  <PutHeaderPanel data={putResponse.header} />
                </TabPanel>
                <TabPanel>
                  <PutResultPanel data={putResponse.previous_kv} />
                </TabPanel>
              </TabPanels>
            </React.Fragment>
          )}
        </Tabs>
      ) : (
        <p>Apply the request</p>
      )}
    </div>
  )
}

export default Put
