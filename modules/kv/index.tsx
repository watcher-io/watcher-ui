import { KVContextProvider } from "./context"
import KVScreen from "./kv"

function KVWithContext() {
  return (
    <KVContextProvider>
      <KVScreen />
    </KVContextProvider>
  )
}

export default KVWithContext
