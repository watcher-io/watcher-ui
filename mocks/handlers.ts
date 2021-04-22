import { rest } from "msw"
import { routes } from "utils"

export const handlers = [
  rest.post(routes.SIGNIN, (req, res, ctx) => {
    return res(
      ctx.json({
        message: "success",
      })
    )
  }),
  rest.post(routes.REGISTER_USER, (req, res, ctx) => {
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
