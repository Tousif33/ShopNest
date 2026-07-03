import { LayoutDashboard, PackagePlus, PackageSearch, Users } from 'lucide-react';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard/sales', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/dashboard/add-product', icon: PackagePlus, label: 'Add Product' },
  { to: '/dashboard/products', icon: PackageSearch, label: 'Products' },
  { to: '/dashboard/users', icon: Users, label: 'Users' },
  { to: '/dashboard/orders', icon: FaRegEdit, label: 'Orders' },
];

const Sidebar = () => {
  return (
    <div className="hidden md:flex fixed flex-col w-[260px] h-screen bg-white border-r border-gray-100 shadow-sm z-40">

      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-sm">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-800 leading-none">ShopNest</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-3">
          Main Menu
        </p>

        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 group
              ${isActive
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200'
                : 'text-gray-500 hover:bg-pink-50 hover:text-pink-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`p-1.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-white/20'
                    : 'bg-gray-100 group-hover:bg-pink-100'
                  }`}>
                  <Icon size={15} />
                </span>
                <span>{label}</span>

                {/* Active indicator dot */}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Admin badge */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-pink-50 border border-pink-100">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            A
          </div>
          <div>
            <p className="text-[13px] font-semibold text-gray-800 leading-none">Admin</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Administrator</p>
          </div>
          <span className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-200" />
        </div>
      </div>

    </div>
  );
};

export default Sidebar;