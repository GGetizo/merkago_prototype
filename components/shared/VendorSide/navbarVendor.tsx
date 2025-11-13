"use client";

import {
  Home,
  Layers2,
  Settings,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is a single navigation item component
function NavItem({ icon, label, href }: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  
  // Use your brand's "Fresh Green" color for the active item
  const activeColor = active ? "text-[#7FC354]" : "text-gray-500";

  return (
    <Link href={href} className="flex flex-col items-center justify-center flex-1 group">
      <div className={`text-2xl ${activeColor} group-hover:text-[#7FC354]`}>
        {icon}
      </div>
      <span className={`text-xs ${activeColor} group-hover:text-[#7FC354]`}>
        {label}
      </span>
    </Link>
  );
}

// The main Navbar component
export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full bg-[#FFFFFF] border-t border-gray-200">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        <NavItem icon={<Home />} label="Home" href="/vendorPage" />
        <NavItem icon={<Layers2 />} label="Stock" href="/vendorPage/stock" />
        <NavItem icon={<BadgeDollarSign />} label="Sales" href="/vendorPage/sales" />
        <NavItem icon={<Settings />} label="Settings" href="/vendorPage/settings" />
      </div>
    </nav>
  );
}