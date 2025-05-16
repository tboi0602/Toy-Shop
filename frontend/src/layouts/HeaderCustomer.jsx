import React, { useState } from "react";
import "../Styles/main.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  logout,
  loadInfoNotifications
} from "../services/handleAPI.js";
import Swal from "sweetalert2";
import useInfo from "../Function/UseInfoUser.js"; // Import custom hook
import BackToTop from "../components/Button/BackToTop.jsx";
import { useEffect } from "react";
import BoxSearch from "../components/Button/BoxSearch.jsx";
const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);

const HeaderCustomer = ({ stylePro, styleCart, styleOrder }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
        if (window.scrollY > 500) {
          setBackToTop(true);
        }
      } else {
        setIsScrolled(false);
        setBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This action cannot be undone",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await logout();
      if (res.success) navigate("/");
      else console.log(res.message);
    }
  };
  const { info } = useInfo();
  const [isClickNotifi, setIsClickNotifi] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const [notification, setNotification] = useState([]);
  //!product

  const fetchCart = async () => {
    try {
      const myCart = await getCart();
      const data = await loadInfoNotifications();
      setNotification(data.notifications);
      setProductCart(myCart.items);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [productCart]);
  return (
    <header
      className={`relative flex gap-5 p-5 bg-white ${
        isScrolled ? "shadow-md" : ""
      } `}
    >
      {backToTop && <BackToTop />}
      <button className="center">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/dashboard-customer")}
          className="min-w-[127px] h-[55px] overflow-hidden hover:scale-105"
        />
      </button>

      <BoxSearch></BoxSearch>

      <div className="center gap-10 max-lg:hidden ">
        <Icon
          className={`Orders ${styleOrder} center`}
          onClick={() => navigate("/my-orders")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          Orders
        </Icon>
        <div>
          <Icon
            className="Notification btn-line relative"
            onClick={() => {
              setIsClickNotifi(!isClickNotifi);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </Icon>
          <div
            className={`absolute right-24 mt-2 w-80 max-h-64 bg-white rounded-xl shadow-xl overflow-y-auto z-50 ${
              isClickNotifi ? "block" : "hidden"
            }`}
          >
            <h2 className="px-4 py-2 text-lg font-semibold text-red-600 border-b">
              {notification.length > 0 ? "Notification" : "No notification "}
            </h2>
            {notification.map(({ _id, title, content }) => (
              <div
                key={_id}
                className="flex items-start gap-3 px-4 py-2 border-b hover:bg-gray-50"
              >
                <div className="p-2 bg-red-100 text-red-600 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.455 1.31m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Icon
          className={`Cart ${styleCart} flex items-center relative`}
          onClick={() => navigate("/my-cart")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          Cart
          {productCart && (
            <div className="w-4 h-4 bg-red-600 rounded-full text-white  center absolute -top-1 left-[10px]">
              <p className="text-[10px]">{productCart.length}</p>
            </div>
          )}
        </Icon>
        <Icon
          className={`Profile ${stylePro} center`}
          onClick={() => navigate("/profile-customer")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          {info.username}
        </Icon>
        <button
          onClick={handleLogout}
          className="btn-error px-5 py-2 rounded-lg whitespace-nowrap "
        >
          Log out
        </button>
      </div>

      {/* Menu nhỏ - chỉ hiện khi < lg */}
      <div className="flex items-center ml-auto lg:hidden text-red-600">
        <Icon onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Icon>
      </div>

      {/* Menu xổ ra khi click */}
      {menuOpen && (
        <div className="absolute top-20 right-5 mt-2 w-40 bg-white shadow-lg rounded-lg py-2  flex-col z-50 max-lg:flex hidden">
          <button
            onClick={() => {
              navigate("/my-orders");
              setMenuOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 text-left"
          >
            Orders
          </button>
          <button
            onClick={() => {
              navigate("/my-cart");
              setMenuOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 text-left"
          >
            Cart
          </button>
          <button
            onClick={() => {
              navigate("/profile-customer");
              setMenuOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 text-left"
          >
            Profile
          </button>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-100 text-left text-red-500"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderCustomer;
