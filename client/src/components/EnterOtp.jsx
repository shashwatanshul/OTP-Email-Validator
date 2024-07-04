import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/enterotp.css";

export default function EnterOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state ? location.state.email : "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (otp === "" || newPassword === "") {
      return toast.error("Every input field must be filled");
    }
    const callAPI = await fetch("/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, newpassword: newPassword }),
    });
    const response = await callAPI.json();
    if (response.error) {
      return toast.error(response.error);
    }
    if (response.message === "Invalid OTP") {
      return toast.error("Invalid OTP");
    }
    toast.success("Password Changed Successfully");
    navigate("/login");
  }

  return (
    <div className="enter-otp-container">
      <h2>Enter OTP</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="otp">OTP :</label>
        <input
          type="text"
          id="otp"
          name="otp"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <label htmlFor="newpassword">New Password :</label>
        <input
          type="password"
          id="newpassword"
          name="newpassword"
          placeholder="Enter New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
