import Breadcrumbs from "@/components/Breadcrumbs";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();

  const { products } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === id);

  if (!product) {
    return <div className="pt-20 text-center">Loading...</div>;
  }

  return (
    <div className="pt-20 py-10 max-w-7xl mx-auto px-4">
      <Breadcrumbs product={product} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ProductImg images={product.productImg} />
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;