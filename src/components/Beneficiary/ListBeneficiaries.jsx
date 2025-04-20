import { useEffect,useState } from "react";
import { getBenPhoto } from "../../services/api.services";
import profileIcon from "../../assets/icons/ProfileIcon.jpg";
import { BsPencil } from 'react-icons/bs'
import { BiChevronsDown } from 'react-icons/bi'



const ListBeneficiaries = ({data,setBenSelected})=>{


    const handleClick = (ben)=>{
        setBenSelected(ben);
        
        
    }
   
   
    return (
        <div className="flex flex-col max-h-[600px] overflow-y-scroll gap-6 w-full custom-scrollbar">
          {data.map((ben) => (
            <div
              key={ben._id}
              className="flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl p-6 cursor-pointer"
              onClick={() => handleClick(ben)}
            >
              <div className="flex justify-evenly items-center gap-6 w-full">
                {/* Profile Image */}
                <img
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                  src={encodeURI(ben.photo) || profileIcon}
                  alt="Profile"
                />
    
                {/* Beneficiary Info */}
                <div className="flex flex-col flex-1 gap-2">
                  <h4 className="text-xl font-bold text-gray-800">{ben.name}</h4>
                  <p className="text-sm text-gray-500">{ben.age} años</p>
                </div>
    
                {/* DUI */}
                <div className="flex flex-col flex-1 items-center gap-1">
                  <p className="text-sm font-semibold text-gray-600">DUI</p>
                  <p className="text-base font-bold text-gray-800">{ben.dui}</p>
                </div>
    
                {/* Affiliation */}
                <div className="flex flex-col flex-1 items-center gap-1">
                  <p className="text-sm font-semibold text-gray-600">Afiliación</p>
                  <p className="text-base font-bold text-gray-800">{ben.affiliation}</p>
                </div>
    
                {/* Active/Inactive Status */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold text-gray-600">Estado</p>
                  {ben.active.value ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      Activo
                      <div
                        className="w-4 h-4 rounded-full bg-green-500"
                        style={{ boxShadow: "0 0 10px rgba(58, 238, 13, 0.5)" }}
                      ></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      Inactivo
                      <div
                        className="w-4 h-4 rounded-full bg-red-500"
                        style={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)" }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}


export default ListBeneficiaries;


/*

<>
        {data.map((ben)=>{
            return(
                <>
                <article key={ben._id} className="flex z-10 flex-col hover:bg-white transition-all duration-300 ease-in-out cursor-pointer hover:shadow-lg rounded-2xl p-2">
                <article onClick={()=>handleClick(ben)} className="flex p-2  gap-4 justify-between  " 
                
                id={ben._id}>
                     
            <img className="w-20 h-20 rounded-full" src={encodeURI(ben.photo) || profileIcon} alt="" />
            <div className="flex flex-1 justify-center items-center flex-col gap-2 font-bold">
                <h4 className="text-center">{ben.name}</h4>
                <p>{ben.age} años</p>
            </div>
            <div className="flex flex-1 flex-col gap-2 justify-center font-bold items-center">
                <p>DUI</p>
                <p>{ben.dui}</p>
                
            </div>
            <div className="flex flex-1 flex-col gap-2 font-bold items-center justify-center">
                <p>Afiliacion</p>
                <p>{ben.affiliation}</p>
                
            </div>
            <div className="flex flex-1 justify-center gap-2 font-bold items-center">
                {ben.active.value ? (
                <>
                <div className="flex gap-8">
                    Activo
                    <div className="w-5 h-5 rounded-4xl bg-[#3AEE0D] "
                    style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}
                    ></div>
                </div>
                </>):
                (
                    <>
                    <div className="flex gap-8">
                    Inactivo
                    <div style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}} className="w-5 h-5 rounded-4xl bg-red-600"></div>
                </div>
                    </>
                )
                }
                
            </div>
            
            </article>
            
            </article>
            <div className="w-full bg-black h-0.5"></div>
            </>
            )
            
        })}
        
        </>

*/

