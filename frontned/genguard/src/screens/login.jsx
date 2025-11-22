import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSendOtp = () => {
    setError("");
    setSuccessMsg("");

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setOtpSent(true);
    setSuccessMsg("OTP has been sent to your phone.");
  };

  const handleVerifyOtp = () => {
    setError("");
    setSuccessMsg("");

    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }

    navigate("/dashboard"); // Redirect after OTP verified
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom right, #003a52, #005c68, #008b8f)",
      }}
    >
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">

        {/* Header */}
        <h2 className="text-center text-3xl font-bold text-gray-900">
          GenGuard
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Powered by Generative AI Fraud Detection
        </p>

        {/* Step Indicators */}
        <div className="flex justify-center items-center gap-6 mb-8">
          {/* Step 1 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
              !otpSent ? "bg-teal-600" : "bg-gray-300"
            }`}
          >
            1
          </div>

          <div className="w-12 h-[2px] bg-gray-300"></div>

          {/* Step 2 */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
              otpSent ? "bg-teal-600" : "bg-gray-300"
            }`}
          >
            2
          </div>
        </div>

        {/* Full Name */}
        <label className="text-gray-700 text-sm">Full Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 mb-4 p-3 border border-gray-300 rounded-xl outline-none
                     focus:ring-2 focus:ring-teal-500"
        />

        {/* Phone Number */}
        <label className="text-gray-700 text-sm">Phone Number</label>
        <input
          type="tel"
          placeholder="10-digit number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-xl outline-none
                     focus:ring-2 focus:ring-teal-500"
        />

        {/* Error / Success */}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        {successMsg && (
          <p className="text-green-600 text-sm mt-1">{successMsg}</p>
        )}

        {/* Send OTP */}
        {!otpSent && (
          <button
            onClick={handleSendOtp}
            className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl 
                       font-semibold hover:bg-teal-700 transition"
          >
            Send OTP
          </button>
        )}

        {/* OTP Field */}
        {otpSent && (
          <>
            <label className="text-gray-700 text-sm mt-6 block">Enter OTP</label>
            <input
              type="tel"
              placeholder="4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl outline-none
                         focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl 
                         font-semibold hover:bg-teal-700 transition"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-teal-700 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
