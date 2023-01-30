import Head from 'next/head';

import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../ui';

interface LayoutProps {
    title?: string,
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ title = 'OpenJira', children}) => {
  return (
    <Box sx={{flexGrow: 1}}>
        <Head>
            <title>{title}</title>
        </Head>
        
        <Navbar />
        <Sidebar />

        <Box sx={{ paddingTop: '10px'}}>
            { children }
        </Box>
    </Box>
  )
}
