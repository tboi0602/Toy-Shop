export async function login(username, password) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  return res.json();
}
export async function register(username, password) {
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  return res.json();
}
export const logout = async () => {
  const res = await fetch("http://localhost:5000/api/logout", {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

export const loadinfo = async()=>{
  const res = await fetch("http://localhost:5000/api/info",{
    method:"POST",
    credentials: "include",
  })
  return res.json();
}
export const checkSession = async () => {
  const res = await fetch("http://localhost:5000/api/check-session", {
    credentials: "include", 
  });
  return res.json();
};
