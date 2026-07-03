import React, { useEffect, useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import api from "../api/axios"
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { SlidersHorizontal } from "lucide-react";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortorder] = useState("");
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/product/getallproducts");
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;
    let filtered = [...allProducts];
    if (search.trim() !== "") filtered = filtered.filter(p => p.productName?.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") filtered = filtered.filter(p => p.category === category);
    if (brand !== "All") filtered = filtered.filter(p => p.brand === brand);
    filtered = filtered.filter(p => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]);
    if (sortOrder === "lowtoHigh") filtered.sort((a, b) => a.productPrice - b.productPrice);
    else if (sortOrder === "hightoLow") filtered.sort((a, b) => b.productPrice - a.productPrice);
    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => { getAllProducts(); }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
            Our Collection
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            All Products
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {products?.length || 0} product{products?.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex gap-7 items-start">

          {/* Sidebar */}
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            allProducts={allProducts}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* Main */}
          <div className="flex flex-col flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <SlidersHorizontal size={15} />
                <span className="text-[13px] font-medium">
                  Showing <span className="text-gray-700 font-bold">{products?.length || 0}</span> results
                </span>
              </div>

              <Select onValueChange={(value) => setSortorder(value)}>
                <SelectTrigger className="w-[180px] text-sm rounded-xl border-gray-200 focus:ring-pink-100 focus:border-pink-400 h-9">
                  <SelectValue placeholder="Sort by Price" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectGroup>
                    <SelectItem value="lowtoHigh">Price: Low to High</SelectItem>
                    <SelectItem value="hightoLow">Price: High to Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Empty state */}
            {!loading && products?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-4">
                  <SlidersHorizontal size={24} className="text-pink-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">No products found</h2>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search term</p>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {loading
                ? [...Array(10)].map((_, i) => (
                    <ProductCard key={i} loading={true} />
                  ))
                : products?.filter(Boolean).map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      loading={false}
                    />
                  ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;