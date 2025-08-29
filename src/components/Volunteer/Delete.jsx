import { useState } from "react";
import { toast } from "react-toastify";
import { deleteVolunteer } from "../../services/api.services";
import { sleep } from "../../tools/tools";
import { AiOutlineDelete } from 'react-icons/ai'

const Delete = ({vol,setShowDelete})=>{
    const[isClosing,setIsClosing] = useState(false);
    const[confirm,setConfirm] = useState("");

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
          setShowDelete(false);
          setIsClosing(false);
        }, 500);
      };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const toastId = toast.loading("Eliminando Voluntario...");
        try {
            await sleep(800);
            const response = await deleteVolunteer(vol._id);
            if(response.status===200){
                toast.update(toastId, {
                    render: "Voluntario eliminado!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000, // Close after 3 seconds
                });
                await sleep(800);
                handleClose();
                window.location.reload();
            }
        } catch (error) {
            toast.update(toastId, {
        render: "Hubo un problema!",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
        }
    }


    return(
        <>
        <section className={`${
        isClosing ? "slide-out-right" : "slide-in-right"
      } z-50 flex flex-col gap-6 bg-white rounded-lg p-6 shadow-lg w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-300 border-2 h-fit`}>

        <h3 className="text-center font-bold text-2xl text-red-500">
            Eliminar Voluntario
        </h3>

        <p className="text-center text-gray-700">
        <span className="font-semibold">Voluntario:</span> {vol.name}
      </p>

      <form className="flex flex-col gap-4" action="submit" onSubmit={handleSubmit}>
              <label htmlFor="confirm">
                  <p className="text-center text-gray-700">
                      Para confirmar la eliminacion, escribe "confirmar"
                  </p>
                  <input 
                  type="text" 
                  id="confirm" 
                  value={confirm} 
                  onChange={(e)=>setConfirm(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg p-2 w-full"
                  />
              </label>
              <div className="flex justify-between items-center gap-4 w-full">
                  <button 
                  className={`rounded-2xl p-3 flex items-center text-white  ${
                      confirm !== "confirmar"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-200 hover:text-red-500 cursor-pointer"
                    }`}
                    disabled={confirm !== "confirmar"}
                    type="submit">Eliminar <AiOutlineDelete size={20} /></button>
                  <button className="bg-[#FFF582] rounded-2xl p-3  hover:bg-white transition ease-in-out 0.5s cursor-pointer "
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    type="button"
                    onClick={handleClose} >Volver</button>
              </div>
              
            </form>




      </section>
        </>
    )

}


export default Delete;