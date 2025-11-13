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
import Image from "next/image";
import { Trash2, Plus, X, Pencil, Check } from "lucide-react";
import { useState } from "react";
import AddProductModal from "./addProductModal/addProductModal";

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  stock: string;
  price: string;
};

export default function StockTable() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Chicken Breast",
      image: "/imageAssets/meat.png",
      category: "Meat",
      stock: "50 kg",
      price: "₱180/kg",
    },
    {
      id: 2,
      name: "Pork Belly",
      image: "/imageAssets/meat.png",
      category: "Meat",
      stock: "30 kg",
      price: "₱250/kg",
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const categories = ["Meat", "Fresh Produce", "Chips", "Frozen Goods", "Clothing"];

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
      price: `₱${newProduct.price}`,
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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Products</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#7FC354] text-white px-4 py-2 rounded-lg hover:bg-[#6fa844] transition-colors"
        >
          <Plus size={16} />
          <span className="text-xs font-medium">Add Product</span>
        </button>
      </div>

      <Table>
        <TableCaption className="text-xs">A list of your product stock.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Product</TableHead>
            <TableHead className="text-xs">Category</TableHead>
            <TableHead className="text-xs">Stock</TableHead>
            <TableHead className="text-xs text-right">Price</TableHead>
            <TableHead className="text-xs text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="text-xs font-medium">
                {editingId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct?.name}
                    onChange={(e) => setEditedProduct({ ...editedProduct!, name: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={20}
                        height={20}
                        className="rounded"
                      />
                    ) : (
                      <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-[8px] text-gray-400">No img</span>
                      </div>
                    )}
                    <span>{product.name}</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-xs">
                {editingId === product.id ? (
                  <select
                    value={editedProduct?.category}
                    onChange={(e) => setEditedProduct({ ...editedProduct!, category: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  product.category
                )}
              </TableCell>
              <TableCell className="text-xs">
                {editingId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct?.stock}
                    onChange={(e) => setEditedProduct({ ...editedProduct!, stock: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                  />
                ) : (
                  product.stock
                )}
              </TableCell>
              <TableCell className="text-xs text-right">
                {editingId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct?.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct!, price: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-[#7FC354]"
                  />
                ) : (
                  product.price
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
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <button onClick={cancelDelete} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{productToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
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