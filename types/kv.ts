export type TPutRequest = {
  key: string
  value: string
}

export type TGetRequest = {
  key: string
  prefix: boolean
  limit: number
  revision: number
  from_key: boolean
  keys_only: boolean
  range: string
  count_only: boolean
}

export type TDeleteRequest = {
  key: string
  prefix: boolean
  from_key: boolean
  range: string
}

export type TCompactRequest = {
  revision: number
}

export type TOptions = "Get" | "Put" | "Delete" | "Compact"

export type TPutResponseData = {
  header: {
    cluster_id: number
    member_id: number
    revision: number
    raft_term: number
  }
  new_kv: boolean
  previous_kv: {
    key: string
    value: string
    version: number
    create_revision: number
    mod_revision: number
    lease: number
  }
}

export type TGetResponseData = {
  header: {
    cluster_id: number
    member_id: number
    revision: number
    raft_term: number
  }
  more: boolean
  count: number
  key_values?: Array<{
    key: string
    value: string
    version: number
    create_revision: number
    mod_revision: number
    lease: number
  }>
}

export type TDeleteResponseData = {
  header: {
    cluster_id: number
    member_id: number
    revision: number
    raft_term: number
  }
  count: number
}

export type TCompactResponseData = {
  header: {
    cluster_id: number
    member_id: number
    revision: number
    raft_term: number
  }
}
