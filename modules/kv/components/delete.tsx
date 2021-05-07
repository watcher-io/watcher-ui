import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs"
import * as React from "react"

function DeleteHeaderPanel() {
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

function DeleteResultPanel() {
  return (
    <div>
      <div className="w-full flex gap-2">
        <div className="w-40">Deleted Key Count</div>
        <div className="flex-1">: 5</div>
      </div>
    </div>
  )
}

function Delete() {
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
                <DeleteHeaderPanel />
              </TabPanel>
              <TabPanel>
                <DeleteResultPanel />
              </TabPanel>
            </TabPanels>
          </React.Fragment>
        )}
      </Tabs>
    </div>
  )
}

export default Delete
