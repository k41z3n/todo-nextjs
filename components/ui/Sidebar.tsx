import { useContext } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { UIContext } from '../../context/ui/UIContext';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafs'];

export const Sidebar = () => {
  const { sideBarIsOpen, closeSideBar } = useContext(UIContext);

  return (
    <Drawer anchor={'left'} open={sideBarIsOpen} onClose={closeSideBar}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '50px 10px ' }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index & 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText>{text}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};
