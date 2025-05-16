import React, { useState, useEffect } from "react";
import HeaderCustomer from "../layouts/HeaderCustomer";
import { loadInfoOrders } from "../services/handleAPI";

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
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const loadData = async () => {
      const data = await loadInfoOrders();
      if (data.success) setOrders(data.orders);
      else setError(data.message);

    };
  
    useEffect(() => {
      loadData();
    }, []);
  

  useEffect(() => {
    setSelectedReason(""); // Reset reason when switching cancel order
  }, [cancelOrderId]);

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const handleCancelOrder = (id) => {
    if (!selectedReason) {
      alert("Please select a reason");
      return;
    }

    // You can replace this with actual API call
    console.log(`Order ${id} cancelled. Reason: ${selectedReason}`);
    alert(`Order ${id} cancelled. Reason: ${selectedReason}`);
    setCancelOrderId(null);
    setSelectedReason("");
  };

  const statusClass = (status) => {
    const base = "px-4 py-2 rounded-xl";
    const active = "text-white";
    const map = {
      All: "bg-blue-500",
      Cancelled: "bg-red-500",
      Completed: "bg-green-500",
      Processing: "bg-yellow-500",
      Confirmed: "bg-blue-500",
    };
    return selectedStatus === status
      ? `${base} ${map[status]} ${active}`
      : `${base} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  const statusColor = (status) => {
    switch (status) {
      case "Cancelled":
        return "text-red-500";
      case "Completed":
        return "text-green-600";
      case "Processing":
        return "text-yellow-600";
      case "Confirmed":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

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
<<<<<<< HEAD
            (status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={statusClass(status)}
              >
                {status}
              </button>
            )
=======
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
                      ? `bg-${colors[status]}-500 text-red`
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-opacity-80`}
                >
                  {status}
                </button>
              );
            }
>>>>>>> fa6c9ea3b77d505c1ee6862807d4c0485eedec80
          )}
        </div>

        {/* Orders */}
<<<<<<< HEAD
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-6 space-y-6 border"
          >
            {/* Status */}
            <div className={`text-sm font-semibold ${statusColor(order.status)}`}>
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
=======
        {filteredOrders.map((order) => {
          const isExpanded = expandedOrderId === order.orderId;
          const total = order.items.reduce(
            (sum, item) => sum + item.salePrice * item.buyQuantity,
            0
          );

          return (
            <div
              key={order.orderId}
              className="bg-white shadow-md rounded-xl p-6 space-y-6 border"
            >
              {/* Status */}
              <div
                className={`text-sm font-semibold ${
                  order.status === "Cancelled" ? "text-red-500" : "text-green-600"
                }`}
              >
                {order.status.toUpperCase()}
>>>>>>> fa6c9ea3b77d505c1ee6862807d4c0485eedec80
              </div>

              {/* Product Info */}
              <div className="space-y-4 border-b pb-4">
                {(isExpanded ? order.items : [order.items[0]]).map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full sm:w-28 max-h-32 object-contain rounded-lg bg-white"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h2 className="text-lg font-medium text-gray-800">
                            {item.productName}
                          </h2>
                          <p className="text-sm text-gray-500">
                            Quantity: x{item.buyQuantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="line-through text-sm text-gray-400">
                            ${item.oldPrice?.toLocaleString()}
                          </p>
                          <p className="text-red-600 text-base font-semibold">
                            ${item.salePrice?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Toggle xem thêm nếu có nhiều hơn 1 item */}
                {order.items.length > 1 && (
                  <button
                    onClick={() => toggleOrderExpand(order.orderId)}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    {isExpanded ? "Hide items" : `Show all (${order.items.length}) items`}
                  </button>
                )}
              </div>

              {/* Total & Action */}
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-sm text-gray-600 font-medium">Total:</span>
                <span className="text-xl font-bold text-red-600">
                  ${order.total}
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
                    onClick={() => setCancelOrderId(order.orderId)}
                    className="px-5 py-2 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition font-medium w-full sm:w-auto"
                  >
                    Cancel Order
                  </button>

                  {cancelOrderId === order.orderId && (
                    <div className="w-full mt-4 space-y-2">
                      <select
                        className="w-full p-2 border border-red-600 rounded-xl text-sm"
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                      >
                        <option value="">Select a reason</option>
                        {cancelReasons.map((reason, idx) => (
                          <option key={`reason-${idx}`} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
                      >
                        Send
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )})}
      </div>
    </>
  );
}
