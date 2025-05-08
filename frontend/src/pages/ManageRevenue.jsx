import React from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";

const ManageRevenue = () => {
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
export default ManageRevenue;