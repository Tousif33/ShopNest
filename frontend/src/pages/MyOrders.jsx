import React, { useEffect, useState } from "react";
import api from "../api/axios"
import { toast } from "sonner";
import { ShoppingBag, Package, Calendar, CreditCard, Hash } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => { getMyOrders(); }, []);

  const getMyOrders = async () => {
    try {
      const res = await api.get(
        "/order/my-orders",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = (status) => {
    if (status === "Paid") return { pill: "bg-green-50 text-green-600 border-green-200", dot: "bg-green-500" };
    if (status === "Pending") return { pill: "bg-yellow-50 text-yellow-600 border-yellow-200", dot: "bg-yellow-400" };
    return { pill: "bg-red-50 text-red-500 border-red-200", dot: "bg-red-500" };
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm font-medium">Fetching your orders...</p>
      </div>
    );
  }

  /* ── Empty State ── */
  if (orders.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-5">
          <ShoppingBag size={32} className="text-pink-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2">No Orders Yet</h1>
        <p className="text-gray-400 text-[15px] max-w-xs">
          Your placed orders will appear here once you make a purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Page Header */}
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          My Account
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">My Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} order{orders.length > 1 ? "s" : ""} placed</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => {
          const { pill, dot } = statusStyle(order.status);
          return (
            <div
              key={order._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition duration-200"
            >
              {/* Order Header */}
              <div className="bg-gray-50 border-b border-gray-100 px-5 sm:px-6 py-4 flex flex-wrap gap-5 justify-between items-center">

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Hash size={13} className="text-pink-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order ID</p>
                    <p className="text-[13px] font-semibold text-gray-700 font-mono mt-0.5 truncate max-w-[160px]">{order._id}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CreditCard size={13} className="text-violet-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Payment ID</p>
                    <p className="text-[13px] font-semibold text-gray-700 font-mono mt-0.5 truncate max-w-[140px]">{order.paymentId || "—"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar size={13} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</p>
                    <p className="text-[13px] font-semibold text-gray-700 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {/* Status pill */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  {order.status}
                </span>
              </div>

              {/* Products */}
              <div className="px-5 sm:px-6 py-5 space-y-5">
                {order.products.map((product, idx) => (
                  <div
                    key={product.productId._id}
                    className={`flex gap-4 items-start ${idx !== order.products.length - 1 ? "pb-5 border-b border-gray-100" : ""}`}
                  >
                    <img
                      src={product.productId?.productImg?.[0]?.url}
                      alt={product.productId?.productName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-gray-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h2 className="text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2">
                        {product.productId?.productName}
                      </h2>

                      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                        <p className="text-[13px] text-gray-400">
                          Qty: <span className="font-semibold text-gray-700">{product.quantity}</span>
                        </p>
                        <p className="text-[13px] text-gray-400">
                          Price: <span className="font-semibold text-pink-600">₹{product.productId?.productPrice?.toLocaleString("en-IN")}</span>
                        </p>
                        <p className="text-[13px] text-gray-400">
                          Total: <span className="font-bold text-green-600">₹{(product.productId?.productPrice * product.quantity)?.toLocaleString("en-IN")}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50 border-t border-gray-100 px-5 sm:px-6 py-4 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Package size={15} className="text-gray-400" />
                  <span className="text-[13px] text-gray-400 font-medium">
                    {order.products.length} item{order.products.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-gray-500 font-medium">Grand Total</span>
                  <span className="text-lg font-extrabold text-pink-600">
                    ₹{order.amount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;