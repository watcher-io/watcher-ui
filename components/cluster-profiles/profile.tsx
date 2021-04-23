import type { ReactElement, MouseEventHandler } from "react"

interface CardItemProps {
  name: string
  endpoints: string[]
  ssl: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

function CardItem(props: CardItemProps) {
  return (
    <div className="md:w-1/2 xl:w-1/3 sm:w-full p-2" onClick={props.onClick}>
      <div className="bg-skin-main p-4 rounded-lg cursor-pointer">
        <h2 className="text-lg text-skin-base font-medium title-font mb-2">
          {props.name}
        </h2>
        <p className="leading-relaxed text-skin-base text-base">
          {props.endpoints.join(", ")}
        </p>
        <p className="leading-relaxed text-skin-base text-base">
          {JSON.stringify(props.ssl)}
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
