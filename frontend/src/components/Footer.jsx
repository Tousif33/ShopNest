import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logo from "../assets/shopNest.png";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          
          <p className="text-sm leading-7 text-gray-400 max-w-xs">
            Your one-stop shop for quality products at the best prices.
            Fast delivery and trusted service.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/10 transition duration-200"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-white font-semibold text-[15px] mb-5 relative after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-[2px] after:bg-pink-500">
            Shop
          </h3>
          <ul className="space-y-3 text-sm mt-3">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/cart", label: "Cart" },
              { to: "/my-orders", label: "My Orders" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-pink-400 hover:translate-x-1 inline-block transition-all duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold text-[15px] mb-5 relative after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-[2px] after:bg-pink-500">
            Company
          </h3>
          <ul className="space-y-3 text-sm mt-3">
            {["About Us", "Careers", "Blog", "Privacy Policy"].map((item) => (
              <li key={item}>
                <span className="cursor-pointer hover:text-pink-400 hover:translate-x-1 inline-block transition-all duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-[15px] mb-5 relative after:absolute after:left-0 after:-bottom-2 after:w-8 after:h-[2px] after:bg-pink-500">
            Contact
          </h3>
          <ul className="space-y-3 text-sm mt-3">
            <li className="flex items-start gap-2.5">
              <FaEnvelope className="mt-0.5 text-pink-500 shrink-0" />
              <span className="break-all">tousifraza7117@gmail.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhone className="text-pink-500 shrink-0" />
              <span>N/A</span>
            </li>
          </ul>

          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">Get deals in your inbox</p>
            <div className="flex rounded-lg overflow-hidden border border-gray-700 focus-within:border-pink-500 transition duration-200">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 w-full bg-gray-900 text-white text-sm outline-none placeholder-gray-500"
              />
              <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 text-white text-sm font-medium transition duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider + Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} ShopNest. All rights reserved.</span>
        <div className="flex gap-5">
          <span className="hover:text-pink-400 cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-pink-400 cursor-pointer transition">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;