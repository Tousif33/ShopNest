import React from "react";

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  setPriceRange,
  allProducts,
  priceRange,
}) => {
  const uniqueCategory = ["All", ...new Set(allProducts.map((p) => p.category))];
  const uniqueBrand = ["All", ...new Set(allProducts.map((p) => p.brand))];

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mt-10 h-max gap-6">

      {/* Search */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-400"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Category */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
          Category
        </label>
        <div className="flex flex-col gap-1.5">
          {uniqueCategory.map((item) => (
            <label
              key={item}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-150
                ${category === item
                  ? "bg-pink-50 text-pink-600 border border-pink-200"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border border-transparent"
                }`}
            >
              <input
                type="radio"
                name="category"
                checked={category === item}
                onChange={() => setCategory(item)}
                className="accent-pink-500 w-3.5 h-3.5"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Brand */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
          Brand
        </label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none bg-white text-gray-700 transition duration-200 cursor-pointer"
        >
          {uniqueBrand.map((item) => (
            <option key={item} value={item}>
              {item.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <hr className="border-gray-100" />

      {/* Price Range */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
          Price Range
        </label>

        {/* Price display pill */}
        <div className="flex items-center justify-between bg-pink-50 border border-pink-100 rounded-xl px-3 py-2 mb-4">
          <span className="text-sm font-semibold text-pink-600">₹{priceRange[0].toLocaleString()}</span>
          <span className="text-gray-300 text-xs">—</span>
          <span className="text-sm font-semibold text-pink-600">₹{priceRange[1].toLocaleString()}</span>
        </div>

        {/* Range sliders */}
        <div className="space-y-2 mb-4">
          <input
            type="range"
            min={0}
            max={999999}
            step={100}
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full accent-pink-500 cursor-pointer"
          />
          <input
            type="range"
            min={0}
            max={999999}
            step={100}
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        {/* Min / Max number inputs */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            min={0}
            onChange={handleMinChange}
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-center transition duration-200"
          />
          <span className="text-gray-300 text-sm shrink-0">—</span>
          <input
            type="number"
            value={priceRange[1]}
            min={0}
            onChange={handleMaxChange}
            className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none text-center transition duration-200"
          />
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold transition duration-200 shadow-sm hover:shadow-md"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default FilterSidebar;