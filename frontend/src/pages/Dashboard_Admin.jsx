import React from "react";
import BackgroundContent from "../assets/onepiec1.jpg";
import Footer from "../layouts/Footer";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";

const DashboardAdmin = () => {
  CheckUser("Admin");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header cố định */}
      <div className="sticky top-0 z-10">
        <HdAdmin
          styleCart="btn-line"
          styleOrder="btn-line"
          stylePro="btn-line"
        />
      </div>

      {/* Body chỉ còn phần ảnh */}
      <div className="flex flex-1">
        <div className="w-full p-6">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
            <img
              className="w-full h-full object-cover"
              src={BackgroundContent}
              alt="Admin background"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardAdmin;
