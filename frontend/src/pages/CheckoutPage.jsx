import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrder, deleteItem } from "../services/handleAPI";
import Swal from "sweetalert2";
const generateOrderId = () => {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const HH = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `ORDER${YYYY}${MM}${DD}${HH}${mm}${ss}`;
};
const removeVietnameseTones = (str) => {
  // Hàm bỏ dấu tiếng Việt
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const CheckoutPage = () => {
  const { state } = useLocation();
  const cartItems = useMemo(() => state?.cartItems || [], [state?.cartItems]);
  // Exchange & price
  const exchangeRate = 24500;

  // Địa chỉ chọn
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [addressDetail, setAddressDetail] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  //! Tính tiền
  const totalItemsPrice = cartItems.reduce(
    (total, item) => total + item.saleprice * item.buyQuantity,
    0
  );
  const calculateShippingFee = () => {
    if (!selectedProvince || !selectedDistrict || !selectedWard) return 0;
    const len =
      removeVietnameseTones(selectedProvince.name).length +
      removeVietnameseTones(selectedDistrict.name).length +
      removeVietnameseTones(selectedWard.name).length;
    return Math.max(1, len * 0.1);
  };

  const shippingFee = calculateShippingFee();
  const totalPayment = totalItemsPrice + shippingFee;
  const totalPaymentVND = totalPayment * exchangeRate;

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => res.json())
      .then((data) => {
        // Bỏ dấu cho tên tỉnh
        const dataNoAccent = data.map((p) => ({
          ...p,
          name: removeVietnameseTones(p.name),
        }));
        setProvinces(dataNoAccent);
      });
  }, []);

  // Khi chọn tỉnh => load huyện
  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      setSelectedDistrict(null);
      setWards([]);
      setSelectedWard(null);
      return;
    }
    fetch(
      `https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`
    )
      .then((res) => res.json())
      .then((data) => {
        // Bỏ dấu huyện
        const districtsNoAccent = data.districts.map((d) => ({
          ...d,
          name: removeVietnameseTones(d.name),
        }));
        setDistricts(districtsNoAccent);
        setSelectedDistrict(null);
        setWards([]);
        setSelectedWard(null);
      });
  }, [selectedProvince]);

  // Khi chọn huyện => load xã
  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard(null);
      return;
    }
    fetch(
      `https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`
    )
      .then((res) => res.json())
      .then((data) => {
        const wardsNoAccent = data.wards.map((w) => ({
          ...w,
          name: removeVietnameseTones(w.name),
        }));
        setWards(wardsNoAccent);
        setSelectedWard(null);
      });
  }, [selectedDistrict]);

  //! Tạo đơn hàng
  const [orderId] = useState(() => generateOrderId());
  const [order, setOrder] = useState({
    id: "",
    products: [],
    subtotal: 0,
    totalPayment: 0,
    address: "",
    status: "",
  });
  useEffect(() => {
    const fullAddress = `${addressDetail}, ${selectedWard?.name || ""}, ${
      selectedDistrict?.name || ""
    }, ${selectedProvince?.name || ""}`;
    setOrder({
      id: orderId,
      products: cartItems,
      subtotal: totalItemsPrice,
      totalPayment: totalPayment,
      address: fullAddress,
      status: "Waiting for confirmation",
    });
  }, [
    cartItems,
    totalItemsPrice,
    totalPayment,
    orderId,
    addressDetail,
    selectedWard,
    selectedDistrict,
    selectedProvince,
  ]);
  const handlePlaceOrder = async () => {
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !addressDetail
    ) {
      alert("Please complete your shipping address.");
      return;
    }
    const isOrder = await addOrder(order);
    if (isOrder.success) {
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order successful",
        confirmButtonColor: "#d33",
      });
      const productIds = cartItems.map((item) => item.productId);
      const isdelete = await deleteItem(productIds);
      if (isdelete) navigate("/dashboard-customer");
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white mt-10">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <div className="p-4 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-start p-2 gap-4 border rounded-md shadow-md"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.productName}</h3>
            </div>
            <div className="text-right">
              <p className="text-gray-700">
                ${item.saleprice.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">x{item.buyQuantity}</p>
              <p className="text-red-600 font-bold mt-1">
                ${(item.saleprice * item.buyQuantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>

        {/* Select Province */}
        <select
          className="w-full border rounded-md p-3 mb-3"
          value={selectedProvince?.code || ""}
          onChange={(e) => {
            const prov = provinces.find(
              (p) => p.code.toString() === e.target.value
            );
            setSelectedProvince(prov || null);
          }}
        >
          <option value="">Select Province</option>
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Select District */}
        <select
          className="w-full border rounded-md p-3 mb-3"
          value={selectedDistrict?.code || ""}
          onChange={(e) => {
            const dist = districts.find(
              (d) => d.code.toString() === e.target.value
            );
            setSelectedDistrict(dist || null);
          }}
          disabled={!selectedProvince}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.code} value={d.code}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Select Ward */}
        <select
          className="w-full border rounded-md p-3 mb-3"
          value={selectedWard?.code || ""}
          onChange={(e) => {
            const ward = wards.find(
              (w) => w.code.toString() === e.target.value
            );
            setSelectedWard(ward || null);
          }}
          disabled={!selectedDistrict}
        >
          <option value="">Select Ward</option>
          {wards.map((w) => (
            <option key={w.code} value={w.code}>
              {w.name}
            </option>
          ))}
        </select>

        {/* Input detail address */}
        <input
          type="text"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
          placeholder="Number phone ,house number, street name,..."
          className="w-full border rounded-md p-3 mb-3"
        />

        {/* Full Address Display */}
        <textarea
          value={
            addressDetail
              ? `${addressDetail}, ${selectedWard?.name || ""}, ${
                  selectedDistrict?.name || ""
                }, ${selectedProvince?.name || ""}`
              : selectedWard
              ? `${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`
              : ""
          }
          readOnly
          className="w-full border rounded-md p-3 text-sm bg-gray-100"
          rows={2}
        />
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery (COD)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="QR"
              checked={paymentMethod === "QR"}
              onChange={() => setPaymentMethod("QR")}
            />
            QR Code
          </label>
        </div>

        {paymentMethod === "QR" && (
          <div className="mt-4 bg-white border rounded p-4">
            <p className="mb-2 text-sm text-gray-600">
              Scan this QR code to pay:
            </p>
            <img
              src={`https://img.vietqr.io/image/VCCB-0898672066-compact2.png?amount=${Math.round(
                totalPaymentVND
              )}&addInfo=${generateOrderId()}`}
              alt="QR Payment"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-gray-500">
              Payment amount: ${totalPayment.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between py-2">
          <span>Subtotal</span>
          <span>${totalItemsPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span>Shipping Fee</span>
          <span>${shippingFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-lg font-bold text-red-600 border-t mt-2 pt-2">
          <span>Total Payment</span>
          <span>${totalPayment.toLocaleString()}</span>
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
