import React, { useState } from "react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Edit, Search, Trash2, PackageSearch } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import api from "../../api/axios"
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const inputClass = "w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800 bg-white";
const labelClass = "text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1 block";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  let filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOrder === "lowtohigh") filteredProducts = [...filteredProducts].sort((a, b) => a.productPrice - b.productPrice);
  if (sortOrder === "hightolow") filteredProducts = [...filteredProducts].sort((a, b) => b.productPrice - a.productPrice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlesave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category);
    formData.append("brand", editProduct.brand);
    formData.append("stock", editProduct.stock);

    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);
    formData.append("existingImages", JSON.stringify(existingImages));
    editProduct.productImg.filter((img) => img instanceof File).forEach((file) => formData.append("files", file));

    try {
      const res = await api.put(
        `/product/update/${editProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success("Product Updated Successfully");
        const updatedProducts = products.map((p) => p._id === editProduct._id ? { ...p, ...editProduct } : p);
        dispatch(setProducts(updatedProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const remaingProducts = products.filter((product) => product._id !== productId);
      const res = await api.delete(
        `/product/delete/${productId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remaingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-8 px-2 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
          Admin Panel
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
          Products
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {products.length} product{products.length !== 1 ? "s" : ""} in your store
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, brand, category..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 bg-white placeholder-gray-300 text-gray-800"
          />
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-full sm:w-[200px] text-sm rounded-xl border-gray-200 h-[42px]">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
            <SelectItem value="hightolow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mb-4">
            <PackageSearch size={24} className="text-pink-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">No products found</h2>
          <p className="text-gray-400 text-sm">Try adjusting your search or sort filter</p>
        </div>
      )}

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {filteredProducts?.filter(Boolean).map((product, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-200 px-4 py-3 flex items-center justify-between gap-4"
          >
            {/* Left: image + info */}
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={product.productImg[0].url || ""}
                alt=""
                className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0"
              />
              <div className="min-w-0">
                <h2 className="font-bold text-gray-800 text-[14px] truncate max-w-[240px] sm:max-w-sm">
                  {product.productName}
                </h2>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                    {product.brand}
                  </span>
                  <span className="text-[11px] bg-pink-50 text-pink-500 border border-pink-100 px-2 py-0.5 rounded-full font-medium">
                    {product.category}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Stock: <span className="font-semibold text-gray-600">{product.stock}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <p className="font-extrabold text-pink-600 text-[16px] shrink-0 hidden sm:block">
              ₹{product.productPrice?.toLocaleString("en-IN")}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Edit Dialog */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => { setOpen(true); setEditProduct(product); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600 hover:bg-green-50 text-[13px] font-semibold transition duration-200"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[580px] max-h-[85vh] overflow-y-auto rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-extrabold text-gray-900">Edit Product</DialogTitle>
                    <DialogDescription className="text-gray-400 text-sm">
                      Make changes to your product here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 py-2">
                    <div>
                      <label className={labelClass}>Product Name</label>
                      <input type="text" name="productName" value={editProduct?.productName || ""} onChange={handleChange} className={inputClass} />
                    </div>

                    <div>
                      <label className={labelClass}>Product Price</label>
                      <input type="number" name="productPrice" value={editProduct?.productPrice || ""} onChange={handleChange} className={inputClass} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Brand</label>
                        <input type="text" name="brand" value={editProduct?.brand || ""} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Category</label>
                        <input type="text" name="category" value={editProduct?.category || ""} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        name="productDesc"
                        value={editProduct?.productDesc || ""}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {editProduct && (
                      <ImageUpload productData={editProduct} setProductData={setEditProduct} />
                    )}
                  </div>

                  <DialogFooter className="gap-2 pt-2">
                    <DialogClose asChild>
                      <button className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition duration-200">
                        Cancel
                      </button>
                    </DialogClose>
                    <button
                      onClick={handlesave}
                      className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold transition duration-200 shadow-sm hover:shadow-md"
                    >
                      Save Changes
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Alert */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50 text-[13px] font-semibold transition duration-200">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-extrabold text-gray-900">
                      Delete this product?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400 text-sm">
                      This action cannot be undone. The product will be permanently removed from your store.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="rounded-xl border-gray-200 text-gray-600 text-sm font-semibold">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteProductHandler(product._id)}
                      className="rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-sm"
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;