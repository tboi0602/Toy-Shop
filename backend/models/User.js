import mongoose from "mongoose";
import bcrypt from "bcrypt";

const counterSchema = new mongoose.Schema({
  _id: { type: String },
  seq: { type: Number },
});
const Counter = mongoose.model("Counter", counterSchema);
const userSchema = new mongoose.Schema({
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
});

userSchema.pre("save", async function (next) {
  // Hash password trước khi save
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  // Create id truoc khi save
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      "user",
      { $inc: { seq: 1 } }, 
      { new: true, upsert: true } 
    );
    this._id = "user" + String(counter.seq).padStart(3, "0"); 
  }
  next();
});
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};
export default mongoose.model("User", userSchema);
