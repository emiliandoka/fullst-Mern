import type { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import Layout from '../components/layout';
const Home: NextPage = () => {
  var x :string = "yoooo";
  return (
    <Layout seometa={
      <>
        <title>My dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </>
    }>
        <Heading>Wellcom</Heading>
    </Layout>
  )
}

export default Home
