"use client";

import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
// --- ADDED ---
import ProductItemCard from "@/components/shared/CustomerSide/productItem";

// --- ADDED ---
// Mock data for this shop's products, based on your 'shopsWithProducts' data
const recommendedProducts = [
  {
    id: "mb1",
    imageUrl: "/imageAssets/karne.png",
    name: "Karne ng Baka",
    price: "₱ 200.00/kg",
    badge: "30% Off",
    category: "Meat",
    subCategory: "Beef",
  },
  {
    id: "mb2",
    imageUrl: "/imageAssets/manok.jpg",
    name: "Manok",
    price: "₱ 180.00/kg",
    category: "Meat",
    subCategory: "Chicken",
  },
    {
    id: "mb3",
    imageUrl: "/imageAssets/bangus.jpg",
    name: "Bangus",
    price: "₱ 280.00/kg",
    category: "Meat",
    subCategory: "Fish",
  },
    {
    id: "mb4",
    imageUrl: "/imageAssets/meat.png",
    name: "Pork",
    price: "₱ 100.00/kg",
    category: "Meat",
    subCategory: "Pork",
  },
  // You can add more products for this shop here
];

export default function ShopPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* SHOP HEADER */}
      <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-800">
        <Image
          src="/imageAssets/adBanners/foodbanner1.jpg"
          alt="Shop Banner"
          fill
          className="object-cover opacity-70 z-10"
        />
      </div>

      {/* SHOP INFO CARD */}
      <div className="relative -mt-10 mx-4 rounded-xl bg-white dark:bg-gray-800 shadow p-4 z-40">
        {/* Logo + Name + Buttons */}
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow">
            <Image
              src="/shopLogo/mangBerto.png"
              alt="Shop Logo"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>

          <div className="ml-4 flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Mang Berto's Choice Cuts</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active 10 minutes ago</p>

            <div className="flex gap-2 mt-2">
              <button className="px-4 py-1 bg-green-600 text-white rounded-full text-sm">
                Follow
              </button>
              <button className="px-4 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300">
                Chat
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-bold">Products:</span> 122
          </p>
          <p>
            <span className="font-bold">Followers:</span> 23.4k
          </p>
          <p className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-bold">4.9</span> (8.4k reviews)
          </p>
          <p>
            <span className="font-bold">Joined:</span> 2020
          </p>
        </div>
      </div>

      {/* NAV TABS */}
      <div className="flex mt-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm">
        <button className="py-3 border-b-2 border-red-500 text-red-500 font-semibold mr-6">
          Home
        </button>
        <button className="py-3 mr-6 text-gray-700 dark:text-gray-300">All Products</button>
        <button className="py-3 mr-6 text-gray-700 dark:text-gray-300">Meat Cuts</button>
        <button className="py-3 mr-6 text-gray-700 dark:text-gray-300">Fish</button>
        <button className="py-3 mr-6 text-gray-700 dark:text-gray-300">Vegetables</button>
      </div>

    {/* Home */}
      {/* VOUCHERS SECTION */}
      <div className="bg-white dark:bg-gray-800 mx-4 mt-4 rounded-lg shadow p-4">
        <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Shop Vouchers</h2>

        <div className="space-y-3">
          {/* Voucher Card */}
          <div className="border border-red-300 dark:border-red-700 rounded-lg p-4 flex justify-between items-center bg-red-50 dark:bg-red-900/20">
            <div>
              <p className="text-lg font-bold text-red-600 dark:text-red-500">₱10 off</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Min. Spend ₱199</p>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Valid until: Feb 2030</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white text-sm rounded">
              Claim
            </button>
          </div>

          <div className="border border-red-300 dark:border-red-700 rounded-lg p-4 flex justify-between items-center bg-red-50 dark:bg-red-900/20">
            <div>
              <p className="text-lg font-bold text-red-600 dark:text-red-500">₱25 off</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Min. Spend ₱150</p>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Expires in 2 days</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white text-sm rounded">
              Claim
            </button>
          </div>
        </div>
      </div>

      {/* --- REFACTORED SECTION --- */}
      {/* RECOMMENDED FOR YOU */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recommended For You</h2>
          <p className="text-sm text-green-600 dark:text-green-500 flex items-center gap-1">
            See All <ArrowRight size={14} />
          </p>
        </div>

        {/* Product Grid */}
        <div className="flex gap-3">
          {/* Map over the new product data and render the new card component */}
          {recommendedProducts.map((item) => (
            <ProductItemCard
              key={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              badge={item.badge}
              category={item.category}
              subCategory={item.subCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}