import React, { useState } from "react";
import BgAce from "../assets/BgAce.png";
import InputUser from "../components/InputUser";
import "../Styles/main.css";
import { useNavigate } from "react-router-dom";
import { register } from "../services/handleAPI";
import Swal from "sweetalert2";

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
      setError("Passwords don't match");
      return;
    }
    try {
      const data = await register(username, password, "Customer");
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have signed up successfully",
          confirmButtonColor: "#d33",
        }).then(() => navigate("/login"));
      } else {
        setError(data.message || "Sign up failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="center h-screen flex items-center justify-center">
      <div className="rounded-3xl overflow-hidden shadow-lg">
        <div className="relative grid grid-cols-2 max-[900px]:grid-cols-1 gap-4 w-full max-w-4xl h-auto">
          <div className="flex justify-center items-center p-4 max-[900px]:hidden">
            <img
              onClick={() => navigate("/")}
              className="h-full w-full object-cover cursor-pointer hover:scale-95 transition-transform rounded-2xl"
              src={BgAce}
              alt="Background"
            />
          </div>
          <form
            className="flex flex-col gap-y-10 justify-center items-center w-full lg:w-[400px] mx-auto h-full px-4 lg:px-0"
          >
            <h1 className="font-bold text-center text-3xl lg:text-4xl whitespace-nowrap pt-10">
              Create your account
            </h1>
            <div className="flex flex-col pt-8 gap-4 w-full">
              <InputUser
                name="User name"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                name="Confirm password"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
            {error ? <p className="text-red-600 -my-5">{error}</p> : <p className="text-red-600 -my-5 h-6"></p>}

            <div className="flex w-full">
              <button
                className="btn-error px-16 py-4 rounded-full w-full"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 -mt-6 mb-6">
              <p>
                I have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-red-600 hover:underline"
                  type="button"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
