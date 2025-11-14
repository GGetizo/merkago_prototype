"use client";

import Image from "next/image";
import { X, Upload } from "lucide-react";
import { useState } from "react";

type AddProductModalProps = {
  showModal: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    image: string;
    category: string;
    stock: string;
    price: string;
  }) => void;
};

export default function AddProductModal({ showModal, onClose, onAddProduct }: AddProductModalProps) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    category: "Meat",
    stock: "",
    price: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const categories = ["Meat", "Fresh Produce", "Chips", "Frozen Goods", "Clothing"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name.trim()) {
      setValidationError("Please enter a product name");
      return;
    }
    if (!newProduct.stock.trim()) {
      setValidationError("Please enter stock quantity");
      return;
    }
    if (!newProduct.price.trim()) {
      setValidationError("Please enter product price");
      return;
    }

    // All fields valid, add product
    onAddProduct(newProduct);
    
    // Reset form
    setNewProduct({ name: "", image: "", category: "Meat", stock: "", price: "" });
    setImagePreview("");
    setValidationError("");
  };

  const handleCancel = () => {
    setNewProduct({ name: "", image: "", category: "Meat", stock: "", price: "" });
    setImagePreview("");
    setValidationError("");
    onClose();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl max-h-[70vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add New Product</h3>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{validationError}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={64}
                  height={64}
                  className="rounded border"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                  <Upload size={24} className="text-gray-400" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#7FC354] file:text-white hover:file:bg-[#6fa844] file:cursor-pointer"
              />
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
              placeholder="Enter product name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
              placeholder="e.g., 50 kg"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₱) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
              placeholder="e.g., 180/kg"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 text-sm font-medium text-white bg-[#7FC354] rounded-lg hover:bg-[#6fa844] transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}