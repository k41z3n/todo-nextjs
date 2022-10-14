import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
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
