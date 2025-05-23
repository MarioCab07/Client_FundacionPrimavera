import { useState,useEffect } from "react";
import { getBeneficiaries,generateCSV } from "../../services/api.services";
import { toast } from "react-toastify";
import { Loading } from "../Loading";
import CheckboxValue from "../Checkbox";
import { GrDocumentCsv } from 'react-icons/gr'

const GenerateCSV = ({ showCSV,setShowCSV }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [listBen, setListBen] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedDUIs, setSelectedDUIs] = useState([]);

    const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowCSV(false);
      setIsClosing(false);
      
    }, 500);
  };

    const fetchData = async () => {
         setLoading(true);
        try {
            const response = await getBeneficiaries(1, 1000);
            if (response.status === 200 && response.data) {
                setListBen(response.data.beneficiaries);
            }
        } catch (error) {
            toast.update(error, {
                        render: "Problemas al obtener los beneficiarios",
                        type: "error",
                        isLoading: false,
                        autoClose: 2000, 
                      });
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(showCSV){
            fetchData();
        }
    },[showCSV]);

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
useEffect(() => {
    if (selectAll) {
      setSelectedDUIs(listBen.map((ben) => ben.dui));
    } else if (selectedDUIs.length !== listBen.length) {
      setSelectedDUIs((prev) => (prev.length === listBen.length ? [] : prev));
    }
  }, [selectAll, listBen]);
  

  const generateCSVFile = async () => {
    const toastId = toast.loading("Generando CSV...");
    try {
        const getAll = selectAll ? 1 : 0;
        const data  ={
            duiList: selectedDUIs,
            getAll: getAll

        }
      const response = await generateCSV(data);
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
    } catch (error) {
      toast.update(toastId, {
        render: "Error al generar el CSV",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }finally{
        handleClose();
    }
  }

   return (
    <>
      <section
        className={`${
          isClosing
            ? "scale-out-center"
            : showCSV
            ? "scale-in-center"
            : "scale-out-center"
        } z-50 flex flex-col gap-6 bg-white rounded-3xl p-8 shadow-2xl w-full max-w-xl mx-auto absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 border-amber-300 border-2 border-solid transition-all duration-500`}
        style={{
          minHeight: "450px",
          borderRadius: "2rem",
        }}
      >
        <h3 className="w-full text-center font-bold text-2xl text-amber-600 mb-2">Generar CSV</h3>
        <h5 className="text-center text-gray-700 mb-4">Elija los beneficiarios para generar el CSV</h5>
        <div className="flex justify-center mb-2">
          <CheckboxValue checked={selectAll} setChecked={setSelectAll} label={"Seleccionar Todos"} />
        </div>
        {loading ? (
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

        <div className="flex justify-between items-center gap-4 mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-2xl shadow transition-all duration-300 cursor-pointer"
            onClick={handleClose}
          >
            Cerrar
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
        </div>
      </section>
    </>
  );
}

export default GenerateCSV;