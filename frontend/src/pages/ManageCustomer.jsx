import React, { useState, useEffect } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { loadInfoCustomer, register } from "../services/handleAPI";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";

const ManageCustomer = () => {
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
          icon: "success",
          title: "Success",
          text: "You have signed up successfully",
          confirmButtonColor: "#d33",
        }).then(() => {
          setShowModal(false);
          setUsername("");
          setPassword("");
          setRePassword("");
          setError("");
          loadData(); // refresh lại danh sách
        });
      } else {
        setError(data.message || "Add new customer failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  const loadData = async () => {
    const data = await loadInfoCustomer();
    if (data.success) setCustomerList(data.customers);
    else setError(data.message);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <HdAdmin
          styleCart="btn-line"
          styleOrder="btn-line"
          stylePro="btn-line"
        />
      </div>

      {/* Add button */}
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
        >
          + Add Customer
        </button>
      </div>

      {/* Customer Table */}
      <div className="px-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-7 gap-4 text-sm font-semibold bg-red-100 text-red-800 p-3 rounded-t-lg">
            <span>Username</span>
            <span>Name</span>
            <span>Birthday</span>
            <span>Gender</span>
            <span>Email</span>
            <span>Country</span>
            <span>Address</span>
          </div>

          {customerList && customerList.length > 0 ? (
            customerList.map((cus, index) => (
              <div
                key={cus._id || index}
                className="grid grid-cols-7 gap-4 border-b p-3 text-sm bg-white hover:bg-gray-50 transition"
              >
                <span className="truncate">{cus.username}</span>
                <span className="truncate">{cus.yourname}</span>
                <span>{cus.birthDay?.split("T")[0] || ""}</span>
                <span>{cus.gender}</span>
                <span className="truncate">{cus.email}</span>
                <span>{cus.country}</span>
                <span className="truncate">{cus.address}</span>
              </div>
            ))
          ) : (
            <p className="p-4 text-red-500">No customer found!</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative mx-4 sm:mx-0">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-8 w-full"
            >
              <h1 className="text-2xl font-bold text-center mb-2">
                Add Customer
              </h1>

              <InputUser
                name="User name"
                placeholder="Enter user name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputUser
                name="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputUser
                name="Repeat password"
                placeholder="Re-enter your password"
                type="password"
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
              />

              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
              >
                Add Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCustomer;
