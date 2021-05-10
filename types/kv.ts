export type TPutRequest = {
  key: string
  value: string
}

export type TGetRequest = {
  key: string
}

export type TDeleteRequest = {
  key: string
  prefix: boolean
}

export type TCompactRequest = {
  revision: number
}

export type TOptions = "Get" | "Put" | "Delete" | "Compact"
