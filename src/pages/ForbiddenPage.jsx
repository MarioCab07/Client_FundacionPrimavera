// src/pages/Forbidden.jsx
import { MdLock } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => navigate(-1);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <MdLock className="text-yellow-500 mb-4" size="4rem" />
        <h1 className="text-6xl font-bold text-gray-800">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-2">
          Acceso restringido
        </h2>
        <p className="text-gray-500 mt-4">
          No tienes permisos para ver esta página.
          {location.state?.from && (
            <>
              <br />
              <span className="text-xs text-gray-400">
                Intentaste acceder a: {location.state.from.pathname}
              </span>
            </>
          )}
        </p>

        <div className="flex gap-3 mt-8">
          <button
            onClick={goBack}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Volver
          </button>
        </div>
      </div>
    </section>
  );
};

export default Forbidden;
