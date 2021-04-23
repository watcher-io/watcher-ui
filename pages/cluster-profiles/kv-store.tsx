import Layout from "~/components/layout"
import { useAuthCheck } from "~/context/auth-context"

function KVStore() {
  useAuthCheck()
  return (
    <Layout sidenav>
      <div>KV Store</div>
    </Layout>
  )
}

export default KVStore
