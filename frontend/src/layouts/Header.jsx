import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/main.css";
import LoginButton from "../components/Button/LoginButton";
import SignupButton from "../components/Button/SignupButton";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="flex gap-5 p-5 bg-white shadow-md">
        <button className="center" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="Logo"
            className="min-w-[127px] h-[55px] overflow-hidden hover:scale-105"
          />
        </button>

        <div className="min-w-[80px] flex-1 center bg-gray-100 hover:bg-white hover:border hover:border-red-500 h-[56px] rounded-full border border-transparent">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-11/12 h-full pl-5 bg-transparent outline-none placeholder:text-black"
          />
          <div className="flex items-center h-full gap-3">
            <button className="text-gray-400 hover:text-black">
              <XIcon />
            </button>
            <button className="w-10 h-10 text-white bg-red-600 rounded-full hover:bg-red-500 center">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="btn-error px-7 py-4 rounded-full whitespace-nowrap max-md:hidden">
            <LoginButton />
          </div>
          <div className="btn-error-outline px-6 py-4 rounded-full whitespace-nowrap max-md:hidden">
            <SignupButton />
          </div>
          <div
            className="hidden max-md:flex items-center text-red-600 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col md:hidden absolute top-20 right-5 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 gap-2">
          <div className="btn-error rounded-md px-2">
            <LoginButton />
          </div>
          <div className="btn-error-outline rounded-md px-2">
            <SignupButton />
          </div>
        </div>
      )}
    </>
  );
};

// Tách icon thành component cho gọn
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = () => (
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
);

const MenuIcon = () => (
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
);

export default Header;
