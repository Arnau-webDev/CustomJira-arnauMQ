import { NextPage } from "next";

import { Typography } from '@mui/material'
import { Layout } from "../components/layouts";

const HomePage: NextPage = function Home() {
  return (
    <>
    <Layout>
      <Typography variant="h1" color="primary">Hello World</Typography>
    </Layout>
    </>
  )
}

export default HomePage;
