import React, { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import api from "../api/axios"
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { ShoppingBag } from "lucide-react";
import logo from "../assets/shopNest.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await api.post(
        "/user/logout",
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        setOpen(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };
 
  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `relative text-[15px] font-medium transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-pink-500 after:transition-all after:duration-300 ${
      isActive(path) ? "text-pink-600 after:w-full" : "text-gray-600 hover:text-pink-600"
    }`;

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 sm:h-18 px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="ShopNest"
            className="w-[110px] sm:w-[130px] object-contain hover:opacity-90 transition duration-200"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li><Link to="/" className={navLinkClass("/")}>Home</Link></li>
            <li><Link to="/products" className={navLinkClass("/products")}>Products</Link></li>

            {user && (
              <>
                <li>
                  <Link to={`/profile/${user._id}`} className={navLinkClass(`/profile/${user._id}`)}>
                    Hey, {user.firstName} 👋
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link to="/dashboard/sales" className={navLinkClass("/dashboard/sales")}>
                      Dashboard
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200" />

          {/* My Orders */}
          <Link
            to="/my-orders"
            className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors duration-200 ${
              isActive("/my-orders") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
            }`}
          >
            <ShoppingBag size={17} />
            My Orders
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-pink-50 transition duration-200 group"
          >
            <FaShoppingCart className="text-xl text-gray-600 group-hover:text-pink-600 transition" />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {cart.items.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <button
              onClick={logoutHandler}
              className="text-[14px] font-semibold text-red-500 hover:text-red-600 border border-red-200 hover:border-red-400 px-4 py-1.5 rounded-full transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="text-[14px] font-semibold bg-pink-600 hover:bg-pink-700 text-white px-5 py-1.5 rounded-full transition duration-200">
                Login
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile: cart badge + hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <Link to="/cart" className="relative p-2">
            <FaShoppingCart className="text-xl text-gray-700" />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-1">
                {cart.items.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {open ? (
              <FaTimes className="text-xl text-gray-700" />
            ) : (
              <FaBars className="text-xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 pt-4 pb-6 shadow-lg space-y-1 animate-in slide-in-from-top duration-200">

          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/my-orders", label: "My Orders" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg text-[15px] font-medium transition ${
                isActive(to)
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-pink-600"
              }`}
            >
              {label}
            </Link>
          ))}

          {user && (
            <>
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setOpen(false)}
                className="flex items-center w-full px-3 py-2.5 rounded-lg text-[15px] font-medium text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition"
              >
                Hey, {user.firstName} 👋
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/dashboard/sales"
                  onClick={() => setOpen(false)}
                  className="flex items-center w-full px-3 py-2.5 rounded-lg text-[15px] font-medium text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition"
                >
                  Dashboard
                </Link>
              )}
            </>
          )}

          <div className="pt-3 border-t border-gray-100 mt-2">
            {user ? (
              <button
                onClick={logoutHandler}
                className="w-full py-2.5 rounded-lg text-[15px] font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full py-2.5 rounded-lg text-[15px] font-semibold bg-pink-600 hover:bg-pink-700 text-white transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;