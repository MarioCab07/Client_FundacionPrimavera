import { useState, useEffect } from "react";
import { getVolunteers } from "../../services/api.services";
import { Loading } from "../../components/Loading";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Header } from "../../components/Header";
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import ListVolunteers from "../../components/Volunteer/ListVolunteers";
import VolDetails from "../../components/Volunteer/VolDetails";
import Pagination from "../../components/Pagination";

const VolListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showActive, setShowActive] = useState(true);
  const [volSelected, setVolSelected] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getVolunteers(page, 10, showActive);

      if (response.status === 200 && response.data) {
        setData(response.data.volunteers);
        setPage(response.data.page);
        if (response.data.pages < 1) {
          setTotalPages(1);
        } else {
          setTotalPages(response.data.pages);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, showActive]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setShowActive(newAlignment);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Header />
      <section className="flex flex-col items-center rounded-lg w-full relative z-40 p-2">
        <div className="flex flex-1 items-center justify-center gap-10  px-4 py-8 ">
          <FiUserPlus size={40} />
          <h3 className=" text-6xl ms-madi-regular ">Voluntarios</h3>
        </div>
        <article className="flex justify-between items-center gap-20 p-4 w-full relative z-10">
          {/* Colocar Search para voluntario */}
          {/* <Search setBenSelected={setBenSelected} /> */}

          <div className="flex gap-4 items-center justify-center">
            <Link
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="cursor-pointer w-fit p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300 text-center  "
              to={"/RegistrarVoluntario"}
            >
              {" "}
              Agregar Voluntario <GrGroup size={40} />
            </Link>
          </div>
        </article>

        <article
          className="w-3/4 flex flex-col bg-gradient-to-br from-gray-200 via-white to-amber-100 rounded-2xl p-6 gap-6 shadow-lg"
          style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 4px 12px" }}
        >
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

          <div className="flex flex-col items-center justify-center">
            {loading ? (
              <Loading />
            ) : data.length > 0 ? (
              <ListVolunteers data={data} setVolSelected={setVolSelected} />
            ) : (
              <p className="text-gray-500 text-lg font-medium">
                No hay Voluntarios Registrados
              </p>
            )}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </article>
        {volSelected && (
          <VolDetails setVolSelected={setVolSelected} vol={volSelected} />
        )}
      </section>
    </>
  );
};

export default VolListPage;
