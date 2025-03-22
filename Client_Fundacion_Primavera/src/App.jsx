import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext"
import LoginPage from "./pages/LoginPage";
import "./App.css"
//import link to navigate to the page


function App() {
  

  return (
    <>
      <AuthProvider>
      
      <Routes>
      <Route path="/" element={<LoginPage/>}/>
      </Routes>
      
      
      </AuthProvider>
    </>
  )
}

export default App
