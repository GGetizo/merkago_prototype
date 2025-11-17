"use client";

import {
  Home,
  Layers2,
  Settings,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  VisuallyHidden,
} from "@/components/ui/sheet";
import SettingsComponent from "./settings/settings";

// This is a single navigation item component
function NavItem({ icon, label, href, onClick }: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = href ? pathname === href : false;
  
  // Use your brand's "Fresh Green" color for the active item
  const activeColor = active ? "text-[#7FC354]" : "text-gray-500 dark:text-gray-400";

  if (onClick) {
    return (
      <button onClick={onClick} className="flex flex-col items-center justify-center flex-1 group">
        <div className={`text-2xl ${activeColor} group-hover:text-[#7FC354]`}>
          {icon}
        </div>
        <span className={`text-xs ${activeColor} group-hover:text-[#7FC354]`}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <Link href={href!} className="flex flex-col items-center justify-center flex-1 group">
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
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
          <NavItem icon={<Home />} label="Home" href="/vendorPage" />
          <NavItem icon={<Layers2 />} label="Stock" href="/vendorPage/stock" />
          <NavItem icon={<BadgeDollarSign />} label="Sales" href="/vendorPage/sales" />
          <NavItem icon={<Settings />} label="Settings" onClick={() => setShowSettings(true)} />
        </div>
      </nav>

      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent side="right" className="w-[350px] sm:w-[400px] overflow-y-auto p-0">
          <VisuallyHidden>
            <SheetTitle>Settings</SheetTitle>
          </VisuallyHidden>
          <SettingsComponent />
        </SheetContent>
      </Sheet>
    </>
  );
}