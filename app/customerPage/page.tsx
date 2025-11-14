// We will import our new components
import ShopCard from "@/components/shared/CustomerSide/shopCard";
import ShopListItem from "@/components/shared/CustomerSide/shopListItems";
import Image from "next/image";
// And icons from lucide-react
import { Search, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductItemCard from "@/components/shared/CustomerSide/productItem";

// --- Category Data (for the icons) ---
const categories = [
  { name: "Meat", img: "/imageAssets/meat.png" }, // Replace with your image paths
  { name: "Fresh Produce", img: "/imageAssets/freshproduce.png" },
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

// --- NEW DATA STRUCTURE ---
// We now combine the shops and their specific products
const shopsWithProducts = [
  {
    shopInfo: {
      imageUrl: "/shopLogo/mangBerto.png",
      title: "Mang Berto's Choice Shop: Up to 60% off (SE)",
      deliveryTime: "40-60 min",
      priceInfo: "₱129"
    },
    products: [
      {
        id: 'mb1', // Using ID for key
        imageUrl: "/imageAssets/karne.png",
        name: "Karne ng Baka",
        price: "₱ 200.00/kg",
        category: "Meat",
        subCategory: "Beef"
      },
      {
        id: 'mb2',
        imageUrl: "/imageAssets/manok.jpg",
        name: "Manok",
        price: "₱ 180.00/kg",
        category: "Meat",
        subCategory: "Chicken"
      }
    ]
  },
  {
    shopInfo: {
      imageUrl: "/shopLogo/alingRosa.png",
      title: "Aling Rosa's Meat Shop: Up to 50% off (SE)",
      deliveryTime: "40-60 min",
      priceInfo: "₱149"
    },
    products: [
       {
        id: 'ar1',
        imageUrl: "/imageAssets/onion.jpg",
        name: "Sibuyas",
        price: "₱ 53.00/kg",
        badge: "Deal",
        category: "Produce",
        subCategory: "Vegetable"
      },
      {
        id: 'ar2',
        imageUrl: "/imageAssets/karne.png",
        name: "Baka (Ground)",
        price: "₱ 190.00/kg",
        category: "Meat",
        subCategory: "Beef"
      }
    ]
  }
];

// --- Mock Ad Banner Data ---
const bannerAds = [
  { 
    id: 1, 
    // Using your brand's Orange color
    imageUrl: "/imageAssets/adBanners/foodbanner1.jpg", 
    alt: "Get P200 Off" 
  },
  { 
    id: 2, 
    imageUrl: "/imageAssets/adBanners/foodbanner2.jpg", 
    alt: "Free Delivery" 
  },
  { 
    id: 3, 
    imageUrl: "/imageAssets/adBanners/foodpandaBanner1.jpg", 
    alt: "Weekly Deals" 
  },
];


export default function Home() {
  return (
    // We add pb-16 for the BottomNavbar
    <div className="bg-[#FFFFFF] min-h-screen pb-16 xl:px-7">

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
              <div className="xl:w-20 xl:h-20 w-15 h-15 p-3 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="w-full h-full bg-gray-300 rounded-md"></div>
                <Image src={cat.img} width={60} height={60} alt={cat.name} />
              </div>
              <p className="mt-2 xl:text-sm text-[0.5rem] font-semibold text-gray-900">
                {cat.name}
              </p>
            </div>
          ))}
          {/* View all shops link */}
          <a
            href="#"
            className="flex flex-col items-center w-1/4"
          >
            <div className="xl:w-20 xl:h-20 w-15 h-15 p-3 bg-gray-100 rounded-xl flex items-center justify-center">
              <ArrowRight size={24} className="text-gray-600" />
            </div>
            <p className="mt-2 xl:text-sm text-[0.5rem] font-semibold text-gray-900">
              View all shops
            </p>
          </a>
        </div>
      </section>

      {/* 3. BANNER CAROUSEL (MOVED & UPDATED) */}
      <section className="px-4 mb-6">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {bannerAds.map((ad) => (
              <CarouselItem key={ad.id}>
                {/* Use aspect-video or aspect-[2/1] for banner shape */}
                <div className="relative aspect-6/1 w-full">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14" />
          <CarouselNext className="mr-14" />
        </Carousel>
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

      {/* 5. NEW: ALL SHOPS & PRODUCTS SECTION */}
      <section className="px-4">
        <h2 className="font-bold text-xl mb-3 text-gray-900">
          All Shops
        </h2>
        {/* This loop renders each shop and its products together.
          We use 'space-y-6' to add separation between each shop's section.
        */}
        <div className="space-y-6">
          {shopsWithProducts.map((shopData) => (
            <div key={shopData.shopInfo.title}>
              {/* 1. Render the Shop List Item */}
              <ShopListItem
                imageUrl={shopData.shopInfo.imageUrl}
                title={shopData.shopInfo.title}
                deliveryTime={shopData.shopInfo.deliveryTime}
                priceInfo={shopData.shopInfo.priceInfo}
              />
              
              {/* 2. Render that shop's products in a scrolling list */}
              <div className="flex overflow-x-auto pb-4 pt-2 -ml-4 pl-4 no-scrollbar">
                {shopData.products.map((item) => (
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
          ))}
        </div>
      </section>

    </div>
  );
}