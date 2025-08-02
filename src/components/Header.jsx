import Logo from "../assets/icons/FundacionLogo.png";

import { useAuth } from "../context/AuthContext";
import { parserHeaderRole } from "../tools/tools";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

import Menu from "./Menu";

import { useState } from "react";

export const DashBoardHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const buttons = parserHeaderRole(user?.role);

  const handleLogout = async () => {
    await logout();
    localStorage.setItem("showGoodbyeToast", true);
    navigate("/");
  };

  return (
    <>
      <section
        className="p-4 gap-10 flex flex-row-reverse justify-between items-center bg-gradient-to-r from-gray-200 via-white to-gray-300 shadow-lg rounded-b-2xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-28 h-16 object-contain" />
        </div>

        {/* Navigation Buttons */}
        <div className="w-3/4 flex gap-10 justify-center items-center">
          {buttons.map((option) => (
            <Link
              className={`rounded-2xl px-5 py-3 font-bold transform transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-700 hover:text-white ${
                option === "Usuarios"
                  ? "bg-amber-300 text-white"
                  : "bg-white text-gray-700"
              }`}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              to={`/${option}`}
              key={option}
            >
              {option}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer text-gray-700 hover:text-red-600 transition-all duration-300"
          >
            <BiLogOut size={30} />
          </button>
        </div>
      </section>
    </>
  );
};

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <section
        className=" py-4 px-10 flex items-center flex-row-reverse justify-between bg-gradient-to-r from-gray-200 via-white to-gray-300 shadow-lg rounded-b-2xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-40 h-16 object-contain" />
        </div>

        {/* Hamburger Menu */}
        <button
          className="hover:cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-300 transition-all duration-300"
          onClick={handleOpen}
        >
          <GiHamburgerMenu size={30} className="text-gray-700" />
        </button>

        {/* Menu */}
        <Menu open={open} setOpen={setOpen} />
      </section>
    </>
  );
};
