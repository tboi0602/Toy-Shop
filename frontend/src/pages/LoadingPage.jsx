import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Product from "../components/Product";
import BackgroundContent from "../assets/onepiec1.jpg";
import luffy from "../assets/1.jpg";
import Footer from "../layouts/Footer";

const LoadingPage = () => {
  const [products, setProducts] = useState([]);

  // Hàm giả lập API 
  const fetchProducts = () => {
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
  };

  useEffect(() => {
    fetchProducts(); // Gọi hàm giả lập API
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
      </div>

      {/* Hình ảnh chính */}
      <div className="relative">
        <div className="w-full" style={{ height: "calc(100vh - 100px)" }}>
          <img
            className="w-full h-full object-cover object-center"
            src={BackgroundContent}
            alt="background"
          />
        </div>

        {/* Các sản phẩm */}
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
export default LoadingPage;
