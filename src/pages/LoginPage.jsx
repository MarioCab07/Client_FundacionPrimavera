import logo from "../assets/icons/FundacionLogo.png";
import pin from "../assets/icons/pin.png"
import LoginImage from "../assets/images/LoginImage.png"

import { AiOutlineUser } from 'react-icons/ai'
import { MdLock,MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { BsBoxArrowInRight } from 'react-icons/bs'
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import { sleep } from "../tools/tools";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate,useLocation } from "react-router-dom";


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
                await sleep(800);
            if(response.data.role!="COLABORADOR" || response.data.role!="VOLUNTARIO"){
                navigate("/Dashboard");
            
            }
        }
            
        } catch (err) {
            setError(err.response.data.error);
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
        className="min-h-screen bg-cover bg-center flex flex-col items-center "
         >
                
        <article 
        className=" px-5 py-6  flex justify-between w-screen " style={{backgroundColor:"#E2E2E2",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} >
           
        <img src={logo} alt="" 
        className="h-30 w-40" />
        <div className="flex-1 gap-80  flex items-center justify-center " >
        <h4 className="rounded-2xl bg-white font-medium p-5 w-1/6 text-center" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>#NuevosComienzos</h4>
        <h4 className="rounded-2xl bg-white font-medium p-5 w-1/6 text-center" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>#Santa Ana</h4>
        
        </div>
        
            
        </article>

        <article 
        className="flex w-screen grow ">

        <div
        style={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(190,182,4,1) 0%, rgba(237,238,13,1) 87%)", boxShadow:" rgba(0, 0, 0, 0.1) 0px 4px 12px"}}
        className="relative w-1/2 h flex flex-col items-center justify-center">
        <img className="fixed z-0 w-3xl  p-10 rounded-2xl " style={{backgroundColor:"#E2E2E2",boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} src={LoginImage} alt="" />
        
        <h2 
        className="font-righteous font-extrabold flex-1 text-4xl w-3xl text-center z-10 p-10 ">
            Gestión y Control de Información
        </h2>
        
        </div>

        <div 
        className="flex items-center justify-center w-1/2 grow">
            

        <form 
        className=" relative p-4 flex flex-col items-center w-1/2 h-1/2 bg-white  justify-between" onSubmit={handleSubmit} style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
              <img src={pin} alt="" className="absolute bottom-85 right-48 w-25 h-20 m-2"/>  
            <h2 
            className="text-3xl text-center font-bold bg-amber-200 p-5 w-full">Login</h2>


            <div className="flex flex-col items-center justify-center gap-8">

            <div className="flex items-center justify-center gap-4"> 
            <AiOutlineUser size="2rem"/>
            <input className="focus:rounded-2xl  p-2 mb-4 border-b border-gray-400 focus:outline-none  focus:bg-gray-700 focus:text-amber-50 transition-all duration-500
    ease-out"
            type="text" name="username" placeholder="Usuario" onChange={handleChange}/>
            </div>
            <div className="flex items-center justify-center gap-4 relative">
                            <MdLock size="2rem" />
                            <input
                                className="  p-2 mb-4 border-b border-gray-400 focus:outline-none  focus:bg-gray-700 focus:rounded-2xl focus:text-amber-50 transition-all duration-500
                                ease-out hide-password-toggle"
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-5 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <MdVisibilityOff color="white" size="1.5rem" />
                                ) : (
                                    <MdVisibility color="white" size="1.5rem" />
                                )}
                            </button>
            </div>
            {error && <p className=" fixed bottom-75 text-red-600" >*{error}</p>}
            </div>
            <div className="flex justify-center items-center h-1/4 font-semibold">
    <button
        className="p-5 rounded-2xl w-40 text-amber-50 relative overflow-hidden cursor-pointer group"
        style={{
            background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,238,189,1) 0%, rgba(58,238,13,1) 87%)",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}
        type="submit"
    >
        
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-x-full">
            Login
        </span>

        
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform translate-x-full group-hover:translate-x-0">
            <BsBoxArrowInRight size="1.5rem" />
        </span>
    </button>
</div>
            
        </form>
        </div>
        
        </article>
        
        
        </section>
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
        </>
    )
}

export default LoginPage;