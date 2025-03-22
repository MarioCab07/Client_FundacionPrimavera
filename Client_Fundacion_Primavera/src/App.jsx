import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext"
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import bg from "./assets/images/bg.jpg"
import "./App.css"
//import link to navigate to the page


function App() {
  

  return (
    <>
    <section className="" style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: "700px 500px", 
    backgroundRepeat: "repeat", 
    height: "100vh",
  }}>
      <AuthProvider>
      
      <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route element={<ProtectedRoutes allowedRoles={["SUPER_ADMIN", "ADMIN","GERENTE"]} />}>
          <Route path="/dashboard" element={<DashBoard />} />
      </Route>
      </Routes>
      
      
      </AuthProvider>
      </section>
    </>
  )
}

export default App
