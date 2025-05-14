import React, { useState, useEffect } from "react";

export default function DetailProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) setQuantity(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to the cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceed to buy ${quantity} item(s) for $${(product.price * quantity).toLocaleString()}!`);
  };

  // Convert string to number in case price is string
  const unitPrice = parseFloat(product.price);
  const totalPrice = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-4xl shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
        >
          &times;
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <img
            src={product.image}
            alt="product"
            className="w-full md:w-1/2 h-auto object-cover rounded"
          />

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-3">{product.name}</h2>

              {/* Prices */}
              <div className="flex items-center gap-3 mb-3">
                <span className="line-through text-gray-500 text-lg">
                  ${parseFloat(product.oldprice).toLocaleString()}
                </span>
                <span className="text-red-600 text-2xl font-semibold">
                  ${unitPrice.toLocaleString()}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-600">Quantity:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="px-2">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(quantity + 1 <= 99 ? quantity + 1 : quantity)
                  }
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded mb-4">
                  <strong>Description:</strong> {product.description}
                </div>
              )}
            </div>

            {/* Footer Actions and Total */}
            <div className="flex flex-col gap-4">
              {/* Total Price */}
              <div className="text-right text-lg font-medium text-gray-800">
                Total: <span className="text-red-600 font-bold">${totalPrice.toLocaleString()}</span>
              </div>

              {/* Buttons */}
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
