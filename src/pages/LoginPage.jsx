import logo from "../assets/icons/FundacionLogo.png";
import LoginImage from "../assets/images/Login.jpg"

import { AiOutlineUser } from 'react-icons/ai'
import { MdLock,MdVisibility, MdVisibilityOff } from 'react-icons/md'
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import { sleep } from "../tools/tools";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate,useLocation } from "react-router-dom";
import { parseRol } from "../tools/tools";

const LoginPage = ()=>{

    const navigate = useNavigate();
    const location = useLocation();

    const {login, loading} = useAuth();
    const [data,setData] = useState({
        username:"",
        password:""
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e)=>{
        setError("");
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }   

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const toastId = toast.loading('Iniciando Sesión...');
        
        
        try {
            await sleep(500);
            const response = await login(data);
            
            
            if(response.status === 200){
                toast.update(toastId, {
                    render: "Login successful!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000, // Close after 3 seconds
                });
                const isAdmin = parseRol(response.data.role);
                localStorage.setItem("isAdmin",isAdmin)
                await sleep(800);
            if(response.data.role!="COLABORADOR" || response.data.role!="VOLUNTARIO"){
                navigate("/Dashboard");
            
            }
        }
            
        } catch (err) {

            toast.update(toastId, {
                render: err.response?.data?.error || "Login failed!",
                type: "error",
                isLoading: false,
                autoClose: 3000, // Close after 3 seconds
            });
          }
    }

    

    useEffect(()=>{ 
        
        const showGoodbyeToast = localStorage.getItem("showGoodbyeToast");
        
        
        
        if (showGoodbyeToast == "true" ) {
            console.log("Showing toast");
            toast.info("👋 Hasta luego, esperamos verte pronto!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                onClose:()=>{
                    localStorage.removeItem("showGoodbyeToast");
                },
                icon: null
            });
            
            
        }
        
        
    },[])

    return( 
        <>
        <section 
  className="min-h-screen flex"
>
  {/* Left Section - Welcome Message */}
  <div
    className="w-1/2 flex flex-col items-center justify-center text-white"
    style={{
        background: "linear-gradient(135deg, #FDE047, #FACC15)", // Gradiente amarillo vibrante
      }}
    
  >
    
    <h1 className="text-5xl font-bold mb-6">¡Bienvenido de nuevo!</h1>
    <p className="text-lg text-center px-10">
      Por favor, inicia sesión para continuar gestionando la información de la Fundación Primavera.
    </p>
  </div>

  {/* Right Section - Login Form */}
  <div
    className="w-1/2 flex items-center justify-center relative bg-cover bg-center"
    style={{
        backgroundImage: `url(${LoginImage})`, // Imagen de fondo
        backgroundSize: "cover", // Ajusta la imagen para cubrir todo el contenedor
        backgroundPosition: "center", // Centra la imagen
      }}
    
  >
    {/* Logo de la Fundación */}
    
    <img
      src={logo}
      alt="Fundación Primavera Logo"
      className="absolute top-8 left-8 w-20 h-20 object-contain"
    />
    {/* Formulario */}
    <form
      className="relative w-3/4 p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Iniciar Sesión
      </h2>
      <p className="text-center text-gray-500 mb-8">
        ¡Bienvenido de nuevo! Por favor, ingresa tus credenciales.
      </p>

      {/* Input Fields */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <AiOutlineUser size="2rem" className="text-gray-600" />
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="text"
            name="username"
            placeholder="Usuario"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-4 relative">
          <MdLock size="2rem" className="text-gray-600" />
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <MdVisibilityOff size="1.5rem" className="text-gray-600" />
            ) : (
              <MdVisibility size="1.5rem" className="text-gray-600" />
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">*{error}</p>}
      </div>

      {/* Remember Me and Forgot Password */}
      <div className="flex justify-between items-center mt-4">
        <label className="flex items-center text-gray-600">
          <input type="checkbox" className="mr-2" />
          Recuérdame
        </label>
        <a href="#" className="text-yellow-500 hover:underline text-sm">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          className="w-full p-4 rounded-full text-white font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          type="submit"
        >
          Ingresar
        </button>
      </div>

      
      
    </form>
  </div>
</section>
        
        </>
    )
}

export default LoginPage;