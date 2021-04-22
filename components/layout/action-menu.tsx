import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { LogoutIcon } from "@heroicons/react/outline"
import { useAuthContext } from "~/context/auth-context"

export default function ActionMenu() {
  const { user, setUser } = useAuthContext()
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-skin-base bg-skin-main rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
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
              className="absolute right-0 w-32 mt-2 origin-top-right bg-skin-main rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`bg-skin-fill ${
                        active ? "text-skin-base" : "text-skin-muted"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      {user && `${user.first_name} ${user.last_name}`}
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`bg-skin-fill ${
                        active ? "text-skin-base" : "text-skin-muted"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={() => {
                        setUser(null)
                      }}
                    >
                      <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
