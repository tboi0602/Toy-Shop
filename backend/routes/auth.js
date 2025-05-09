import express from "express";
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
  getStaffs,
  resetPassword,
  usernameExist
} from "../controllers/authController.js";
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
router.get("/staffs", getStaffs);
router.post("/updateInfoByAd", updateInfoByAdmin);

export default router;
