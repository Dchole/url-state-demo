import { AppBar, Toolbar, Typography } from "@mui/material";
import { Search } from "./Search";

export const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" component="h1">
          Todo List
        </Typography>
        <Search />
      </Toolbar>
    </AppBar>
  );
};
