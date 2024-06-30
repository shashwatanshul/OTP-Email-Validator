import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  verified: { type: Boolean, default: false },
  otp: { type: Number },
});

const Userclass = mongoose.model("users", userModel);
export default Userclass;
