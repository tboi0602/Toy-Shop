import React, { useState, useEffect } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { loadInfoStaff, addStaffs, updateInfoByAd, deleteUser } from "../services/handleAPI";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";

const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);

const ManageStaff = () => {
  const [isEditting, setIsEditting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [gender, setGender] = useState("");
  const [yourname, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [editForm, setEditForm] = useState({
    username: "",
    yourname: "",
    birthDay: "",
    gender: "",
    email: "",
    phoneNum: "",
  });
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  CheckUser("Admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !repassword || !gender || !yourname ||
      !birthDay || !address || !email || !phoneNum
    ) {
      setError("Please do not leave blank!");
      return;
    }

    if (password !== repassword) {
      setError("Passwords don't match");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email is invalid!");
      return;
    }

    try {
      const data = await addStaffs(username, password, "Staff", email, yourname, birthDay, address, gender, phoneNum);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have signed up successfully",
          confirmButtonColor: "#d33",
        }).then(() => {
          setShowFormModal(false);
          setUsername("");
          setPassword("");
          setRePassword("");
          setAddress("");
          setBirthDay("");
          setEmail("");
          setGender("");
          setName("");
          setPhoneNum("");
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
        setShowFormModal(false);
        loadData();
      } else {
        Swal.fire("Failed", data.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  const handleViewDetail = (staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
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
        <h2 className="text-2xl font-bold">Staff Management</h2>
        
        {/* Bọc hai nút trong 1 div flex */}
        <div className="flex gap-4">
            <button
            onClick={() =>{
              setIsEditting(false);
              setShowFormModal(true);
              }}
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
            <span>Phone number</span>
            <span>Email</span>
          </div>

          {staffList && staffList.filter(staff => staff.isActive).length > 0 ? (
            staffList.filter(staff => staff.isActive).map((staff, index) => (
              <div
                key={staff._id || index}
                className="grid grid-cols-5 gap-4 border-b p-3 text-sm bg-white hover:bg-gray-50 transition"
              >
                <span className="truncate">{staff.username}</span>
                <span className="truncate">{staff.yourname}</span>
                <span className="truncate">{staff.phoneNum}</span>
                <span className="truncate">{staff.email}</span>
                <div className="flex justify-end gap-7">

                <Icon className="View btn-line" onClick={() => {
                    handleViewDetail(staff);
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
                  
                  <Icon className="Edit btn-line"onClick={() => {
                      setIsEditting(true);
                      setSelectedStaff(staff);
                      setEditForm({
                        username: staff.username || "",
                        yourname: staff.yourname || "",
                        birthDay: staff.birthDay?.split("T")[0] || "",
                        gender: staff.gender || "",
                        email: staff.email || "",
                        phoneNum: staff.phoneNum || "",
                        address: staff.address || "", 
                      });
                      setShowFormModal(true);
                    }}
                    >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </Icon>

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
              </div>
            ))
          ) : (
            <p className="p-4 text-red-500">No staff found!</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative mx-4 sm:mx-0">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <form onSubmit={isEditting ? handleUpdate : handleSubmit} className="flex flex-col gap-y-4">
              <h1 className="text-2xl font-bold text-center mb-2">
                {isEditting ? "Edit Staff Info" : "Add Staff"}
              </h1>

              {/* Form Fields */}
              {!isEditting && (
                <>
                  <InputUser name="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputUser name="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputUser name="Repeat Password" type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} />
                </>
              )}

              <InputUser
                name="Full Name"
                value={isEditting ? editForm.yourname : yourname}
                onChange={(e) =>
                  isEditting
                    ? setEditForm({ ...editForm, yourname: e.target.value })
                    : setName(e.target.value)
                }
              />
              <InputUser
                name="Birthday"
                type="date"
                value={isEditting ? editForm.birthDay : birthDay}
                onChange={(e) =>
                  isEditting
                    ? setEditForm({ ...editForm, birthDay: e.target.value })
                    : setBirthDay(e.target.value)
                }
              />
              <InputUser
                name="Gender"
                value={isEditting ? editForm.gender : gender}
                onChange={(e) =>
                  isEditting
                    ? setEditForm({ ...editForm, gender: e.target.value })
                    : setGender(e.target.value)
                }
              />
              <InputUser
                name="Email"
                value={isEditting ? editForm.email : email}
                onChange={(e) =>
                  isEditting
                    ? setEditForm({ ...editForm, email: e.target.value })
                    : setEmail(e.target.value)
                }
              />
              <InputUser
                name="Phone Number"
                value={isEditting ? editForm.phoneNum : phoneNum}
                onChange={(e) =>
                  isEditting
                    ? setEditForm({ ...editForm, phoneNum: e.target.value })
                    : setPhoneNum(e.target.value)
                }
              />

              <InputUser
                name="Address"
                value={isEditting ? editForm.address : address}
                onChange={(e) =>
                  isEditting
                    ? setEditForm({ ...editForm, address: e.target.value })
                    : setAddress(e.target.value)
                }
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                {isEditting ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}


    {showModal && selectedStaff && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative mx-4 sm:mx-0">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl font-bold text-center mb-2">Thông tin nhân viên</h1>

            <p><strong>Username:</strong> {selectedStaff.username}</p>
            <p><strong>Full Name:</strong> {selectedStaff.yourname}</p>
            <p><strong>Birthday:</strong> {selectedStaff.birthDay}</p>
            <p><strong>Gender:</strong> {selectedStaff.gender}</p>
            <p><strong>Email:</strong> {selectedStaff.email}</p>
            <p><strong>Phone Number:</strong> {selectedStaff.phoneNum}</p>
            <p><strong>Address:</strong> {selectedStaff.address}</p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
            >
              Close
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
                      setStaffList(prev => prev.filter(staff => staff._id !== selectedIdToDelete));
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "You have deleted the staff account",
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

export default ManageStaff;
