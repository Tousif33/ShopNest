import axios from "axios";
import { Edit, Eye, Search, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import userlogo from "../../assets/userlogo.png";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/all-user",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => { getAllUsers(); }, []);

  return (
    <div className="py-8 px-2">

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          Admin Panel
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
          User Management
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {users.length} registered user{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 bg-white placeholder-gray-300 text-gray-800"
        />
      </div>

      {/* Empty state */}
      {filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-4">
            <Users size={24} className="text-pink-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">No users found</h2>
          <p className="text-gray-400 text-sm">Try adjusting your search term</p>
        </div>
      )}

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 group"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={user?.profilePic || userlogo}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-100 group-hover:border-pink-300 transition duration-200"
                />
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white shadow-sm" />
              </div>

              <div className="min-w-0">
                <h2 className="text-[15px] font-bold text-gray-800 leading-snug truncate">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-400 text-xs mt-0.5 truncate">
                  {user?.email}
                </p>
                <span className={`inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border
                  ${user?.role === "admin"
                    ? "bg-violet-50 text-violet-600 border-violet-200"
                    : "bg-pink-50 text-pink-500 border-pink-200"}`}>
                  {user?.role || "user"}
                </span>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-100 my-4" />

            {/* Action Buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={() => navigate(`/dashboard/users/${user?._id}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50 text-[13px] font-semibold transition duration-200"
              >
                <Edit size={14} />
                Edit
              </button>

              <button
                onClick={() => navigate(`/dashboard/users/orders/${user._id}`)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-[13px] font-semibold transition duration-200 shadow-sm hover:shadow-md"
              >
                <Eye size={14} />
                Orders
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;