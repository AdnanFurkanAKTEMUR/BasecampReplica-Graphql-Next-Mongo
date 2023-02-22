import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_PROJECTS } from '@/modules/resolvers/projectsResolvers';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data, error, loading } = useQuery(GET_ALL_PROJECTS)
  if(data){
    console.log(data);
  }
  return (
    <>
      <Head>
        <title>Basecamp Replica</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        
      </main>
    </>
  )
}
