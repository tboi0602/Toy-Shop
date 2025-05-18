import React, { useState, useEffect } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { addNotifications, loadInfoNotifications, deleteNotifications } from "../services/handleAPI";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";

const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);

const ManageNoti = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [notiList, setNotiList] = useState([]);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!title || !content) {
        setError("Please do not leave blank!");
        return;
      }
  
      try {
        const data = await addNotifications(title, content);
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "You have signed up successfully",
            confirmButtonColor: "#d33",
          }).then(() => {
            setShowModal(false);
            setTitle("");
            setContent("");
            setError("");
            loadData(); 
          });
        } else {
          setError(data.message || "Add new notification failed!");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again.");
      }
    };

    const loadData = async () => {
        const data = await loadInfoNotifications();
        if (data.success) setNotiList(data.notifications);
        else setError(data.message);
      };
    
    useEffect(() => {
      loadData();
    }, []);
  
  CheckUser("Admin");
  return (
  <div>
      {/* Header */}
    <div className="sticky top-0 z-10">
      <HdAdmin
        stylePro="btn-line"
      />
    </div>

    {/* Add button */}
    <div className="px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">Notification Management</h2>
      
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
          <div className="grid grid-cols-3 gap-4 text-sm font-semibold bg-red-100 text-red-800 p-3 rounded-t-lg">
            <span>Title</span>
            <span>Content</span>

          </div>
          
          {notiList && notiList.length > 0 ? (
            notiList.map((noti, index) => (
              <div
                key={noti._id || index}
                className={`grid grid-cols-3 gap-4 border-b p-3 text-sm transition`}              
                >
                <span className="truncate">{noti.title}</span>
                <span className="truncate">{noti.content}</span>
                <div className="flex justify-end gap-7">
                <Icon className="Trash btn-line" onClick={() => {
                      setSelectedIdToDelete(noti._id);
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
            <p className="p-4 text-red-500">No notification found!</p>
          )}
        </div>
      </div>

    {/* Modal */}
    {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative mx-4 sm:mx-0">
            <button
              onClick={() => {
                setShowModal(false)
                setTitle("")
                setContent("")}}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-8 w-full"
            >
              <h1 className="text-2xl font-bold text-center mb-2">
                Add Notification
              </h1>

              <InputUser
                name="Notification title"
                placeholder="Enter title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex flex-col gap-1">
                <label className="text-[20px]">Content</label>
                <textarea
                  rows="4"
                  className="border p-2 rounded-md resize-y min-h-[100px]"
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
              >
                Add Notification
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative mx-4 sm:mx-0">
            <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
            <p className="text-center mb-6">Do you sure want to delete this notification?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  const result = await deleteNotifications(selectedIdToDelete);
                  if (result.success) {
                    setNotiList(prev => prev.filter(noti => noti._id !== selectedIdToDelete));
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
export default ManageNoti;
