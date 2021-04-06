const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER || "http://0.0.0.0:8080"

const routes = {
  SIGNIN: `${BASE_URL}/api/v1/auth/login`,
}

export default routes
