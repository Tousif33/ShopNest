import React, { useState } from "react";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(
        "/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600" />

          <div className="px-8 py-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-pink-200">
                <ShoppingBag size={22} className="text-white" />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900">Welcome back</h1>
              <p className="text-gray-400 text-sm mt-1">Sign in to your ShopNest account</p>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="flex flex-col gap-5">

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
                    placeholder="Enter your password"
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-[15px] flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1 border-gray-100" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <hr className="flex-1 border-gray-100" />
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-pink-600 hover:text-pink-700 font-bold transition duration-200"
              >
                Create one →
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

export default Login;