import BackgroundContent from "../assets/picture1.jpg";
import Footer from "../layouts/Footer";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";

const ManageProduct = () => {

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
export default ManageProduct;