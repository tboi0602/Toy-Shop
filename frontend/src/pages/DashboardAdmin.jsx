import { useEffect, useState } from "react";
import HdAdmin from "../layouts/HeaderAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CheckUser } from "../Function/CheckUser";
import { loadInfoOrdersByAdmin } from "../services/handleAPI";
// Hàm gọi API lấy đơn hàng
export default function DashboardAdmin() {
  const [orders, setOrders] = useState([]);
  const [filterFrom, setFilterFrom] = useState("2025-05-01");
  const [filterTo, setFilterTo] = useState("2025-05-31");
  const [filteredData, setFilteredData] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  const [topProduct, setTopProduct] = useState(null);

  CheckUser("Admin");

  // Load data đơn hàng khi component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await loadInfoOrdersByAdmin();
        if (result.success && result.orders) {
          setOrders(result.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Xử lý dữ liệu: lọc đơn hàng completed, nhóm doanh thu theo ngày, tính tổng sản phẩm và sản phẩm bán chạy
  useEffect(() => {
    if (!filterFrom || !filterTo) {
      setFilteredData([]);
      setTotalProductsSold(0);
      setTopProduct(null);
      return;
    }

    const fromDate = new Date(filterFrom);
    const toDate = new Date(filterTo);

    const filteredOrders = orders.filter((order) => {
      if (order.status !== "Completed") return false;
      const createdAt = new Date(order.createAt);
      return createdAt >= fromDate && createdAt <= toDate;
    });

    // Tính doanh thu theo ngày
    const revenueByDateMap = {};

    // Tổng số lượng sản phẩm bán được
    let totalQuantity = 0;

    // Map lưu tổng số lượng theo từng sản phẩm
    const productQuantityMap = {};

    filteredOrders.forEach((order) => {
      // Doanh thu theo ngày
      const dateKey = new Date(order.createAt).toISOString().slice(0, 10);
      if (!revenueByDateMap[dateKey]) {
        revenueByDateMap[dateKey] = 0;
      }
      revenueByDateMap[dateKey] += order.total;

      // Tính tổng sản phẩm & sản phẩm bán chạy
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          totalQuantity += item.buyQuantity;

          if (!productQuantityMap[item.productName]) {
            productQuantityMap[item.productName] = 0;
          }
          productQuantityMap[item.productName] += item.buyQuantity;
        });
      }
    });

    // Chuyển map doanh thu sang array để vẽ biểu đồ
    const revenueByDateArray = Object.entries(revenueByDateMap).map(
      ([date, revenue]) => ({ date, revenue })
    );

    revenueByDateArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredData(revenueByDateArray);
    setTotalProductsSold(totalQuantity);

    // Tìm sản phẩm bán chạy nhất
    const topProductEntry = Object.entries(productQuantityMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (topProductEntry) {
      setTopProduct({ name: topProductEntry[0], quantity: topProductEntry[1] });
    } else {
      setTopProduct(null);
    }
  }, [orders, filterFrom, filterTo]);

  return (
    <>
      <div className="sticky top-0 z-30 bg-white">
        <HdAdmin stylePro="btn-line" />
      </div>
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-red-600 text-center">
          Revenue Dashboard (Completed Orders)
        </h1>

        {/* Filter chọn khoảng thời gian */}
        <div className="mb-8 flex flex-col sm:flex-row justify-center gap-6 max-w-lg mx-auto">
          <div className="w-full sm:w-auto">
            <label className="block mb-1 font-semibold text-sm sm:text-base">
              From Date:
            </label>
            <input
              type="date"
              value={filterFrom}
              max={filterTo}
              onChange={(e) => setFilterFrom(e.target.value)}
              className="border p-2 rounded w-full sm:w-48"
            />
          </div>
          <div className="w-full sm:w-auto">
            <label className="block mb-1 font-semibold text-sm sm:text-base">
              To Date:
            </label>
            <input
              type="date"
              value={filterTo}
              min={filterFrom}
              onChange={(e) => setFilterTo(e.target.value)}
              className="border p-2 rounded w-full sm:w-48"
            />
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <section className="bg-white shadow-md rounded-xl p-6 border border-red-600 mb-10 max-w-full overflow-x-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-red-600 text-center sm:text-left">
            Revenue by Date
          </h2>
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-600">
              No data in selected date range.
            </p>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={350}
              minWidth={320}
              minHeight={300}
            >
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)} />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#CC0000" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* Thông tin tổng số lượng sản phẩm và sản phẩm bán chạy */}
        <section className="bg-white shadow-md rounded-xl p-6 border border-red-600 max-w-md mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-red-600">
            Sales Summary
          </h2>
          <p className="text-lg sm:text-xl mb-2">
            <strong>Total Products Sold:</strong> {totalProductsSold}
          </p>
          {topProduct ? (
            <p className="text-lg sm:text-xl">
              <strong>Top Selling Product:</strong> {topProduct.name} (
              {topProduct.quantity} sold)
            </p>
          ) : (
            <p className="text-gray-600">No product sales data.</p>
          )}
        </section>
      </main>
    </>
  );
}
