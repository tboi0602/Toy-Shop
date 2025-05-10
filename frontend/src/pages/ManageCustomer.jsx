import React, { useState, useEffect } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { loadInfoCustomer, register, deleteUser } from "../services/handleAPI";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";

const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);

const ManageCustomer = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


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
        
        {/* Bọc hai nút trong 1 div flex */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="px-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-7 gap-4 text-sm font-semibold bg-red-100 text-red-800 p-3 rounded-t-lg">
            <span>Username</span>
            <span>Name</span>
            <span>Birthday</span>
            <span>Gender</span>
<<<<<<< HEAD
            <span>Phone number</span>
            <span>Email</span>
=======
            <span>Email</span>
            <span>Addresss</span>
            <span>Spending</span>
>>>>>>> e546c94c80ce57e7135faedcfe6d9d9a88cead0f
          </div>

          {customerList && customerList.length > 0 ? (
            customerList.map((cus, index) => (
              <div
                key={cus._id || index}
                className={`grid grid-cols-7 gap-4 border-b p-3 text-sm transition`}              
                >
                <span className="truncate">{cus.username}</span>
                <span className="truncate">{cus.yourname}</span>
                <span>{cus.birthDay?.split("T")[0] || ""}</span>
                <span>{cus.gender}</span>
<<<<<<< HEAD
                <span className="truncate">{cus.phoneNum}</span>
                <span className="truncate">{cus.email}</span>
                <div className="flex justify-end gap-7">
                  <Icon className="Trash btn-line" onClick={() => {
                      setSelectedIdToDelete(staff._id);
                      setShowConfirmModal(true);
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke-width="1.5" 
                      stroke="currentColor" 
                      class="size-6"
                    >
                      <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </Icon>
                </div>
=======
                <span className="truncate">{cus.email}</span>
                <span className="truncate">{cus.address}</span>
                <span className="truncate">{}</span>
>>>>>>> e546c94c80ce57e7135faedcfe6d9d9a88cead0f
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

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative mx-4 sm:mx-0">
            <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
            <p className="text-center mb-6">Do you sure want to disable this customer account?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async() => {
                  await deleteUser({ id: selectedIdToDelete });
                  setShowConfirmModal(false);
                  loadData();
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full"
              >
                Yes, disable
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageCustomer;
