import React from "react";
import HeaderCustomer from "../layouts/HeaderCustomer";
import Infomation from "../components/Infomation";
import Footer from "../layouts/Footer";
import Product from "../components/Product";
import { CheckLogin } from "../Function/CheckLogin";
const ProfileCustomer = () => {
  const produc = Array.from({ length: 100 }, (_, i) => i + 1);
  return (
    <div>
      <CheckLogin></CheckLogin>
      <HeaderCustomer
        styleOrder="btn-line"
        styleCart="btn-line"
        stylePro="line"
      ></HeaderCustomer>
      <Infomation></Infomation>
      <div className="formatProducts gap-5 pb-8">
        {produc.map((index) => (
          <div key={index}>
            <Product></Product>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProfileCustomer;
