import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import ArticleIcon from "@mui/icons-material/Article";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ComputerIcon from "@mui/icons-material/Computer"; // Icon for Developer Resources
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

interface SideMenuProps {
    setIsAuth: (isAuth: boolean) => void;
}

const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/Dashbord" },
    { text: "Services", icon: <StorageIcon />, path: "/services" },
    { text: "Developer Resources", icon: <ComputerIcon />, path: "/developer-resources" }, // New menu item
    { text: "Logs", icon: <ArticleIcon />, path: "/logs" },
];

const SideMenu: React.FC<SideMenuProps> = ({ setIsAuth }) => {
    const navigate = useNavigate();
    const onLogout = () => {
        setIsAuth(false);
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                <a className="navbar-brand" href="">
                    <img src={Logo} alt="" width={50} />
                </a>
            </div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon sx={{ color: "primary.main" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} sx={{ color: "primary.main" }} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <ListItemButton onClick={onLogout}>
                        <ListItemIcon sx={{ color: "primary.main" }}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" sx={{ color: "primary.main" }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SideMenu;
