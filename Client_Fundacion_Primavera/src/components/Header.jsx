import Logo from "../assets/icons/FundacionLogo.png"

import {useAuth} from "../context/AuthContext"
import {parserHeaderRole} from "../tools/tools"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { BiLogOut } from 'react-icons/bi'

import Menu from "./Menu"

import { useState } from "react"

export const DashBoardHeader =()=>{
    const navigate = useNavigate();
    const {user,logout} = useAuth();
    const buttons = parserHeaderRole(user?.role);

    const handleLogout = async()=>{
        await logout();
        localStorage.setItem("showGoodbyeToast", true);
        navigate("/");
    }



    return(
        <>
        <section className="p-4 gap-10 flex flex-row-reverse justify-center items-center " style={{background:"#E2E2E2",boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>

        <div className=""> <img src={Logo} alt="logo" className="w-30 h-20"/></div>
       

        <div className=" w-3/4  flex gap-40 justify-center items-center">
        {buttons.map((option)=>{
            return(
                <Link
                className={`rounded-2xl px-5 py-3 font-bold transform transition-all duration-700 ease-in-out hover:scale-125 hover:bg-[#7C7C7C] hover:text-white ${
                    option === "Usuarios" ? "bg-[#FADF4A]" : "bg-white"
                }`}
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                to={`/${option}`}
                key={option}
            >
                {option}
            </Link>
            )
        })}
        </div>
        <div className="h-fit   w-fit items-center justify-start">
        <button onClick={handleLogout} className=" flex items-center text-black hover:text-red-700 hover:cursor-pointer"><BiLogOut size={30}/></button>
        </div>
        


        </section>
        </>
    )
}

export const Header = ()=>{

    const [open,setOpen] = useState(false);
    return(
        <>
        <Menu setOpen={setOpen}/>
        </>

    )
}


