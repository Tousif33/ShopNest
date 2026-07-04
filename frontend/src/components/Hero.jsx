import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/new_hero.webp"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Blur */}
      <div className="absolute -top-40 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 md:py-24 grid lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* Left */}
        <div className="space-y-8 text-center lg:text-left">

          <div className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
            ✨ Trusted by Thousands of Shoppers
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
            Discover
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              {" "}Premium Products{" "}
            </span>
            At Amazing Prices
          </h1>

          <p className="text-gray-600 text-lg leading-8 max-w-xl mx-auto lg:mx-0">
            Shop the latest fashion, electronics, gadgets and lifestyle
            essentials with secure payments, lightning-fast delivery,
            and unbeatable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <Link to="/products">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl duration-300">
                Shop Now →
              </button>
            </Link>

            <Link to="/products">
              <button className="px-8 py-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 font-semibold transition">
                Explore Products
              </button>
            </Link>

          </div>

          <div className="flex justify-center lg:justify-start gap-10 pt-4">

            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-gray-500">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">5K+</h2>
              <p className="text-gray-500">Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-gray-500">Support</p>
            </div>

          </div>
        </div>

        {/* Right */}

        <div className="flex justify-center">

          <img
            src={hero}
            alt="shopping"
            className="w-full max-w-xl rounded-3xl shadow-2xl hover:scale-105 duration-500"
          />

        </div>
      </div>
    </section>
  );
};

export default Hero;