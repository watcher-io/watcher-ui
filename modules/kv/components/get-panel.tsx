import { Popover, Switch, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import * as React from "react"
import { useFormik } from "formik"
import { TGetRequest } from "~/types/kv"
import { useKVContext } from "../context"
import { useGetMutation } from "../query-utils"
import { useRouter } from "next/router"

function GetPanel() {
  const { setResponse } = useKVContext()
  const router = useRouter()

  const { mutate } = useGetMutation(router.query["profileId"] as string)

  const formik = useFormik<TGetRequest>({
    initialValues: {
      key: "",
      limit: 0,
      range: "1",
      revision: 1,
      count_only: false,
      from_key: false,
      keys_only: false,
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
        placeholder="foo"
        name="key"
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
                          key="limit"
                          className="appearance-none block w-28 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          name="limit"
                          value={formik.values.limit}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <input
                          key="range"
                          className="appearance-none block w-28 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          name="range"
                          value={formik.values.range}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <input
                          key="revision"
                          className="appearance-none block w-28 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          type="number"
                          name="revision"
                          value={formik.values.revision}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <div className="flex gap-2">
                          <div className="flex flex-col">
                            <Switch.Group>
                              <div className="flex items-center">
                                <Switch.Label className="mr-4">
                                  Prefix
                                </Switch.Label>
                                <Switch
                                  name="prefix"
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
                                  } ml-auto relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
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
                                  Count
                                </Switch.Label>
                                <Switch
                                  name="count_only"
                                  checked={formik.values.count_only}
                                  onChange={() => {
                                    formik.setFieldValue(
                                      "count_only",
                                      !formik.values.count_only
                                    )
                                  }}
                                  className={`${
                                    formik.values.count_only
                                      ? "bg-blue-600"
                                      : "bg-gray-200"
                                  } ml-auto relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                  <span
                                    className={`${
                                      formik.values.count_only
                                        ? "translate-x-4"
                                        : "translate-x-1"
                                    } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                  />
                                </Switch>
                              </div>
                            </Switch.Group>
                          </div>
                          <div>
                            <Switch.Group>
                              <div className="flex items-center">
                                <Switch.Label className="mr-4">
                                  From Key
                                </Switch.Label>
                                <Switch
                                  name="from_key"
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
                                  } ml-auto relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
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
                            <Switch.Group>
                              <div className="flex items-center">
                                <Switch.Label className="mr-4">
                                  Keys Only
                                </Switch.Label>
                                <Switch
                                  name="keys_only"
                                  checked={formik.values.keys_only}
                                  onChange={() => {
                                    formik.setFieldValue(
                                      "keys_only",
                                      !formik.values.keys_only
                                    )
                                  }}
                                  className={`${
                                    formik.values.keys_only
                                      ? "bg-blue-600"
                                      : "bg-gray-200"
                                  } ml-auto relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                  <span
                                    className={`${
                                      formik.values.keys_only
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

export default GetPanel
