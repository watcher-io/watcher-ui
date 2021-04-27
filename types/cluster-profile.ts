import type { Response } from "./common"

export type TClusterProfile = {
  id: string
  name: string
  endpoints: string[]
  username: string
  password: string
  server_name: string
  created_at: number
  tls: boolean
  ca_file: string
  cert_file: string
  key_file: string
}

export type FetchProfileResponse = Response<TClusterProfile[]>
