import React, { useEffect, useState } from "react";
import api from "../api/axios"
import { Search, Package, ClipboardList } from "lucide-react";

const statusColor = (status) => {
  switch (status) {
    case "Delivered": return "bg-green-50 text-green-600 border-green-200";
    case "Shipped":   return "bg-blue-50 text-blue-600 border-blue-200";
    case "Processing":return "bg-violet-50 text-violet-600 border-violet-200";
    case "Cancelled": return "bg-red-50 text-red-500 border-red-200";
    default:          return "bg-yellow-50 text-yellow-600 border-yellow-200";
  }
};

const paymentColor = (status) => {
  if (status === "paid") return "bg-green-50 text-green-600 border-green-200";
  if (status === "failed") return "bg-red-50 text-red-500 border-red-200";
  return "bg-yellow-50 text-yellow-600 border-yellow-200";
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await api.get(
        "/order/all-orders",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getOrders(); }, []);

  const filteredOrders = orders.filter((order) => {
    const name = `${order.user?.firstName || ""} ${order.user?.lastName || ""}`.toLowerCase();
    const email = order.user?.email?.toLowerCase() || "";
    return name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
  });

  const updateStatus = async (orderId, orderStatus) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await api.put(
        `/order/update-status/${orderId}`,
        { orderStatus },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? res.data.order : order))
        );
      }
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
    }
  };

  return (
    <div className="py-8 px-2">

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          Admin Panel
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
          Orders Management
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {orders.length} total order{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          placeholder="Search by customer name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 bg-white placeholder-gray-300 text-gray-800"
        />
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-4">
            <ClipboardList size={24} className="text-pink-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">No orders found</h2>
          <p className="text-gray-400 text-sm">Try adjusting your search term</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 border-b border-gray-100 px-5 sm:px-6 py-4 flex flex-wrap justify-between items-start gap-4">

                {/* Customer Info */}
                <div>
                  <h2 className="text-[15px] font-bold text-gray-800">
                    {order.user?.firstName} {order.user?.lastName}
                  </h2>
                  <p className="text-gray-400 text-xs mt-0.5">{order.user?.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md truncate max-w-[180px]">
                      #{order._id}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

                {/* Right: payment + status + total */}
                <div className="flex flex-col items-end gap-2.5">

                  {/* Payment status */}
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${paymentColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>

                  {/* Order status dropdown */}
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`text-[12px] font-semibold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition duration-200 ${statusColor(order.orderStatus)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  {/* Grand total */}
                  <p className="text-xl font-extrabold text-pink-600">
                    ₹{order.amount?.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="px-5 sm:px-6 py-5 space-y-3">
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-3"
                  >
                    <img
                      src={item.productId?.productImg?.[0]?.url}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-[14px] truncate">
                        {item.productId?.productName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[12px] text-gray-400">
                          Qty: <span className="font-semibold text-gray-700">{item.quantity}</span>
                        </span>
                        <Package size={12} className="text-gray-300" />
                        <span className="text-[12px] text-pink-500 font-semibold">
                          ₹{item.productId?.productPrice?.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;