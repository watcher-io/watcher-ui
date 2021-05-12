import { rest } from "msw"

import { auth } from "~/utils/api-routes"

export const handlers = [
  rest.post(auth.SIGNIN, (req, res, ctx) => {
    return res(
      ctx.json({
        message: "success",
      })
    )
  }),
  rest.post(auth.REGISTER_USER, (req, res, ctx) => {
    return res(
      ctx.json({
        response_message: "user created successfully",
        data: {
          id: "test-id",
          user_name: "admin",
          first_name: "Test",
          last_name: "User",
        },
      })
    )
  }),
]
