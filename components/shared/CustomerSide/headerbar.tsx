import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define the props our component will accept
type LocationHeaderProps = {
  addressLine1: string;
  addressLine2: string;
};

export default function LocationHeader({ addressLine1, addressLine2 }: LocationHeaderProps) {
  return (
    <header className="w-full bg-[#7FC354] flex items-center justify-between px-4 rounded-b-2xl">

    {/* 1. Logo Section (NEW) */}
      <div className="shrink-0 relative">
        <Link href="/customerPage">
         <Image src="/imageAssets/MERKAGOLOGO.svg" alt="MerkaGo" width={70} height={10} />
         </Link>
      </div>

      {/* 2. Location Section (No changes) */}
      <div className="flex items-center">
        {/* Using your brand's Fresh Green for the icon */}
        <MapPin size={24} />
        <div className="ml-2">
          <p className="text-sm font-semibold text-gray-900">
            {addressLine1}
          </p>
          <p className="text-xs text-gray-500">
            {addressLine2}
          </p>
        </div>
      </div>
      
    </header>
  );
}