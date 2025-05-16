import React, { useEffect, useState } from "react";
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

// Giả lập dữ liệu doanh thu theo ngày (dữ liệu thật sẽ lấy từ API)
const generateMockData = () => {
  // Tạo doanh thu mỗi ngày trong tháng 5/2025 ví dụ
  const data = [];
  for (let day = 1; day <= 31; day++) {
    data.push({
      date: `2025-05-${day.toString().padStart(2, "0")}`,
      revenue: Math.floor(Math.random() * 1000) + 100, // Doanh thu $100 - $1100
    });
  }
  return data;
};

export default function DashboardAdmin() {
  const [data, setData] = useState([]);
  const [filterFrom, setFilterFrom] = useState("2025-05-01");
  const [filterTo, setFilterTo] = useState("2025-05-31");
  const [filteredData, setFilteredData] = useState([]);

  CheckUser("Admin");

  useEffect(() => {
    const mockData = generateMockData();
    setData(mockData);
  }, []);

  // Lọc data theo ngày từ filterFrom -> filterTo
  useEffect(() => {
    if (!filterFrom || !filterTo) {
      setFilteredData(data);
      return;
    }
    const fromDate = new Date(filterFrom);
    const toDate = new Date(filterTo);
    const filtered = data.filter(({ date }) => {
      const curDate = new Date(date);
      return curDate >= fromDate && curDate <= toDate;
    });
    setFilteredData(filtered);
  }, [filterFrom, filterTo, data]);

  return (
    <>
      <div className="sticky top-0">
        <HdAdmin stylePro="btn-line" />
      </div>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">
          Revenue Dashboard (Single Product)
        </h1>

        <div className="mb-6 flex justify-center gap-4 flex-wrap">
          <div>
            <label className="block mb-1 font-semibold">From Date:</label>
            <input
              type="date"
              value={filterFrom}
              max={filterTo}
              onChange={(e) => setFilterFrom(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">To Date:</label>
            <input
              type="date"
              value={filterTo}
              min={filterFrom}
              onChange={(e) => setFilterTo(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border border-red-600">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Revenue by Date
          </h2>
          {filteredData.length === 0 ? (
            <p>No data in selected date range.</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(str) => str.slice(5)} />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar dataKey="revenue" fill="#CC0000" name="Revenue ($)" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
}
