import React, { useState } from "react";
import BackgroundContent from "../assets/onepiec1.jpg";
import Footer from "../layouts/Footer";
import HdAdmin from "../layouts/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import { CheckUser } from "../Function/CheckUser";

const ManageStaff = () => {
    const navigate = useNavigate();
    CheckUser("Admin");
    return (
        <div>
            <div className="sticky top-0 z-10">
                <HdAdmin
                styleCart="btn-line"
                styleOrder="btn-line"
                stylePro="btn-line"
                />
            </div>
        </div>
    );
};
export default ManageStaff;