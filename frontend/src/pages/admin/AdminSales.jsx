import React, { useEffect, useState } from "react";
import axios from "axios";
import { IndianRupee, ShoppingCart, Users, Package, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

const statCards = [
  {
    key: "totalSales",
    label: "Total Sales",
    icon: IndianRupee,
    prefix: "₹",
    iconBg: "bg-green-50 border-green-100",
    iconColor: "text-green-600",
    valuColor: "text-green-600",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: ShoppingCart,
    prefix: "",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
    valuColor: "text-blue-600",
  },
  {
    key: "totalUsers",
    label: "Total Users",
    icon: Users,
    prefix: "",
    iconBg: "bg-violet-50 border-violet-100",
    iconColor: "text-violet-600",
    valuColor: "text-violet-600",
  },
  {
    key: "totalProducts",
    label: "Total Products",
    icon: Package,
    prefix: "",
    iconBg: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    valuColor: "text-amber-600",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-md px-4 py-3">
        <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
        <p className="text-[16px] font-extrabold text-pink-600">₹{payload[0].value?.toLocaleString("en-IN")}</p>
      </div>
    );
  }
  return null;
};

const AdminSales = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    chartData: [],
  });

  const fetchStats = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/order/sales`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        setStats({
          totalSales: res.data.totalSales,
          totalOrders: res.data.totalOrders,
          totalUsers: res.data.totalUsers,
          totalProducts: res.data.totalProducts,
          chartData: res.data.chartData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <div className="py-8 px-2 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          Admin Panel
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Your store's performance at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map(({ key, label, icon: Icon, prefix, iconBg, iconColor, valuColor }) => (
          <div
            key={key}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-200 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400">
                {label}
              </p>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${iconBg}`}>
                <Icon size={16} className={iconColor} />
              </div>
            </div>
            <p className={`text-3xl font-extrabold ${valuColor}`}>
              {prefix}{typeof stats[key] === "number" && key === "totalSales"
                ? stats[key].toLocaleString("en-IN")
                : stats[key]}
            </p>
            {/* Subtle label below value */}
            <p className="text-[11px] text-gray-400 mt-1 font-medium">Updated just now</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[16px] font-extrabold text-gray-900">Monthly Sales</h2>
            <p className="text-gray-400 text-xs mt-0.5">Revenue trend over the year</p>
          </div>
          <div className="flex items-center gap-2 bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-xl">
            <TrendingUp size={14} className="text-pink-500" />
            <span className="text-xs font-bold text-pink-500">Sales</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={stats.chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: "#ec4899", r: 4, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#ec4899", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminSales;