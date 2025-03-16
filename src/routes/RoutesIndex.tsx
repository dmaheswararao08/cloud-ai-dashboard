import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Login from "../components/Login";
import Home from "./Home";
import Services from "./Services";
import Logs from "./Logs";

interface RoutesProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

// const RoutesIndex = ({ isAuth, setIsAuth }: RoutesProps) => {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
//       />
//       <Route
//         path="/login"
//         element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
//       />

//     </Routes>
//   );
// };

const RoutesIndex = ({ isAuth, setIsAuth }: RoutesProps) => {
  const routes = useRoutes([
    {
      path: "/login",
      element: <Login isAuth={isAuth} setIsAuth={setIsAuth} />,
    },
    {
      path: "/",
      element: <Login isAuth={isAuth} setIsAuth={setIsAuth} />,
    },
    { path: "/Dashbord", element: <Home /> },
    { path: "/services", element: <Services /> },
    { path: "/logs", element: <Logs /> },
  ]);

  return routes;
};

export default RoutesIndex;
