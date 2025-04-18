import { Header } from "../components/Header";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiSearchAlt } from 'react-icons/bi'

import { HiPencilAlt } from 'react-icons/hi'
import { useState,useEffect } from "react";


import { getBeneficiaries,getInactiveBeneficiaries } from "../services/api.services";
import { sleep } from "../tools/tools";
import { Loading } from "../components/Loading";

import ListBeneficiaries from "../components/Beneficiary/ListBeneficiaries";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { ToastContainer, Bounce } from "react-toastify";
import Search from "../components/Beneficiary/Search";



import BenDetails from "../components/Beneficiary/BenDetails";




const BenList = () => {

    const [data,setData] = useState([]);
    const [inactive,setInactive] = useState([]);
    const [active,setActive] = useState([]);
    const [loading,setLoading] = useState(false);
    const [benSelected,setBenSelected] = useState();
    const [showActive,setShowActive] = useState(true);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [searched,setSearched]= useState();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                
                    setLoading(true);
                    sleep(1000);
                    
                    const activeBen = await getBeneficiaries(1,10);
                    const inactiveBen = await getInactiveBeneficiaries(1,10);

                    
                    
                    if(activeBen.status===200 && activeBen.data){
                        setActive(activeBen.data.beneficiaries);
                        setData(activeBen.data.beneficiaries);
                        setPage(activeBen.data.page);
                        setTotalPages(activeBen.data.pages);
                    }

                    if(inactiveBen.status===200 && inactiveBen.data){
                        setInactive(inactiveBen.data.beneficiaries);
                        
                    }
                
                
                
                
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    },[])

    useEffect(()=>{

      if(showActive){
        setData(active);
      }else{
        setData(inactive);
      }
      
    },[showActive])




    const handleChange= (event, newAlignment) => {
      if (newAlignment !== null) {
        setShowActive(newAlignment); // Actualiza el estado solo si newAlignment no es null
    }
    }

  return (
    <>
      <Header />
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
      <section className="flex flex-col items-center rounded-lg w-full relative z-40">
      <div className="flex flex-1 items-center justify-center gap-10  px-4 py-2 ">
            <BsFillPeopleFill size={30}/>
            <h3 className="font-bold text-4xl">Beneficiarios</h3>
          </div>
        <article className="flex justify-between items-center gap-20 p-4 w-full relative z-10">
          
          <Search setBenSelected={setBenSelected} />

          
          
          <div className="flex gap-4 items-center justify-center">
            <Link style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className=" cursor-pointer flex-1 p-2 rounded-2xl flex gap-5 justify-center items-center bg-amber-200 hover:bg-white transition-all duration-300 ease-in-out hover:text-amber-300 font-bold text-center" to={"/RegistrarBeneficiario"}>   Agregar Beneficiario  <HiPencilAlt size={30}/></Link>
            
          </div>
        </article>

        <article className="w-1/2 flex flex-col bg-[#F1F1F1] rounded-2xl p-4 gap-4" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
        <ToggleButtonGroup
      color="primary"
      value={showActive}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={true}>Activos</ToggleButton>
      <ToggleButton value={false}>Inactivos</ToggleButton>
      
    </ToggleButtonGroup>
            {loading ? <Loading/> : 
            (data.length > 0 ? (<ListBeneficiaries data={data} setBenSelected={setBenSelected}/>): <p>No hay Beneficiarios Registrados</p>)
        
            
        }

        
        </article>
      </section>
      {benSelected && (
            <BenDetails ben={benSelected} setBenSelected={setBenSelected}/>
        )}
    </>
  );
};

export default BenList;
