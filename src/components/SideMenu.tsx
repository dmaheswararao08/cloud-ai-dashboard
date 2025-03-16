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
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

interface SideMenuProps {
  setIsAuth: (isAuth: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    setIsAuth(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}
      >
        <a className="navbar-brand" href="">
          <img src={Logo} alt="" width={50} />
        </a>
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/Dashbord">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/services">
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/logs">
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideMenu;
