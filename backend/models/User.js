  import mongoose from "mongoose";
  import bcrypt from "bcrypt";

<<<<<<< HEAD
  // User Schema
  const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      email: { type: String },
      yourname: { type: String },
      birthDay: { type: Date },
      address: { type: String },
      avatar: { type: String },
      position: { type: String },
      country: { type: String },
      gender: { type: String },
      phoneNum: { type: String},
      isActive: { type: Boolean, default: true},
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
=======
// User Schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    yourname: { type: String },
    birthDay: { type: Date },
    address: { type: String },
    avatar: { type: String },
    position: { type: String },
    country: { type: String },
    gender: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash password trước khi lưu
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
>>>>>>> e546c94c80ce57e7135faedcfe6d9d9a88cead0f
    }
  );

  // Hash password trước khi lưu
  userSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    } catch (err) {
      next(err);
    }
  });

  // So sánh mật khẩu
  userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
  };

  // Xóa _id và __v khi trả JSON
  userSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.__v;
    },
  });

  export default mongoose.model("User", userSchema);
