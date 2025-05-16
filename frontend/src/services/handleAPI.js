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
export const resetPassword = async (username, newPassword) => {
  const res = await fetch("http://localhost:5000/api/reset-pass", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, newPassword }),
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

//! Upload Image
export const uploadImage = async (formData) => {
  const res = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return res.json(); // Trả về: { success: true, path: "/uploads/filename.png" }
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

export const deleteUser = async (updatedData) => {
  const res = await fetch("http://localhost:5000/api/deleteUser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export async function addStaffs(
  username,
  password,
  position,
  email,
  yourname,
  birthDay,
  address,
  gender,
  phoneNum
) {
  const res = await fetch("http://localhost:5000/api/addStaffs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
      position,
      email,
      yourname,
      birthDay,
      address,
      gender,
      phoneNum,
    }),
  });
  return res.json();
}

export async function addProducts(
  productId,
  productName,
  oldprice,
  sales,
  description,
  image
) {
  const res = await fetch("http://localhost:5000/api/addProducts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      productId,
      productName,
      oldprice,
      sales,
      description,
      image,
    }),
  });
  return res.json();
}

export const loadInfoProducts = async () => {
  const res = await fetch("http://localhost:5000/api/getProducts", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};

export async function deleteProducts(productId) {
  const res = await fetch("http://localhost:5000/api/deleteProducts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function updateProducts(productId) {
  const res = await fetch("http://localhost:5000/api/updateProducts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export async function addNotifications(title, content) {
  const res = await fetch("http://localhost:5000/api/addNotifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, content }),
  });
  return res.json();
}

export const loadInfoNotifications = async () => {
  const res = await fetch("http://localhost:5000/api/getNotifications", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};

export async function deleteNotifications(id) {
  const res = await fetch("http://localhost:5000/api/deleteNotifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id }),
  });
  return res.json();
}

//! Thêm sản phẩm vào giỏ hàng
export async function addToCart(userId, productId, buyQuantity) {
  const res = await fetch(`http://localhost:5000/api/addToCart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, productId, buyQuantity }),
  });
  return res.json();
}

//! Lấy giỏ hàng của user theo userId
export async function getCart() {
  const res = await fetch(`http://localhost:5000/api/userCart`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

//! Xoá 1 sản phẩm khỏi giỏ hàng
export async function deleteItem(productId) {
  const res = await fetch(`http://localhost:5000/api/removeCart`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });
  return res.json();
}

export const loadInfoOrders = async () => {
  const res = await fetch("http://localhost:5000/api/getOrders", {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  return res.json();
};