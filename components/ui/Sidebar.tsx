import { useContext } from 'react'
import { Drawer, Box, List, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

export const Sidebar: React.FC = () => {

  const { sideMenuOpen, closeSideMenuFn } = useContext( UIContext );

  return (
    <Drawer anchor="left" open={ sideMenuOpen } onClose={closeSideMenuFn}>
        <Box sx={{ padding: '5px 10px'}}>
            <Typography variant="h4">Menú</Typography>
        </Box>

        <Box sx={{ width: 250 }} >
            <List>
                {menuItems.map((text, index) => (
                    <ListItem key={text}>
                        <ListItemButton>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {menuItems.map((text, index) => (
                    <ListItem key={text}>
                        <ListItemButton>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>

    </Drawer>
  )
}
