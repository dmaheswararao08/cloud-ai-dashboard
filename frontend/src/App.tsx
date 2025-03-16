// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./routes/Home";
// import Services from "./routes/Services";
// import Logs from "./routes/Logs";
import { useState } from "react";
import RoutesIndex from "./routes/RoutesIndex";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { Box } from "@mui/material";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const employeeID: any = localStorage.getItem("employeeID");

  return (
    <div>
      <Router>
        {employeeID && <Header isAuth={isAuth} setIsAuth={setIsAuth} />}
        <Box sx={{ display: "flex" }}>
          {employeeID && <SideMenu setIsAuth={setIsAuth}/>}
          <Box sx={{ flexGrow: 1, padding: 3 }}>
            <RoutesIndex isAuth={isAuth} setIsAuth={setIsAuth} />
          </Box>
        </Box>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
