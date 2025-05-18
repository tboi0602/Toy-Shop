import { useState } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { addOrders } from "../services/handleAPI";

const ManageOrder = () => {
  CheckUser("Admin");

    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState("");
    const [items, setItems] = useState([
    {
        productId: "",
        productName: "",
        image: "",
        oldPrice: 0,
        salePrice: 0,
        buyQuantity: 1
    }
    ]);

    const resetForm = () => {
        setUserId("");
        setItems([
            {
            productId: "",
            productName: "",
            image: "",
            oldPrice: 0,
            salePrice: 0,
            buyQuantity: 1,
            },
        ]);
    };


  const handleAddOrder = async () => {
  try {
    const res = await fetch(addOrders, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Order created successfully!");
      setShowModal(false);
      resetForm(); // reset sau khi thêm thành công
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to connect to server");
  }
};



  return (
    <div>
      <div className="sticky top-0 z-10">
        <HdAdmin stylePro="btn-line" />
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Modal thêm đơn hàng */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Add New Order</h3>

            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border p-2 mb-4"
            />

            {items.map((item, index) => (
                <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
                    <h4 className="text-sm font-semibold mb-2">Product #{index + 1}</h4>
                    <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs text-gray-700">Product ID</label>
                        <input
                        type="text"
                        placeholder="Product ID"
                        value={item.productId}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].productId = e.target.value;
                            setItems(newItems);
                        }}
                        className="border p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-700">Product Name</label>
                        <input
                        type="text"
                        placeholder="Product Name"
                        value={item.productName}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].productName = e.target.value;
                            setItems(newItems);
                        }}
                        className="border p-2 w-full"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-700">Image URL</label>
                        <input
                        type="text"
                        placeholder="Image URL"
                        value={item.image}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].image = e.target.value;
                            setItems(newItems);
                        }}
                        className="border p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-700">Old Price</label>
                        <input
                        type="number"
                        placeholder="Old Price"
                        value={item.oldPrice}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].oldPrice = parseFloat(e.target.value);
                            setItems(newItems);
                        }}
                        className="border p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-700">Sale Price</label>
                        <input
                        type="number"
                        placeholder="Sale Price"
                        value={item.salePrice}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].salePrice = parseFloat(e.target.value);
                            setItems(newItems);
                        }}
                        className="border p-2 w-full"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-xs text-gray-700">Quantity</label>
                        <input
                        type="number"
                        placeholder="Quantity"
                        value={item.buyQuantity}
                        onChange={(e) => {
                            const newItems = [...items];
                            newItems[index].buyQuantity = parseInt(e.target.value);
                            setItems(newItems);
                        }}
                        className="border p-2 w-full"
                        />
                    </div>
                    </div>
                </div>
                ))}


            <button
                onClick={() =>
                setItems([
                    ...items,
                    {
                    productId: "",
                    productName: "",
                    image: "",
                    oldPrice: 0,
                    salePrice: 0,
                    buyQuantity: 1,
                    },
                ])
                }
                className="text-blue-600 text-sm mb-3"
            >
                + Add another product
            </button>

            <div className="text-right font-medium text-gray-700 mb-3">
                Total:{" "}
                {items.reduce(
                (sum, item) => sum + item.salePrice * item.buyQuantity,
                0
                ).toLocaleString("vi-VN")}{" "}
                VND
            </div>

            <div className="flex justify-end gap-2">
                <button
                onClick={() => {
                    setShowModal(false);
                    resetForm(); // reset khi cancel
                }}
                className="px-4 py-2 bg-gray-300 rounded"
                >
                Cancel
                </button>
                <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-green-600 text-white rounded"
                >
                Save
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default ManageOrder;
