import React from "react";
import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Get free delivery on all orders above ₹499",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure payment with trusted gateways",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    desc: "Hassle-free 7 days return policy",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We are here to help you anytime",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
];

const Features = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full mb-3">
            Why Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Why Choose Us
          </h2>
          <p className="text-gray-400 text-[15px] max-w-md mx-auto">
            We provide the best services for our customers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl border ${item.border} ${item.bg} hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center overflow-hidden`}
              >
                {/* Subtle glow blob */}
                <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition duration-300`} />

                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-[16px] font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;