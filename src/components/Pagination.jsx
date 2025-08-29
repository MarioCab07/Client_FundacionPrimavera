const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage <=
         totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-amber-300 text-white hover:bg-amber-50 hover:text-amber-300 transition-all ease-in-out 0.5s cursor-pointer"
          }`}
        >
          Anterior
        </button>
        <span className="text-lg font-medium">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-amber-300 text-white hover:bg-amber-50 hover:text-amber-300 cursor-pointer transition-all ease-in-out 0.5s "
          }`}
        >
          Siguiente
        </button>
      </div>
    );
  };
  
  export default Pagination;