import { useState } from "react";
import { toggleActive } from "../../services/api.services";
import { toast } from "react-toastify";
import { sleep } from "../../tools/tools";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Deactivate = ({ ben, setShowMenu, page, setBenSelected }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setIsClosing(false);
    }, 500);
  };

  const queryClient = useQueryClient();

  const { mutateAsync: toggleMutation, isLoading: saving } = useMutation({
    mutationFn: (data) => toggleActive(ben._id, data),
    onSuccess: ({ data }) => {
      const toggleBen = data.beneficiary;

      setBenSelected?.(toggleBen);

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "beneficiaries",
      });

      handleClose();
      toast.success(
        `Beneficiario ${toggleBen.name} dado de baja exitosamente!`
      );
    },
    onError: (error) => {
      toast.error(
        `Error al dar de baja al beneficiario : ${
          error.response?.data?.message || "Error desconocido"
        }`
      );
    },
  });

  const handleChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Modificando...");
    try {
      const data = {
        reason: reason,
        active: false,
      };
      await toggleMutation(data);
      toast.dismiss(toastId);
    } catch (error) {
      toast.update(toastId, {
        render: "Hubo un problema!",
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
          isClosing ? "slide-out-right" : "slide-in-right"
        } z-50 flex flex-col gap-6 bg-white rounded-lg p-6 shadow-lg w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-amber-300 border-2`}
      >
        <h3 className="text-center font-bold text-2xl text-red-500">
          Dar de baja al beneficiario
        </h3>
        <p className="text-center text-gray-700">
          <span className="font-semibold">Beneficiario:</span> {ben.name}
        </p>
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center"
        >
          <div className="w-full">
            <h4 className="font-semibold text-gray-800 mb-2">Motivo</h4>
            <textarea
              className="border rounded-lg border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-300 focus:outline-none p-3 w-full h-32 resize-none"
              onChange={handleChange}
              value={reason}
              placeholder="Escribe el motivo aquí..."
            />
          </div>
          <div className="flex gap-4 justify-center w-full">
            <button
              type="submit"
              className={`rounded-lg p-3 w-1/3 text-white font-semibold transition cursor-pointer ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-200 hover:text-red-500"
              }`}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg cursor-pointer p-3 w-1/3 bg-gray-300 text-black font-semibold hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Deactivate;
