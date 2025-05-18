import React, { useState, useEffect } from "react";
import { addToCart } from "../services/handleAPI";
import { useNavigate } from "react-router-dom";

export default function DetailProductModal({
  product,
  isOpen,
  onClose,
  userId,
  onCartUpdated,
}) {
  const [buyQuantity, setBuyQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (product) setBuyQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    if (buyQuantity > product.quantity) {
      alert(`Only ${product.quantity} item(s) left in stock`);
      return;
    }

    try {
      await addToCart(userId, product, buyQuantity);
      alert(`Added ${buyQuantity} item(s) to the cart!`);
      if (onCartUpdated) onCartUpdated();
      onClose();
    } catch (error) {
      alert("Failed to add to cart");
      console.error(error);
    }
  };

  const handleBuyNow = () => {
    if (buyQuantity > product.quantity) {
      alert(`Only ${product.quantity} item(s) available in stock`);
      return;
    }

    navigate("/checkout", {
      state: {
        cartItems: [
          {
            ...product,
            buyQuantity,
            productId: product.id || product.productId,
            image: `http://localhost:5000/${product.image?.replace(
              /^\/+/,
              ""
            )}`,
          },
        ],
      },
    });
    onClose();
  };

  const totalPrice = product.saleprice * buyQuantity;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-4xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`http://localhost:5000/${product.image?.replace(/^\/+/, "")}`}
            alt="product"
            className="w-full md:w-1/2 h-auto object-cover rounded"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3">{product.productName}</h2>

              <div className="flex items-center gap-3 mb-3">
                <span className="line-through text-gray-500 text-lg">
                  ${parseFloat(product.oldprice).toLocaleString()}
                </span>
                <span className="text-red-600 text-2xl font-semibold">
                  ${product.saleprice}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600">Quantity:</span>
                <button
                  onClick={() => setBuyQuantity(Math.max(1, buyQuantity - 1))}
                  className="border px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="px-2">{buyQuantity}</span>
                <button
                  onClick={() =>
                    setBuyQuantity(Math.min(product.quantity, buyQuantity + 1))
                  }
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                In stock: {product.quantity}
              </span>

              {product.description && (
                <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded mb-4 mt-3">
                  <strong>Description:</strong> {product.description}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-right text-lg font-medium text-gray-800">
                Total:{" "}
                <span className="text-red-600 font-bold">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-6 py-3 border border-red-600 text-red-600 rounded hover:bg-red-100"
                >
                  Add to cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
