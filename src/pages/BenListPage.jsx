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
      <section className="flex flex-col items-center rounded-lg w-full relative z-40 p-2">
      <div className="flex flex-1 items-center justify-center gap-10  px-4 py-8 ">
            <BsFillPeopleFill size={30}/>
            <h3 className=" text-6xl ms-madi-regular ">Beneficiarios</h3>
          </div>
        <article className="flex justify-between items-center gap-20 p-4 w-full relative z-10">
          
          <Search setBenSelected={setBenSelected} />

          
          
          <div className="flex gap-4 items-center justify-center">
            <Link style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} className="cursor-pointer w-fit p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300 text-center  " to={"/RegistrarBeneficiario"}>   Agregar Beneficiario  <HiPencilAlt size={40}/></Link>
            
          </div>
        </article>

        <article
  className="w-3/4 flex flex-col bg-gradient-to-br from-gray-200 via-white to-amber-100 rounded-2xl p-6 gap-6 shadow-lg"
  style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px" }}
>
  {/* Toggle Buttons */}
  <div className="flex justify-center">
    <ToggleButtonGroup
      color="primary"
      value={showActive}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="bg-gray-100 rounded-lg p-1"
    >
      <ToggleButton
        value={true}
        className={`px-6 py-2 rounded-lg font-semibold ${
          showActive
            ? "bg-amber-300 text-white shadow-md"
            : "bg-white text-gray-600 hover:bg-gray-200"
        }`}
      >
        Activos
      </ToggleButton>
      <ToggleButton
        value={false}
        className={`px-6 py-2 rounded-lg font-semibold ${
          !showActive
            ? "bg-amber-300 text-white shadow-md"
            : "bg-white text-gray-600 hover:bg-gray-200"
        }`}
      >
        Inactivos
      </ToggleButton>
    </ToggleButtonGroup>
  </div>

  {/* Content */}
  <div className="flex flex-col items-center justify-center">
    {loading ? (
      <Loading />
    ) : data.length > 0 ? (
      <ListBeneficiaries data={data} setBenSelected={setBenSelected} />
    ) : (
      <p className="text-gray-500 text-lg font-medium">
        No hay Beneficiarios Registrados
      </p>
    )}
  </div>
</article>
      </section>
      {benSelected && (
            <BenDetails ben={benSelected} setBenSelected={setBenSelected}/>
        )}
    </>
  );
};

export default BenList;
