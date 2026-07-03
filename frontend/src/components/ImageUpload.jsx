import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { X, ImagePlus } from 'lucide-react';

const ImageUpload = ({ productData, setProductData }) => {

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((prev) => {
      const updateImages = prev.productImg.filter((_, i) => i !== index);
      return { ...prev, productImg: updateImages };
    });
  };

  return (
    <div className="grid gap-3">
      <Label className="text-sm font-semibold text-gray-700">Product Images</Label>

      {/* Upload Button */}
      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-pink-200 hover:border-pink-400 bg-pink-50/50 hover:bg-pink-50 text-pink-500 hover:text-pink-600 font-semibold text-sm py-4 rounded-xl cursor-pointer transition-all duration-200"
      >
        <ImagePlus size={18} />
        Click to upload images
      </label>

      {/* Image Preview Grid */}
      {productData.productImg.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
          {productData.productImg.map((file, idx) => {
            let preview;

            if (file instanceof File) {
              preview = URL.createObjectURL(file);
            } else if (typeof file === 'string') {
              preview = file;
            } else if (file?.url) {
              preview = file.url;
            } else {
              return null;
            }

            return (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden border-2 border-gray-100 hover:border-pink-300 shadow-sm hover:shadow-md transition-all duration-200 aspect-square bg-gray-50"
              >
                <img
                  src={preview}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 pointer-events-none rounded-xl" />

                {/* Remove button */}
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 text-gray-600 hover:text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <X size={13} />
                </button>

                {/* Image index badge */}
                <span className="absolute bottom-2 left-2 bg-black/40 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition duration-200">
                  {idx + 1}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;