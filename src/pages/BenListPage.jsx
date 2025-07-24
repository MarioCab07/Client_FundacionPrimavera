import { Header } from "../components/Header";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { HiPencilAlt } from "react-icons/hi";
import { GrDocumentCsv } from "react-icons/gr";
import { useState, useEffect } from "react";

import { Loading } from "../components/Loading";
import { useBeneficiaries } from "../hooks/useBeneficiaries";

import ListBeneficiaries from "../components/Beneficiary/ListBeneficiaries";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { ToastContainer, Bounce } from "react-toastify";
import Search from "../components/Beneficiary/Search";

import BenDetails from "../components/Beneficiary/BenDetails";
import Pagination from "../components/Pagination";
import GenerateCSV from "../components/Beneficiary/GenerateCSV";

const BenList = () => {
  const [benSelected, setBenSelected] = useState();
  const [showActive, setShowActive] = useState(true);
  const [page, setPage] = useState(1);
  const [showCSV, setShowCSV] = useState(false);

  const { data, isLoading, isFetching } = useBeneficiaries({
    page,
    limit: 10,
    showActive,
  });
  const beneficiaries = data?.beneficiaries || [];
  const totalPages = data?.totalPages || 1;

  const handleToggle = (_, newVal) => {
    if (newVal !== null) {
      setShowActive(newVal);
      setPage(1); // resetear página al cambiar estado
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
          <BsFillPeopleFill size={40} />
          <h3 className=" text-6xl ms-madi-regular ">Beneficiarios</h3>
        </div>
        <article className="flex justify-between items-center gap-20 p-4 w-full relative z-10">
          <Search setBenSelected={setBenSelected} />

          <div className="flex gap-4 items-center justify-center">
            <button
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="flex gap-2 w-fit items-center cursor-pointer bg-green-600 text-white font-bold p-3 rounded-lg  hover:scale-105 transition-all duration-300 hover:bg-green-50 hover:text-green-300"
              onClick={() => setShowCSV(true)}
            >
              Generar CSV <GrDocumentCsv size={40} />
            </button>
            <Link
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="cursor-pointer w-fit p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300 text-center  "
              to={"/RegistrarBeneficiario"}
            >
              {" "}
              Agregar Beneficiario <HiPencilAlt size={40} />
            </Link>
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
              onChange={handleToggle}
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
            {isFetching ? (
              <Loading />
            ) : beneficiaries.length > 0 ? (
              <ListBeneficiaries
                data={beneficiaries}
                setBenSelected={setBenSelected}
              />
            ) : (
              <p className="text-gray-500 text-lg font-medium">
                No hay Beneficiarios Registrados
              </p>
            )}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </article>

        {benSelected && (
          <BenDetails
            page={page}
            ben={benSelected}
            setBenSelected={setBenSelected}
          />
        )}
        {showCSV && <GenerateCSV showCSV={showCSV} setShowCSV={setShowCSV} />}
      </section>
    </>
  );
};

export default BenList;
