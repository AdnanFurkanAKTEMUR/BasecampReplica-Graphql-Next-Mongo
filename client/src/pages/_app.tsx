import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "@/modules/apolloClient"
import { AuthProvider } from '@/context/authContext';
import Sidebar from '@/components/Layout/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return <AuthProvider>
            <ApolloProvider client={client}>
              <Sidebar>
                <Component {...pageProps} />
              </Sidebar>
            </ApolloProvider>
          </AuthProvider>
}