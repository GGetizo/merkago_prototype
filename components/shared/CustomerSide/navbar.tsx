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
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CartItems from "./cartItems";

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

  return (
    <>
      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200">
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
                activeTab === "cart" ? "text-[#7FC354]" : "text-gray-500"
              } group-hover:text-[#7FC354]`}
            >
              <ShoppingCart />
            </div>
            <span
              className={`text-xs ${
                activeTab === "cart" ? "text-[#7FC354]" : "text-gray-500"
              } group-hover:text-[#7FC354]`}
            >
              Cart
            </span>
          </button>

          {/* CART BUTTON (no link) */}
          <button
            onClick={() => {
              setProfileOpen(true);
            }}
            className="flex flex-col items-center justify-center flex-1 group"
          >
            <div
              className={`text-2xl ${
                activeTab === "cart" ? "text-[#7FC354]" : "text-gray-500"
              } group-hover:text-[#7FC354]`}
            >
              <User />
            </div>
            <span
              className={`text-xs ${
                activeTab === "cart" ? "text-[#7FC354]" : "text-gray-500"
              } group-hover:text-[#7FC354]`}
            >
              Profile
            </span>
          </button>
        </div>
      </nav>

      {/* 🔹 SHEET FOR CART */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="w-[350px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Items you added will appear here.
            </SheetDescription>
          </SheetHeader>

          <div className="border-gray-500 h-full w-[90%] border-2 rounded-md ml-6 flex">
            <div className="w-full">
              <CartItems />
              </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* 🔹 SHEET FOR PROFILE */}
      <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
        <SheetContent
          side="right"
          className="w-[350px] sm:w-[400px] overflow-y-auto"
        >
          {/* HEADER */}
          <SheetHeader className="p-4">
            <SheetTitle className="text-xl font-bold">
              Juan Dela Cruz
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
            <Link href="/customerPage/order" className="border rounded-lg p-4 flex flex-col items-center">
              <ReceiptText className="mb-1" />
              <span className="text-sm">Orders</span>
            </Link>

            <button className="border rounded-lg p-4 flex flex-col items-center">
              <User className="mb-1" />
              <span className="text-sm">Favourites</span>
            </button>

            <button className="border rounded-lg p-4 flex flex-col items-center">
              <Home className="mb-1" />
              <span className="text-sm">Addresses</span>
            </button>
          </div>

          {/* PERKS SECTION */}
          <div className="px-4 mt-4">
            <h2 className="font-semibold text-gray-700 mb-2">Perks for you</h2>

            <div className="space-y-3">
              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Crown /> Try Merkapro for free now
                </span>
              </button>

              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Receipt /> MerkGo rewards
                </span>
              </button>

              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Ticket /> Vouchers
                </span>
              </button>

              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <User /> Invite friends
                </span>
              </button>
            </div>
          </div>

          {/* GENERAL SECTION */}
          <div className="px-4 mt-6">
            <h2 className="font-semibold text-gray-700 mb-2">General</h2>

            <div className="space-y-3">
              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <CircleQuestionMark /> Help center
                </span>
              </button>

              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Home /> MerkaGo for business
                </span>
              </button>

              <button className="w-full flex justify-between items-center py-3 border-b">
                <span className="flex items-center gap-2">
                  <Handshake /> Terms & policies
                </span>
              </button>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="px-4 mt-6">
            <Button
              className="w-full border rounded-lg py-3 font-semibold"
              variant="destructive"
            >
              Log out
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
