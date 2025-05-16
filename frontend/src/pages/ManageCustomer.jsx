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
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  


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

  const handleViewDetail = (cus) => {
    setSelectedCustomer(cus);
    setShowModal(true);
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
            onClick={() => setShowFormModal(true)}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="px-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-5 gap-4 text-sm font-semibold bg-red-100 text-red-800 p-3 rounded-t-lg">
            <span>Username</span>
            <span>Name</span>
            <span>Email</span>
            <span>Addresss</span>
          </div>
          
          {customerList && customerList.filter(cus => cus.isActive).length > 0 ? (
            customerList.filter(cus => cus.isActive).map((cus, index) => (
              <div
                key={cus._id || index}
                className={`grid grid-cols-5 gap-4 border-b p-3 text-sm transition`}              
                >
                <span className="truncate">{cus.username}</span>
                <span className="truncate">{cus.yourname}</span>
                <span className="truncate">{cus.email}</span>
                <span className="truncate">{cus.address}</span>
                <div className="flex justify-end gap-7">
                  <Icon className="View btn-line" onClick={() => {
                      handleViewDetail(cus);
                    }}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor" 
                      class="size-6"
                    >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  </Icon>
                  <Icon className="Trash btn-line" onClick={() => {
                      setSelectedIdToDelete(cus._id);
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
              </div>
            ))
          ) : (
            <p className="p-4 text-red-500">No customer found!</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative mx-4 sm:mx-0">
            <button
              onClick={() => setShowFormModal(false)}
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

      {showModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative mx-4 sm:mx-0">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-2xl font-bold text-center mb-2">Thông tin nhân viên</h1>

              <p><strong>Username:</strong> {selectedCustomer.username}</p>
              <p><strong>Full Name:</strong> {selectedCustomer.yourname}</p>
              <p><strong>Birthday:</strong> {selectedCustomer.birthDay}</p>
              <p><strong>Gender:</strong> {selectedCustomer.gender}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone Number:</strong> {selectedCustomer.phoneNum}</p>
              <p><strong>Address:</strong> {selectedCustomer.address}</p>

              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
              >
                Đóng
              </button>
            </div>
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
                onClick={async () => {
                  const result = await deleteUser({id: selectedIdToDelete});
                  if (result.success) {
                    setCustomerList(prev => prev.filter(cus => cus._id !== selectedIdToDelete));
                    Swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "You have deleted the customer account",
                      confirmButtonColor: "#d33",
                    })
                  } else {
                    Swal.fire("Error", result.message || "Disable failed", "error");
                  }
                  setShowConfirmModal(false);
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
