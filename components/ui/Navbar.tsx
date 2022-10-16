import { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

import { UIContext } from '../../context/ui';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export const Navbar = () => {
  const { openSideBar } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={openSideBar}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
