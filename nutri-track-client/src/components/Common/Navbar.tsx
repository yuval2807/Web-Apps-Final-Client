import React from "react";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MenuItem {
    title: string;
    icon: string;
    navigate: string;
}

interface DrawerListProps {
    navWidth: string;
}

const mainMenu: MenuItem[] = [{
    title: "Home",
    icon: "Home",
    navigate: "/home"
},
{
    title: "Forum",
    icon: "Forum",
    navigate: "/register" //TODO: change to real page
},
{
    title: "Create post",
    icon: "plus",
    navigate: "/post/create"
},
]

const secondaryMenu = [{
    title: "Logout",
    icon: "Logout",
    navigate: "/logout"
},
]

const DrawerList = () => {
    const navigate = useNavigate();
 return (
    <Box role="presentation" onClick={() => console.log("ggg")}>
      <List>
        {mainMenu.map((menuItem, index) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton onClick={() => navigate(menuItem.navigate)}>
              <ListItemIcon>
               {/* TODO: add icon */}
              </ListItemIcon>
              <ListItemText primary={menuItem.title} style={{color: "white"}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryMenu.map((menuItem, index) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton onClick={() => navigate(menuItem.navigate)}>
              <ListItemIcon>
               {/* TODO: add icon */}
               </ListItemIcon>
              <ListItemText primary={menuItem.title} style={{color: "white"}}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
 )
};


const NavbarDrawer: React.FC<DrawerListProps> = ({navWidth}) => {
  return (
    <Drawer open={true} onClose={()=> console.log("hhh")} variant="persistent" PaperProps={{sx: { width: navWidth}}}>
        <div style={{backgroundColor: "#113537", height: "100%"}}>
            <DrawerList />
        </div>
    </Drawer>
  );
};

export default NavbarDrawer;
