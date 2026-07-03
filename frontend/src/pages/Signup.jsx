import React, { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600" />

          <div className="px-8 py-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-pink-200">
                <UserPlus size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900">Create an account</h1>
              <p className="text-gray-400 text-sm mt-1">Join ShopNest and start shopping</p>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="flex flex-col gap-5">

              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-[13px] font-semibold text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-[13px] font-semibold text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[13px] font-semibold text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-[13px] font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-11 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={() => setshowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition duration-200"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Terms note */}
              <p className="text-[12px] text-gray-400 -mt-1">
                By signing up, you agree to our{" "}
                <span className="text-pink-500 cursor-pointer hover:underline">Terms of Service</span>
                {" "}and{" "}
                <span className="text-pink-500 cursor-pointer hover:underline">Privacy Policy</span>.
              </p>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-[15px] flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1 border-gray-100" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <hr className="flex-1 border-gray-100" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-600 hover:text-pink-700 font-bold transition duration-200"
              >
                Sign in →
              </Link>
            </p>
          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-xs text-gray-400 mt-5 flex items-center justify-center gap-1">
          🔒 Your data is safe and encrypted
        </p>

      </div>
    </div>
  );
};

export default Signup;