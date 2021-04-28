import * as React from "react"
import { useRouter } from "next/router"

function SideNav({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const { profileId } = router.query
  const currentPath = router.asPath

  return (
    <div className="relative width-full flex flex-row">
      <div className="bg-skin-main text-skin-base">
        <nav>
          <a
            key={`overview-${profileId}`}
            href={`/cluster-profiles/overview/${profileId}`}
            className={`${
              currentPath === `/cluster-profiles/overview/${profileId}`
                ? "text-skin-button-accent pointer-events-none cursor-default"
                : "text-skin-base"
            } opacity-80 hover:opacity-100 block py-2.5 px-4`}
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
          <a
            key={`kv-store-${profileId}`}
            href={`/cluster-profiles/kv-store/${profileId}`}
            className={`${
              currentPath === `/cluster-profiles/kv-store/${profileId}`
                ? "text-skin-button-accent pointer-events-none cursor-default"
                : "text-skin-base"
            } opacity-80 hover:opacity-100 block py-2.5 px-4`}
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
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              />
            </svg>
          </a>
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default SideNav
