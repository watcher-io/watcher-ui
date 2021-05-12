import axios from "axios"
import { useQuery } from "react-query"

import { Response } from "~/types/common"
import { auth } from "~/utils/api-routes"

function useUserExistsQuery() {
  return useQuery("user-existence", async () => {
    return await axios
      .get<Response<boolean>>(auth.CHECK_USER_EXISTENCE)
      .then((res) => res.data)
  })
}

export { useUserExistsQuery }
