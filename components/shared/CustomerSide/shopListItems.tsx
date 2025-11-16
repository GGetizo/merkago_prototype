import Image from "next/image";
import { Heart, ChevronRight } from "lucide-react";

type ShopListItemProps = {
  imageUrl: string;
  title: string;
  deliveryTime: string;
  priceInfo: string;
};

export default function ShopListItem({
  imageUrl,
  title,
  deliveryTime,
  priceInfo,
}: ShopListItemProps) {
  return (
    <a href="#" className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl mb-3 border border-gray-200 dark:border-gray-700">
      {/* Image */}
      <div className="relative w-20 h-20 shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-lg"
        />
        {/* Heart Icon - top left in the screenshot */}
        <div className="absolute top-1 left-1 bg-white dark:bg-gray-700 rounded-full p-1 shadow">
          <Heart size={16} className="text-gray-600 dark:text-gray-300" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 ml-4 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{deliveryTime}</p>
        {/* Using your green for the price/fee */}
        <p className="text-sm text-[#7FC354]">{priceInfo}</p>
      </div>

      {/* Chevron Icon */}
      <div className="ml-2">
        <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
      </div>
    </a>
  );
}