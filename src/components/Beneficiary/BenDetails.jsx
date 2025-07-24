import { useEffect, useState } from "react";
import { sanitizeDate } from "../../tools/tools";
import { FcApproval, FcCancel } from "react-icons/fc";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineFilePdf } from "react-icons/ai";
import { HiTrendingDown } from "react-icons/hi";
import Deactivate from "./Deactivate";
import Modify from "./Modify";
import "../../style/animations.css";

import { Documents } from "./Documents";

const Details = ({
  ben,
  showMenu,
  setShowMenu,
  setBenSelected,
  setShowDocuments,
  setShowModify,
  handleClose,
  page,
}) => {
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");

  return (
    <>
      <h2 className="text-2xl font-bold text-center">
        Detalles del Beneficiario
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <img
            src={ben.photo}
            alt={ben.name}
            className="w-32 h-32 rounded-full"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold flex items-center gap-4">
              {ben.name}{" "}
              {ben.active.value ? (
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
            {!ben.active.value ? (
              <p>
                Motivo Inactividad:{" "}
                <span className="font-bold">{ben.active.reason}</span>
              </p>
            ) : null}
            <p>
              Edad: <span className="font-semibold">{ben.age} años</span>{" "}
            </p>
            <p>
              Fecha de Nacimiento:{" "}
              <span className="font-semibold">
                {sanitizeDate(ben.birth_date)}
              </span>
            </p>
            <p>
              DUI: <span className="font-semibold">{ben.dui}</span>
            </p>
            <p>
              Afiliación:{" "}
              <span className="font-semibold">{ben.affiliation}</span>
            </p>
            <p>
              Fecha de Inicio:{" "}
              <span className="font-semibold">
                {sanitizeDate(ben.starting_date)}
              </span>
            </p>
            <p>
              Genero: <span className="font-semibold">{ben.gender}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-8 justify-evenly ">
          <div className="flex flex-col">
            <h2 className="font-bold">Información de Contacto</h2>
            <p>
              Telefono:{" "}
              <span className="font-semibold">{ben.phone_number}</span>
            </p>
            <p>
              Compañía Telefonica:{" "}
              <span className="font-semibold">{ben.phone_company}</span>
            </p>
            <p className="flex items-center">
              Whatsapp:{" "}
              <span className="font-semibold">
                {ben.whatsapp ? <FcApproval /> : <FcCancel />}
              </span>
            </p>
            <p>
              Direccion: <span className="font-semibold">{ben.adress}</span>
            </p>
            <p>
              Lugar de Nacimiento:{" "}
              <span className="font-semibold">{ben.birth_place}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Información Médica </h2>
            <p>
              Altura: <span className="font-semibold">{ben.height} cm</span>
            </p>
            <p>
              Peso: <span className="font-semibold">{ben.weight} lb</span>
            </p>
            <p>
              Enfermedades:{" "}
              {ben.illness.length > 0
                ? ben.illness.map((i) => {
                    return (
                      <span className="font-semibold" key={i}>
                        {i},
                      </span>
                    );
                  })
                : "No hay enfermedades registradas"}
            </p>
            <p>
              Medicinas:{" "}
              {ben.medicines.length > 0
                ? ben.medicines.map((i) => {
                    return (
                      <span className="font-semibold" key={i}>
                        {i},
                      </span>
                    );
                  })
                : "No hay medicinas registradas"}
            </p>
            <p>
              Tipo de Sangre:{" "}
              <span className="font-semibold">{ben.blood_type}</span>
            </p>
            <p>
              Servicio Médico:{" "}
              <span className="font-semibold">{ben.medical_service}</span>
            </p>
            <p>
              Discapacidades:{" "}
              {ben.discapacities.length > 0
                ? ben.discapacities.map((i) => {
                    return (
                      <span className="font-semibold" key={i}>
                        {i},
                      </span>
                    );
                  })
                : "No hay discapacidades registradas"}
            </p>
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold">Información Adicional</h2>
            <p>
              Nivel de Ingresos:{" "}
              <span className="font-semibold">{ben.income_level}</span>
            </p>
            <p>
              Ocupacion: <span className="font-semibold">{ben.work_occup}</span>{" "}
            </p>
            <p className="flex items-center">
              Pensión: {ben.pension ? <FcApproval /> : <FcCancel />}
            </p>
            <p>
              Talla de Camisa:{" "}
              <span className="font-semibold">{ben.shirt_size}</span>
            </p>
            <p>
              Talla de Zapatos:{" "}
              <span className="font-semibold">{ben.shoe_size}</span>
            </p>
            <p>
              Tipo de Casa:{" "}
              <span className="font-semibold">{ben.house_type}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-8">
          <div className="flex flex-col">
            <h2 className="font-bold">Persona Responsable</h2>
            <p>
              Nombre:{" "}
              <span className="font-semibold">{ben.person_in_charge.name}</span>
            </p>
            <p>
              Telefono:{" "}
              <span className="font-semibold">
                {ben.person_in_charge.phone_number}
              </span>
            </p>
            <p>
              Parentesco:{" "}
              <span className="font-semibold">{ben.person_in_charge.dui}</span>
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold">Personas que Cuida</h2>
            {ben.dependents && ben.dependents.length > 0 ? (
              ben.dependents.map((dependent, index) => (
                <p key={index} className="font-semibold">
                  {dependent}
                </p>
              ))
            ) : (
              <p>No hay dependientes registrados</p>
            )}
          </div>
        </div>

        {showMenu && (
          <Deactivate
            ben={ben}
            setBenSelected={setBenSelected}
            setShowMenu={setShowMenu}
            page={page}
          />
        )}
      </div>
      <div className="flex gap-4 justify-center items-center">
        {isAdmin ? (
          <>
            <button
              onClick={() => {
                setShowModify(true);
              }}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="bg-amber-300 rounded-2xl p-3 w-fit gap-4 flex items-center hover:bg-amber-50 cursor-pointer"
            >
              Modificar <BsPencilSquare size={20} />{" "}
            </button>
            {ben.active.value ? (
              <button
                className="bg-red-500 rounded-2xl p-3 w-fit flex gap-4 items-center hover:bg-amber-50 cursor-pointer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                onClick={() => {
                  setShowMenu(true);
                }}
              >
                Dar de Baja <HiTrendingDown />{" "}
              </button>
            ) : null}
          </>
        ) : null}

        <button
          onClick={() => {
            setShowDocuments(true);
          }}
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="bg-amber-300 rounded-2xl p-3 w-fit flex gap-4 items-center hover:bg-amber-50 cursor-pointer"
        >
          Ver Documentos
          <AiOutlineFilePdf size={20} />
        </button>

        <button
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          className="bg-gray-400 text-white rounded-2xl p-3 w-fit hover:bg-amber-50 cursor-pointer transition ease-in-out 0.5s hover:text-gray-400"
          onClick={handleClose}
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

const BenDetails = ({ ben, setBenSelected, page }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setBenSelected(null);
      setIsClosing(false);
    }, 500);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={handleClose}>
        <section
          className={` ${
            isClosing
              ? "scale-out-center"
              : ben
              ? "scale-in-center"
              : "scale-out-center"
          } modal-container `}
          onClick={(e) => e.stopPropagation()}
        >
          {!showDocuments && !showModify ? (
            <Details
              ben={ben}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              setBenSelected={setBenSelected}
              setShowDocuments={setShowDocuments}
              setShowModify={setShowModify}
              handleClose={handleClose}
              page={page}
            />
          ) : showDocuments ? (
            <Documents ben={ben} setShowDocuments={setShowDocuments} />
          ) : showModify ? (
            <Modify
              ben={ben}
              setShowModify={setShowModify}
              setBenSelected={setBenSelected}
              page={page}
            />
          ) : null}
        </section>
      </div>
    </>
  );
};

export default BenDetails;
