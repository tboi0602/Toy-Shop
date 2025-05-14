import React, { useState } from "react";
import Product from "./Product";
import DetailProductModal from "./DetailProductModal";

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Luffy Gear 2",
      price: "2.9",
      oldprice: "4.2",
      sales: "21.4k",
      image: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
      description: "High-quality PVC figure of Luffy in Gear 2 mode. Height: 25cm. Collectible item.",
    },
    {
      id: 2,
      name: "Luffy Gear 3",
      price: "3.2",
      oldprice: "4.5",
      sales: "18.2k",
      image: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
      description: "Detail of Luffy Gear 3.",
    },
    {
      id: 3,
      name: "Luffy Gear 4",
      price: "3.8",
      oldprice: "5.2",
      sales: "15.9k",
      image: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
      description: "Detail of Luffy Gear 4.",
    },
    {
      id: 4,
      name: "Luffy Gear 5",
      price: "4.0",
      oldprice: "5.9",
      sales: "22.3k",
      image: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
      description: "Detail of Luffy Gear 5.",
    },
    {
      id: 5,
      name: "Zoro Sword Style",
      price: "3.5",
      oldprice: "4.9",
      sales: "19.7k",
      image: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
      description: "Zoro three-sword collectible figure.",
    },
    {
      id: 6,
      name: "Sanji Fire Leg",
      price: "2.7",
      oldprice: "3.8",
      sales: "13.6k",
      image: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
      description: "Sanji with fire kick effects.",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="my-10 mx-auto px-4 max-w-screen-xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(({ id, name, price, oldprice, sales, image, description }) => (
          <Product
            key={id}
            name={name}
            price={price}
            oldprice={oldprice}
            sales={sales}
            image={image}
            onClick={() =>
              setSelectedProduct({ id, name, price, oldprice, sales, image, description })
            }
          />
        ))}
      </div>

      {/* Chi tiết sản phẩm */}
      <DetailProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductList;
