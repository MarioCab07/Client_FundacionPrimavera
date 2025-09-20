import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BenAdd from "./pages/Beneficiary/BenAddPage";
import BenList from "./pages/Beneficiary/BenListPage";
import VolAdd from "./pages/Volunteer/VolAddPage";
import VolListPage from "./pages/Volunteer/VolListPage";
import Forbidden from "./pages/ForbiddenPage";
import PublicRoute from "./components/PublicRoute";
import UserAdd from "./pages/Users/UserAddPage";

import { ToastContainer, toast, Bounce } from "react-toastify";

import bg from "./assets/images/background.jpg";
import "./style/animations.css";
import "./style/style.css";
import "./App.css";
import { useEffect } from "react";
import { setNavigator } from "./services/nav";
import { ROLES } from "./constants/constants";
//import link to navigate to the page

const NavBinder = () => {
  const nav = useNavigate();
  useEffect(() => setNavigator(nav), [nav]);
};

const App = () => {
  return (
    <>
      <NavBinder />
      <section
        className=""
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          maxHeight: "fit-content",
        }}
      >
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              element={
                <ProtectedRoutes
                  allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.GERENTE]}
                />
              }
            >
              <Route path="/Dashboard" element={<DashBoard />} />
              <Route path="/RegistrarBeneficiario" element={<BenAdd />} />
              <Route path="/GestionarBeneficiarios" element={<BenList />} />
              <Route path="/RegistrarVoluntario" element={<VolAdd />} />
              <Route path="/Voluntarios" element={<VolListPage />} />
            </Route>
            <Route
              element={<ProtectedRoutes allowedRoles={[ROLES.SUPER_ADMIN]} />}
            >
              <Route path="/RegistrarUsuarios" element={<UserAdd />} />
            </Route>

            <Route path="/403" element={<Forbidden />} />
          </Routes>
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          transition={Bounce}
        />
      </section>
    </>
  );
};

export default App;
