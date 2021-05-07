import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs"
import * as React from "react"

function PutHeaderPanel() {
  return (
    <div className="w-full text-skin-base">
      <div className="w-full flex gap-2">
        <div className="w-20">Cluster ID</div>
        <div className="flex-1">: 3b1eda34-4492-48b9-abdf-4c7655809da4</div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-20">Member ID</div>
        <div className="flex-1">: 3b1eda34-4492-48b9-abdf-4c7655809da4</div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-20">Raft Term</div>
        <div className="flex-1">: 2</div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-20">Revision</div>
        <div className="flex-1">: 42</div>
      </div>
    </div>
  )
}

function PutResultPanel() {
  return (
    <>
      {" "}
      <p className="text-base font-semibold">Previous Key Value</p>
      <div className="w-full text-skin-base">
        <div className="w-full flex gap-2">
          <div className="w-28">Key</div>
          <div className="flex-1">: foo</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Value</div>
          <div className="flex-1">: bar</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Version</div>
          <div className="flex-1">: 4</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Create revision</div>
          <div className="flex-1">: 20</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Mod revision</div>
          <div className="flex-1">: 21</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-28">Lease</div>
          <div className="flex-1">: 3b1eda34-4492-48b9-abdf-4c7655809da4</div>
        </div>
      </div>
    </>
  )
}

function Put() {
  return (
    <div className="w-full bg-skin-main rounded-lg p-4 text-skin-base">
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
                <PutHeaderPanel />
              </TabPanel>
              <TabPanel>
                <PutResultPanel />
              </TabPanel>
            </TabPanels>
          </React.Fragment>
        )}
      </Tabs>
    </div>
  )
}

export default Put
