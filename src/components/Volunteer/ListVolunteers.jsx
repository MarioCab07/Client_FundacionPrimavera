
const ListVolunteers = ({ data, setVolSelected }) => {

    const handleClick = (ben)=>{
        setVolSelected(ben);
        
        
    }
   
  return (
    <>
      <div className="flex flex-col max-h-[600px] overflow-y-scroll gap-6 w-full custom-scrollbar">
        {data.map((vol) => (
          <div
            key={vol._id}
            className="flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl p-6 cursor-pointer"
            onClick={() => handleClick(vol)}
          >
            <div className="flex justify-evenly items-center gap-6 w-full">
              <div className="flex flex-col flex-1 gap-2">
                <h4 className="text-xl font-bold text-gray-800">{vol.name}</h4>
                <p className="text-sm text-gray-500">{vol.age} años</p>
              </div>
              <div className="flex flex-col flex-1 items-center gap-1">
                <p className="text-sm font-semibold text-gray-600">DUI</p>
                <p className="text-base font-bold text-gray-800">{vol.dui}</p>
              </div>
              <div className="flex flex-col flex-1 items-center gap-1">
                  <p className="text-sm font-semibold text-gray-600">Tipo de Servicio</p>
                  <p className="text-base font-bold text-gray-800">{vol.service_type}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold text-gray-600">Estado</p>
                  {vol.active ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      Activo
                      <div
                        className="w-4 h-4 rounded-full bg-green-500"
                        style={{ boxShadow: "0 0 10px rgba(58, 238, 13, 0.5)" }}
                      ></div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      Inactivo
                      <div
                        className="w-4 h-4 rounded-full bg-red-500"
                        style={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)" }}
                      ></div>
                    </div>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>


    </>
  );
};

export default ListVolunteers;
