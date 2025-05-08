import React, { useState } from "react";
import Swal from "sweetalert2";
import { resetPassword, usernameExist } from "../services/handleAPI";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isUserValid, setIsUserValid] = useState(false);
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }
    try {
      const data = await usernameExist(username);
      if (data.success) {
        setIsUserValid(true);
      } else {
        setError(data.message || "Reset password failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(username,newPassword);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {!isUserValid ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Verify Username
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
