import { useContext } from 'react';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

import { UIContext } from '../../context/ui/UiContext';

export const Navbar: React.FC = () => {

  const { openSideMenuFn } = useContext( UIContext );

  return (
    <AppBar position='sticky' elevation={0}>
        <Toolbar>
            <IconButton size='large' edge='start' onClick={openSideMenuFn}>
                <MenuOutlinedIcon />
            </IconButton>
            <Typography variant='h6'>OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}
