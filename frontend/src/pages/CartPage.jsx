import { useState, useEffect } from "react";
import HeaderCustomer from "../layouts/HeaderCustomer";
import { useNavigate } from "react-router-dom";
import { deleteItem, getCart } from "../services/handleAPI";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const myCart = await getCart();
        setCart(myCart.items || []);
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id
          ? { ...item, buyQuantity: Math.max(1, item.buyQuantity + delta) }
          : item
      )
    );
  };

  const total = cart
    .filter((item) => selectedIds.includes(item.productId))
    .reduce((sum, item) => sum + item.saleprice * item.buyQuantity, 0);

  const selectAll = selectedIds.length === cart.length && cart.length > 0;

  const handleDelete = async  () => {
    try {
    await deleteItem(selectedIds);
    // Sau khi xoá backend thành công, cập nhật state frontend
    setCart(prev => prev.filter(item => !selectedIds.includes(item.productId)));
    setSelectedIds([]);
  } catch (error) {
    console.error("Delete error:", error);
  }
  };

  const handleBuyNow = () => {
    const selectedItems = cart.filter((item) =>
      selectedIds.includes(item.productId)
    ).map(item => ({
      id: item.productId,
      name: item.productName,
      price: item.saleprice,
      quantity: item.buyQuantity,
      image: `http://localhost:5000/${item.image.replace(/^\/+/, "")}`
    }));

    navigate("/checkout", { state: { cartItems: selectedItems } });
  };

  return (
    <>
      <div className="sticky top-0">
        <HeaderCustomer
        styleOrder="btn-line"
        styleCart="line"
        stylePro=" btn-line"
      ></HeaderCustomer>
      </div>
      <div className="bg-gray-100 min-h-screen px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-4xl font-bold mb-4 text-red-600">Your Cart</h2>

          <div className="grid grid-cols-6 gap-4 border-b pb-2 font-bold text-gray-600 text-sm">
            <div className="col-span-3">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Subtotal</div>
          </div>

          {loading ? (
            <p className="text-gray-500 mt-4">Loading your cart...</p>
          ) : cart.length === 0 ? (
            <p className="text-gray-500 mt-4">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.productId}
                className="grid grid-cols-6 items-center p-4 mb-3 bg-white rounded-xl shadow transition hover:shadow-md"
              >
                <div className="col-span-3 flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.productId)}
                    onChange={() => toggleSelect(item.productId)}
                  />
                  <img
                    src={`http://localhost:5000/${item.image?.replace(/^\/+/, "")}`}
                    className="w-20 h-20 object-cover rounded-md border"
                    alt={item.productName}
                  />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="line-through text-sm text-gray-400">
                    ${item.oldprice}
                  </p>
                  <p className="text-red-600 font-semibold">
                    ${item.saleprice}
                  </p>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => changeQuantity(item.productId, -1)}
                    className="border px-2 rounded text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{item.buyQuantity}</span>
                  <button
                    onClick={() => changeQuantity(item.productId, 1)}
                    className="border px-2 rounded text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-center text-red-600 font-semibold">
                  ${(item.buyQuantity * item.saleprice).toLocaleString()}
                </div>
              </div>
            ))
          )}

          {!loading && cart.length > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={() =>
                    setSelectedIds(selectAll ? [] : cart.map((i) => i.productId))
                  }
                />
                <span className="text-sm text-gray-600">
                  Select All ({selectedIds.length})
                </span>
                <button
                  className="text-red-600 text-sm hover:underline"
                  onClick={handleDelete}
                  disabled={selectedIds.length === 0}
                >
                  Delete
                </button>
              </div>
              <div className="flex items-center space-x-6">
                <p className="text-sm">
                  Total ({selectedIds.length} item
                  {selectedIds.length !== 1 ? "s" : ""}):{" "}
                  <span className="text-red-600 text-lg font-semibold">
                    ${total.toLocaleString()}
                  </span>
                </p>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer"
                  onClick={handleBuyNow}
                  disabled={selectedIds.length === 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
