import React, { useState } from "react";
import BgAce from "../assets/BgAce.png";
import InputUser from "../components/InputUser";
import "../Styles/main.css";
import { useNavigate } from "react-router-dom";
import { register } from "../services/handleAPI";
const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password || !repassword) {
      setError("Please do not leave blank!");
      return;
    }
  
    if (password !== repassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = await register(username, password);
    
      if (data.success) {
        navigate("/");
      } else {
        setError(data.message || "Sign up failed!");
      }
    } catch (err) {
      console.error(err);
    }
    
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
      {/* Image: ẩn trên mobile, giữ nguyên kích thước gốc khi hiển thị */}
      <div className="hidden lg:block h-[100vh] overflow-hidden">
        <img
          onClick={()=>{navigate("/");}}
          className="h-full w-[610px] fix-img cursor-pointer hover:scale-105"
          src={BgAce}
          alt="Background"
        />
      </div>

      {/* Form: full width trên mobile, giữ nguyên pr-32 trên lg */}
      <form
        onSubmit={handleSubmit}
        className="h-[100vh] w-full lg:w-auto px-4 lg:px-0 pr-0 lg:pr-32 flex flex-col gap-y-10 font-bold"
      >
        <h1 className="font-bold text-center text-[40px] pt-14 whitespace-nowrap">
          Create your account
        </h1>
        <div className="flex flex-col pt-8 gap-8">
          <InputUser
            name="User name"
            icon={
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
            }
            placeholder="Enter user name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputUser
            name="Password"
            icon={
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
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            }
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputUser
            name="Repeat password"
            icon={
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
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            }
            placeholder="Re-enter your password"
            type="password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        {error ? (
          <p className="text-red-600 gap">{error}</p>
        ) : (
          <p className="h-6"></p>
        )}
        <div className="flex gap-8">
          <button className="btn-error px-16 py-4 rounded-full" type="submit">
            Sign up
          </button>
          <button
            onClick={()=>{
              navigate("/login");
            }}
            className="btn-error-outline px-14 py-4 rounded-full"
            type="button"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignupPage;
