import React, { useState, useEffect } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { loadInfoStaff, register, updateInfoByAd } from "../services/handleAPI";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";

const ManageStaff = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    yourname: "",
    birthDay: "",
    gender: "",
    email: "",
    phoneNum: "",
  });

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
      const data = await register(username, password, "Staff");
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
        setError(data.message || "Add new staff failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const updatedData = { ...editForm, _id: selectedStaff._id };
        const data = await updateInfoByAd(updatedData);
      if (data.success) {
        Swal.fire("Updated!", "Staff info has been updated.", "success");
        console.log("Success");
        setShowEditModal(false);
        loadData();
      } else {
        Swal.fire("Failed", data.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  const loadData = async () => {
    const data = await loadInfoStaff();
    if (data.success) setStaffList(data.staffs);
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
            Add Staff
            </button>

            <button
            onClick={()=>{
                setIsEditMode((prev) => !prev);
                setShowModal(false);
            }}
            className={`px-6 py-2 text-white rounded-full shadow transition 
              ${isEditMode ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}            >
            Edit Staff
            </button>

            <button
            
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
            >
            Delete Staff
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
            <span>Phone number</span>
            <span>Email</span>
          </div>

          {staffList && staffList.length > 0 ? (
            staffList.map((staff, index) => (
              <div
                key={staff._id || index}
                onClick={() => {
                    if (isEditMode) {
                      setSelectedStaff(staff);
                      setEditForm({
                        username: staff.username || "",
                        yourname: staff.yourname || "",
                        birthDay: staff.birthDay?.split("T")[0] || "",
                        gender: staff.gender || "",
                        email: staff.email || "",
                        phoneNum: staff.phoneNum || "",
                      });
                      setShowEditModal(true);
                      setIsEditMode(false); // tắt chế độ chọn
                    }
                  }}
                className="grid grid-cols-7 gap-4 border-b p-3 text-sm bg-white hover:bg-gray-50 transition"
              >
                <span className="truncate">{staff.username}</span>
                <span className="truncate">{staff.yourname}</span>
                <span>{staff.birthDay?.split("T")[0] || ""}</span>
                <span>{staff.gender}</span>
                <span className="truncate">{staff.phoneNum}</span>
                <span className="truncate">{staff.email}</span>
              </div>
            ))
          ) : (
            <p className="p-4 text-red-500">No staff found!</p>
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
                Add staff
              </button>
            </form>
          </div>
        </div>
      )}

    {showEditModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative mx-4 sm:mx-0">
        <button
            onClick={() => setShowEditModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
            ✕
        </button>

        <form onSubmit={handleUpdate} className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold text-center mb-2">Edit Staff Info</h1>

            <InputUser
            name="Full Name"
            value={editForm.yourname}
            onChange={(e) => setEditForm({ ...editForm, yourname: e.target.value })}
            />
            <InputUser
            name="Birthday"
            type="date"
            value={editForm.birthDay}
            onChange={(e) => setEditForm({ ...editForm, birthDay: e.target.value })}
            />
            <InputUser
            name="Gender"
            value={editForm.gender}
            onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
            />
            <InputUser
            name="Email"
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <InputUser
            name="Phone Number"
            value={editForm.phoneNum}
            onChange={(e) => setEditForm({ ...editForm, phoneNum: e.target.value })}
            />

            <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
            >
            Update
            </button>
        </form>
        </div>
    </div>
    )}
    </div>
  );
};

export default ManageStaff;
