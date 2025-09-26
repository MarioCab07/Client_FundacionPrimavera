import { GrGroup } from "react-icons/gr";
import { FiUserPlus } from "react-icons/fi";
import { Header } from "../../components/Header";
import UserAddForm from "../../components/User/UserAddForm";
import { Link } from "react-router-dom";

const UserAdd = () => {
  return (
    <>
      <Header />
      <div className="w-full flex justify-center items-center gap-6 py-4">
        {" "}
        <FiUserPlus color="#4B5563" size={50} />{" "}
        <h2 className="text-6xl font-bold text-gray-500">Registrar Usuario</h2>
      </div>
      <section className=" flex h-fit flex-col justify-center items-center py-10">
        <div className="w-full h-fit flex justify-end px-8">
          <Link
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            to="/Usuarios"
            className="bg-yellow-400 py-2 flex items-center gap-4 hover:text-yellow-400 text-white font-bold px-4 rounded-lg hover:bg-white transition-all ease-in-out 0.5s"
          >
            Usuarios
            <GrGroup size={30} />
          </Link>
        </div>
        <UserAddForm />
      </section>
    </>
  );
};

export default UserAdd;
