import "~/styles/globals.css"
import * as React from "react"
import { AuthContextProvider } from "~/context/auth-context"
import { Hydrate } from "react-query/hydration"
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import Head from "next/head"

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("mocks")
}

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef<QueryClient | null>(null)
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>watcher.io</title>
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
