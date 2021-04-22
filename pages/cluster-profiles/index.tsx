import * as React from "react"
import CreateProfileDialog from "./components/create-profile-dialog"
import Profile from "./components/profile"
import Layout from "~/components/layout"
import { useRouter } from "next/router"

function ClusterProfiles() {
  const router = useRouter()
  const profileCardProps = {
    name: "Custer Profile",
    endpoints: ["1092.168.1.1", "192.168.1.2"],
    ssl: false,
    onClick: () => {
      router.push("/cluster-profiles/overview")
    },
  }

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <Layout>
      <div className="min-h-screen w-full bg-skin-fill space-y-4 p-2">
        <div className="flex space-x-4 justify-center md:justify-start">
          <button
            className="bg-skin-button-accent p-1.5 text-sm w-32 font-normal tracking-wider text-skin-base rounded hover:opacity-80"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
          <Profile.CardItem {...profileCardProps} />
          <Profile.CardItem {...profileCardProps} />
          <Profile.CardItem {...profileCardProps} />
          <Profile.CardItem {...profileCardProps} />
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
