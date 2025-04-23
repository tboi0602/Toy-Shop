import User from "../models/User.js";

//!Đăng ký
export const handleRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = new User({ username, password, email });
    await user.save();
    req.session.user = { id: user._id, username: user.username }; // Lưu session
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//!Đăng nhập
export const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username" });
    const match = await user.comparePassword(password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    req.session.user = { id: user._id, username: user.username };
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//!Đăng xuất
export const handleLogout=async(req,res)=>{
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie('connect.sid'); // xoá cookie session
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
}
