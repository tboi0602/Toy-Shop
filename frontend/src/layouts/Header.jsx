import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/main.css";
import logo from "../assets/logo.png";
import BackToTop from "../components/Button/BackToTop.jsx";
import { useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
        if (window.scrollY > 500) {
          setBackToTop(true);
        }
      } else {
        setIsScrolled(false);
        setBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {backToTop && <BackToTop />}
      <header
        className={`flex justify-between gap-5 p-5 bg-white ${
          isScrolled ? " shadow-md" : ""
        }`}
      >
        <button className="center" onClick={handleLogoClick}>
          <img
            src={logo}
            alt="Logo"
            className="min-w-[100px] h-[50px] overflow-hidden hover:scale-105"
          />
        </button>
        <div className="center gap-2 ">
          <button
            className="btn-error px-5 py-2 rounded-lg whitespace-nowrap max-md:hidden"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button
            className="btn-error-outline px-4 py-2  rounded-lg whitespace-nowrap max-md:hidden"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
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
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
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
