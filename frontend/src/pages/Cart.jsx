import React from "react";
import api from "../api/axios"
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/productSlice";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { cart } = useSelector((store) => store.product);

  const updateQuantity = async (productId, type) => {
    try {
      const res = await api.put(
        "/cart/update",
        { productId, type },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) dispatch(setCart(res.data.cart));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await api.delete(
        "/cart/remove",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          data: { productId },
        }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const subTotal = cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const tax = Math.round(subTotal * 0.05);
  const shippingCharge = subTotal >= 300 || subTotal === 0 ? 0 : 50;
  const totalPrice = subTotal + tax + shippingCharge;

  /* ── Empty State ── */
  if (!cart?.items?.length) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-6">
          <ShoppingCart size={36} className="text-pink-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-gray-400 text-[15px] mb-8 max-w-xs">
          Looks like you haven't added anything yet. Start shopping!
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition duration-200 shadow-sm hover:shadow-md"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-400 text-sm mt-1">{cart.items.length} item{cart.items.length > 1 ? "s" : ""} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* ── Cart Items ── */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex justify-between items-center gap-4 shadow-sm hover:shadow-md transition duration-200"
            >
              {/* Left: image + info */}
              <div className="flex gap-4 items-center">
                <img
                  src={item.productId?.productImg?.[0]?.url}
                  alt={item.productId?.productName}
                  onClick={() => navigate(`/products/${item.productId._id}`)}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover cursor-pointer hover:opacity-90 transition shrink-0"
                />

                <div className="space-y-2 min-w-0">
                  <h2 className="font-semibold text-gray-800 text-[15px] leading-snug line-clamp-2">
                    {item.productId?.productName}
                  </h2>

                  <p className="text-pink-600 font-bold text-[15px]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId._id, "decrease")}
                      className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 font-bold hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition duration-150 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-gray-800 text-[15px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, "increase")}
                      className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 font-bold hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50 transition duration-150 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: total + remove */}
              <div className="flex flex-col items-end gap-3 shrink-0">
                <p className="font-extrabold text-gray-900 text-[17px]">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 border border-red-100 flex items-center justify-center transition duration-150 group"
                >
                  <Trash2 size={15} className="text-red-400 group-hover:text-red-600 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">

          <h2 className="text-lg font-extrabold text-gray-900 mb-6 pb-4 border-b border-gray-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between text-gray-500">
              <span>Total Items</span>
              <span className="font-semibold text-gray-700">{cart.items.length}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-700">₹{subTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (5%)</span>
              <span className="font-semibold text-gray-700">₹{tax}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className={`font-semibold ${shippingCharge === 0 ? "text-green-500" : "text-gray-700"}`}>
                {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
              </span>
            </div>
          </div>

          {/* Free shipping nudge */}
          {subTotal < 300 && subTotal > 0 && (
            <div className="mt-4 bg-pink-50 border border-pink-100 rounded-xl px-3 py-2.5 text-xs text-pink-600 font-medium">
              🛍️ Add ₹{300 - subTotal} more for free shipping!
            </div>
          )}

          <hr className="my-5 border-gray-100" />

          <div className="flex justify-between text-[16px] font-extrabold text-gray-900 mb-6">
            <span>Total</span>
            <span className="text-pink-600">₹{totalPrice.toLocaleString("en-IN")}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-[15px]"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full mt-3 text-gray-400 hover:text-pink-600 text-sm font-medium transition duration-200"
          >
            ← Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;