import React, { useState } from "react";
import BackgroundContent from "../assets/onepiec1.jpg";
import Footer from "../layouts/Footer";
import HdAdmin from "../layouts/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { CheckUser } from "../Function/CheckUser";

const DashboardAdmin = () => {
  const navigate = useNavigate();
  CheckUser("Admin");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header cố định */}
      <div className="sticky top-0 z-10">
        <HdAdmin
          styleCart="btn-line"
          styleOrder="btn-line"
          stylePro="btn-line"
        />
      </div>

      {/* Body chia 2 phần */}
      <div className="flex flex-1">
        {/* Bên trái: Menu dọc */}
        <div className="flex flex-col gap-4 text-black p-6 h-full w-1/5">
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/manage-staff")}
          >
            Staff
          </div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/manage-customer")}
          >
            Customer
          </div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/manage-product")}
          >
            Product
          </div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/manage-noti")}
          >
            Notification
          </div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/manage-order")}
          >
            Order
          </div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => navigate("/manage-revenue")}
          >
            Revenue
          </div>
        </div>

        {/* Bên phải: Hình ảnh */}
        <div className="flex-[3]">
          <img
            className="w-full h-full object-cover"
            src={BackgroundContent}
            alt="Background"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardAdmin;
