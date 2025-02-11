import React, { useContext } from "react";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../queries/auth";
import { mainMenu, secondaryMenu } from "./menuData";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { NavContext } from "../../context/NavContext";

interface DrawerListProps {
  navWidth: string;
}

const DrawerList = () => {
  const navigate = useNavigate();
  const { resetConnectedUser, connectedUser } = useContext(UserContext);
  const {currentIndex, resetCurrentIndex, updateCurrentIndex} = useContext(NavContext);
  //const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    navigateUrl: string
  ) => {
    updateCurrentIndex({selectedIndex: index});
    navigate(navigateUrl);
  };

  const logoutUser = async () => {
    try {
      const refreshToken = connectedUser?.refreshToken;

      if (!refreshToken) {
        console.log("No refresh token found");
        return;
      }

      const response = await logout(refreshToken);

      if (response.status === 200) {
        resetConnectedUser();
        resetCurrentIndex();
        toast.success("התנתקת בהצלחה!");
        navigate("/login");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(" משהו השתבש!");
    }
  };

  return (
    <Box role='presentation'>
      <Typography style={{color: "white", paddingTop: "3vh", paddingBottom: "3vh", fontSize:"2vw", fontWeight: "bolder"}}>
        NutriTrack
      </Typography>
      <List>
        {mainMenu.map((menuItem, index) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton 
              onClick={(event) => handleListItemClick(event, index, menuItem.navigate)}
              selected={currentIndex?.selectedIndex ? currentIndex?.selectedIndex === index : index === 0}>
              <ListItemIcon sx={{minWidth: "2vw"}}>
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText
                primary={menuItem.title}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "grey", width: "90%", justifySelf: "center" }} />
      <List>
        {secondaryMenu.map((menuItem, index) => (
          <ListItem key={menuItem.title} disablePadding>
            <ListItemButton onClick={logoutUser}>
              <ListItemIcon sx={{minWidth: "2vw"}}>
                {menuItem.icon}
               </ListItemIcon>
              <ListItemText
                primary={menuItem.title}
                style={{ color: "white" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const NavbarDrawer: React.FC<DrawerListProps> = ({ navWidth }) => {
  return (
    <Drawer
      open={true}
      variant='persistent'
      PaperProps={{ sx: { width: navWidth } }}>
      <div style={{ backgroundColor: "#113537", height: "100%" }}>
        <DrawerList />
      </div>
    </Drawer>
  );
};

export default NavbarDrawer;
