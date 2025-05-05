import User from "../models/User.js";

//!Đăng ký
export const handleRegister = async (req, res) => {
  try {
    const { username, password, position } = req.body;
    const user = new User({ username, password, position });
    await user.save();
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
    req.session.user = { id: user._id ,position: user.position}; // Lưu session
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//!Đăng xuất
export const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // xoá cookie session
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};

//!Lấy dữ liệu user
export const getInfo = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: message.err });
  }
};

//!Cập nhật dữ liệu user
export const updateInfo = async (req, res) => {
  try {
    const updates = (({
      username,
      email,
      yourname,
      gender,
      birthDay,
      country,
      address,
      avatar,
    }) => ({
      username,
      email,
      yourname,
      gender,
      birthDay,
      country,
      address,
      avatar, 
    }))(req.body);
    await User.findByIdAndUpdate(req.session.user.id, updates);
    res.json({ success: true, message: "Update Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: message.err });
  }
};
