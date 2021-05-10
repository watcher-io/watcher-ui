import { Menu, Transition } from "@headlessui/react"
import Layout from "~/components/layout"
import { Fragment } from "react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import * as React from "react"
import { ElementType } from "~/types/common"
import PutScreen from "./components/put"
import GetScreen from "./components/get"
import DeleteScreen from "./components/delete"
import GetPanel from "./components/get-panel"
import PutPanel from "./components/put-panel"
import DeletePanel from "./components/delete-panel"
import CompactPanel from "./components/compact-panel"
import CompactScreen from "./components/compact"
import { useKVContext } from "./context"
import { TOptions } from "~/types/kv"

const options: TOptions[] = ["Get", "Put", "Delete", "Compact"]

function KVStore() {
  const {
    state: { selectedOption },
    selectOption,
  } = useKVContext()

  let CurrentScreen, CurrentPanel
  if (selectedOption === "Get") {
    CurrentScreen = GetScreen
    CurrentPanel = GetPanel
  } else if (selectedOption === "Put") {
    CurrentScreen = PutScreen
    CurrentPanel = PutPanel
  } else if (selectedOption === "Delete") {
    CurrentScreen = DeleteScreen
    CurrentPanel = DeletePanel
  } else if (selectedOption === "Compact") {
    CurrentScreen = CompactScreen
    CurrentPanel = CompactPanel
  }

  return (
    <Layout sidenav>
      <div className="flex flex-col w-full h-full gap-4 p-4">
        <div className="h-12 w-full bg-skin-main rounded-lg flex items-center text-skin-base">
          <Menu as="div" className="relative inline-block text-left p-2">
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-skin-base bg-skin-fill opacity-80 hover:opacity-100 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {selectedOption}
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100 text-skin-button-accent"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="absolute left-0 w-28 mt-2 z-10 origin-top-right bg-skin-main border border-skin-fill divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="px-1 py-1 ">
                      {options.map((option) => (
                        <Menu.Item
                          key={option}
                          disabled={option === selectedOption}
                        >
                          {({ active, disabled }) => (
                            <button
                              className={`${active ? "bg-skin-fill" : ""} ${
                                disabled ? "bg-skin-fill opacity-60" : ""
                              } text-skin-base group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              onClick={() => selectOption(option)}
                            >
                              {option}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
          <CurrentPanel />
          <div className="ml-auto p-2">
            <button className="bg-skin-button-accent p-1.5 text-sm w-24 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100">
              Apply
            </button>
          </div>
        </div>
        <div className="flex-1 w-full h-full">
          <CurrentScreen />
        </div>
      </div>
    </Layout>
  )
}

export default KVStore
