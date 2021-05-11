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
