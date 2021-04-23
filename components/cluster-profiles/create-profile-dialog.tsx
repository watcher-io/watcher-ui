import { Dialog, Transition, Switch } from "@headlessui/react"
import { Fragment, useRef, useEffect, useState } from "react"
//@ts-expect-error
import SearchIcon from "~/assets/icons/search.svg"

interface CreateProfileDialogProps {
  open: boolean
  onClose: () => void
}

export default function CreateProfileDialog({
  open,
  onClose,
}: CreateProfileDialogProps) {
  const [enabled, setEnabled] = useState(true)
  const cancelButtonRef = useRef()

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-4 text-left align-middle transition-all transform bg-skin-main shadow-xl rounded-2xl border border-skin-fill">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-skin-base px-4"
                >
                  Create Profile
                </Dialog.Title>
                <div className="bg-skin-main p-2">
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 px-3 py-1">
                      <input
                        className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        id="grid-first-name"
                        type="text"
                        placeholder="Demo Profile"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 py-1">
                      <input
                        className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        id="grid-first-name"
                        type="text"
                        placeholder="BabyDinosaur"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 py-1">
                      <input
                        className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        id="grid-first-name"
                        type="text"
                        placeholder="192.168.1.1, 192.168.1.2, ..."
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 py-1">
                      <input
                        className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        id="grid-first-name"
                        type="text"
                        placeholder="password"
                      />
                    </div>
                  </div>
                  <Switch.Group>
                    <div className="flex items-center px-3 py-1">
                      <Switch
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        className={`${
                          enabled ? "bg-skin-button-accent" : "bg-skin-fill"
                        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                      >
                        <span
                          className={`transform transition ease-in-out  ${
                            enabled
                              ? "translate-x-6 bg-skin-main"
                              : "translate-x-1 duration-100 bg-skin-muted"
                          } inline-block w-4 h-4 transform rounded-full transition-transform`}
                        />
                      </Switch>
                      <Switch.Label className="ml-4 text-skin-base" passive>
                        TLS
                      </Switch.Label>
                    </div>
                  </Switch.Group>
                  <Transition
                    show={enabled}
                    appear
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="flex flex-wrap">
                      <div className="relative text-gray-600 w-full md:w-1/2 px-3 py-1">
                        <input
                          type="search"
                          name="search"
                          placeholder="CA Certificate"
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 top-0 mt-3 mr-4"
                        >
                          <SearchIcon className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
                        Something
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="relative text-gray-600 w-full md:w-1/2 px-3 py-1">
                        <input
                          type="search"
                          name="search"
                          placeholder="SSL Certificate"
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 top-0 mt-3 mr-4"
                        >
                          <SearchIcon className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
                        Something
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      <div className="relative text-gray-600 w-full md:w-1/2 px-3 py-1">
                        <input
                          type="search"
                          name="search"
                          placeholder="SSL Key"
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 top-0 mt-3 mr-4"
                        >
                          <SearchIcon className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
                        Something
                      </div>
                    </div>
                    <div className="flex justify-start w-full px-3 py-1">
                      <button className="bg-skin-button-accent p-1.5 text-xs w-16 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100">
                        upload
                      </button>
                    </div>
                  </Transition>
                  <div className="flex justify-end w-full px-3 py-1">
                    <button
                      className="bg-skin-button-accent p-1.5 text-sm w-16 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100"
                      onClick={onClose}
                    >
                      save
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
