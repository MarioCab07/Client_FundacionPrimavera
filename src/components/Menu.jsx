import { AiOutlineHome, AiOutlineUserAdd } from 'react-icons/ai'
import { BsPeople } from 'react-icons/bs'
import { GrUserSettings } from 'react-icons/gr'
import { BiBox } from 'react-icons/bi'
import { ImStatsDots } from 'react-icons/im'
import { BiLogOut } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

import { useAuth } from '../context/AuthContext'
import { useNavigate,Link } from 'react-router-dom'
import { useEffect, useRef } from "react";

const getOptions=(role)=>{
    
    let roleLevel; 
    switch (role) {
        case "SUPER_ADMIN":
            roleLevel = 5;
            break;
        case "ADMIN":
            roleLevel = 4;
            break;
        case "GERENTE":
            roleLevel = 3;
            break;
        case "COLABORADOR":
            roleLevel = 2;
            break;
        default:
            roleLevel = 1;
    }

    const options=[
    {
        title:"Home",
        url:"/DashBoard",
        icon:<AiOutlineHome size={40}/>,
        level:3
    },
    {
        title:"Beneficiarios",
        url:"/GestionarBeneficiarios",
        icon:<BsPeople size={40}/>,
        level:3
    },
    {
        title:"Voluntarios",
        url:"/Voluntarios",
        icon:<AiOutlineUserAdd size={40}/>,
        level:3
    },
    {
        title:"Usuarios",
        url:"/Usuarios",
        icon:<GrUserSettings size={40}/>,
        level:5
    },
    {
        title:"Inventario",
        url:"/Inventario",
        icon:<BiBox size={40}/>,
        level:3
    },
    {
        title:"Estadísticas",
        url:"/Estadisticas",
        icon:<ImStatsDots size={30}/>,
        level:3
    }


   
    ]

    return options.filter(option=>option.level<=roleLevel)
    }




    const Menu = ({ open, setOpen }) => {
        const { user, logout } = useAuth();
        const navigate = useNavigate();
        const menuRef = useRef(null);
    
        const handleLogout = async () => {
            await logout();
            localStorage.setItem("showGoodbyeToast", true);
            navigate("/");
        };
    
        const handleClose = () => {
            setOpen(false);
        };
    
        const options = getOptions(user?.role);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setOpen(false); // Cierra el menú si el clic ocurre fuera de él
                }
            };
    
            document.addEventListener("mousedown", handleClickOutside); // Escucha clics en el documento
            return () => {
                document.removeEventListener("mousedown", handleClickOutside); // Limpia el evento al desmontar
            };
        }, [setOpen]);
    
        return (
            <div
                className={`fixed top-0 left-0 h-3/4 w-1/6 bg-gray-800 text-white transform transition-transform duration-500 py-5 rounded-br-2xl flex flex-col gap-20 ${
                    open ? "translate-x-0 z-50" : "-translate-x-full z-50"
                }`}
                style={{
                    background: "linear-gradient(90deg, rgba(129,129,129,1) 0%, rgba(113,113,113,1) 38%, rgba(87,87,87,1) 100%)",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                }}
            >
                <article className="font-bold w-full flex justify-end px-5">
                    <button className="cursor-pointer" onClick={handleClose}>
                        <AiOutlineClose size={30} />
                    </button>
                </article>
                <article className="flex flex-col w-full">
                    {options.map((option) => (
                        <Link to={option.url} key={option.title}>
                            <div className="flex px-10 h-15 items-center justify-start gap-5 hover:bg-white hover:text-black">
                                {option.icon}
                                <h4>{option.title}</h4>
                            </div>
                        </Link>
                    ))}
                </article>
                <article className="px-6  h-full w-full flex justify-start items-end">
                    <button className='hover:cursor-pointer hover:text-black' onClick={handleLogout}>
                        <BiLogOut size={30} />
                    </button>
                </article>
            </div>
        );
    };
    
    export default Menu;