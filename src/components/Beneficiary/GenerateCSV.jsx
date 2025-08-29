import { useState, useEffect, useMemo } from "react";
import { getBeneficiaries, generateCSV } from "../../services/api.services";
import { toast } from "react-toastify";
import { Loading } from "../Loading";
import CheckboxValue from "../Checkbox";
import { GrDocumentCsv } from "react-icons/gr";
import { useAllActivesCsv } from "../../hooks/useAllActivesCsv";
import { CSV_FIELDS } from "../../constants/constants";

const BenList = ({
  listBen,
  isLoading,
  currentIds,
  selectedDUIs,
  setSelectedDUIs,
  selectAll,
  setSelectAll,
}) => {
  const handleSelect = (dui) => {
    setSelectedDUIs((prev) => {
      let newSelected;
      if (prev.includes(dui)) {
        newSelected = prev.filter((item) => item !== dui);
      } else {
        newSelected = [...prev, dui];
      }
      if (selectAll && newSelected.length !== listBen.length) {
        setSelectAll(false);
      }
      return newSelected;
    });
  };

  const handleToggleAll = (checked) => {
    setSelectAll(checked);
    setSelectedDUIs(checked ? currentIds : []); // selecciona o limpia TODO
  };

  return (
    <>
      <article className="w-full h-full">
        <h5 className="text-center text-gray-700 mb-4">
          Elija los beneficiarios para generar el CSV
        </h5>
        <div className="flex justify-center mb-2">
          <CheckboxValue
            checked={selectAll}
            setChecked={handleToggleAll}
            label={"Seleccionar Todos"}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-2 overflow-scroll max-h-60">
            {listBen.map((ben) => (
              <div
                key={ben.dui}
                onClick={() => handleSelect(ben.dui)}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${
                  selectedDUIs.includes(ben.dui)
                    ? "bg-amber-200 border-amber-400 font-bold"
                    : "bg-white border-gray-300"
                }`}
              >
                <div className="flex justify-between px-4">
                  <span>{ben.name}</span>
                  <span>{ben.dui}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
};

const Fields = ({ selectedFields, setSelectedFields }) => {
  const handleSelect = (field) => {
    setSelectedFields((prev) => {
      const exists = prev.some((item) => item.value === field.value);

      if (exists) {
        return prev.filter((item) => item.value !== field.value);
      } else {
        return [...prev, field];
      }
    });
  };
  return (
    <>
      <section className="grid grid-cols-3 gap-3 w-full max-w-3xl mx-auto">
        {CSV_FIELDS.map((field) => {
          const isSelected = selectedFields.some(
            (item) => item.value === field.value
          );

          return (
            <button
              key={field.value}
              type="button"
              onClick={() => handleSelect(field)}
              className={isSelected ? "selected-field" : "field"}
            >
              {field.label}
            </button>
          );
        })}
      </section>
    </>
  );
};

const GenerateCSV = ({ showCSV, setShowCSV }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDUIs, setSelectedDUIs] = useState([]);
  const [selectedFields, setSelectedFields] = useState([
    { label: "Nombre", value: "name" },
  ]);
  const [section, setSection] = useState("fields");

  const { data: listBen = [], isLoading } = useAllActivesCsv(showCSV);
  const currentIds = useMemo(() => listBen.map((b) => b.dui), [listBen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCSV(false);
      setIsClosing(false);
      setSelectAll(false);
      setSelectedDUIs([]);
    }, 500);
  };

  const generateCSVFile = async () => {
    const toastId = toast.loading("Generando CSV...");
    try {
      const getAll = selectAll ? 1 : 0;
      if (selectedDUIs.length === 0 && !getAll) {
        toast.update(toastId, {
          render: "Seleccione al menos un beneficiario",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        return;
      }
      const form = {
        duiList: selectedDUIs,
        getAll: getAll,
        fields: selectedFields,
      };
      console.log(form);

      const response = await generateCSV(form);
      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "beneficiarios.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        toast.update(toastId, {
          render: "CSV generado!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
      handleClose();
    } catch (error) {
      toast.update(toastId, {
        render: "Error al generar el CSV",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <section
        className={`${
          isClosing
            ? "scale-out-center"
            : showCSV
            ? "scale-in-center"
            : "scale-out-center"
        } z-50 flex flex-col gap-6 bg-white rounded-3xl p-8 shadow-2xl w-1/2 h-full  mx-auto absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 border-amber-300 border-2 border-solid transition-all duration-500`}
      >
        <h3 className="w-full text-center font-bold text-2xl text-amber-600 mb-2">
          Generar CSV
        </h3>

        {section === "fields" ? (
          <Fields
            selectedFields={selectedFields}
            setSelectedFields={setSelectedFields}
          />
        ) : (
          <></>
        )}

        {section === "list" ? (
          <BenList
            listBen={listBen}
            isLoading={isLoading}
            currentIds={currentIds}
            selectAll={selectAll}
            setSelectAll={setSelectAll}
            selectedDUIs={selectedDUIs}
            setSelectedDUIs={setSelectedDUIs}
          />
        ) : (
          <></>
        )}

        <div className="flex justify-between items-center gap-4 mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-2xl shadow transition-all duration-300 cursor-pointer"
            onClick={handleClose}
          >
            Cerrar
          </button>

          {section === "list" ? (
            <>
              <button
                onClick={() => {
                  setSection("fields");
                }}
                className="prev-button"
              >
                Campos
              </button>
              <button
                className="p-5 rounded-2xl w-40 text-amber-50 relative overflow-hidden cursor-pointer group"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(27,238,189,1) 0%, rgba(58,238,13,1) 87%)",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                onClick={generateCSVFile}
              >
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-x-full font-bold ">
                  Generar
                </span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 transform translate-x-full group-hover:translate-x-0">
                  <GrDocumentCsv size={30} />
                </span>
              </button>
            </>
          ) : (
            <>
              <button
                className="next-button"
                onClick={() => {
                  setSection("list");
                }}
              >
                Beneficiarios
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default GenerateCSV;
