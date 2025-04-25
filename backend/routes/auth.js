import express from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
  getInfo,
  updateInfo
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});
router.get("/info",getInfo);
router.post("/info",updateInfo);
export default router;
