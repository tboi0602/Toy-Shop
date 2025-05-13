import React, { useState, useEffect } from "react";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import { addProducts, loadInfoProducts, deleteProducts} from "../services/handleAPI";

const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);
const ManageProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [sales, setOffer] = useState("");
  const [oldprice, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productList, setProductList] = useState([]);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  console.log(productList)

  CheckUser("Admin");

  const addProduct = async (e) => {
      e.preventDefault();
      if (!productName || !productId  || !oldprice || !sales ) {
        setError("Please do not leave blank!");
        return;
      }
  
      try {
        const data = await addProducts(productId, productName, Number(oldprice), Number(sales), description);
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "You have added new product",
            confirmButtonColor: "#d33",
          }).then(() => {
            setShowModal(false);
            setProductId("");
            setProductName("");
            setPrice("");
            setOffer("");
            setDescription("");
            setError("");
            loadData(); // refresh lại danh sách
          });
        } else {
          setError(data.message || "Add new product failed!");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again.");
      }
    };

    const loadData = async () => {
        const data = await loadInfoProducts();
        if (data.success) setProductList(data.products);
        else setError(data.message);
      };

    useEffect(() => {
        loadData();
      }, []);
    // const handlefaload = (e) => {
    //   const file = e.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setUploadedImage(reader.result);
    //       handleChange(e);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // };

  return (
    <div>
      <div className="sticky top-0 z-10">
        <HdAdmin stylePro="btn-line" />
      </div>
      {/* Add button */}
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        
        {/* Bọc hai nút trong 1 div flex */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="px-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-8 gap-4 text-sm font-semibold bg-red-100 text-red-800 p-3 rounded-t-lg">
            <span>Product ID</span>
            <span>Product name</span>
            <span>Price</span>
            <span>Offer</span>
            <span>Saled price</span>
            <span>Quantity</span>
            <span>Description</span>
          </div>
          
          {productList && productList.length > 0 ? (
            productList.map((product, index) => (
              <div
                key={product.productId || index}
                className={`grid grid-cols-8 gap-4 border-b p-3 text-sm transition`}              
                >
                <span className="truncate">{product.productId}</span>
                <span className="truncate">{product.productName}</span>
                <span className="truncate">{product.oldprice}</span>
                <span className="truncate">{product.sales}</span>
                <span className="truncate">{product.saleprice}</span>
                <span className="truncate">{product.quantity}</span>
                <span className="truncate">{product.description}</span>
                <div className="flex justify-end gap-7">
                  <Icon className="Wrench btn-line"
                    >
                      <svg
                       xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                         viewBox="0 0 24 24"
                         stroke-width="1.5"
                         stroke="currentColor"
                         class="size-6"
                        >
                        <path
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                  </Icon>

                  <Icon className="Trash btn-line" onClick={() => {
                    setSelectedIdToDelete(product.productId);
                    setShowConfirmModal(true);
                  }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    class="size-6"
                  >
                    <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                  </Icon>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-red-500">No product found!</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative mx-4 sm:mx-0">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <form
              onSubmit={addProduct}
              className="flex flex-col gap-y-8 w-full"
            >
              <h1 className="text-2xl font-bold text-center mb-2">
                Add Product
              </h1>

              <InputUser
                name="Product ID"
                placeholder="Enter product ID"
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />

              <InputUser
                name="Product name"
                placeholder="Enter product name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <div className="flex gap-4">
                <div className="w-1/2">
                  <InputUser
                    name="Price"
                    placeholder="Enter product price"
                    type="number"
                    value={oldprice}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <InputUser
                    name="Offer"
                    placeholder="Enter product offer"
                    type="number"
                    value={sales}
                    onChange={(e) => setOffer(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[20px]">Product description</label>
                <textarea
                  rows="4"
                  className="border p-2 rounded-md resize-y min-h-[100px]"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-600 text-center text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition"
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative mx-4 sm:mx-0">
            <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
            <p className="text-center mb-6">Do you sure want to disable this product?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={async () => {
                  const result = await deleteProducts(selectedIdToDelete);
                  if (result.success) {
                    setProductList(prev => prev.filter(product => product.productId !== selectedIdToDelete));
                    Swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "You have deleted the customer account",
                      confirmButtonColor: "#d33",
                    })
                  } else {
                    Swal.fire("Error", result.message || "Disable failed", "error");
                  }
                  setShowConfirmModal(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full"
              >
                Yes, disable
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default ManageProduct;
