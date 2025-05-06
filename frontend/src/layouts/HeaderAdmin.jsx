import React, { useState } from "react";
import "../Styles/main.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/handleAPI.js";
import Swal from "sweetalert2";
import useInfo from "../Function/UseInfoUser.js"; // Import custom hook
const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);

const HeaderAdmin = ({ stylePro, styleCart, styleOrder }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await logout();
      if (res.success) navigate("/login");
      else console.log(res.message);
    }
  };

  const { info } = useInfo();
  return (
    <header className="relative flex gap-5 p-5 bg-white shadow-md">
      <button className="center">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/dashboard-admin")}
          className="min-w-[127px] h-[55px] overflow-hidden hover:scale-105"
        />
      </button>

      <div className="Box-Search min-w-[80px] flex-1 center bg-gray-100 hover:bg-white hover:border hover:border-red-500 h-[56px] rounded-full border border-transparent">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="inline-block w-11/12 h-full pl-5 bg-transparent outline-none placeholder:text-black"
        />
        <div className="flex items-center h-full gap-3 pr-2">
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-400 hover:text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Icon>
          <Icon className="w-10 h-10 text-white bg-red-600 rounded-full center hover:bg-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Icon>
        </div>
      </div>

      <div className="hidden lg:flex gap-10">        
        <Icon
          className={`Profile ${stylePro} center`}
          onClick={() => navigate("/profile-admin")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          {info.username}
        </Icon>
        <button
          onClick={handleLogout}
          className="px-5 rounded-full btn-error whitespace-nowrap hover:scale-110"
        >
          Log out
        </button>
      </div>

      {/* Menu nhỏ - chỉ hiện khi < lg */}
      <div className="flex items-center ml-auto lg:hidden text-red-600">
        <Icon onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Icon>
      </div>
    </header>
  );
};

export default HeaderAdmin;
