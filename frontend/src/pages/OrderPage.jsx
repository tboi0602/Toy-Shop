import React, { useState } from "react";
import HeaderCustomer from "../layouts/HeaderCustomer";

const orders = [
  {
    id: 1,
    productName: "Luffy Default",
    price: 28.4,
    oldPrice: 40.3,
    total: 60,
    img: "https://kenhtinhoc.vn/wp-content/uploads/2022/10/mo-hinh-one-piece-monkey-d-luffy-1.jpg",
    quantity: 1,
    status: "Cancelled",
  },
  {
    id: 2,
    productName: "Luffy Gear 2",
    price: 28.4,
    oldPrice: 40.3,
    total: 60,
    img: "https://jola.vn/cdn/720/Product/CVgE_el4O/40cbd865aac0f59cb7e226e2d7738674.jpg",
    quantity: 1,
    status: "Completed",
  },
  {
    id: 3,
    productName: "Luffy Gear 3",
    price: 28.4,
    oldPrice: 40.3,
    total: 60,
    img: "https://m.media-amazon.com/images/I/61r3gQCNGuL.jpg",
    quantity: 1,
    status: "Processing",
  },
  {
    id: 4,
    productName: "Luffy Gear 4",
    price: 28.4,
    oldPrice: 40.3,
    total: 60,
    img: "https://bizweb.dktcdn.net/100/418/981/products/bf90c2e9-36a4-4315-86a3-cbe783a3f9a2.jpg?v=1651989141587",
    quantity: 1,
    status: "Processing",
  },
  {
    id: 5,
    productName: "Luffy Gear 5",
    price: 28.4,
    oldPrice: 40.3,
    total: 60,
    img: "https://bizweb.dktcdn.net/100/299/021/products/455206.jpg?v=1716522500483",
    quantity: 1,
    status: "Confirmed",
  },
];

const cancelReasons = [
  "I no longer want to buy",
  "I ordered the wrong product",
  "The price is too high",
  "Delivery time is too long",
  "Other reasons",
];

export default function OrderPage() {
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  return (
    <>
      <div className="sticky top-0 z-10">
        <HeaderCustomer
          styleCart={"btn-line"}
          styleOrder={"line"}
          stylePro={"btn-line"}
        />
      </div>

      <div className="p-4 space-y-6 max-w-4xl mx-auto">
        {/* Filter Buttons */}
        <div className="mb-4 flex flex-wrap gap-3">
          {["All", "Cancelled", "Completed", "Processing", "Confirmed"].map(
            (status) => {
              const colors = {
                All: "blue",
                Cancelled: "red",
                Completed: "green",
                Processing: "yellow",
                Confirmed: "blue",
              };
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-xl ${
                    selectedStatus === status
                      ? `bg-${colors[status]}-500 text-white`
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-opacity-80`}
                >
                  {status}
                </button>
              );
            }
          )}
        </div>

        {/* Orders */}
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-6 space-y-6 border"
          >
            {/* Status */}
            <div
              className={`text-sm font-semibold ${
                order.status === "Cancelled" ? "text-red-500" : "text-green-600"
              }`}
            >
              {order.status.toUpperCase()}
            </div>

            {/* Product Info */}
            <div className="flex flex-col sm:flex-row gap-4 border-b pb-4">
              <img
                src={order.img}
                alt={order.productName}
                className="w-full sm:w-28 max-h-32 object-contain rounded-lg bg-white"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-800">
                      {order.productName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Quantity: x{order.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="line-through text-sm text-gray-400">
                      ${order.oldPrice.toLocaleString()}
                    </p>
                    <p className="text-red-600 text-base font-semibold">
                      ${order.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total & Action */}
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-sm text-gray-600 font-medium">Total:</span>
              <span className="text-xl font-bold text-red-600">
                ${order.total ? order.total.toLocaleString() : "TBD"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mt-4">
              {order.status === "Completed" && (
                <button className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium w-full sm:w-auto">
                  Buy Again
                </button>
              )}

              {order.status === "Cancelled" && (
                <button className="px-5 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto">
                  View Cancellation Details
                </button>
              )}

              {order.status !== "Completed" && order.status !== "Cancelled" && (
                <>
                  <button
                    onClick={() => setCancelOrderId(order.id)}
                    className="px-5 py-2 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition font-medium w-full sm:w-auto"
                  >
                    Cancel Order
                  </button>

                  {cancelOrderId === order.id && (
                    <div className="w-full mt-4 space-y-2">
                      <select
                        className="w-full p-2 border border-red-600 rounded-xl text-sm"
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                      >
                        <option value="">Select a reason</option>
                        {cancelReasons.map((reason, idx) => (
                          <option key={idx} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                      <button className="w-full px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium">
                        Send
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
