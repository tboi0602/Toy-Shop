import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import BackgroundContent from "../assets/onepiec1.jpg";
import luffy from "../assets/1.jpg";
import Footer from "../layouts/Footer";
import HdCustomer from "../layouts/HeaderCustomer";
import { CheckUser } from "../Function/CheckUser";

const DashBoardCustomer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Giả lập API call, thay bằng fetch
    // fetch("....")
    // .then((res) => res.json())
    // .then((data) => setProducts(data));
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
  CheckUser("Customer");

  return (
    <div className="min-h-screen">

      <div className="sticky top-0 z-10">
        <HdCustomer
          styleCart="btn-line"
          styleOrder="btn-line"
          stylePro="btn-line"
        />
      </div>

      <div className="relative">
        {/* Hình ảnh chính */}
        <div className="w-full" style={{ height: "calc(100vh - 100px)" }}>
          <img
            className="w-full h-full object-cover"
            src={BackgroundContent}
            alt="Background"
          />
        </div>

        {/* Hiển thị sản phẩm */}
        <div className="my-10 mx-auto px-4 max-w-screen-xl">
          <div className="formatProducts">
            {products.map(({ id, name, price, oldprice, sales, image }) => (
              <Product
                key={id}
                name={name}
                price={price}
                oldprice={oldprice}
                sales={sales}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashBoardCustomer;
