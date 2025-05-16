import { useState, useEffect } from "react";
import Product from "./Product";
import DetailProductModal from "./DetailProductModal";
import { loadInfoProducts, loadInfoUser } from "../services/handleAPI";

const ListProduct = ({ searchTerm = "" }) => {
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data1 = await loadInfoProducts();
        const data2 = await loadInfoUser();
        setUserID(data2.user._id);
        setProducts(data1.products);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }
    fetchProducts();
  }, []);

  const applyFilter = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  const resetFilter = () => {
    setTempMinPrice("");
    setTempMaxPrice("");
    setMinPrice("");
    setMaxPrice("");
  };

  const filteredProducts = products
    .filter(({ productName }) =>
      productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(({ saleprice }) => {
      const price = Number(saleprice);
      const min = Number(minPrice);
      const max = Number(maxPrice);
      if (minPrice !== "" && price < min) return false;
      if (maxPrice !== "" && price > max) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "name-asc":
          return a.productName.localeCompare(b.productName);
        case "name-desc":
          return b.productName.localeCompare(a.productName);
        case "price-asc":
          return Number(a.saleprice) - Number(b.saleprice);
        case "price-desc":
          return Number(b.saleprice) - Number(a.saleprice);
        default:
          return 0;
      }
    });

  const FilterUI = (
    <div className="bg-white border rounded p-4 mb-6 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Filter & Sort</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">
          Price from:
        </label>
        <input
          type="number"
          min="0"
          className="border rounded px-3 py-2 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={tempMinPrice}
          onChange={(e) => setTempMinPrice(e.target.value)}
          placeholder="Min"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">
          Price to:
        </label>
        <input
          type="number"
          min="0"
          className="border rounded px-3 py-2 w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={tempMaxPrice}
          onChange={(e) => setTempMaxPrice(e.target.value)}
          placeholder="Max"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">
          Sort by:
        </label>
        <select
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="name-asc">Name A → Z</option>
          <option value="name-desc">Name Z → A</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
        </select>
      </div>

      <div className="flex gap-4">
        <button
          onClick={applyFilter}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex-grow"
        >
          Apply
        </button>
        <button
          onClick={resetFilter}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition flex-grow"
        >
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      {searchTerm !== "" && (
        <aside className="hidden md:block w-64 fixed left-0 top-[96px] h-[calc(100vh-6rem)] bg-white border-r border-gray-300 p-6 overflow-y-auto shadow-lg rounded-r z-10">
          {FilterUI}
        </aside>
      )}

      {/* Main content */}
      <main
        className={`flex-1 p-4 sm:p-6 bg-white rounded-lg shadow-md min-h-screen ${
          searchTerm !== "" ? "md:ml-64" : "mx-auto"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center text-red-700">
          Product List
        </h1>

        {/* Toggle Filter Button for Mobile */}
        {searchTerm !== "" && (
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              {showMobileFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>
        )}

        {/* Mobile Filter UI */}
        {showMobileFilter && <div className="md:hidden">{FilterUI}</div>}

        {/* Product Grid */}
        <div
          className={`grid gap-4 sm:gap-6 p
            grid-cols-2 
            sm:grid-cols-3 
            ${
              searchTerm === ""
                ? "md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl:px-16"
                : "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }
          `}
        >
          {filteredProducts.map(
            ({
              productId,
              productName,
              oldprice,
              saleprice,
              quantity,
              image,
              description,
            }) => (
              <Product
                key={productId}
                name={productName}
                price={saleprice}
                oldprice={oldprice}
                quantity={quantity}
                image={`http://localhost:5000/${image.replace(/^\/+/, "")}`}
                onClick={() =>
                  setSelectedProduct({
                    productId,
                    productName,
                    oldprice,
                    saleprice,
                    quantity,
                    image,
                    description,
                  })
                }
              />
            )
          )}
        </div>

        <DetailProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          userId={userID}
        />
      </main>
    </div>
  );
};

export default ListProduct;
