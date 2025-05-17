import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  getInfo,
  updateInfo,
  updateInfoByAdmin,
  checkSeSSion,
  changePassword,
  getCustomers,
  addStaff,
  getStaffs,
  getProducts,
  resetPassword,
  usernameExist,
  deleteUser,
  addProducts,
  updateProductByAdmin,
  deleteProducts,
  addNotification,
  getNotifications,
  deleteNotifications,
  addToCart,
  getCart,
  deleteItem,
  getOrders,
} from "../controllers/authController.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const newFileName = `image_${Math.floor(Date.now() / 1000)}`;
    cb(null, newFileName + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const router = express.Router();
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/check-session", checkSeSSion);
router.get("/info", getInfo);
router.post("/info", updateInfo);
router.post("/change-pass", changePassword);
router.post("/username-exist", usernameExist);
router.post("/reset-pass", resetPassword);
router.get("/customers", getCustomers);
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ success: true, path: filePath });
});


router.get("/staffs", getStaffs);
router.post("/addStaffs", addStaff);
router.post("/updateInfoByAd", updateInfoByAdmin);
router.post("/deleteUser", deleteUser);


router.post("/addProducts", addProducts);
router.get("/getProducts", getProducts);
router.post("/deleteProducts", deleteProducts);
router.post("/updateProducts", updateProductByAdmin);


router.post("/addNotifications", addNotification);
router.get("/getNotifications", getNotifications);
router.post("/deleteNotifications", deleteNotifications);


router.post("/addToCart", addToCart); // Thêm sản phẩm vào giỏ
router.get("/userCart", getCart); // Lấy giỏ hàng theo user
router.delete("/removeCart", deleteItem); // Xoá 1 item khỏi giỏ
router.get("/getOrders", getOrders); // Lấy giỏ hàng theo user

export default router;
