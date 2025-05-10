import { useEffect,useState } from "react";
import { sanitizeDate } from "../../tools/tools";
import Modify from "./Modify";
import Deactive from "./Deactive";
import Reactive from "./Reactive";
import Delete from "./Delete";
import CreateUserVol from "./CreateUserVol";
import { HiTrendingDown } from "react-icons/hi";
import { BsPencilSquare } from "react-icons/bs";
import { FiUserPlus } from 'react-icons/fi'
import { AiOutlineReload,AiOutlineDelete } from 'react-icons/ai'





const Details = ({vol,setShowReactive,setShowCreate,setShowDeactive,setShowDelete,handleClose,setShowModify})=>{
    const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");
    const [isSuperAdmin] = useState(localStorage.getItem("isSuperAdmin") === "true");
    
    
    
    return(
        <>
        <h2 className="text-2xl font-bold text-center">
            Detalles del Voluntario
        </h2>
        <article className="flex flex-col gap-4">
            <div className="flex gap-4 items-center justify-between">
                <h3 className="text-lg font-semibold flex gap-1 items-center">
                    {vol.name}{" "}
                {vol.active ? (
                <>
                  <div
                    className="w-5 h-5 rounded-4xl bg-[#3AEE0D] "
                    style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
                  ></div>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-4xl bg-red-600"></div>
                </>
              )}{" "}
                </h3>

                <p>
              Edad: <span className="font-semibold">{vol.age} años</span>{" "}
            </p>
            <p>
              DUI: <span className="font-semibold">{vol.dui}</span>
            </p>
            <p>
              Fecha de Nacimiento:{" "}
              <span className="font-semibold">
                {sanitizeDate(vol.birth_date)}
              </span>
            </p>
            
                

            </div>

            <div className="flex gap-2 justify-center items-center w-full">
                <div className="flex flex-col gap-2 flex-1 items-start h-max">
                    <h4 className="font-bold">Información de Contacto

                    </h4>

                    <p>
                        Telefono: <span className="font-semibold">{vol.phone_number}</span>
                    </p>
                    <p>
                        Direccion: <span className="font-semibold">{vol.adress}</span>
                    </p>

                </div>
                <div className="flex flex-col gap-2 flex-1 items-start h-max">
                    <h4 className="font-bold">Información Profesional

                    </h4>

                    <p>
                        Ocupacion: <span className="font-semibold">{vol.occupation}</span>
                        
                    </p>
                <p>
                Universidad: <span className="font-semibold">{vol.university}</span>
                </p>
                <p>
                    Año estudiado: <span className="font-semibold">{vol.year_studied}</span>
                </p>
                    

                </div>

                <div className="flex flex-col gap-2 flex-1 items-start h-max">
                    <h4 className="font-bold">Información de Servicio</h4>
                    <p>
                        Tipo de Servicio: <span className="font-semibold">{vol.service_type}</span>
                    </p>
                    <p>
                        Fecha de Inicio: <span className="font-semibold">{sanitizeDate(vol.starting_date)}</span>
                    </p>
                    <p>
                        Fecha de Registro: <span className="font-semibold">{sanitizeDate(vol.createdAt)}</span>
                    </p>

                </div>

                {isSuperAdmin ? (
                  <>
                  <div className="flex flex-col gap-2 flex-1 items-start h-max">
                  <h4 className="font-bold">Credenciales</h4>
                  <p>
                        {vol.userName!=="NA" ? (
                          <>
                            Usuario: <span className="font-semibold">{vol.userName}</span>
                          </>
                        ):
                        <>
                        <span className="font-semibold">No tiene credenciales</span>
                        <button
                        style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
                        onClick={()=>{
                          setShowCreate(true);
                        }} 
                        className="bg-amber-300 rounded-2xl p-3 w-fit gap-4 flex items-center hover:bg-amber-50 cursor-pointer">Crear Usuario <FiUserPlus/> </button>
                        </>

                      }

                    </p>

                </div>
                  </>
                ):null}
                

            </div>
            <div className="flex gap-4 justify-center items-center">
                {isAdmin ? (
                          <>
                          <button
                          onClick={()=>{
                            
                            setShowModify(true);
                          }}
                          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                          className="bg-amber-300 rounded-2xl p-3 w-fit gap-4 flex items-center hover:bg-amber-50 cursor-pointer"
                        >
                          Modificar <BsPencilSquare size={20} />{" "}
                        </button>
                        {vol.active ? (
                          <button
                          className="bg-orange-400 rounded-2xl p-3 w-fit flex gap-4 items-center hover:bg-amber-50 cursor-pointer"
                          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                          onClick={() => {
                            setShowDeactive(true);
                          }}
                        >
                          Dar de Baja <HiTrendingDown />{" "}
                        </button>
                        ):
                        <button className="bg-lime-400 rounded-2xl p-3 w-fit flex gap-4 items-center hover:bg-green-50 transition-all duration-500 ease-in-out cursor-pointer"
                          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                          onClick={()=>{
                            setShowReactive(true);
                          }}
                          >
                            Reactivar <AiOutlineReload size={20} />

                        </button>
                        }
                        <button
                          className="bg-red-500 rounded-2xl p-3 w-fit flex gap-4 items-center hover:bg-amber-50 cursor-pointer"
                          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                          onClick={() => {
                            setShowDelete(true);
                          }}
                        >
                          Eliminar <AiOutlineDelete size={20} />{" "}
                        </button>
                          </>
                        ):(null)}

            <button
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="bg-gray-400 text-white rounded-2xl p-3 w-fit hover:bg-amber-50 cursor-pointer transition ease-in-out 0.5s hover:text-gray-400"
          onClick={handleClose}
        >
          Cerrar
        </button>
            </div>

            
        </article>
        </>
    )
    
    
}


const VolDetails = ({vol,setVolSelected})=>{
  
    const [showDeactive,setShowDeactive] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [showModify,setShowModify] = useState(false);
    const [showCreate,setShowCreate] = useState(false);
    const [showReactive,setShowReactive] = useState(false);

    const [isClosing,setIsClosing] = useState(false);
    
   

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
          setVolSelected(false);
          setIsClosing(false);
        }, 500);
      };
      

      return(<>
      
        <section
  className={` ${
    isClosing
      ? "scale-out-center"
      : vol
      ? "scale-in-center"
      : "scale-out-center"
  } z-40 flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg min-w-1/2
  max-w-fit mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-300 border-2 border-solid min-h-fit`}
>

{!showModify && !showDeactive && !showReactive && !showDelete && !showCreate ? (
  <Details 
    vol={vol}
    setShowReactive={setShowReactive}
    setShowCreate={setShowCreate} 
    setShowDeactive={setShowDeactive}
    setShowDelete={setShowDelete}
    setShowModify={setShowModify}
    handleClose={handleClose}
  />
) 
:
showModify ? 
(
  <Modify 
    vol={vol} 
    setShowModify={setShowModify} 
    setVolSelected={setVolSelected} 
  />
):
showDeactive ?
<Deactive vol={vol} setShowDeactive={setShowDeactive} />

:
showReactive ? 
<Reactive vol={vol} setShowReactive={setShowReactive} />
:
showDelete ?
<Delete vol={vol} setShowDelete={setShowDelete} />
:

showCreate ? 
<CreateUserVol vol={vol} setShowCreate={setShowCreate} />
:
null


}

</section>
      
      </>)

}


export default VolDetails;