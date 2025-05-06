import React from "react";
import HeaderCustomer from "../layouts/HeaderCustomer";
import Infomation from "../components/Infomation";
import Footer from "../layouts/Footer";
import Product from "../components/Product";
import { CheckUser } from "../Function/CheckUser";
const ProfileCustomer = () => {
  const produc = Array.from({ length: 100 }, (_, i) => i + 1);
  CheckUser("Customer")
  return (
    <div>
      <HeaderCustomer
        styleOrder="btn-line"
        styleCart="btn-line"
        stylePro="line"
      ></HeaderCustomer>
      <Infomation></Infomation>
      <div className="my-10 mx-auto px-4 max-w-screen-xl">
        <div className="formatProducts">
          {produc.map((index) => (
            <div key={index}>
              <Product></Product>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProfileCustomer;
