import * as React from "react"
import SideNav from "./sidenav"

interface LayoutProps {
  children: React.ReactNode
  sidenav?: boolean
}

function Layout({ children, sidenav }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-skin-fill">
      <nav className="bg-skin-main">
        <div className="min-w-screen mx-auto px-2">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <a
                  href="#"
                  className="flex items-center py-2 px-2 space-x-2 text-skin-base hover:text-opacity-80"
                >
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
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-bold">Watcher</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {sidenav ? (
        <SideNav>
          <div className="py-2 flex mx-auto flex-1 w-full h-full max-w-5xl">
            {children}
          </div>
        </SideNav>
      ) : (
        <div className="py-2 flex mx-auto flex-1 w-full h-full max-w-5xl">
          {children}
        </div>
      )}
    </div>
  )
}

export default Layout
