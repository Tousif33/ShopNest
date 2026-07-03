import React, { useState } from "react";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "@/redux/productSlice";
import api from "../api/axios"

const ProductCard = ({ product = {}, loading = false }) => {
  const { _id, productName, productPrice, productImg } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [adding, setAdding] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const addToCart = async (productId) => {
    if (!accessToken) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    try {
      setAdding(true);
      const res = await api.post(
        "/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product added to cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <Skeleton className="w-full aspect-square" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-pink-100 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={productImg?.[0]?.url}
          alt={productName}
          onClick={() => navigate(`/products/${product._id}`)}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-108 transition-transform duration-500"
        />

        {/* Dim overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition duration-300 pointer-events-none" />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[11px] px-2.5 py-1 rounded-full font-bold tracking-wide shadow-sm">
          20% OFF
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition duration-200
            ${wishlisted
              ? "bg-pink-50 border border-pink-200"
              : "bg-white hover:bg-pink-50 border border-transparent hover:border-pink-200"
            }`}
        >
          <Heart
            size={16}
            className={wishlisted ? "fill-pink-500 text-pink-500" : "text-gray-400"}
          />
        </button>

        {/* Quick View — appears on hover */}
        <button
          onClick={() => navigate(`/products/${product._id}`)}
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md border border-transparent hover:border-pink-200 hover:bg-pink-50 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        >
          <Eye size={16} className="text-gray-500 hover:text-pink-500 transition" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">

        {/* Product Name */}
        <h2 className="font-semibold text-gray-800 text-[15px] leading-snug line-clamp-2 h-[42px]">
          {productName}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
          ))}
          <Star size={14} color="#f59e0b" />
          <span className="text-xs text-gray-400 ml-1 font-medium">4.0</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-bold text-pink-600">
            ₹{productPrice}
          </span>
          <span className="text-sm line-through text-gray-300 font-medium">
            ₹{Math.round(productPrice * 1.2)}
          </span>
        </div>

        {/* Free Delivery */}
        <p className="text-green-600 text-xs font-semibold tracking-wide">
          🚚 Free Delivery
        </p>

        {/* Buttons — pushed to bottom */}
        <div className="flex flex-col gap-2 mt-auto pt-1">
          <button
            disabled={adding}
            onClick={() => addToCart(_id)}
            className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white text-[14px] font-semibold py-2.5 rounded-xl transition duration-200 shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={16} />
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="w-full text-[14px] font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 transition duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;