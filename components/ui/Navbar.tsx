import NextLink from 'next/link';

import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';


export const Navbar: React.FC = () => {

  return (
    <AppBar position='sticky' elevation={0}>
        <Toolbar>
            <ChildCareOutlinedIcon sx={{ marginRight: 1}}/>
            <NextLink href='/' passHref legacyBehavior>
              <Link underline='none' color='white'>
                <Typography variant='h6'>Custom Jira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
