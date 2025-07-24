import { DashBoardHeader } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ROLES } from "../constants/constants";

const parserBoardRol = (role) => {
  const commonOptions = [
    {
      title: "Gestionar Beneficiarios",
      url: "/GestionarBeneficiarios",
      bg: "linear-gradient(135deg, #D1D5DB, #9CA3AF)",
      icon: <BsPeople size={60} />,
      quote:
        "Gestiona la información, documentos y estado de los beneficiarios existentes.",
    },
    {
      title: "Registrar Voluntario",
      url: "/RegistrarVoluntario",
      bg: "linear-gradient(135deg, #FDE047, #FACC15)",
      icon: <RiUserAddLine size={60} />,
      quote: "Formulario de Registro para los nuevos voluntarios.",
    },
  ];

  if (role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN) {
    return [
      {
        title: "Registrar Beneficiario",
        url: "/RegistrarBeneficiario",
        bg: "linear-gradient(135deg, #E5E7EB, #D1D5DB)",
        icon: <AiOutlineFileAdd size={60} />,
        quote: "Formulario de Registro para los nuevos beneficiarios.",
      },
      ...commonOptions,
    ];
  }

  return commonOptions;
};

const DashBoard = () => {
  const { user } = useAuth();
  const options = parserBoardRol(user?.role);
  useEffect(() => {
    const toastId = "welcome-toast"; // Unique ID for the toast
    if (!toast.isActive(toastId)) {
      toast.success(`👋 Bienvenido ${user?.name}`, {
        toastId, // Use the unique ID
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
  }, []);
  return (
    <>
      <section className="flex flex-col h-screen">
        <DashBoardHeader />
        <article className="w-full flex-1 h-full flex items-center justify-center gap-10">
          {options.map((option) => (
            <Link
              to={option.url}
              key={option.title}
              className="relative w-1/4 h-1/3 flex flex-col items-center justify-center rounded-3xl overflow-hidden shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 group"
              style={{
                background: `${option.bg}`,
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              }}
            >
              {/* Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Default Content */}
              <div className="z-10 flex flex-col items-center gap-4 group-hover:opacity-0 transition-opacity duration-300">
                <div className="p-4 bg-white rounded-full shadow-md">
                  {option.icon}
                </div>
                <h5 className="font-bold text-2xl text-white">
                  {option.title}
                </h5>
              </div>

              {/* Hover Content */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-center text-lg font-semibold px-4">
                  {option.quote}
                </p>
              </div>

              {/* Border Animation */}
              <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-yellow-400 transition-all duration-500"></div>
            </Link>
          ))}
        </article>
      </section>
    </>
  );
};

export default DashBoard;
