import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mail, CheckCircle, XCircle } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/verify",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setStatus("success");
        setTimeout(() => { navigate("/login"); }, 2000);
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  useEffect(() => { verifyEmail(); }, [token]);

  const states = {
    verifying: {
      icon: (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200 mx-auto mb-6">
          <Mail size={34} className="text-white animate-pulse" />
        </div>
      ),
      pill: { text: "Please wait", style: "bg-pink-50 text-pink-500 border-pink-100" },
      heading: "Verifying your email...",
      sub: "We're confirming your verification link. This will only take a moment.",
    },
    success: {
      icon: (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-200 mx-auto mb-6">
          <CheckCircle size={34} className="text-white" />
        </div>
      ),
      pill: { text: "Verified!", style: "bg-green-50 text-green-600 border-green-200" },
      heading: "Email verified successfully",
      sub: "Your account is now active. Redirecting you to login...",
    },
    error: {
      icon: (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center shadow-lg shadow-red-200 mx-auto mb-6">
          <XCircle size={34} className="text-white" />
        </div>
      ),
      pill: { text: "Failed", style: "bg-red-50 text-red-500 border-red-200" },
      heading: "Verification failed",
      sub: "The link may have expired or is invalid. Please try signing up again.",
    },
  };

  const current = states[status];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Top accent bar */}
          <div className={`h-1.5 w-full ${
            status === "success"
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : status === "error"
              ? "bg-gradient-to-r from-red-400 to-rose-500"
              : "bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600"
          }`} />

          <div className="px-8 py-10 text-center">

            {/* Icon */}
            {current.icon}

            {/* Status pill */}
            <span className={`inline-block text-xs font-bold uppercase tracking-widest border px-3 py-1 rounded-full mb-4 ${current.pill.style}`}>
              {current.pill.text}
            </span>

            {/* Heading */}
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
              {current.heading}
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 text-[14px] leading-7 max-w-xs mx-auto">
              {current.sub}
            </p>

            {/* Verifying spinner */}
            {status === "verifying" && (
              <div className="mt-6 flex justify-center">
                <span className="w-6 h-6 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
              </div>
            )}

            {/* Success redirect note */}
            {status === "success" && (
              <div className="mt-6 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <p className="text-[12px] text-green-600 font-medium">
                  🚀 Redirecting to login in 2 seconds...
                </p>
              </div>
            )}

            {/* Error retry button */}
            {status === "error" && (
              <button
                onClick={() => navigate("/signup")}
                className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2.5 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-sm"
              >
                Back to Signup
              </button>
            )}

          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-xs text-gray-400 mt-5">
          🔒 Your data is safe and encrypted
        </p>

      </div>
    </div>
  );
};

export default VerifyEmail;