import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { Loader2 } from "lucide-react";

const AddProduct = () => {
  const { products } = useSelector((store) => store.product);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    productDesc: "",
    productPrice: 0,
    category: "",
    brand: "",
    stock: "",
    productImg: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productDesc", productData.productDesc);
    formData.append("productPrice", productData.productPrice);
    formData.append("category", productData.category);
    formData.append("brand", productData.brand);
    formData.append("stock", productData.stock);

    if (productData.productImg.length === 0) {
      toast.error("Please select atleast one image");
      return;
    }

    productData.productImg.forEach((img) => {
      formData.append("files", img);
    });

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);

        setProductData({
          productName: "",
          productDesc: "",
          productPrice: 0,
          category: "",
          brand: "",
          stock: "",
          productImg: [],
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>

          <CardDescription>Enter product details below</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Product Name</Label>

            <Input
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              placeholder="Ex: iPhone"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Price</Label>

            <Input
              type="number"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Brand</Label>

              <Input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>

              <Input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                value={productData.stock}
                onChange={handleChange}
                placeholder="Enter available stock"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={4}
              name="productDesc"
              value={productData.productDesc}
              onChange={handleChange}
              required
            />
          </div>

          <ImageUpload
            productData={productData}
            setProductData={setProductData}
          />

          <CardFooter className="flex-col gap-2">
            <Button
              disabled={loading}
              onClick={submitHandler}
              className="w-full bg-pink-500 cursor-pointer"
              type="submit"
            >
              {loading ? (
                <span className="flex gap-1 items-center">
                  <Loader2 className="animate-spin" />
                  Please wait
                </span>
              ) : (
                "Add Product"
              )}
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
