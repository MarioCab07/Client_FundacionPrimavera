import { useState } from "react";
import { findVolunteer } from "../../services/api.services";
import { Loading } from "../Loading";
import { BsSearch } from "react-icons/bs";

const Search = ({ setVolSelected }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [volFound, setVolFound] = useState([null]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    setLoading(true);
    setShowDropdown(true);

    try {
      const encodeID = encodeURIComponent(search);
      const response = await findVolunteer(encodeID);

      setVolFound(response.data);
    } catch (error) {
      setVolFound([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVolunteer = (volunteer) => {
    setVolSelected(volunteer);
    setShowDropdown(false);
  };

  return (
    <>
      <section className=" h-fit relative w-full flex flex-col gap-4 items-start justify-center mt-10">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-1/3 relative z-10"
        >
          <input
            value={search}
            onChange={handleChange}
            placeholder="Buscar por DUI o nombre"
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
            ) : volFound.length > 0 ? (
              volFound.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="cursor-pointer p-2 rounded-lg hover:bg-amber-100 transition"
                    onClick={() => handleSelectVolunteer(data)}
                  >
                    <span>
                      <p className="font-bold flex items-center gap-2">
                        {data.name}{" "}
                        {data.active ? (
                          <span className="inline-block h-4 w-4 rounded-full bg-green-400 drop-shadow-[0_0_6px_#39ff14]"></span>
                        ) : (
                          <span className="inline-block h-4 w-4 rounded-full bg-red-400 drop-shadow-[0_0_6px_#f87171]"></span>
                        )}
                      </p>{" "}
                    </span>
                    <p>{data.age} años</p>
                    <p>{data.service_type}</p>
                    <p className="text-sm text-gray-500">DUI: {data.dui}</p>
                  </div>
                );
              })
            ) : (
              <p>No se encontraron beneficiarios</p>
            )}
            <button
              onClick={() => setShowDropdown(false)}
              className="bg-amber-300 rounded-lg px-4 py-2 mt-2 cursor-pointer text-white font-bold hover:bg-amber-50 hover:text-amber-300 transition-all duration-300 shadow"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              Cerrar
            </button>
          </article>
        )}
      </section>
    </>
  );
};

export default Search;
