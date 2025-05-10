  import User from "../models/User.js";
  import bcrypt from "bcrypt";
  //!Đăng ký
  export const handleRegister = async (req, res) => {
    try {
      const { username, password, position } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }

      const user = new User({ username, password, position });
      await user.save();
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Server error during sign up",
      });
    }
  };

<<<<<<< HEAD
    const user = new User({ username, password, position});
    await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during sign up",
=======
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
      req.session.user = { id: user._id, position: user.position }; // Lưu session
      res.json({ success: true, position: user.position });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
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
>>>>>>> e546c94c80ce57e7135faedcfe6d9d9a88cead0f
    });
  };

<<<<<<< HEAD
//!Đăng nhập
export const handleLogin = async (req, res) => {
  try {
    const { username, password} = req.body;
    const user = await User.findOne({ username });
    console.log("isActive?", user.isActive);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username" });
    if (user.isActive === false) 
      return res
        .status(403)
        .json({success: false,message: "Account has been disabled", });
    const match = await user.comparePassword(password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    req.session.user = { id: user._id, position: user.position }; // Lưu session
    res.json({ success: true, position: user.position });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

//!Đăng xuất
export const handleLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
=======
  //!Check ss
  export const checkSeSSion = async (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
>>>>>>> e546c94c80ce57e7135faedcfe6d9d9a88cead0f
    }
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

  //!change pass
  export const changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.session.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }

      user.password = newPassword;
      await user.save();

      res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  };
  //!Check username exist
  export const usernameExist = async (req, res) => {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Username is not exist" });
      else res.json({ success: true});
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  };
  //!Reset password
  export const resetPassword = async (req, res) => {
    try {
      const { username, newPassword } = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      user.password = newPassword;
      await user.save();

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({
        message: "Error Change Password",
      });
    }
  };

  //! Lấy danh sách khách hàng
  export const getCustomers = async (req, res) => {
    try {
      const customers = await User.find({ position: "Customer" });
      if (!customers)
        return res.json({
          success: false,
          message: "No customers have registered yet!",
        });
      res.json({ success: true, customers });
    } catch (error) {
      console.error("Error taking customers list:", error);
      res.status(500).json({ message: "" });
    }
  };

// Lấy danh sách Staff
export const getStaffs = async (req, res) => {
  try {
    const staffs = await User.find({ position: "Staff" });
    if (!staffs)
      return res.json({
        success: false,
        message: "No staffs have registered yet!",
      });
    res.json({ success: true, staffs });
  } catch (error) {
    console.error("Error taking staffs list:", error);
    res.status(500).json({ message: "" });
  }
};

export const updateInfoByAdmin = async (req,res) =>{
  try {
    const { _id, yourname, birthDay, gender, email, phoneNum } = req.body;

    const result = await User.findByIdAndUpdate(
      _id,
      { yourname, birthDay, gender, email, phoneNum },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    res.json({ success: true, staff: result });
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.body.id,
      { isActive: false },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, customer: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
