import React, { useState } from "react";
import { Star, Truck, ShieldCheck } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setCart } from "@/redux/productSlice";

const ProductDesc = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const addToCart = async (productId) => {
    if (!accessToken) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/cart/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product added to cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="space-y-6">

      {/* Brand */}
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
        {product?.brand}
      </span>

      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
        {product?.productName}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>
        <span className="text-sm text-gray-400 font-medium">(4.8 Reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-4xl font-extrabold text-pink-600">
          ₹{product?.productPrice}
        </span>
        <span className="text-gray-300 line-through text-lg font-medium">
          ₹{Math.round(product?.productPrice * 1.2)}
        </span>
        <span className="bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
          20% OFF
        </span>
      </div>

      {/* Stock */}
      <div>
        {product?.stock > 0 ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            In Stock ({product.stock} left)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 bg-red-50 border border-red-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Out Of Stock
          </span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Description */}
      <div>
        <h2 className="font-semibold text-gray-800 text-base mb-2">Description</h2>
        <p className="text-gray-500 leading-7 text-[15px]">
          {product?.productDesc}
        </p>
      </div>

      {/* Quantity */}
      <div>
        <h2 className="font-semibold text-gray-800 text-base mb-3">Quantity</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 font-bold text-lg hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition duration-200 flex items-center justify-center"
          >
            −
          </button>
          <span className="text-lg font-bold text-gray-800 w-6 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 font-bold text-lg hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition duration-200 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-col sm:flex-row">
        <button
          onClick={() => addToCart(product._id)}
          className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-[15px]"
        >
          Add To Cart
        </button>
        <button
          className="flex-1 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-semibold py-3.5 rounded-xl transition duration-200 text-[15px]"
        >
          Buy Now
        </button>
      </div>

      {/* Delivery Info */}
      <div className="border border-gray-100 rounded-2xl p-5 space-y-4 bg-gray-50/60">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
            <Truck size={17} className="text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-[14px]">Free Delivery</p>
            <p className="text-xs text-gray-400 mt-0.5">Delivered within 2–4 business days</p>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <ShieldCheck size={17} className="text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-[14px]">Secure Payment</p>
            <p className="text-xs text-gray-400 mt-0.5">100% secure & encrypted transactions</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductDesc;