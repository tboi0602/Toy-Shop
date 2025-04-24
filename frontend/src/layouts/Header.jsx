import React from "react";
import "../Styles/main.css";
import LoginButton from "../components/Button/LoginButton";
import SignupButton from "../components/Button/SignupButton";
import logo from "../assets/logo.png";
import { Navigate } from "react-router-dom";
const Header = () => {
  return (
    <header className=" flex p-5 gap-5 sticky top-0 z-10 bg-white shadow-md">
      <button className=" center">
        <img onClick={()=>{Navigate("/")}} className="min-w-[127px] h-[55px] overflow-hidden hover:scale-105" src={logo} alt="" />
      </button>
      <div
        className=" 
          min-w-[80px]
          flex-1
          center
          bg-gray-100 
          hover:bg-white hover:border hover:border-red-500
          h-[56px] 
          rounded-full border 
          border-transparent  

          "
      >
        <input
          className=" inline-block w-11/12 h-full outline-none pl-5 placeholder:text-black bg-transparent "
          type="text"
          placeholder="What are you looking for?"
        />
        <div className="h-full flex items-center gap-3 ">
          <button className="text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button className="h-10 w-10  rounded-full bg-red-600 hover:bg-red-500 text-white center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <LoginButton></LoginButton>
        <SignupButton></SignupButton>
      </div>
    </header>
  );
};

export default Header;
