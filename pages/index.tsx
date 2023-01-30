import { NextPage } from "next";

import { Layout } from "../components/layouts";

import { Grid, Card, CardHeader, CardContent } from '@mui/material'
import { EntryList } from "../components/ui";

const HomePage: NextPage = function Home() {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2} >
        
        <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)'}}>
              <CardHeader title="Pending"/>
                <EntryList status={'pending'}/>
            </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)'}}>
              <CardHeader title="In Progress"/>
                <EntryList status={'pending'}/>
            </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
            <Card sx={{ height: 'calc(100vh - 100px)'}}>
              <CardHeader title="Completed"/>
                <EntryList status={'finished'}/>
            </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default HomePage;
