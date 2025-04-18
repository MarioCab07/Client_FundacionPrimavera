import { useEffect,useState } from "react";
import { getBenPhoto } from "../../services/api.services";
import profileIcon from "../../assets/icons/ProfileIcon.jpg";
import { BsPencil } from 'react-icons/bs'
import { BiChevronsDown } from 'react-icons/bi'



const ListBeneficiaries = ({data,setBenSelected})=>{


    const handleClick = (ben)=>{
        setBenSelected(ben);
        
        
    }
   
   
    return(
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
    )
}


export default ListBeneficiaries;