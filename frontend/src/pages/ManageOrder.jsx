import { useState, useEffect } from "react";
import { loadInfoOrdersByAdmin, updateOrder } from "../services/handleAPI";
import HeaderAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
const statusOptions = [
  "Cancelled",
  "Completed",
  "Delivering",
  "Confirmed",
  "Waiting for confirmation",
  "REQUEST CANCELLATION",
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Cancelled":
      return "bg-red-100 text-red-700 font-bold";
    case "Completed":
      return "bg-green-100 text-green-700 font-bold";
    case "Delivering":
      return "bg-blue-100 text-blue-700 font-bold";
    case "Confirmed":
      return "bg-yellow-100 text-yellow-700 font-bold";
    case "Waiting for confirmation":
      return "bg-gray-100 text-gray-800 font-bold";
    case "REQUEST CANCELLATION":
      return "bg-orange-100 text-orange-700 font-bold";
    default:
      return "bg-gray-100 text-gray-700 font-bold";
  }
};

const ManagerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [statusMap, setStatusMap] = useState({});
  const [cancelReasonMap, setCancelReasonMap] = useState({});
  const [expandedMap, setExpandedMap] = useState({});
  CheckUser("Admin");
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await loadInfoOrdersByAdmin();
    if (res.success) {
      setOrders(res.orders);
      const statusInit = {};
      const reasonInit = {};
      const expandInit = {};
      res.orders.forEach((order) => {
        statusInit[order._id] = order.status || "Waiting for confirmation";
        reasonInit[order._id] = order.cancelReason || "";
        expandInit[order._id] = false;
      });
      setStatusMap(statusInit);
      setCancelReasonMap(reasonInit);
      setExpandedMap(expandInit);
    } else {
      alert(res.message || "Failed to load orders");
    }
    setLoading(false);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusMap((prev) => ({ ...prev, [orderId]: newStatus }));
    if (!["Cancelled", "REQUEST CANCELLATION"].includes(newStatus)) {
      setCancelReasonMap((prev) => ({ ...prev, [orderId]: "" }));
    }
  };

  const handleCancelReasonChange = (orderId, reason) => {
    setCancelReasonMap((prev) => ({ ...prev, [orderId]: reason }));
  };

  const handleUpdateOrder = async (order) => {
    const updatedOrder = {
      orderId: order.orderId || order._id,
      items: order.items,
      total: order.total,
      totalPayment: order.totalPayment,
      status: statusMap[order._id],
      reason: cancelReasonMap[order._id],
      address: order.address,
    };
    const res = await updateOrder(updatedOrder);
    if (res.success) {
      alert("Order updated successfully");
      fetchOrders();
    } else {
      alert(res.message || "Failed to update order");
    }
  };

  const toggleExpanded = (orderId) => {
    setExpandedMap((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <>
      <div className="sticky top-0 z-10">
        <HeaderAdmin stylePro="btn-line" />
      </div>
      <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-600">
          Admin Order Management
        </h1>

        {/* Filter */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <label className="mr-3 font-semibold text-gray-700">
              Filter by Status:
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="All">All</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders */}
        {loading ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map((order) => {
              const isExpanded = expandedMap[order._id];
              const isFinalCancelled = order.status === "Cancelled";
              const itemsToShow = isExpanded
                ? order.items
                : order.items.slice(0, 1);

              return (
                <div
                  key={order._id}
                  className={`bg-white shadow-lg rounded-lg p-6 border ${
                    isFinalCancelled
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  {/* Dòng đầu: grid 2 cột Order ID và Select */}
                  <div className="grid grid-cols-2 gap-4 items-center mb-4">
                    {/* Ô Order ID */}
                    <p
                      className="text-lg font-semibold text-gray-800 truncate max-w-full"
                      title={order.orderId || order._id}
                    >
                      Order ID: {order.orderId || order._id}
                    </p>

                    {/* Ô Select Status */}
                    <select
                      value={statusMap[order._id]}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={isFinalCancelled}
                      className="border rounded px-3 py-1 text-sm bg-white w-full"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <p
                    className={`mb-3 inline-block px-3 py-1 rounded ${getStatusStyle(
                      statusMap[order._id]
                    )}`}
                  >
                    {statusMap[order._id]}
                  </p>

                  <p className="mb-2 text-gray-700">
                    <strong>Address:</strong> {order.address || "No Address"}
                  </p>

                  <div className="mb-2">
                    <strong className="text-gray-700">Products:</strong>
                    <ul className="mt-2 grid gap-2">
                      {itemsToShow.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <img
                            src={item.image || "/default-product.png"}
                            alt={item.productName}
                            className="w-14 h-14 object-cover rounded border"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.productName}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.buyQuantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {order.items.length > 1 && (
                      <button
                        onClick={() => toggleExpanded(order._id)}
                        className="mt-2 text-red-600 underline text-sm"
                      >
                        {isExpanded ? "Hide Products" : "Show All Products"}
                      </button>
                    )}
                  </div>

                  <p className="mt-3 text-gray-700">
                    <strong>Total:</strong> ${order.total || 0}
                  </p>
                  <p className="mb-4 text-gray-700">
                    <strong>Total Payment:</strong> ${order.totalPayment || 0}
                  </p>

                  {["Cancelled", "REQUEST CANCELLATION"].includes(
                    statusMap[order._id]
                  ) && (
                    <div className="mb-4">
                      <label className="block font-semibold text-gray-700 mb-1">
                        Cancellation Reason:
                      </label>
                      <input
                        type="text"
                        value={cancelReasonMap[order._id] || ""}
                        onChange={(e) =>
                          handleCancelReasonChange(order._id, e.target.value)
                        }
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                        placeholder="Enter cancellation reason"
                        disabled={isFinalCancelled}
                      />
                    </div>
                  )}

                  <button
                    onClick={() => handleUpdateOrder(order)}
                    disabled={isFinalCancelled}
                    className={`${
                      isFinalCancelled
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white px-5 py-2 rounded transition w-full`}
                  >
                    Update Order
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ManagerOrder;
