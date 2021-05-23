import { Response } from "./common"

export type TClusterMember = {
  id: number
  name: string
  db_size: number
  version: string
  alarms: any
  client_urls: Array<string>
  peer_urls: Array<string>
  raft_index: number
  raft_term: number
  is_learner: boolean
}

export type TClusterOverview = {
  members: Array<TClusterMember>
  leader: number
  id: number
}

export type TDashboardResponse = Response<TClusterOverview>
