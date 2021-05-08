import { useQuery } from "react-query"
import { auth } from "~/utils/api-routes"
import axios from "axios"
import { Response } from "~/types/common"

function useUserExistsQuery() {
  return useQuery("user-existence", async () => {
    return await axios
      .get<Response<boolean>>(auth.CHECK_USER_EXISTENCE)
      .then((res) => res.data)
  })
}

export { useUserExistsQuery }
