import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images = [] }) => {
  const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

  return (
    <div className="flex gap-4">

      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImg(img.url)}
            className={`w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0
              ${mainImg === img.url
                ? "border-pink-500 shadow-md shadow-pink-100 scale-105"
                : "border-gray-100 hover:border-pink-300 hover:scale-105"
              }`}
          >
            <img
              src={img.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 border-2 border-gray-100 hover:border-pink-100 rounded-2xl shadow-sm bg-gray-50/50 p-4 flex items-center justify-center transition duration-300 min-h-[350px]">
        <Zoom>
          <img
            src={mainImg}
            alt=""
            className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] object-contain transition-all duration-300"
          />
        </Zoom>
      </div>

    </div>
  );
};

export default ProductImg;
