import Layout from "~/components/layout"
import { useAuthCheck } from "~/context/auth-context"

function Overview() {
  useAuthCheck()
  return (
    <Layout sidenav>
      <div>Overview</div>
    </Layout>
  )
}

export default Overview
