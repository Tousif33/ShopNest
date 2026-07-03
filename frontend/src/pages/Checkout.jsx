import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MapPin, Mail, Phone, Home, Building, Hash } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  const subtotal = cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const tax = Math.round(subtotal * 0.05);
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const addressFields = [
    { icon: Mail,     label: "Email",   value: user?.email },
    { icon: Phone,    label: "Phone",   value: user?.address?.phoneno },
    { icon: Home,     label: "Address", value: user?.address?.street },
    { icon: Building, label: "City",    value: user?.address?.city },
    { icon: Hash,     label: "Pincode", value: user?.address?.pincode },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12">

      {/* Page Header */}
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          Final Step
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
          Checkout
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Review your order before placing it
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* ── Delivery Address ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center">
              <MapPin size={15} className="text-pink-500" />
            </div>
            <h2 className="text-[16px] font-bold text-gray-800">Delivery Address</h2>
          </div>

          {/* Name pill */}
          <div className="flex items-center gap-3 mb-5 bg-pink-50 border border-pink-100 rounded-xl px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.firstName?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-[15px] leading-none">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-pink-500 mt-0.5 font-medium">Delivering to</p>
            </div>
          </div>

          {/* Address fields */}
          <div className="space-y-3">
            {addressFields.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={13} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
                  <p className="text-[14px] text-gray-700 font-medium mt-0.5">{value || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Order Summary ── */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h2 className="text-[16px] font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
            Order Summary
          </h2>

          {/* Items list */}
          <div className="space-y-3 mb-5">
            {cart.items.map((item) => (
              <div key={item._id} className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.productId?.productImg?.[0]?.url}
                    alt={item.productId?.productName}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0"
                  />
                  <span className="text-[13px] text-gray-600 font-medium line-clamp-1">
                    {item.productId.productName}
                    <span className="text-gray-400"> × {item.quantity}</span>
                  </span>
                </div>
                <span className="text-[13px] font-bold text-gray-800 shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Price breakdown */}
          <div className="space-y-2.5 text-[14px]">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-700">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax (5%)</span>
              <span className="font-semibold text-gray-700">₹{tax}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className={`font-semibold ${shipping === 0 ? "text-green-500" : "text-gray-700"}`}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-gray-900 text-[16px]">Total</span>
            <span className="font-extrabold text-pink-600 text-xl">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/payment")}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-[15px]"
          >
            Continue to Payment →
          </button>

          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            🔒 Secure & encrypted checkout
          </p>
        </div>

      </div>
    </div>
  );
};

export default Checkout;