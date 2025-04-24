import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Product from "../components/Product";
import BackgroundContent from "../assets/onepiec1.jpg";
import luffy from "../assets/1.jpg";
import Footer from "../layouts/Footer";
import HdCustomer from "../layouts/HdCustomer";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../services/handleAPI";
const DbCustomer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const data = await checkSession();
      if (!data.loggedIn) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Giả lập API call,  thay bằng fetch
    //fetch("....")
    //.then((res) => res.json())
    //.then((data) => setProducts(data));
    const fakeAPI = [
      {
        id: 1,
        name: "Luffy Gear 2",
        price: "2.9",
        oldprice: "4.2",
        sales: "21.4k",
        image: luffy,
      },
      {
        id: 2,
        name: "Luffy Gear 2",
        price: "2.9",
        oldprice: "4.2",
        sales: "21.4k",
        image: luffy,
      },
      {
        id: 3,
        name: "Luffy Gear 2",
        price: "2.9",
        oldprice: "4.2",
        sales: "21.4k",
        image: luffy,
      },
      {
        id: 4,
        name: "Luffy Gear 2",
        price: "2.9",
        oldprice: "4.2",
        sales: "21.4k",
        image: luffy,
      },
      {
        id: 5,
        name: "Luffy Gear 2",
        price: "2.9",
        oldprice: "4.2",
        sales: "21.4k",
        image: luffy,
      },
      {
        id: 6,
        name: "Luffy Gear 2",
        price: "2.9",
        oldprice: "4.2",
        sales: "21.4k",
        image: luffy,
      },
    ];
    setProducts(fakeAPI);
  }, []);
  return (
    <div className="">
      <HdCustomer styleCart="btn-line" styleOrder="btn-line" stylePro="btn-line"></HdCustomer>
        {/* Hình ảnh chính */}
      <div className="w-full h-[100vh]">
        <img
          className="w-full fix-img"
          style={{ height: "calc(100vh - 100px)" }}
          src={BackgroundContent}
          alt=""
        />
      </div>

      {/* Các sản phẩm */}
      <div className="my-10 formatProducts gap-y-5">
        {products.map((item) => (
          <Product
            key={item.id}
            name={item.name}
            price={item.price}
            oldprice={item.oldprice}
            sales={item.sales}
            image={item.image}
          ></Product>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DbCustomer;
