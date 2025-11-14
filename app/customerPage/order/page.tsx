"use client";

import Image from "next/image";
// --- IMPORT useState ---
import { useState } from "react"; 
import { Store, Truck, CheckCircle, XCircle } from "lucide-react";

// --- Mock Data for Orders ---
const mockOrders = [
  {
    id: "ORD123",
    shopName: "Mang Berto's Choice Cuts",
    status: "To Receive",
    statusIcon: <Truck className="w-5 h-5 text-blue-600" />,
    statusText: "Your order is on its way",
    products: [
      {
        img: "/imageAssets/karne.png",
        name: "Karne ng Baka",
        qty: 1,
        price: 200.0,
      },
      {
        img: "/imageAssets/manok.jpg",
        name: "Manok",
        qty: 1,
        price: 180.0,
      },
    ],
    totalItems: 2,
    totalPrice: 380.0,
    actions: [
      { label: "Order Received", type: "primary" },
      { label: "Contact Seller", type: "secondary" },
    ],
  },
  {
    id: "ORD124",
    shopName: "Aling Rosa's Meat Stall",
    status: "Completed",
    statusIcon: <CheckCircle className="w-5 h-5 text-green-600" />,
    statusText: "Order delivered on Nov 13, 2025",
    products: [
      {
        img: "/imageAssets/onion.jpg",
        name: "Sibuyas (1kg)",
        qty: 2,
        price: 53.0,
      },
    ],
    totalItems: 2,
    totalPrice: 106.0,
    actions: [
      { label: "Rate", type: "primary" },
      { label: "Buy Again", type: "secondary" },
    ],
  },
  {
    id: "ORD125",
    shopName: "Nenita's Fish Dealer",
    status: "Cancelled",
    statusIcon: <XCircle className="w-5 h-5 text-red-600" />,
    statusText: "Order was cancelled on Nov 12, 2025",
    products: [
      {
        img: "/imageAssets/bangus.jpg",
        name: "Bangus (Large)",
        qty: 1,
        price: 200.0,
      },
    ],
    totalItems: 1,
    totalPrice: 200.0,
    actions: [{ label: "Buy Again", type: "secondary" }],
  },
  {
    id: "ORD126",
    shopName: "Mang Berto's Choice Cuts",
    status: "Completed",
    statusIcon: <CheckCircle className="w-5 h-5 text-green-600" />,
    statusText: "Order delivered on Nov 11, 2025",
    products: [
      {
        img: "/imageAssets/manok.jpg",
        name: "Manok",
        qty: 2,
        price: 180.0,
      },
    ],
    totalItems: 2,
    totalPrice: 360.0,
    actions: [
      { label: "Rate", type: "primary" },
      { label: "Buy Again", type: "secondary" },
    ],
  },
];

// --- Tab names as a constant for easier management ---
const TABS = ["To Pay", "To Ship", "To Receive", "Completed", "Cancelled"];

export default function OrderPage() {
  // --- USE STATE ---
  // Use useState to manage the active tab's string
  const [activeTab, setActiveTab] = useState("To Receive");

  // --- FILTER LOGIC ---
  // Filter the orders based on the currently active tab
  const filteredOrders = mockOrders.filter(
    (order) => order.status === activeTab
  );

  return (
    <div className="bg-gray-100 min-h-screen w-full pb-16">
      {/* HEADER */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-center text-gray-900">
          My Orders
        </h1>
      </div>

      {/* STICKY TAB NAVIGATION */}
      <div className="flex justify-around bg-white shadow-md sticky top-0 z-10 text-sm font-medium text-center text-gray-500">
        {/* Map over the TABS array to create buttons dynamically */}
        {TABS.map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)} // Add onClick handler
            className={`flex-1 py-3 px-2 ${
              activeTab === tabName // Compare with state
                ? "text-green-600 border-b-2 border-green-600"
                : "hover:text-gray-700"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>

      {/* ORDER LIST */}
      <div className="p-4 space-y-4">
        {/* --- USE FILTERED LIST --- */}
        {/* Map over the filteredOrders array */}
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
            >
              {/* Card Header: Shop Name & Order ID */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-gray-700" />
                  <h2 className="font-semibold text-gray-800">
                    {order.shopName}
                  </h2>
                </div>
                <span className="text-xs text-gray-500">#{order.id}</span>
              </div>

              {/* Card Body: Product(s) List */}
              <div className="p-4 space-y-3">
                {order.products.map((product, index) => (
                  <div key={index} className="flex gap-3">
                    <Image
                      src={product.img}
                      alt={product.name}
                      width={65}
                      height={65}
                      className="rounded-md object-cover border border-gray-200"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {product.qty}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      ₱{product.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Status */}
              <div className="px-4 py-3 bg-gray-50 border-t border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {order.statusIcon}
                  <p className="text-sm font-medium text-gray-800">
                    {order.statusText}
                  </p>
                </div>
              </div>

              {/* Card Footer: Total & Actions */}
              <div className="p-4 bg-white">
                {/* Total Price */}
                <div className="text-right mb-4">
                  <p className="text-sm text-gray-600">
                    {order.totalItems} item(s)
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    Order Total:{" "}
                    <span className="text-green-600">
                      ₱{order.totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                  {order.actions.map((action, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        action.type === "primary"
                          ? "bg-green-600 text-white shadow-sm hover:bg-green-700"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          // --- EMPTY STATE ---
          // Show a message if no orders match the filter
          <div className="text-center text-gray-500 pt-16">
            <p>No orders found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}