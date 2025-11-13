import { Bell, MessageCircle } from 'lucide-react';
import Image from 'next/image';

// Define the props our component will accept
type LocationHeaderProps = {
  addressLine1: string;
  addressLine2: string;
  shopName?: string;
  shopLogoUrl?: string; // Add shop logo URL prop
};

export default function LocationHeader({ 
  shopName = "Pwesto ni Aling Lita",
  shopLogoUrl = "/shopLogo/alingLita.png" // Default logo
}: LocationHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#7FC354] dark:bg-[#6fa844] flex justify-between items-center p-4 rounded-b-2xl">

      {/* 1. Shop Name Section with Logo (LEFT) */}
      <button className="shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
        <Image 
          src={shopLogoUrl} 
          alt={shopName} 
          width={40} 
          height={40} 
          className="rounded-full"
        />
        <p className="text-xs font-bold text-gray-900 dark:text-white max-w-[60px] min-[391px]:max-w-[150px] truncate">
          {shopName}
        </p>
      </button>

      {/* 2. Logo Section (CENTER) */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src="/imageAssets/MERKAGOLOGO.svg" alt="MerkaGo" width={70} height={10} />
      </div>
      
      {/* 3. Notification and Message Icons (RIGHT) */}
      <div className="flex items-center gap-4">
        <button className="hover:opacity-80 transition-opacity cursor-pointer">
          <Bell size={20} className="text-gray-900 dark:text-white" />
        </button>
        <button className="hover:opacity-80 transition-opacity cursor-pointer">
          <MessageCircle size={20} className="text-gray-900 dark:text-white" />
        </button>
      </div>
    </header>
  );
}