//!Log in
export async function login(username, password) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

//!Sign up
export async function register(username, password, position) {
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password, position }),
  });
  return res.json();
}

//!Log out
export const logout = async () => {
  const res = await fetch("http://localhost:5000/api/logout", {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

//!check ss
export const checkSession = async () => {
  const res = await fetch("http://localhost:5000/api/check-session", {
    credentials: "include",
  });
  return res.json();
};

//!Load info
export const loadInfoUser = async () => {
  const res = await fetch("http://localhost:5000/api/info", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};

//!Update info
export const updateInfoUser = async (data) => {
  const res = await fetch("http://localhost:5000/api/info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
};

//!Change pass
export const setPassword = async (oldPassword, newPassword) => {
  const res = await fetch("http://localhost:5000/api/change-pass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ oldPassword, newPassword }),
  });
  return res.json();
};
//!reset pass
export const resetPassword = async (username,newPassword) => {
  const res = await fetch("http://localhost:5000/api/reset-pass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({username, newPassword }),
  });
  return res.json();
};

//!check username
export const usernameExist = async (username) => {
  const response = await fetch("http://localhost:5000/api/username-exist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username }),
  });
  return await response.json();
};

//!Get customer
export const loadInfoCustomer = async () => {
  const res = await fetch("http://localhost:5000/api/customers", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};

//!Get staff
export const loadInfoStaff = async () => {
  const res = await fetch("http://localhost:5000/api/staffs", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};

export const updateInfoByAd = async (updatedData) => {
  const res = await fetch("http://localhost:5000/api/updateInfoByAd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

