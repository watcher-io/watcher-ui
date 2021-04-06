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
]
