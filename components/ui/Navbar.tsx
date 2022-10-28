import { useContext } from 'react';

import NextLink from 'next/link';

import { AppBar, Toolbar, IconButton, Typography, Link } from '@mui/material';

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
        <NextLink href='/' passHref>
          <Link underline='none' color='white'>
            <Typography variant="h6" color="inherit" component="div">
              TODO APP
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
