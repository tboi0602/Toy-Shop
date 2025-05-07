import React, { useState, useEffect } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { CheckUser } from "../Function/CheckUser";
import { register } from "../services/handleAPI";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";
import axios from "axios";


const ManageCustomer = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);

  CheckUser("Admin");

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
          icon: 'success',
          title: 'Success',
          text: 'You have signed up successfully',
          confirmButtonColor: '#d33'
        }).then(() => setShowModal(false));
      } else {
        setError(data.message || "Add new customer failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then((res) => setCustomerList(res.data))
      .catch((err) => console.error("Error taking customers list:", err));
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <HdAdmin styleCart="btn-line" styleOrder="btn-line" stylePro="btn-line" />
      </div>

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="mx-3 my-3 px-6 py-3 text-lg font-semibold rounded-full btn-error whitespace-nowrap hover:scale-110 transition-transform duration-200"
        >
          Add +
        </button>
      </div>

      <div className="mx-3 my-3">
        <h2 className="text-xl font-semibold mb-2">Customer List</h2>
        <ul className="space-y-2">
          {/* Header row */}
          <li className="grid grid-cols-5 font-semibold text-gray-700 px-3">
            <span>Username</span>
            <span>Customer Name</span>
            <span>Birthday</span>
            <span>Gender</span>
            <span>Email</span>
          </li>

          {/* Customer list */}
          {customerList.map((cus, index) => (
            <li
              key={cus._id || index}
              className="grid grid-cols-5 border rounded-xl px-3 py-2 shadow-sm items-center text-sm"
            >
              <span>{cus.username}</span>
              <span>{cus.yourname}</span>
              <span>{cus.birthDay}</span>
              <span>{cus.gender}</span>
              <span className="text-gray-500">{cus.email || "No email"}</span>
            </li>
          ))}
        </ul>

      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-10 justify-center items-center w-full h-full"
            >
              <h1 className="font-bold text-center text-[32px]">Create cusustomer account</h1>
              <div className="flex flex-col pt-4 gap-6 w-full">
                <InputUser
                  name="User name"
                  placeholder="Enter user name"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                />
                <InputUser
                  name="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                />
                <InputUser
                  name="Repeat password"
                  placeholder="Re-enter your password"
                  type="password"
                  value={repassword}
                  onChange={(e) => setRePassword(e.target.value)}
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
                />
              </div>

              {error && <p className="text-red-600">{error}</p>}

              <button className="btn-error px-8 py-3 rounded-full w-full" type="submit">
                Add new customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCustomer;
