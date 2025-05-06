//!Log in
export async function login(username, password,position) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
<<<<<<< HEAD
    body: JSON.stringify({ username, password, position })
=======
    body: JSON.stringify({ username, password }),
>>>>>>> 19c0a38ebd5bf6c9e10a14db647f7436deff697e
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
export const loadInfo = async () => {
  const res = await fetch("http://localhost:5000/api/info", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};

//!Update info
export const updateInfo = async (data) => {
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
