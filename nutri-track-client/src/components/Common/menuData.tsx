import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

interface MenuItem {
  title: string;
  icon: React.ReactNode;
}

interface MainMenuItem extends MenuItem {
  navigate: string;
}

export const mainMenu: MainMenuItem[] = [
  {
    title: "Home",
    icon: <HomeIcon sx={{color: 'white'}} />,
    navigate: "/post",
  },
  {
    title: "Tips",
    icon: <TipsAndUpdatesIcon sx={{color: 'white'}}/>,
    navigate: "/tips", //TODO: change to real page
  },
  {
    title: "Create post",
    icon: <AddIcon sx={{color: 'white'}}/>,
    navigate: "/post/create"
  },
  {
    title: "Profile",
    icon: <PersonIcon sx={{color: 'white'}}/>,
    navigate: "/UserProfile",
  }
];

export const secondaryMenu: MenuItem[] = [
  {
    title: "Logout",
    icon: <LogoutIcon sx={{color: 'white'}} />,
  },
];
