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
import { useAuth } from "../../context/AuthContext";

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
  const { user } = useAuth();
  const isAdmin =
    user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN");

  return (
    <>
      <h2 className="text-2xl font-bold text-center">
        Detalles del Beneficiario
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <span className="rounded-full w-50 h-40">
            <img
              src={ben.photo}
              alt={ben.name}
              className="rounded-full w-40 h-40 object-cover"
            />
          </span>
          <span className="flex flex-col justify-center w-full gap-4">
            <h5 className="font-bold text-2xl flex gap-3 items-center">
              {ben.name}{" "}
              {ben.active.value ? (
                <span className="inline-block h-4 w-4 rounded-full bg-green-400 drop-shadow-[0_0_6px_#39ff14]"></span>
              ) : (
                <span className="inline-block h-4 w-4 rounded-full bg-red-400 drop-shadow-[0_0_6px_#f87171]"></span>
              )}{" "}
            </h5>
            <span className="flex gap-10 w-full">
              <p>
                DUI: <span className="font-semibold">{ben.dui}</span>
              </p>
              <p>
                Género: <span className="font-semibold">{ben.gender}</span>
              </p>
              <p>
                Edad: <span className="font-semibold">{ben.age}</span>
              </p>
              <p>
                Fecha de Nacimiento:{" "}
                <span className="font-semibold">
                  {sanitizeDate(ben.birth_date)}
                </span>
              </p>
              <p>
                Lugar de Nacimiento:{" "}
                <span className="font-semibold">{ben.birth_place}</span>
              </p>
              <p>
                Altura: <span className="font-semibold">{ben.height} cm</span>
              </p>
              <p>
                Peso: <span className="font-semibold">{ben.weight} lb</span>
              </p>
              <p>
                Talla de Camisa:{" "}
                <span className="font-semibold">{ben.shirt_size}</span>
              </p>
              <p>
                Talla de Zapatos:{" "}
                <span className="font-semibold">{ben.shoe_size}</span>
              </p>
            </span>
          </span>
        </div>
        <div className="flex gap-8 max-w-2xs min-w-full flex-wrap justify-evenly ">
          <div className="flex flex-col gap-4 ">
            <h3 className="font-bold text-xl">Información de Contacto</h3>
            <p>
              Numero de telefono:{" "}
              <span className="font-semibold">{ben.phone_number}</span>
            </p>
            <p>
              Compania:{" "}
              <span className="font-semibold">{ben.phone_company}</span>
            </p>
            <p>
              Whatsapp:{" "}
              <span className="font-semibold">
                {ben.whatsapp ? "SI" : "NO"}
              </span>
            </p>
            <p>
              Telefono fijo: <b>{ben.home_phone}</b>
            </p>
          </div>
          <div className="flex flex-col max-w-md min-w-xl gap-2">
            <h3 className="font-bold text-xl text-center">
              Información de Vivienda
            </h3>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <p>
                  Zona: <span className="font-semibold">{ben.zone}</span>
                </p>
                <p>
                  Departamento:{" "}
                  <span className="font-semibold">{ben.department}</span>
                </p>
                <p>
                  Municipio:{" "}
                  <span className="font-semibold">{ben.municipality}</span>
                </p>
                <p>
                  Direccion:{" "}
                  <span className="font-semibold block max-w-sm line-clamp-2">
                    {ben.address}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  Punto de referencia:{" "}
                  <span className="font-semibold block max-w-sm line-clamp-2">
                    {ben.reference_address}
                  </span>
                </p>
                <p>
                  Condicion Habitacional:{" "}
                  <span className="font-semibold">{ben.house_condition}</span>
                </p>
                <p>
                  Personas con quien reside:{" "}
                  <span className="font-semibold">
                    {ben.people_in_house.quantity}{" "}
                    {ben.people_in_house.relationship}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap gap-3">
            <h2 className="font-bold text-xl">Información Médica </h2>
            <p>
              Tipo de sangre:{" "}
              <span className="font-semibold">{ben.blood_type}</span>
            </p>
            <p>
              Enfermedades:{" "}
              {ben.illness !== "" ? (
                <span className="font-semibold">{ben.illness}</span>
              ) : (
                <span className="font-semibold">N/A</span>
              )}
            </p>
            <p>
              Medicinas:{" "}
              {ben.medicines !== "" ? (
                <span className="font-semibold">{ben.medicines}</span>
              ) : (
                <span className="font-semibold">N/A</span>
              )}
            </p>
            <p>
              Discapacidades:{" "}
              {ben.discapacities !== "" ? (
                <span className="font-semibold">{ben.discapacities}</span>
              ) : (
                <span className="font-semibold">N/A</span>
              )}
            </p>
            <p>
              Servicio Médico:{" "}
              <span className="font-semibold">
                {ben.medical_service === "" ? <b>N/A</b> : ben.medical_service}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-10  min-w-full flex-wrap justify-evenly gp-3 ">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Información de Oficio</h2>
            <p>
              Puede leer y escribir:{" "}
              <span className="font-semibold">
                {ben.write_and_read ? "SI" : "NO"}
              </span>
            </p>
            <p>
              Nivel de Educación:{" "}
              <span className="font-semibold">{ben.education_level}</span>
            </p>
            <p>
              Ocupacion:{" "}
              <span className="font-semibold">
                {ben.occupation === "" ? "N/A" : ben.occupation}
              </span>{" "}
            </p>
            <p>
              Tipo de Ingresos :{" "}
              <span className="font-semibold">{ben.income_type}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl text-center">
              Informacion Familiar
            </h2>
            <div className="flex items-center gap-1">
              <h5 className="flex flex-col w-1/5 font-semibold text-center">
                Persona Responsable
              </h5>
              <div className="flex flex-col gap-2 flex-wrap">
                <p>
                  Nombre:{" "}
                  <span className="font-semibold">
                    {ben.person_in_charge.name}
                  </span>
                </p>
                <p>
                  Telefono:{" "}
                  <span className="font-semibold">
                    {ben.person_in_charge.phone_number}
                  </span>
                </p>
                <p>
                  DUI:{" "}
                  <span className="font-semibold">
                    {ben.person_in_charge.dui}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col py-4 gap-4">
              <h2 className="font-semibold text-center">
                Personas que dependen
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {ben.dependents && ben.dependents.length > 0 ? (
                  ben.dependents.map((dependent, index) => (
                    <p
                      key={index}
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                      className="flex max-w-fit min-w-fit p-2 justify-center bg-[#ffffff] border-4 border-amber-200 text-black rounded-2xl"
                    >
                      {dependent}
                    </p>
                  ))
                ) : (
                  <p className="text-center">No hay dependientes registrados</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col py-4 gap-3">
            <h2 className="font-bold text-xl">Informacion de Fundacion</h2>
            <p>
              Fecha de inicio:{" "}
              <span className="font-semibold">
                {sanitizeDate(ben.starting_date)}
              </span>
            </p>
            <p>
              Programa: <span className="font-semibold">{ben.affiliation}</span>
            </p>
            <p>
              Forma de referido:{" "}
              <span className="font-semibold">{ben.referral_source}</span>
            </p>
            <div className="flex flex-col">
              <h5 className="font-semibold text-center">Transporte</h5>
              <div className="">
                <p>
                  Presenta dificultad:{" "}
                  <span className="font-semibold">
                    {ben.transportation.difficulty ? "Sí" : "No"}
                  </span>
                </p>
                <p>
                  Dispone de persona para transporte:{" "}
                  <span className="font-semibold">
                    {ben.transportation.person_available ? "Sí" : "No"}
                  </span>
                </p>
              </div>
            </div>
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
      <div className="flex gap-4 justify-center items-center py-8">
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
      <div className="flex w-fit gap-4 text-sm text-gray-400 absolute">
        <p>
          Registrado por: <b>{ben.created_by.name}</b>
        </p>
        <p>
          Fecha de registro: <b>{sanitizeDate(ben.created_at)}</b>
        </p>
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
            <Documents
              ben={ben}
              setShowDocuments={setShowDocuments}
              page={page}
              setBenSelected={setBenSelected}
            />
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
