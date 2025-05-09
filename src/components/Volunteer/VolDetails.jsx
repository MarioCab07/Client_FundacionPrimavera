import { useEffect,useState } from "react";
import { sanitizeDate } from "../../tools/tools";

const Details = ({vol,showMenu,setShowMenu,setVolSelected,handleClose,setShowModify})=>{
    const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");

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
                <div className="flex flex-col gap-2 flex-1">
                    <h4 className="font-bold">Información de Contacto

                    </h4>

                    <p>
                        Telefono: <span className="font-semibold">{vol.phone_number}</span>
                    </p>
                    <p>
                        Direccion: <span className="font-semibold">{vol.adress}</span>
                    </p>

                </div>
                <div className="flex flex-col gap-2 flex-1">
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

                <div className="flex flex-col gap-2 flex-1">
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

            </div>

            <button
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="bg-gray-400 text-white rounded-2xl p-3 w-fit hover:bg-amber-50 cursor-pointer transition ease-in-out 0.5s hover:text-gray-400"
          onClick={handleClose}
        >
          Cerrar
        </button>
        </article>
        </>
    )
    
    
}


const VolDetails = ({vol,setVolSelected})=>{
    const [showMenu,setShowMenu] = useState(false);
    const [showModify,setShowModify] = useState(false);
    const [isClosing,setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
          setVolSelected(false);
          setIsClosing(false);
        }, 500);
      };

      return(<>
      
        <section className={` ${
          isClosing
            ? "scale-out-center"
            : vol
            ? "scale-in-center"
            : "scale-out-center"
        }  z-40 flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg w-1/2 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-300 border-2 border-solid overflow-hidden`}>

            {!showModify ? (
                <Details 
                vol={vol} 
                showMenu={showMenu} 
                setShowMenu={setShowMenu} 
                setVolSelected={setVolSelected} 
                setShowModify={setShowModify}
                handleClose={handleClose}/>)
                :
                (<>
                Hola mundo
                </>)}

        </section>
      
      </>)

}


export default VolDetails;