import React, { useState } from "react";
import HeaderCustomer from "../layouts/HeaderCustomer";
import { useNavigate } from "react-router-dom";

// Mẫu dữ liệu có ảnh thật
const sampleData = [
  {
    id: 1,
    name: "Luffy Default",
    price: 28.4,
    oldPrice: 40.3,
    img: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Luffy Gear 2",
    price: 28.4,
    oldPrice: 40.3,
    img: "https://jola.vn/cdn/720/Product/CVgE_el4O/40cbd865aac0f59cb7e226e2d7738674.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "Luffy Gear 3",
    price: 28.4,
    oldPrice: 40.3,
    img: "https://m.media-amazon.com/images/I/61r3gQCNGuL.jpg",
    quantity: 1,
  },
  {
    id: 4,
    name: "Luffy Gear 4",
    price: 28.4,
    oldPrice: 40.3,
    img: "https://bizweb.dktcdn.net/100/418/981/products/bf90c2e9-36a4-4315-86a3-cbe783a3f9a2.jpg?v=1651989141587",
    quantity: 1,
  },
  {
    id: 5,
    name: "Luffy Gear 5",
    price: 28.4,
    oldPrice: 40.3,
    img: "https://bizweb.dktcdn.net/100/299/021/products/455206.jpg?v=1716522500483",
    quantity: 1,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(sampleData);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cart
    .filter((item) => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const selectAll = selectedIds.length === cart.length;

  const handleDelete = () => {
    setCart((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  return (
    <>
      <HeaderCustomer styleCart={"line"} styleOrder={"btn-line"} stylePro={"btn-line"} />
      <div className="bg-gray-100 min-h-screen px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-4xl font-bold mb-4 text-red-600">Your Cart</h2>

          <div className="grid grid-cols-6 gap-4 border-b pb-2 font-bold text-gray-600 text-sm">
            <div className="col-span-3">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Subtotal</div>
          </div>

          {cart.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 items-center p-4 mb-3 bg-white rounded-xl shadow transition hover:shadow-md"
            >
              <div className="col-span-3 flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                />
                <img
                  src={item.img}
                  className="w-20 h-20 object-cover rounded-md border"
                  alt={item.name}
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="line-through text-sm text-gray-400">
                  ${item.oldPrice.toLocaleString()}
                </p>
                <p className="text-red-600 font-semibold">
                  ${item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  className="border px-2 rounded text-gray-700 hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  className="border px-2 rounded text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-center text-red-600 font-semibold">
                ${(item.quantity * item.price).toLocaleString()}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={() =>
                  setSelectedIds(selectAll ? [] : cart.map((i) => i.id))
                }
              />
              <span className="text-sm text-gray-600">
                Select All ({selectedIds.length})
              </span>
              <button
                className="text-red-600 text-sm hover:underline"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <p className="text-sm">
                Total ({selectedIds.length} item
                {selectedIds.length !== 1 ? "s" : ""}):{" "}
                <span className="text-red-600 text-lg font-semibold">
                  ${total.toLocaleString()}
                </span>
              </p>
              <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700" onClick={()=>{navigate("/checkout")}}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
