import { useState } from "react";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      alert("OTP Sent!");
    } else {
      alert("Enter valid 10-digit phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 4) {
      alert("OTP Verified!");
    } else {
      alert("Enter valid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          GenGuard Login
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Secure access to your dashboard
        </p>

        {/* Name */}
        <div className="mt-6">
          <label className="text-gray-700 text-sm">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <label className="text-gray-700 text-sm">Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10-digit number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Send OTP */}
        {!otpSent && (
          <button
            onClick={handleSendOtp}
            className="w-full mt-6 bg-gradient-to-r from-cyan-900 to-teal-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Send OTP
          </button>
        )}

        {/* OTP Field & Verify Button */}
        {otpSent && (
          <div className="mt-6">
            <label className="text-gray-700 text-sm">Enter OTP</label>
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="4-digit OTP"
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Submit OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
