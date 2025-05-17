import React, { useState, useEffect } from "react";
import InputUser from "../components/InputUser";
import Swal from "sweetalert2";
import HdAdmin from "../layouts/HeaderAdmin";
import { CheckUser } from "../Function/CheckUser";
import {
  addProducts,
  loadInfoProducts,
  deleteProducts,
  uploadImage,
  updateProducts,
} from "../services/handleAPI";

const Icon = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`hover:scale-110 ${className}`}>
    {children}
  </button>
);

const ManageProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [productList, setProductList] = useState([]);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productInfo, setProductInfo] = useState({
    productId: "",
    productName: "",
    saleprice: "",
    oldprice: "",
    image: "",
    quantity: "",
    description: "",
  });

  CheckUser("Admin");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const { productId, productName, saleprice, oldprice, image, quantity, description } = productInfo;

    if (!productId || !productName || !saleprice || !oldprice || !description || !image || !quantity) {
      setError("Please do not leave blank!");
      return;
    }

    try {
      const data = await addProducts(productInfo);
      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "You have added a new product",
          confirmButtonColor: "#d33",
        }).then(() => {
          setShowModal(false);
          setProductInfo({
            productId: "",
            productName: "",
            saleprice: "",
            oldprice: "",
            image: "",
            quantity: "",
            description: "",
          });
          setError("");
          loadData();
        });
      } else {
        setError(data.message || "Add new product failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const { productId, productName, saleprice, oldprice, image, quantity, description } = productInfo;

    if (!productId || !productName || !saleprice || !oldprice || !description || !image || !quantity) {
      setError("Please do not leave blank!");
      return;
    }

    try {
      const data = await updateProducts(productInfo);
      if (data.success) {
        Swal.fire("Updated!", "Product updated successfully!", "success").then(() => {
          setShowEditModal(false);
          setProductInfo({
            productId: "",
            productName: "",
            saleprice: "",
            oldprice: "",
            image: "",
            quantity: "",
            description: "",
          });
          setUploadedImage(null);
          loadData();
        });
      } else {
        setError(data.message || "Update failed!");
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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);

      const res = await uploadImage(formData);
      if (res.success) {
        setProductInfo({ ...productInfo, image: res.path });
      } else {
        Swal.fire("Error", "Failed to upload product image", "error");
      }
    }
  };

  const handleEditClick = (product) => {
    setProductInfo({ ...product });
    setUploadedImage(`http://localhost:5000/${product.image?.replace(/^\/+/, "")}`);
    setShowEditModal(true);
    setError("");
  };
  return (
    <div>
      <div className="sticky top-0 z-10">
        <HdAdmin stylePro="btn-line" />
      </div>

      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-full shadow transition"
          >
            Add
          </button>
        </div>
      </div>

      <div className="px-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-8 gap-4 text-sm font-semibold bg-red-100 text-red-800 p-3 rounded-t-lg text-center">
            <span>Product ID</span>
            <span>Image</span> {/* Cột ảnh */}
            <span>Product name</span>
            <span>Price</span>
            <span>Saled price</span>
            <span>Quantity</span>
            <span>Description</span>
            <span>Actions</span>
          </div>

          {productList.length > 0 ? (
            productList.map((product, index) => (
              <div
                key={product.productId || index}
                className="grid grid-cols-8 gap-4 border-b p-3 text-sm items-center text-center"
              >
                <span className="truncate">{product.productId}</span>
                <span>
                  {product.image ? (
                    <img
                      src={`http://localhost:5000/${product.image?.replace(/^\/+/, "")}`}
                      alt={product.productName}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </span>
                <span className="truncate">{product.productName}</span>
                <span className="truncate">{product.oldprice}</span>
                <span className="truncate">{product.saleprice}</span>
                <span className="truncate">{product.quantity}</span>
                <span className="truncate">{product.description}</span>
                <div className="flex justify-end gap-7">
                  <Icon
                   className="Wrench btn-line"
                   onClick={()=>handleEditClick(product)}
                   >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Icon>

                  <Icon
                    className="Trash btn-line"
                    onClick={() => {
                      setSelectedIdToDelete(product.productId);
                      setShowConfirmModal(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
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
          <div className="bg-white shadow-xl w-full max-w-md p-6 relative mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => 
                {setShowModal(false)
                  setProductInfo({
                    productId: "",
                    productName: "",
                    saleprice: "",
                    oldprice: "",
                    image: "",
                    quantity: "",
                    description: "",
                  });
                }}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Add New Product
            </h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={addProduct} className="space-y-4">
              <InputUser
                label="Product ID"
                name="productId"
                type="text"
                value={productInfo.productId}
                onChange={handleChange}
                required
              />
              <InputUser
                label="Product Name"
                name="productName"
                type="text"
                value={productInfo.productName}
                onChange={handleChange}
                required
              />
              <InputUser
                label="Price"
                name="oldprice"
                type="number"
                value={productInfo.oldprice}
                onChange={handleChange}
                required
              />
              <InputUser
                label="Saled Price"
                name="saleprice"
                type="number"
                value={productInfo.saleprice}
                onChange={handleChange}
              />
              <InputUser
                label="Quantity"
                name="quantity"
                type="number"
                value={productInfo.quantity}
                onChange={handleChange}
              />
              <InputUser
                label="Description"
                name="description"
                type="text"
                value={productInfo.description}
                onChange={handleChange}
              />

              <div>
                <label className="block font-semibold mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50"
                />
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="preview"
                    className="mt-2 w-20 h-20 object-cover rounded"
                  />
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-xl w-full max-w-md p-6 relative mx-4 sm:mx-0 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowEditModal(false)
                setProductInfo({
                  productId: "",
                  productName: "",
                  saleprice: "",
                  oldprice: "",
                  image: "",
                  quantity: "",
                  description: "",
                });
              }}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Update Product
            </h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={updateProduct} className="space-y-4">
              <InputUser label="Product ID" name="productId" type="text" value={productInfo.productId} onChange={handleChange} readOnly />
              <InputUser label="Product Name" name="productName" type="text" value={productInfo.productName} onChange={handleChange} />
              <InputUser label="Price" name="oldprice" type="number" value={productInfo.oldprice} onChange={handleChange} />
              <InputUser label="Saled Price" name="saleprice" type="number" value={productInfo.saleprice} onChange={handleChange} />
              <InputUser label="Quantity" name="quantity" type="number" value={productInfo.quantity} onChange={handleChange} />
              <InputUser label="Description" name="description" type="text" value={productInfo.description} onChange={handleChange} />

              <div>
                <label className="block font-semibold mb-1">Image</label>
                <input type="file" accept="image/*" onChange={handleUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50" />
                {uploadedImage && (
                  <img src={uploadedImage} alt="preview" className="mt-2 w-20 h-20 object-cover rounded" />
                )}
              </div>

              <button type="submit" className="w-full py-2 bg-red-600 text-white rounded hover:bg-green-700 transition">
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}


      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-4 sm:mx-0">
            <p className="mb-4 text-center">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center gap-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={async () => {
                  if (selectedIdToDelete) {
                    const res = await deleteProducts(selectedIdToDelete);
                    if (res.success) {
                      Swal.fire("Deleted!", "Product has been deleted.", "success");
                      setShowConfirmModal(false);
                      loadData();
                    } else {
                      Swal.fire("Error!", res.message || "Delete failed", "error");
                    }
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
