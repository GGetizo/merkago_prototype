"use client";

import Image from "next/image";
import { X, Upload, ChevronLeft } from "lucide-react";
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

type MainCategory = "Meat" | "Fresh Produce" | "Frozen Goods" | "Clothing & Toys" | "Others";
type SubCategory = string;

const mainCategories: { name: MainCategory; tagalog: string; icon: string }[] = [
  { name: "Meat", tagalog: "Karne", icon: "🥩" },
  { name: "Fresh Produce", tagalog: "Gulay/Prutas", icon: "🥬" },
  { name: "Frozen Goods", tagalog: "Prosen", icon: "🧊" },
  { name: "Clothing & Toys", tagalog: "Damit at Laruan", icon: "👕" },
  { name: "Others", tagalog: "Iba pa", icon: "📦" },
];

const subCategories: Record<MainCategory, string[]> = {
  "Meat": ["Baka", "Baboy", "Manok", "Isda"],
  "Fresh Produce": ["Prutas", "Gulay"],
  "Frozen Goods": [],
  "Clothing & Toys": ["Pantaas", "Pambaba", "Laruan", "Panloob", "Sapatos"],
  "Others": [],
};

const units = ["kg", "g", "pcs", "pack", "bundle", "dozen"];

export default function AddProductModal({ showModal, onClose, onAddProduct }: AddProductModalProps) {
  const [step, setStep] = useState<"main-category" | "sub-category" | "details">("main-category");
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>("");
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    category: "",
    stock: "",
    unit: "kg",
    price: "",
    priceUnit: "kg",
  });
  
  const [imagePreview, setImagePreview] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

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

  const handleMainCategorySelect = (category: MainCategory) => {
    setSelectedMainCategory(category);
    
    // If category has no subcategories, go directly to details
    if (subCategories[category].length === 0) {
      setNewProduct({ ...newProduct, category });
      setStep("details");
    } else {
      setStep("sub-category");
    }
  };

  const handleSubCategorySelect = (subCat: SubCategory) => {
    setSelectedSubCategory(subCat);
    setNewProduct({ ...newProduct, category: `${selectedMainCategory} - ${subCat}` });
    setStep("details");
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

    // Format stock and price with units
    const formattedProduct = {
      ...newProduct,
      stock: `${newProduct.stock} ${newProduct.unit}`,
      price: `₱${newProduct.price}/${newProduct.priceUnit}`,
    };

    onAddProduct(formattedProduct);
    handleReset();
  };

  const handleReset = () => {
    setStep("main-category");
    setSelectedMainCategory(null);
    setSelectedSubCategory("");
    setNewProduct({ name: "", image: "", category: "", stock: "", unit: "kg", price: "", priceUnit: "kg" });
    setImagePreview("");
    setValidationError("");
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  const handleBack = () => {
    if (step === "details") {
      if (selectedMainCategory && subCategories[selectedMainCategory].length > 0) {
        setStep("sub-category");
      } else {
        setStep("main-category");
      }
    } else if (step === "sub-category") {
      setStep("main-category");
    }
    setValidationError("");
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {step !== "main-category" && (
              <button onClick={handleBack} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ChevronLeft size={20} />
              </button>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {step === "main-category" && "Select Category"}
              {step === "sub-category" && "Select Type"}
              {step === "details" && "Product Details"}
            </h3>
          </div>
          <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <X size={20} />
          </button>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{validationError}</p>
          </div>
        )}

        {/* Step 1: Main Category Selection */}
        {step === "main-category" && (
          <div className="grid grid-cols-2 gap-3">
            {mainCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleMainCategorySelect(cat.name)}
                className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#7FC354] hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-center"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{cat.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{cat.tagalog}</div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Sub Category Selection */}
        {step === "sub-category" && selectedMainCategory && (
          <div className="space-y-2">
            {subCategories[selectedMainCategory].map((subCat) => (
              <button
                key={subCat}
                onClick={() => handleSubCategorySelect(subCat)}
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-[#7FC354] hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-left"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{subCat}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Product Details */}
        {step === "details" && (
          <div className="space-y-4">
            {/* Selected Category Display */}
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">Category</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{newProduct.category}</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Image
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={80}
                    height={80}
                    className="rounded border object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded border flex items-center justify-center">
                    <Upload size={24} className="text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-xs text-gray-600 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#7FC354] file:text-white hover:file:bg-[#6fa844] file:cursor-pointer"
                />
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
                placeholder="Enter product name"
              />
            </div>

            {/* Stock with Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
                  placeholder="Quantity"
                />
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7FC354]"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price with Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                  <span className="px-3 text-sm text-gray-500 dark:text-gray-400">₱</span>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="flex-1 px-2 py-2 text-sm dark:bg-gray-700 dark:text-gray-100 rounded-r-lg focus:outline-none border-0"
                    placeholder="Amount"
                  />
                </div>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg">
                  <span className="px-2 text-sm text-gray-500 dark:text-gray-400">/</span>
                  <select
                    value={newProduct.priceUnit}
                    onChange={(e) => setNewProduct({ ...newProduct, priceUnit: e.target.value })}
                    className="px-2 py-2 text-sm dark:bg-gray-700 dark:text-gray-100 rounded-r-lg focus:outline-none border-0"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Example: ₱{newProduct.price || "180"}/{newProduct.priceUnit}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
        )}
      </div>
    </div>
  );
}