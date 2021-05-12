import { EyeIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import type { ReactElement, MouseEvent } from "react"

import type { TClusterProfile } from "~/types/cluster-profile"

type CardItemProps = TClusterProfile & {
  onViewClick: (event: MouseEvent<SVGSVGElement>) => void
}

function CardItem(props: CardItemProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/cluster-profiles/overview/${props.id}`)
  }

  return (
    <div className="md:w-1/2 xl:w-1/3 sm:w-full p-2" onClick={handleCardClick}>
      <div className="bg-skin-main p-4 rounded-lg cursor-pointer w-full h-full">
        <h2 className="text-lg text-skin-base font-medium title-font mb-2">
          <div className="flex justify-between">
            {props.name}
            <EyeIcon
              className="h6 w-6 text-skin-base hover:text-skin-button-accent"
              onClick={props.onViewClick}
            />
          </div>
        </h2>
        <p className="leading-relaxed text-skin-base text-base">
          {props.endpoints.join(", ")}
        </p>
        <p className="leading-relaxed text-skin-base text-base">
          TLS: {JSON.stringify(props.tls)}
        </p>
      </div>
    </div>
  )
}

interface ProfileCardContainerProps {
  children: ReactElement<CardItemProps> | Array<ReactElement<CardItemProps>>
}

function CardContainer({ children }: ProfileCardContainerProps) {
  return <div className="flex flex-wrap -m-2">{children}</div>
}

const Profile = { CardContainer, CardItem }

export default Profile
