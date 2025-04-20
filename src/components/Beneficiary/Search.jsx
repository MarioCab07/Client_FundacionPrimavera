import { useState } from "react";
import { findBeneficiary } from "../../services/api.services";
import { Loading } from "../Loading";
import { BsSearch } from 'react-icons/bs'

const Search=({setBenSelected})=>{

    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(false);
    const [benFound,setBenFound] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);


    const handleChange = (e)=>{
        setSearch(e.target.value);
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowDropdown(true); 
        try {
        const encondeId = encodeURIComponent(search);
          const response = await findBeneficiary(encondeId);
          console.log(response);
          
          setBenFound(response.data); 
        } catch (error) {
          setBenFound(null); 
        } finally {
          setLoading(false); 
        }
      };

      const handleSelectBeneficiary = (beneficiary) => {
        setBenSelected(beneficiary); 
        setShowDropdown(false); 
      };
    return(
        <>
        <section className=" h-fit relative w-full flex flex-col gap-4 items-start justify-center mt-10">
        <form
  onSubmit={handleSearch}
  className="flex items-center gap-2 w-1/3 relative z-10"
>
  <input
    value={search}
    onChange={handleChange}
    placeholder="Buscar por DUI o nombre exacto"
    type="text"
    className="bg-white p-3 w-full rounded-lg relative z-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-gray-100 transition-all duration-300"
    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
  />
  <button
    style={{
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }}
    className="cursor-pointer w-1/4 p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300  "
  >
    <BsSearch size={20} />
    Buscar
  </button>
</form>
  
          {/* Dropdown */}
          {showDropdown && (
            <article
              className="absolute top-10 left-0 w-1/4 flex flex-col gap-4 bg-white z-50  p-4"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              {loading ? (
                <Loading />
              ) : benFound ? (
                <div
                  className="cursor-pointer p-2 rounded-lg hover:bg-amber-100 transition"
                  onClick={() => handleSelectBeneficiary(benFound)}
                >
                  <p className="font-bold">{benFound.name}</p>
                  <p>{benFound.age} años</p>
                  <p className="text-sm text-gray-500">DUI: {benFound.dui}</p>
                </div>
              ) : (
                <p>No se encontraron beneficiarios</p>
              )}
            </article>
          )}
        </section>
  
        {/* Detalles del beneficiario */}
        
      </>
    )


}



export default Search;