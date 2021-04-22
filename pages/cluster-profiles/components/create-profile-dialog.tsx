import * as React from "react"
import { Switch, Transition } from "@headlessui/react"
//@ts-expect-error
import SearchIcon from "~/assets/icons/search.svg"

function CreateProfileDialog() {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <div className="bg-skin-main p-5">
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
              className={`transform transition ease-in-out duration-200 ${
                enabled
                  ? "translate-x-6 bg-skin-main"
                  : "translate-x-1 bg-skin-muted"
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
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-200"
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
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
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
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
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
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <SearchIcon className="h-4 w-4 fill-current" />
            </button>
          </div>
          <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
            Something
          </div>
        </div>
        <div className="flex justify-between w-full px-3 py-1">
          <button className="bg-skin-button-accent p-1.5 text-xs w-16 font-semibold tracking-wider text-skin-base rounded hover:opacity-80">
            upload
          </button>
          <button className="bg-skin-button-accent p-1.5 text-xs w-16 font-semibold tracking-wider text-skin-base rounded hover:opacity-80">
            save
          </button>
        </div>
      </Transition>
    </div>
  )
}

export default CreateProfileDialog
