import { ToastContainer, toast, Bounce } from "react-toastify";
import { useEffect, useState } from "react";
import { deleteBenDocument } from "../../services/api.services";
import { sleep } from "../../tools/tools";
import { AiFillFile, AiOutlineDelete, AiOutlineUpload } from "react-icons/ai";
import { sanitizeDate } from "../../tools/tools";

import { IoMdOpen } from "react-icons/io";
import "../../style/animations.css";
import { uploadDocuments } from "../../services/api.services";
import { parseRol } from "../../tools/tools";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { Loader } from "../Loading";

const DeleteDoc = ({ ben, selectedDoc, setShowDelete, onDocumentDeleted }) => {
  const [confirm, setConfirm] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowDelete(false);
      setIsClosing(false);
    }, 500);
  };

  const handleChange = (e) => {
    setConfirm(e.target.value);
  };

  const handleSubmit = async (e, ben, fileName) => {
    e.preventDefault();
    const toastId = toast.loading("Eliminando Documento...");
    const data = {
      fileName: fileName,
    };

    try {
      const response = await deleteBenDocument(ben._id, data);

      if (response.status === 200) {
        toast.update(toastId, {
          render: "Documento Eliminado!",
          type: "success",
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });

        onDocumentDeleted(response.data.newFiles);
        handleClose();
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Ocurrio un error!",
        type: "error",
        isLoading: false,
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <>
      <section
        className={`${
          isClosing ? "scale-out-center" : "scale-in-center"
        } z-30 flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-300 border-2 border-solid`}
      >
        <h3 className="text-center font-bold">Eliminar Documento</h3>
        <p>
          Beneficiario: <span className="font-semibold">{ben.name}</span>
        </p>
        <p>
          Documento a Eliminar:{" "}
          <span className="font-semibold">{selectedDoc}</span>
        </p>
        <p>Escriba confirmar para proceder</p>
        <input
          type="text"
          placeholder="confirmar"
          value={confirm}
          onChange={handleChange}
        />
        <div className="flex flex-1 w-full gap-4 items-center justify-center">
          <form
            className="flex justify-center gap-4"
            action="submit"
            onSubmit={(e) => {
              handleSubmit(e, ben, selectedDoc);
            }}
          >
            <button
              className={`rounded-2xl p-3 flex items-center text-white  ${
                confirm !== "confirmar"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-200 hover:text-red-500 cursor-pointer"
              }`}
              disabled={confirm !== "confirmar"}
              type="submit"
            >
              Eliminar <AiOutlineDelete size={20} />
            </button>
            <button
              className="bg-[#FFF582] rounded-2xl p-3  hover:bg-white transition ease-in-out 0.5s cursor-pointer  flex  items-center justify-center mx-auto"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              type="button"
              onClick={handleClose}
            >
              Cancelar
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

const UploadDoc = ({ ben, setShowUpload, onUploadDocument }) => {
  const [files, setFiles] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowUpload(false);
      setIsClosing(false);
    }, 500);
  };

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Limita la cantidad de archivos a 10
    if (selectedFiles.length + files.length > 10) {
      toast.error("Solo puedes subir un máximo de 10 archivos.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Subiendo Documento...");
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("document", file);
    });

    try {
      const response = await uploadDocuments(ben._id, formData);

      if (response.status === 200) {
        toast.update(toastId, {
          render: "Documento Subido!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        onUploadDocument(response.data.newFiles);
        handleClose();
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Ocurrio un error!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section
        className={`${
          isClosing ? "slide-out-right" : "slide-in-right"
        } w-full flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg z-20`}
      >
        <h2 className="text-center font-semibold">Subir Documentos</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-300 transition"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <AiOutlineUpload size={40} className="text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">
                  Haz clic para subir archivos
                </span>{" "}
                o arrastra y suelta
              </p>
              <p className="text-xs text-gray-500">Máximo 10 archivos</p>
            </div>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">Archivos seleccionados:</h4>
              <ul className="list-disc pl-5">
                {files.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:underline cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className={` rounded-lg transition p-3 ${
                files.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-amber-300 hover:bg-amber-50 cursor-pointer"
              }`}
              disabled={files.length === 0}
            >
              Subir
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 cursor-pointer text-black rounded-lg p-3 hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export const Documents = ({ ben, setShowDocuments, page, setBenSelected }) => {
  const queryClient = useQueryClient();
  const [documents, setDocuments] = useState(ben.files);
  const [isClosing, setIsClosing] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN")) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowDocuments(false);
      setIsClosing(false);
    }, 800);
  };
  const statusKey = ben.active.value ? "active" : "inactive";

  const handleClick = (doc) => {
    setSelectedDoc(doc);
    setShowDelete(true);
  };

  const handleDocumentDeleted = (newFiles) => {
    setDocuments(newFiles);
    queryClient.setQueryData(["beneficiaries", statusKey, page], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        beneficiaries: oldData.beneficiaries.map((b) =>
          b._id === ben._id ? { ...b, files: newFiles } : b
        ),
      };
    });
    setBenSelected((prev) =>
      prev && prev._id === ben._id ? { ...prev, files: newFiles } : prev
    );
  };

  const handleDocumentUploaded = (newFiles) => {
    setDocuments(newFiles);

    queryClient.setQueryData(["beneficiaries", statusKey, page], (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        beneficiaries: oldData.beneficiaries.map((b) =>
          b._id === ben._id ? { ...b, files: [...newFiles] } : b
        ),
      };
    });
    setBenSelected((prev) =>
      prev && prev._id === ben._id ? { ...prev, files: newFiles } : prev
    );
  };

  return (
    <>
      <section className=" p-50 bg-amber-200">
        <section
          className={`${
            isClosing ? "slide-out-right" : "slide-in-right"
          } w-full flex flex-col gap-4 h-1/2 rounded-lg p-4 shadow-lg z-20 bg-white justify-center`}
        >
          <h2 className="w-full text-center font-semibold">Documentos</h2>
          <h3>
            Beneficiario: <span className="font-bold">{ben.name}</span>
          </h3>

          {!showUpload ? (
            <>
              {isAdmin && (
                <button
                  onClick={() => {
                    setShowUpload(true);
                  }}
                  className="flex gap-2 cursor-pointer items-center bg-amber-300 rounded-2xl hover:bg-amber-50 hover:text-amber-300 transition ease-in-out 0.5s w-fit p-2  "
                >
                  Subir Documentos <AiOutlineUpload size={20} />{" "}
                </button>
              )}

              <article className="flex flex-col gap-4">
                <div className="flex justify-evenly  w-full gap-10">
                  <h5>Nombre</h5>
                  <h5>Fecha de Subida</h5>
                </div>
                <div key={ben._id} className="flex flex-col gap-4">
                  {documents.length > 0 ? (
                    documents.map((doc, index) => {
                      return (
                        <>
                          <div
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            }}
                            key={index}
                            className={`flex justify-evenly flex-1 items-center w-full gap-10 p-4 ${
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                          >
                            <div>
                              <AiFillFile size={20} />
                            </div>
                            <div className="flex-1 flex justify-evenly items-center">
                              <a
                                className=" underline flex items-center hover:text-blue-600 "
                                href={doc.url}
                                target="blank"
                              >
                                {" "}
                                {<IoMdOpen />}
                                {doc.name}{" "}
                              </a>
                              <p className=" w-1/3 text-center ">
                                {sanitizeDate(doc.date)}
                              </p>
                            </div>

                            <div className="flex gap-6">
                              {isAdmin && (
                                <button
                                  onClick={() => handleClick(doc.name)}
                                  style={{
                                    boxShadow:
                                      "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                  }}
                                  className="font-semibold bg-red-500 p-4 rounded-2xl hover:bg-white hover:text-red-500 transition ease-in-out 0.5s cursor-pointer"
                                >
                                  {" "}
                                  <AiOutlineDelete size={20} />{" "}
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <h5 className="w-full text-center font-sans">
                      No hay Documentos guardados
                    </h5>
                  )}
                </div>
              </article>
              <button
                className="bg-[#FFF582] rounded-2xl p-3 w-fit hover:bg-white transition ease-in-out 0.5s cursor-pointer mt-4 flex gap-4 items-center justify-center mx-auto"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                onClick={handleClose}
              >
                Volver
              </button>
            </>
          ) : (
            <UploadDoc
              onUploadDocument={handleDocumentUploaded}
              ben={ben}
              setShowUpload={setShowUpload}
            />
          )}

          {showDelete && (
            <DeleteDoc
              onDocumentDeleted={handleDocumentDeleted}
              selectedDoc={selectedDoc}
              ben={ben}
              setShowDelete={setShowDelete}
            />
          )}
        </section>
      </section>
    </>
  );
};
