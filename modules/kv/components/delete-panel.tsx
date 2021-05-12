import { Popover, Switch, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import * as React from "react"

import { useKVContext } from "../context"
import { useDeleteMutation } from "../query-utils"

import { TDeleteRequest } from "~/types/kv"

function DeletePanel() {
  const router = useRouter()
  const { setResponse } = useKVContext()
  const { mutate } = useDeleteMutation(router.query["profileId"] as string)
  const formik = useFormik<TDeleteRequest>({
    initialValues: {
      key: "",
      range: "0",
      from_key: false,
      prefix: false,
    },
    onSubmit: (data) => {
      mutate(data, {
        onSuccess: (res) => {
          setResponse(res.data)
        },
      })
    },
  })
  return (
    <form className="flex-1 flex gap-2" onSubmit={formik.handleSubmit}>
      <input
        key="key"
        className="appearance-none block w-64 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
        name="key"
        placeholder="foo"
        value={formik.values.key}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
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
                          placeholder="42"
                          value={formik.values.range}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <Switch.Group>
                          <div className="flex items-center">
                            <Switch.Label className="mr-4">Prefix</Switch.Label>
                            <Switch
                              checked={formik.values.prefix}
                              onChange={() => {
                                formik.setFieldValue(
                                  "prefix",
                                  !formik.values.prefix
                                )
                              }}
                              className={`${
                                formik.values.prefix
                                  ? "bg-blue-600"
                                  : "bg-gray-200"
                              } relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <span
                                className={`${
                                  formik.values.prefix
                                    ? "translate-x-4"
                                    : "translate-x-1"
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
                              checked={formik.values.from_key}
                              onChange={() => {
                                formik.setFieldValue(
                                  "from_key",
                                  !formik.values.from_key
                                )
                              }}
                              className={`${
                                formik.values.from_key
                                  ? "bg-blue-600"
                                  : "bg-gray-200"
                              } relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <span
                                className={`${
                                  formik.values.from_key
                                    ? "translate-x-4"
                                    : "translate-x-1"
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
      <div className="ml-auto my-auto px-2">
        <button
          className="bg-skin-button-accent p-1.5 text-sm w-24 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100"
          type="submit"
        >
          Apply
        </button>
      </div>
    </form>
  )
}

export default DeletePanel
