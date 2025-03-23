import { AiOutlineHome } from 'react-icons/ai'
import { BsPeople,AiOutlineUserAdd } from 'react-icons/bs'
import { GrUserSettings } from 'react-icons/gr'
import { BiBox } from 'react-icons/bi'
import { ImStatsDots } from 'react-icons/im'
import { BiLogOut } from 'react-icons/bi'

import { useAuth } from '../context/AuthContext'
import { navigate } from 'react-router-dom'

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
        icon:<AiOutlineHome size={60}/>,
        level:3
    },
    {
        title:"Beneficiarios",
        url:"/GestionarBeneficiarios",
        icon:<BsPeople size={60}/>,
        level:3
    },
    {
        title:"Voluntarios",
        url:"/Voluntarios",
        icon:<AiOutlineUserAdd size={60}/>,
        level:3
    },
    {
        title:"Usuarios",
        url:"/Usuarios",
        icon:<GrUserSettings size={60}/>,
        level:5
    },
    {
        title:"Inventario",
        url:"/Inventario",
        icon:<BiBox size={60}/>,
        level:3
    },
    {
        title:"Estadísticas",
        url:"/Estadisticas",
        icon:<ImStatsDots size={60}/>,
        level:3
    }


   
    ]

    return options.filter(option=>option.level<=roleLevel)
    }




const Menu=({setOpen})=>{
    const {user,logout} = useAuth();

    const handleLogout = async()=>{
        await logout();
        localStorage.setItem("showGoodbyeToast", true);
        navigate("/");
    }

    const handleOpen=()=>{
        setOpen(false);
    }


    const options = getOptions(user?.role);
    return(
        <>
        <section>
            <article><button onClick={handleOpen}>X</button></article>
            <article>
                {options.map((option)=>{
                    return(
                        <div key={option.title} className="flex flex-col items-center justify-center gap-5">
                            {option.icon}
                            <h1>{option.title}</h1>
                        </div>
                    )
                })}
            </article>
            <article>
            <button onClick={handleLogout}>
                <BiLogOut size={30}/>
            </button>
            </article>
        </section>
        </>
    )
}


export default Menu;