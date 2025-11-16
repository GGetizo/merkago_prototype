"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Trash2, Plus, X, Pencil, Check, Upload, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import AddProductModal from "./addProductModal/addProductModal";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  stock: string;
  price: string;
};

const CategorySkeleton = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const ProductRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="text-xs">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
      </TableCell>
      <TableCell className="text-xs">
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell className="text-xs">
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="text-xs">
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell className="text-xs">
        <Skeleton className="h-4 w-16" />
      </TableCell>
      <TableCell className="text-xs">
        <Skeleton className="h-4 w-12" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2 justify-end">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-4" />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default function StockTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(
    [
      {
        id: 1,
        name: "Chicken Breast",
        image: "/imageAssets/meat.png",
        category: "Meat - Manok",
        stock: "50 kg",
        price: "₱180/kg",
      },
      {
        id: 2,
        name: "Pork Belly",
        image: "/imageAssets/meat.png",
        category: "Meat - Baboy",
        stock: "30 kg",
        price: "₱250/kg",
      },
      {
        id: 3,
        name: "Ground Beef",
        image: "/imageAssets/meat.png",
        category: "Meat - Baka",
        stock: "25 kg",
        price: "₱280/kg",
      },
      {
        id: 4,
        name: "Fresh Tomatoes",
        image: "/imageAssets/meat.png",
        category: "Fresh Produce - Gulay",
        stock: "40 kg",
        price: "₱50/kg",
      },
      {
        id: 5,
        name: "Red Onions",
        image: "/imageAssets/meat.png",
        category: "Fresh Produce - Gulay",
        stock: "35 kg",
        price: "₱80/kg",
      },
      {
        id: 6,
        name: "Potatoes",
        image: "/imageAssets/meat.png",
        category: "Fresh Produce - Gulay",
        stock: "60 kg",
        price: "₱45/kg",
      },
      {
        id: 7,
        name: "Potato Chips",
        image: "/imageAssets/meat.png",
        category: "Chips",
        stock: "100 pcs",
        price: "₱25/pc",
      },
      {
        id: 8,
        name: "Corn Chips",
        image: "/imageAssets/meat.png",
        category: "Chips",
        stock: "80 pcs",
        price: "₱30/pc",
      },
      {
        id: 9,
        name: "Frozen Fish Fillet",
        image: "/imageAssets/meat.png",
        category: "Frozen Goods",
        stock: "45 kg",
        price: "₱200/kg",
      },
      {
        id: 10,
        name: "Frozen Mixed Vegetables",
        image: "/imageAssets/meat.png",
        category: "Frozen Goods",
        stock: "50 packs",
        price: "₱120/pack",
      },
      {
        id: 11,
        name: "T-Shirt",
        image: "/imageAssets/meat.png",
        category: "Clothing & Toys - Pantaas",
        stock: "30 pcs",
        price: "₱150/pc",
      },
      {
        id: 12,
        name: "Jeans",
        image: "/imageAssets/meat.png",
        category: "Clothing & Toys - Pambaba",
        stock: "20 pcs",
        price: "₱450/pc",
      },
    ]
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const units = ["kg", "g", "pcs", "pack", "bundle", "dozen"];

  useEffect(() => {
    // Simulate loading delay
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadTimeout);
  }, []);

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const mainCategory = product.category.split(" - ")[0];
    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    acc[mainCategory].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAddProduct = (newProduct: {
    name: string;
    image: string;
    category: string;
    stock: string;
    price: string;
  }) => {
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name,
      image: newProduct.image,
      category: newProduct.category,
      stock: newProduct.stock,
      price: newProduct.price,
    };
    setProducts([...products, product]);
    setShowAddModal(false);
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setEditedProduct({ ...product });
  };

  const handleSaveEdit = () => {
    if (editedProduct) {
      setProducts(products.map((p) => (p.id === editedProduct.id ? editedProduct : p)));
      setEditingId(null);
      setEditedProduct(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProduct(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedProduct) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct({ ...editedProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to parse stock into quantity and unit
  const parseStock = (stock: string): { quantity: string; unit: string } => {
    const parts = stock.trim().split(" ");
    if (parts.length === 2) {
      return { quantity: parts[0], unit: parts[1] };
    }
    return { quantity: stock, unit: "" };
  };

  // Helper function to parse price into amount and unit
  const parsePrice = (price: string): { amount: string; unit: string } => {
    const match = price.match(/₱(.+?)\/(.+)/);
    if (match) {
      return { amount: match[1], unit: match[2] };
    }
    return { amount: price, unit: "" };
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Products</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#7FC354] text-white px-4 py-2 rounded-lg hover:bg-[#6fa844] transition-colors"
          disabled={isLoading}
        >
          <Plus size={16} />
          <span className="text-xs font-medium">Add Product</span>
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </>
        ) : (
          Object.entries(productsByCategory).map(([category, categoryProducts]) => {
          const isExpanded = expandedCategories.has(category);
          const productCount = categoryProducts.length;

          return (
            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Category Header - Clickable */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {category}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-[#7FC354] text-white rounded-full">
                    {productCount}
                  </span>
                </div>
              </button>

              {/* Category Products Table - Collapsible */}
              {isExpanded && (
                <div className="bg-white dark:bg-gray-900">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Product</TableHead>
                        <TableHead className="text-xs">Type</TableHead>
                        <TableHead className="text-xs">Quantity</TableHead>
                        <TableHead className="text-xs">Unit</TableHead>
                        <TableHead className="text-xs">Price</TableHead>
                        <TableHead className="text-xs">Per</TableHead>
                        <TableHead className="text-xs text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryProducts.map((product) => {
                        const stockParsed = parseStock(product.stock);
                        const priceParsed = parsePrice(product.price);

                        return (
                          <TableRow key={product.id}>
                            <TableCell className="text-xs font-medium">
                              {editingId === product.id ? (
                                <div className="flex items-center gap-2">
                                  <div className="relative w-10 h-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden group cursor-pointer shrink-0">
                                    {editedProduct?.image ? (
                                      <Image
                                        src={editedProduct.image}
                                        alt={editedProduct.name}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <Upload size={14} className="text-gray-400" />
                                      </div>
                                    )}
                                    <label className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                      <Upload size={12} className="text-white" />
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    value={editedProduct?.name}
                                    onChange={(e) => setEditedProduct({ ...editedProduct!, name: e.target.value })}
                                    className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 max-w-[200px]">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      width={40}
                                      height={40}
                                      className="rounded object-cover shrink-0"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center shrink-0">
                                      <span className="text-[8px] text-gray-400">No img</span>
                                    </div>
                                  )}
                                  <span className="truncate">{product.name}</span>
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-xs">
                              {editingId === product.id ? (
                                <input
                                  type="text"
                                  value={editedProduct?.category.split(" - ")[1] || ""}
                                  onChange={(e) => setEditedProduct({ 
                                    ...editedProduct!, 
                                    category: `${category} - ${e.target.value}` 
                                  })}
                                  className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                                  placeholder="Type"
                                />
                              ) : (
                                <span className="text-gray-600 dark:text-gray-400">
                                  {product.category.split(" - ")[1] || "-"}
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-xs">
                              {editingId === product.id ? (
                                <input
                                  type="number"
                                  value={parseStock(editedProduct?.stock || "").quantity}
                                  onChange={(e) => {
                                    const unit = parseStock(editedProduct?.stock || "").unit;
                                    setEditedProduct({ ...editedProduct!, stock: `${e.target.value} ${unit}` });
                                  }}
                                  className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                                />
                              ) : (
                                stockParsed.quantity
                              )}
                            </TableCell>
                            <TableCell className="text-xs">
                              {editingId === product.id ? (
                                <select
                                  value={parseStock(editedProduct?.stock || "").unit}
                                  onChange={(e) => {
                                    const quantity = parseStock(editedProduct?.stock || "").quantity;
                                    setEditedProduct({ ...editedProduct!, stock: `${quantity} ${e.target.value}` });
                                  }}
                                  className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                                >
                                  {units.map((unit) => (
                                    <option key={unit} value={unit}>{unit}</option>
                                  ))}
                                </select>
                              ) : (
                                stockParsed.unit
                              )}
                            </TableCell>
                            <TableCell className="text-xs">
                              {editingId === product.id ? (
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-500 dark:text-gray-400">₱</span>
                                  <input
                                    type="number"
                                    value={parsePrice(editedProduct?.price || "").amount}
                                    onChange={(e) => {
                                      const unit = parsePrice(editedProduct?.price || "").unit;
                                      setEditedProduct({ ...editedProduct!, price: `₱${e.target.value}/${unit}` });
                                    }}
                                    className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                                  />
                                </div>
                              ) : (
                                `₱${priceParsed.amount}`
                              )}
                            </TableCell>
                            <TableCell className="text-xs">
                              {editingId === product.id ? (
                                <select
                                  value={parsePrice(editedProduct?.price || "").unit}
                                  onChange={(e) => {
                                    const amount = parsePrice(editedProduct?.price || "").amount;
                                    setEditedProduct({ ...editedProduct!, price: `₱${amount}/${e.target.value}` });
                                  }}
                                  className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                                >
                                  {units.map((unit) => (
                                    <option key={unit} value={unit}>{unit}</option>
                                  ))}
                                </select>
                              ) : (
                                `/${priceParsed.unit}`
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                {editingId === product.id ? (
                                  <>
                                    <button
                                      onClick={handleSaveEdit}
                                      className="text-green-500 hover:text-green-700 transition-colors"
                                    >
                                      <Check size={16} />
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      <X size={16} />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleEditClick(product)}
                                      className="text-blue-500 hover:text-blue-700 transition-colors"
                                    >
                                      <Pencil size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteClick(product)}
                                      className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          );
        }))
        }
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Confirm Delete</h3>
              <button onClick={cancelDelete} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete <span className="font-semibold">{productToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <AddProductModal
        showModal={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}