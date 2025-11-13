// We will import our new components
import ShopCard from "@/components/shared/shopCard";
import ShopListItem from "@/components/shared/shopListItems";
import Image from "next/image";
// And icons from lucide-react
import { Search, ArrowRight } from "lucide-react";

// --- Category Data (for the icons) ---
const categories = [
  { name: "Meat", img: "/imageAssets/meat.png" }, // Replace with your image paths
  { name: "Fresh Produce", img: "/imageAssets/freshproduce.jpg" },
  { name: "Frozen Goods", img: "/imageAssets/frozengoods.png" },
  { name: "Clothing", img: "/imageAssets/clothe.png" },
];

// --- Mock Shop Data (for the cards) ---
const popularShops = [
  {
    imageUrl: "/shopLogo/alingRosa.png", // Replace with your image paths
    name: "Aling Rosa's Meat Stall",
    discountInfo: "Up to 50% off",
    deliveryTime: "40-60 min",
  },
  {
    imageUrl: "/shopLogo/mangBerto.png",
    name: "Mang Berto's Choice Cuts",
    discountInfo: "Everyday low prices",
    deliveryTime: "30-50 min",
  },
  {
    imageUrl: "/shopLogo/alingLita.png",
    name: "Pwesto ni Aling Lita",
    discountInfo: "Health & Wellness",
    deliveryTime: "5-20 min",
  },
  {
    imageUrl: "/shopLogo/nenita.png",
    name: "Nenita's Fish Dealer",
    discountInfo: "Get discounts",
    deliveryTime: "20-40 min",
  },
];

export default function Home() {
  return (
    // We add pb-16 for the BottomNavbar
    <div className="bg-[#FFFFFF] min-h-screen pb-16">

      {/* 2. SEARCH BAR */}
      <div className="px-4 mb-6 mt-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Looking for something?"
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-[#7FC354]"
          />
        </div>
      </div>

      {/* 3. CATEGORIES SECTION */}
      <section className="mb-6">
        <div className="flex justify-between items-center px-4 mb-3">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center w-1/4">
              <div className="w-20 h-20 p-3 bg-gray-100 rounded-xl flex items-center justify-center">
                {/* Use an <img> tag here. 
                Using a placeholder for this example */}
                <div className="w-full h-full bg-gray-300 rounded-md"></div>
                <Image src={cat.img} width={60} height={60} alt={cat.name} />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900">
                {cat.name}
              </p>
            </div>
          ))}
          {/* View all shops link */}
          <a
            href="#"
            className="flex flex-col items-center w-1/4"
          >
            <div className="w-20 h-20 p-3 bg-gray-100 rounded-xl flex items-center justify-center">
              <ArrowRight size={24} className="text-gray-600" />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-900">
              View all shops
            </p>
          </a>
        </div>
      </section>

      {/* 4. POPULAR SHOPS SECTION */}
      <section className="mb-6">
        <h2 className="font-bold text-xl px-4 mb-3 text-gray-900">
          Popular Shops
        </h2>
        {/* Horizontal scroll container */}
        <div className="flex overflow-x-auto pb-4 pl-4">
          {popularShops.map((shop) => (
            <ShopCard
              key={shop.name}
              imageUrl={shop.imageUrl}
              name={shop.name}
              discountInfo={shop.discountInfo}
              deliveryTime={shop.deliveryTime}
            />
          ))}
        </div>
      </section>

      {/* 5. SHOP LIST SECTION */}
      <section className="px-4">
        {/* This is the list item from the screenshot */}
        <ShopListItem
          imageUrl="/shopLogo/alingRosa.png" // Replace with your image path
          title="Aling Rosa's Meat Shop: Up to 50% off (SE)"
          deliveryTime="40-60 min"
          priceInfo="₱149"
        />
        {/* You can add more <ShopListItem /> components here */}
      </section>

    </div>
  );
}