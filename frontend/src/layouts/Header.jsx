import React from "react";
import "./styles/main.css";
import Login from "../components/Login";
import Signup from "../components/Signup";
import logo from "../assets/logo.png"
const Header = () => {
  return (
    <div className=" flex p-5 gap-5 sticky top-0 z-10 bg-white">
      <button className=" center px-5">
        <img className="fix-img h-[55px]" src={logo} alt="" />
      </button>
      <div
        className=" 
          min-w-[300px]
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
        <Login></Login>
        <Signup></Signup>
      </div>
    </div>
  );
};

export default Header;
