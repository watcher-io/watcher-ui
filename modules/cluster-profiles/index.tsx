import * as React from "react"
import { useQuery } from "react-query"

import CreateProfileDialog from "./components/create-profile-dialog"
import Profile from "./components/profile"

import Layout from "~/components/layout"
import { useAuthClient } from "~/context/auth-context"
import type { FetchProfileResponse } from "~/types/cluster-profile"
import { clusterProfile } from "~/utils/api-routes"
import { isBrowser } from "~/utils/misc"

function ClusterProfiles() {
  const client = useAuthClient()

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const { data: profileList, isSuccess } = useQuery({
    queryKey: "cluster-profile-list",
    queryFn: async () => {
      return await client
        .get<FetchProfileResponse>(clusterProfile.FETCH)
        .then((res) => res.data.data)
    },
    enabled: isBrowser,
  })

  const handleViewClick = (id: string) => (
    event: React.MouseEvent<SVGElement>
  ) => {
    event.stopPropagation()
    console.log(`Viewing ${id}`)
    setIsDialogOpen(true)
  }

  return (
    <Layout>
      <div className="w-full bg-skin-fill space-y-4">
        <div className="flex space-x-4 justify-center md:justify-start">
          <button
            className="bg-skin-button-accent p-1.5 text-sm w-32 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100"
            onClick={() => setIsDialogOpen(true)}
          >
            Create Profile
          </button>
          <div className="relative text-skin-muted focus-within:text-skin-base w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="profileName"
              className="py-2 text-sm text-skin-muted bg-skin-main rounded-md pl-10 focus:outline-none focus:text-skin-base w-full"
              placeholder="Profile Name"
            />
          </div>
        </div>
        <Profile.CardContainer>
          {isSuccess
            ? profileList.map((profile) => (
                <Profile.CardItem
                  key={profile.id}
                  {...profile}
                  onViewClick={handleViewClick(profile.id)}
                />
              ))
            : null}
        </Profile.CardContainer>
        <CreateProfileDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </Layout>
  )
}

export default ClusterProfiles
