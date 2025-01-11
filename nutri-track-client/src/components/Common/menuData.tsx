interface MenuItem {
    title: string;
    icon: string;
}

interface MainMenuItem extends MenuItem {
    navigate: string;
}

export const mainMenu: MainMenuItem[] = [{
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

export const secondaryMenu: MenuItem[] = [{
    title: "Logout",
    icon: "Logout"
  }
]