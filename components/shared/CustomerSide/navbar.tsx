"use client";

import {
  Home,
  ShoppingCart,
  Receipt,
  User,
  Crown,
  CircleQuestionMark,
  Ticket,
  ReceiptText,
  Handshake,
  Moon,
  Sun,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import CartItems from "./cartItems"; // Assuming this is where your CartItems component is

// Reusable NavItem for normal links
function NavItem({
  icon,
  label,
  href,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const activeColor = active ? "text-[#7FC354]" : "text-gray-500";

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex flex-col items-center justify-center flex-1 group"
    >
      <div className={`text-2xl ${activeColor} group-hover:text-[#7FC354]`}>
        {icon}
      </div>
      <span className={`text-xs ${activeColor} group-hover:text-[#7FC354]`}>
        {label}
      </span>
    </Link>
  );
}

export default function BottomNavbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { theme, setTheme } = useTheme();
  
  const isDarkMode = theme === "dark";

  return (
    <>
      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
          {/* HOME */}
          <NavItem
            icon={<Home />}
            label="Home"
            href="/customerPage/"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />

          {/* CART BUTTON (no link) */}
          <button
            onClick={() => {
              setCartOpen(true);
            }}
            className="flex flex-col items-center justify-center flex-1 group"
          >
            <div
              className={`text-2xl ${
                activeTab === "cart" ? "text-[#7FC354]" : "text-gray-500 dark:text-gray-400"
              } group-hover:text-[#7FC354]`}
            >
              <ShoppingCart />
            </div>
            <span
              className={`text-xs ${
                activeTab === "cart" ? "text-[#7FC354]" : "text-gray-500 dark:text-gray-400"
              } group-hover:text-[#7FC354]`}
            >
              Cart
            </span>
          </button>

          {/* PROFILE BUTTON (no link) */}
          <button
            onClick={() => {
              setProfileOpen(true);
            }}
            className="flex flex-col items-center justify-center flex-1 group"
          >
            <div
              className={`text-2xl ${
                activeTab === "profile" ? "text-[#7FC354]" : "text-gray-500 dark:text-gray-400"
              } group-hover:text-[#7FC354]`}
            >
              <Settings />
            </div>
            <span
              className={`text-xs ${
                activeTab === "profile" ? "text-[#7FC354]" : "text-gray-500 dark:text-gray-400"
              } group-hover:text-[#7FC354]`}
            >
              Settings
            </span>
          </button>
        </div>
      </nav>

      {/* 🔹 SHEET FOR CART */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        {/* Adjusted content for full height and scrollability */}
        <SheetContent side="right" className="w-[350px] sm:w-[400px] flex flex-col">
          <SheetHeader className="p-4">
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Items you added will appear here.
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto px-4">
            {/* Removed the extra border div for better layout control */}
            <CartItems />
          </div>

          {/* Checkout Button - Fixed at the bottom */}
          <div className="p-4 border-t dark:border-gray-700">
            <Link 
              href="/customerPage/cart" 
              className="w-full" 
              onClick={() => setCartOpen(false)} // Close sheet on navigation
            >
              <Button className="w-full bg-[#7FC354] hover:bg-[#6AA447] text-white font-bold py-2 px-4 rounded">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* 🔹 SHEET FOR PROFILE */}
      {/* ... Profile Sheet code remains the same ... */}
       <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent
          side="right"
          className="w-[350px] sm:w-[400px] overflow-y-auto"
        >
          {/* HEADER */}
          <SheetHeader className="p-4">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <span>Juan Dela Cruz</span>

              <span className="bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                Gold
              </span>
            </SheetTitle>
            <Link
              href={"/customerPage/accounts"}
              className="text-sm text-gray-500 hover:underline"
              onClick={() => setProfileOpen(false)}
            >
              View profile
            </Link>
          </SheetHeader>

          {/* PROMO BANNER */}
          <div className="mx-4 mb-4 p-4 bg-[#7FC354] rounded-xl text-white flex items-center justify-between">
            <div>
              <p className="font-semibold">Save with MerkaGo!</p>
              <p className="text-sm">Free for 30 days</p>
              <button className="text-sm underline mt-1">
                Start your free trial
              </button>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-3 gap-3 px-4 mb-4">
            <Button variant="ghost" className="border rounded-lg p-4 flex flex-col items-center h-20">
            <Link href="/customerPage/order" className="flex flex-col items-center">
              <ReceiptText className="mb-3.5" />
              <span className="text-sm">Orders</span>
            </Link>
            </Button>

            <Button variant="ghost" className="border rounded-lg p-4 flex flex-col items-center h-20">
              <User className="mb-1" />
              <span className="text-sm">Favourites</span>
            </Button>

            <Button variant="ghost" className="border rounded-lg p-4 flex flex-col items-center h-20">
              <Home className="mb-1" />
              <span className="text-sm">Addresses</span>
            </Button>
          </div>

          {/* PERKS SECTION */}
          <div className="px-4 mt-4">
            <h2 className="font-semibold text-gray-700 mb-2">Perks for you</h2>

            <div className="space-y-3">
              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Crown /> Try Merkapro for free now
                </span>
              </Button>

              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Receipt /> MerkGo rewards
                </span>
              </Button>

              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <Link href="/customerPage/voucher">
                <span className="flex items-center gap-2">
                  <Ticket /> Vouchers
                </span>
                </Link>
              </Button>

              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <User /> Invite friends
                </span>
              </Button>
            </div>
          </div>

          {/* GENERAL SECTION */}
          <div className="px-4 mt-6">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">General</h2>

            <div className="space-y-3">
              {/* Dark Mode Toggle */}
              <div className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex ml-3.5 items-center gap-2 font-semibold">
                  {isDarkMode ? <Moon size={20}/> : <Sun size={20}/>}
                  Dark Mode
                </span>
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
                />
              </div>

              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <CircleQuestionMark /> Help center
                </span>
              </Button>

              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Home /> MerkaGo for business
                </span>
              </Button>

              <Button variant="ghost" className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Handshake /> Terms & policies
                </span>
              </Button>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="px-4 mt-6">
            <Button
              className="w-full border rounded-lg py-3 font-semibold"
              variant="destructive"
            >
              <Link href="/">
              Log out
              </Link>
            </Button>
          </div>

          {/* VERSION */}
          <p className="text-center text-xs text-gray-400 mt-4 mb-8">
            Version 1.0.0
          </p>
        </SheetContent>
      </Sheet>
    </>
  );
}