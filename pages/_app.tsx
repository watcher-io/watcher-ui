import Head from "next/head"
import * as React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Hydrate } from "react-query/hydration"
import { AuthContextProvider, useAuthCheck } from "~/context/auth-context"
import "~/styles/globals.css"

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("mocks")
}

function WithAuthCheck({ component }) {
  useAuthCheck()
  return component
}

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef<QueryClient | null>(null)
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>watcher.io</title>
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthContextProvider>
            <WithAuthCheck component={<Component {...pageProps} />} />
          </AuthContextProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
