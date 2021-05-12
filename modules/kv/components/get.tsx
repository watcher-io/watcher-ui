import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import * as React from "react"
import { useKVResponse } from "~/hooks/useKVResponse"
import { TGetResponseData } from "~/types/kv"

interface GetHeaderPanelProps {
  data: TGetResponseData["header"]
}

function GetHeaderPanel({ data }: GetHeaderPanelProps) {
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

type TResultRow = {
  key: string
  value: string
  version: number
  createRevision: number
  modRevision: number
  lease: any
}

interface GetResultPanelProps {
  data: TGetResponseData["key_values"]
  more: boolean
  count: number
}

function GetResultPanel({ data, more, count }: GetResultPanelProps) {
  // const data = Array<TResultRow>(10).fill({
  //   key: "foo",
  //   value: "bar",
  //   version: 5,
  //   createRevision: 11,
  //   modRevision: 7,
  //   lease: null,
  // })

  return (
    <div className="grid grid-cols-3">
      <div className="relative overflow-y-auto scrollbar col-span-2 h-64">
        {data ? (
          <table className="text-left w-full">
            <thead className="flex w-full sticky top-0 bg-skin-main">
              <tr className="flex w-full">
                <th className="px-2 py-4 flex-1">Key</th>
                <th className="px-2 py-4 flex-1">Value</th>
                <th className="px-2 py-4 flex-1">Version</th>
                <th className="px-2 py-4 flex-2">Create Revision</th>
                <th className="px-2 py-4 flex-2">Mod Revision</th>
                <th className="px-2 py-4 flex-1">Lease</th>
              </tr>
            </thead>
            <tbody className="flex flex-col items-center justify-between w-full box-border">
              {data.map((row, index) => (
                <tr key={index} className="flex w-full">
                  <td className="px-2 py-1 flex-1">{row.key}</td>
                  <td className="px-2 py-1 flex-1">{row.value}</td>
                  <td className="px-2 py-1 flex-1">{row.version}</td>
                  <td className="px-2 py-1 flex-2">{row.create_revision}</td>
                  <td className="px-2 py-1 flex-2">{row.mod_revision}</td>
                  <td className="px-2 py-1 flex-1">{row.lease}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data</p>
        )}
      </div>
      <div className="col-span-1 pl-8">
        <div className="w-full flex gap-2">
          <div className="w-20">Count</div>
          <div className="flex-1">{`: ${count}`}</div>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-20">More</div>
          <div className="flex-1">{`: ${String(more)}`} </div>
        </div>
      </div>
    </div>
  )
}

function Get() {
  const getResponse = useKVResponse<TGetResponseData | undefined>(
    "Get",
    undefined
  )
  return (
    <div className="w-full bg-skin-main rounded-lg p-4 text-skin-base">
      {getResponse ? (
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
                  <GetHeaderPanel data={getResponse.header} />
                </TabPanel>
                <TabPanel>
                  <GetResultPanel
                    data={getResponse.key_values}
                    more={getResponse.more}
                    count={getResponse.count}
                  />
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

export default Get
