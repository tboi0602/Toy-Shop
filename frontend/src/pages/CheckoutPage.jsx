import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  const shippingFee = 1; // USD
  const exchangeRate = 24500;

  const totalItemsPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalPayment = totalItemsPrice + shippingFee;
  const totalPaymentVND = totalPayment * exchangeRate;

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Bạn có thể gửi thông tin đơn hàng tại đây
    navigate("/dashboard-customer");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white mt-10">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <div className="p-4 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start p-2 gap-4 border rounded-md shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-gray-700">${item.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">x{item.quantity}</p>
              <p className="text-red-600 font-bold mt-1">
                ${(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address..."
          className="w-full border rounded-md p-3 text-sm"
          rows={3}
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
              )}&addInfo=Order%20Payment`}
              alt="QR Payment"
              className="w-48 h-48"
            />
            <p className="mt-2 text-sm text-gray-500">
              Payment amount: ${totalPayment}
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
          <span>${shippingFee.toLocaleString()}</span>
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

      <p className="text-sm text-gray-500 text-center mt-4">
        By clicking 'Place Order', you confirm that you agree to{" "}
        <a href="#" className="text-blue-600 hover:underline">
          NinjaShop's Terms and Conditions
        </a>
        .
      </p>
    </div>
  );
};

export default CheckoutPage;
