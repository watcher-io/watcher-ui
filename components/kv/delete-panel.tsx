import { Popover, Transition, Switch } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import * as React from "react"

function DeletePanel() {
  const [enabled, setEnabled] = React.useState(false)
  return (
    <div className="flex-1 flex gap-2">
      <input
        key="key"
        className="appearance-none block w-64 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
        name="key"
        type="text"
        placeholder="foo"
      />
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Options</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
              >
                <div className="overflow-hidden rounded-lg shadow-lg bg-skin-main text-skin-base border border-skin-fill">
                  <div className="p-4">
                    <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
                      <div className="flex gap-4">
                        <input
                          key="range"
                          className="appearance-none block w-28 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          name="range"
                          type="text"
                          placeholder="42"
                        />
                        <Switch.Group>
                          <div className="flex items-center">
                            <Switch.Label className="mr-4">Prefix</Switch.Label>
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={`${
                                enabled ? "bg-blue-600" : "bg-gray-200"
                              } relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <span
                                className={`${
                                  enabled ? "translate-x-4" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                              />
                            </Switch>
                          </div>
                        </Switch.Group>
                        <Switch.Group>
                          <div className="flex items-center">
                            <Switch.Label className="mr-4">
                              From Key
                            </Switch.Label>
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={`${
                                enabled ? "bg-blue-600" : "bg-gray-200"
                              } relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <span
                                className={`${
                                  enabled ? "translate-x-4" : "translate-x-1"
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                              />
                            </Switch>
                          </div>
                        </Switch.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default DeletePanel
