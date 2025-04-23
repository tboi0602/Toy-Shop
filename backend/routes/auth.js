import express from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/check-session", (req, res) => {
  if (req.session.user) {
    // Đã đăng nhập
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    // Chưa đăng nhập
    res.json({ loggedIn: false });
  }
});
export default router;
