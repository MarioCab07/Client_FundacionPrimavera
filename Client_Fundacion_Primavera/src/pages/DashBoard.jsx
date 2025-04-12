import {DashBoardHeader} from "../components/Header"
import {useAuth} from "../context/AuthContext"
import {useEffect} from "react"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { AiOutlineFileAdd } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { RiUserAddLine } from 'react-icons/ri'
import { Link } from "react-router-dom";



const parserBoardRol = (role)=>{
    if(role === "SUPER_ADMIN" || role==="ADMIN"){
        return [
            {
                title:"Registrar Beneficiario",
                url:"/RegistrarBeneficiario",
                bg:"F1D33E",
                icon: <AiOutlineFileAdd size={60}/>
        
            },
            {
                title:"Gestionar Beneficiarios",
                url:"/GestionarBeneficiarios",
                bg:"BEBCBC",
                icon: <BsPeople size={60}/>
            },
            {
                title:"Registrar Voluntario",
                url:"/RegistrarVoluntario",
                bg:"FFFFFF",
                icon: <RiUserAddLine size={60}/>
            }
        ]
    }else{
        return [{
            title:"Gestionar Beneficiarios",
            url:"/GestionarBeneficiarios",
            bg:"BEBCBC",
            icon: <BsPeople size={60}/>
        },
        {
            title:"Registrar Voluntario",
            url:"/RegistrarVoluntario",
            bg:"FFFFFF",
            icon: <RiUserAddLine size={60}/>
        }]
    }
}



const DashBoard = ()=>{

    const {user} = useAuth();
    const options = parserBoardRol(user?.role);
    useEffect(() => {
        const toastId = "welcome-toast"; // Unique ID for the toast
        if (!toast.isActive(toastId)) {
            toast.success(`👋 Bienvenido ${user?.name}`, {
                toastId, // Use the unique ID
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
    }, []);
    return(
        <>
        <section className="flex flex-col h-screen">
        <DashBoardHeader/>
        <article className=" w-full flex-1 h-full  flex items-center justify-center gap-10">
            
            {options.map((option)=>{
                return(
                    <Link
                    to={option.url}
                    key={option.title}
                    className="w-1/4 h-1/3 flex flex-col gap-10 items-center justify-center rounded-2xl m-5 transform transition-transform duration-500 ease-in-out hover:scale-120"
                    style={{
                        background: `#${option.bg}`,
                        boxShadow:
                            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    }}
                >
                    {option.icon}
                    <h5 className="font-bold text-2xl">{option.title}</h5>
                </Link>
                )
            })}
           
        </article>
        <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
            transition={Bounce} 
        />
        </section>
        </>
    )
}


export default DashBoard;