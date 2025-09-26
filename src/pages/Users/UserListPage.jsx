import { Header } from "../../components/Header";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";

import { Loading } from "../../components/Loading";
import ListUsers from "../../components/User/ListUsers";
import { getUsers } from "../../services/api.services";
import { toast } from "react-toastify";
import DeleteUser from "../../components/User/Delete";
import ModifyUser from "../../components/User/Modify";

const UserList = () => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleOpenDelete = (user) => {
    setOpenDelete(true);
    setSelectedUser(user);
  };
  const handleOpenUpdate = (user) => {
    setOpenUpdate(true);
    setSelectedUser(user);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedUser(null);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedUser(null);
  };

  const fetchData = async () => {
    try {
      const response = await getUsers();

      if (response.status === 200) {
        setData(response.data.Users);
        setIsFetching(false);
      }
    } catch (error) {
      toast.error("Error al obtener usuarios");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <section className="flex flex-col items-center rounded-lg w-full relative z-40 p-2 min-h-fit">
        <div className="flex flex-1 items-center justify-center gap-10  px-4 py-8 text-gray-500">
          <BsFillPeopleFill size={50} />
          <h3 className=" text-6xl font-bold ">Usuarios</h3>
        </div>
        <article className="flex justify-between items-center gap-20 p-4 w-full relative z-10">
          {/* <Search setBenSelected={setBenSelected} /> */}

          <div className="flex gap-4 items-center justify-center">
            <Link
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              className="cursor-pointer w-fit p-3 rounded-lg flex gap-3 justify-center items-center text-white font-bold bg-amber-300 hover:scale-105 transition-all duration-300 hover:bg-yellow-50 hover:text-amber-300 text-center  "
              to={"/RegistrarUsuarios"}
            >
              {" "}
              Agregar Usuario <HiPencilAlt size={40} />
            </Link>
          </div>
        </article>

        {isFetching ? (
          <Loading />
        ) : data ? (
          <ListUsers
            rows={data}
            handleOpenDelete={handleOpenDelete}
            handleOpenUpdate={handleOpenUpdate}
          />
        ) : null}
        {openDelete && (
          <DeleteUser
            user={selectedUser}
            handleCloseDelete={handleCloseDelete}
            fetchData={fetchData}
          />
        )}
        {openUpdate && (
          <ModifyUser
            user={selectedUser}
            handleCloseUpdate={handleCloseUpdate}
            fetchData={fetchData}
          />
        )}
      </section>
    </>
  );
};

export default UserList;
