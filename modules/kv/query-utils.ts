import { useQuery, useMutation } from "react-query"
import { keyValue } from "~/utils/api-routes"
import { useAuthClient } from "~/context/auth-context"
import {
  TCompactRequest,
  TDeleteRequest,
  TGetRequest,
  TPutRequest,
} from "~/types/kv"
import { Response } from "~/types/common"

function usePutMutation(id: string) {
  const client = useAuthClient()
  return useMutation(async (body: TPutRequest) => {
    if (!id) return
    return await client
      .post<Response>(keyValue.PUT(id), body)
      .then((res) => res.data)
  })
}

function useGetMutation(id: string) {
  const client = useAuthClient()
  return useMutation(async (body: TGetRequest) => {
    if (!id) return
    return await client
      .post<Response>(keyValue.GET(id), body)
      .then((res) => res.data)
  })
}

function useDeleteMutation(id: string) {
  const client = useAuthClient()
  return useMutation(async (body: TDeleteRequest) => {
    if (!id) return
    return await client
      .post<Response>(keyValue.DELETE(id), body)
      .then((res) => res.data)
  })
}

function useCompactMutation(id: string) {
  const client = useAuthClient()
  return useMutation(async (body: TCompactRequest) => {
    if (!id) return
    return await client
      .post<Response>(keyValue.COMPACT(id), body)
      .then((res) => res.data)
  })
}

export { useGetMutation, usePutMutation, useDeleteMutation, useCompactMutation }
