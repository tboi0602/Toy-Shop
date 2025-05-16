import  { useState, useEffect } from "react";
import Product from "./Product";
import DetailProductModal from "./DetailProductModal";
import {loadInfoProducts,loadInfoUser} from "../services/handleAPI"
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data1 = await loadInfoProducts();
        const data2 = await loadInfoUser();
        setUserID(data2.user._id)
        setProducts(data1.products)
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="my-10 mx-auto px-4 max-w-screen-xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(({ productId, productName, oldprice, saleprice, sales, image, description }) => (
          <Product
            key={productId}
            name={productName}
            price={oldprice}
            oldprice={saleprice}
            sales={sales}
            image={`http://localhost:5000/${image?.replace(/^\/+/, "")}`}
            onClick={() =>
              setSelectedProduct({ productId, productName, oldprice, saleprice, sales, image, description })
            }
          />
        ))}
      </div>

      {/* Chi tiết sản phẩm */}
      <DetailProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        userId={userID}
      />
    </div>
  );
};

export default ProductList;
