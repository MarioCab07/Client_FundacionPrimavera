import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext"
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BenAdd from "./pages/BenAddPage";
import BenList from "./pages/BenListPage";
import VolAdd from "./pages/VolAddPage";
import VolListPage from "./pages/VolListPage";
import { ToastContainer, toast, Bounce } from 'react-toastify';

import bg from "./assets/images/background.jpg"
import "./style/animations.css"
import "./style/style.css"
import "./App.css"
//import link to navigate to the page


function App() {
  

  return (
    <>
    <section className="" style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover", 
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    maxHeight:"fit-content",
  }}>
      <AuthProvider>
      
      <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route element={<ProtectedRoutes allowedRoles={["SUPER_ADMIN", "ADMIN","GERENTE"]} />}>
          <Route path="/Dashboard" element={<DashBoard />} />
          <Route path="/RegistrarBeneficiario" element={<BenAdd />} />
          <Route path="/GestionarBeneficiarios" element={<BenList />} />
          <Route path="/RegistrarVoluntario" element={<VolAdd />} />
          <Route path="/Voluntarios" element={<VolListPage />} />
          
      </Route>
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
  )
}

export default App
