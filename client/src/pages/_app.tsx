import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "@/modules/apolloClient"
import { AuthProvider } from '@/context/authContext';

export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AuthProvider>
}