import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext"
//import link to navigate to the page


function App() {
  

  return (
    <>
      <AuthProvider>
      <Router>
      <Routes>

      </Routes>
      </Router>
      
      </AuthProvider>
    </>
  )
}

export default App
