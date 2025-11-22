import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function SecureBankForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    file: null,
    consent: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2E47] to-[#0C9BA6] p-4">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-9 h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75M4.5 9h15l-.852 10.228A3 3 0 0115.66 21H8.34a3 3 0 01-2.988-2.772L4.5 9z"
            />
          </svg>
        </div>

        <h1 className="text-white text-3xl font-semibold mt-4">
          SecureBank AI
        </h1>
        <p className="text-white/80 text-sm">
          Powered by Generative AI Fraud Detection
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-xl">

        {/* Step Progress */}
        <div className="flex items-center justify-center mb-8 space-x-6">

          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === 1 || step > 1
                  ? "bg-teal-500 text-white"
                  : "border border-gray-300 text-gray-400"
              }`}
            >
              1
            </div>
          </div>

          <div className="w-12 h-[2px] bg-gray-300"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === 2 || step === 3
                  ? "bg-teal-500 text-white"
                  : "border border-gray-300 text-gray-400"
              }`}
            >
              2
            </div>
          </div>

          <div className="w-12 h-[2px] bg-gray-300"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                step === 3
                  ? "bg-teal-500 text-white"
                  : "border border-gray-300 text-gray-400"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* ----------------------------- */}
        {/* STEP 1 — USER DETAILS */}
        {/* ----------------------------- */}
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Welcome! Let's get started
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative mt-1">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Naman Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative mt-1">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="naman@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium">Phone</label>
                <div className="relative mt-1">
                  <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={next}
              className="w-full mt-6 bg-teal-400 hover:bg-teal-500 text-white py-3 rounded-lg transition"
            >
              Continue
            </button>
          </>
        )}

        {/* ----------------------------- */}
        {/* STEP 2 — IDENTITY VERIFICATION */}
        {/* ----------------------------- */}
        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Identity Verification
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-xl py-10 flex flex-col items-center text-center mb-4">
              <ArrowUpTrayIcon className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-gray-700 font-medium">
                Upload your government ID
              </p>
              <p className="text-gray-400 text-sm">
                Passport, Driver's License, or National ID
              </p>

              <label className="mt-4">
                <div className="bg-teal-500 text-white px-5 py-2 rounded-lg cursor-pointer">
                  Choose File
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFile}
                />
              </label>
            </div>

            <button
              onClick={next}
              className="w-full mt-4 bg-teal-400 hover:bg-teal-500 text-white py-3 rounded-lg transition"
            >
              Continue
            </button>

            <button
              onClick={back}
              className="w-full mt-3 text-teal-600 underline text-sm"
            >
              Back
            </button>
          </>
        )}

        {/* ----------------------------- */}
        {/* STEP 3 — CONSENT */}
        {/* ----------------------------- */}
        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Privacy & Consent</h2>

            {/* How AI protects you */}
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <p className="font-medium mb-2">How we use AI to protect you:</p>

              {[
                "Real-time transaction monitoring for fraud patterns",
                "Behavioral analysis to detect anomalies",
                "Cross-border compliance and AML screening",
                "Insider threat detection and access monitoring",
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-2 my-1">
                  <CheckCircleIcon className="w-5 h-5 text-teal-500" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>

            {/* Consent Box */}
            <div className="bg-gray-50 p-4 rounded-xl mb-4">
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={(e) =>
                    setForm({ ...form, consent: e.target.checked })
                  }
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">I consent to AI-powered fraud monitoring</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your data will be analyzed using generative AI models to detect
                    fraudulent activities. You'll receive explanations for flagged
                    transactions.
                  </p>
                </div>
              </label>
            </div>

            {/* Warning box */}
            <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 p-4 rounded-xl text-sm mb-4">
              <strong>Note:</strong> This is a demo environment. Real systems must comply with
              data protection regulations and should never collect or expose PII
              without proper safeguards.
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-teal-400 hover:bg-teal-500 text-white py-3 rounded-lg transition"
            >
              Complete Setup
            </button>

            <button
              onClick={back}
              className="w-full mt-3 text-teal-600 underline text-sm"
            >
              Back
            </button>
          </>
        )}
      </div>

      <p className="text-white/70 text-xs mt-6">
        Secured by AI-powered fraud detection
      </p>
    </div>
  );
}
