import React, { useState } from "react";
import { setPassword } from "../services/handleAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu mới và xác nhận mật khẩu không khớp
    if (newPassword !== repassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Gọi API để thay đổi mật khẩu
      const isChangePass = await setPassword(oldPassword, newPassword);
      console.log(isChangePass)
      if (!isChangePass.success) {
        setError(isChangePass.message);  // Hiển thị lỗi nếu không thành công
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have changed your password successfully",
          confirmButtonColor: "#d33",
        }).then(() => navigate("/profile-customer"));
      }
    } catch (err) {
      console.log("ERROR",err)
      setError("Something went wrong",err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-red-600 text-2xl font-bold text-center mb-6">
          Change Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-red-600 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full px-4 py-2 border border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
