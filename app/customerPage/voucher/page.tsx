/* eslint-disable @typescript-eslint/no-unused-vars */
// You will need to install lucide-react, next-themes, and a Link component setup (e.g., next/link).
// Assuming you have components like Sheet/Button/Switch available, I'll use basic HTML and Tailwind for this example.

"use client";

import {
  Ticket,
  Crown,
  Receipt,
  ChevronLeft,
  X,
  Store,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// --- Mock Data ---

const MOCK_VOUCHERS = [
  { 
    id: 1, 
    code: 'MERKAGO20', 
    discount: '20% OFF', 
    description: '20% off all orders over $50.', 
    expiration: '30 Nov 2025', 
    isUsed: false, 
    isUniversal: true, 
    shop: 'Universal' 
  },
  { 
    id: 2, 
    code: 'FREESHIP', 
    discount: 'Free Delivery', 
    description: 'Free delivery on your next order.', 
    expiration: '15 Dec 2025', 
    isUsed: false, 
    isUniversal: true, 
    shop: 'Universal' 
  },
  { 
    id: 3, 
    code: 'SMARKET10', 
    discount: '$10 OFF', 
    description: 'Valid for orders at Super Market over $40.', 
    expiration: '25 Nov 2025', 
    isUsed: false, 
    isUniversal: false, 
    shop: 'Super Market' 
  },
  { 
    id: 4, 
    code: 'PHARM5', 
    discount: '5% OFF', 
    description: '5% off on all medicine and health products.', 
    expiration: '1 Jan 2026', 
    isUsed: false, 
    isUniversal: false, 
    shop: 'Health Pharmacy' 
  },
];

interface Voucher {
  id: number;
  code: string;
  discount: string;
  description: string;
  expiration: string;
  isUsed: boolean;
  isUniversal: boolean;
  shop: string;
}

// Place this interface near the top of your file, next to the Voucher interface.
interface ShopTabProps {
  name: string;
  activeTab: string;
  // setActiveTab is a function that takes a string and returns nothing (void)
  setActiveTab: (name: string) => void; 
}

const MOCK_REWARDS = [
  { id: 1, name: 'Free Coffee', pointsCost: 500, claimed: false, shop: 'Cafe Hub' },
  { id: 2, name: '$5 Off Voucher', pointsCost: 800, claimed: false, shop: 'Universal' },
  { id: 3, name: 'Priority Delivery', pointsCost: 1500, claimed: false, shop: 'Universal' },
];

// --- Helper Components ---

function VoucherCard({ voucher, onApply }: { voucher: Voucher, onApply: (id: number) => void }) {
  const isExpired = new Date(voucher.expiration) < new Date();
  const cardClasses = voucher.isUsed || isExpired
    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-dashed"
    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-solid";

  return (
    <div className={`flex items-center border-2 border-[#7FC354] rounded-lg overflow-hidden my-3 shadow-md ${cardClasses}`}>
      {/* Discount Tag */}
      <div className="bg-[#7FC354] h-full p-3 flex flex-col items-center justify-center min-w-20">
        <Ticket className="w-6 h-6 text-white" />
        <p className="text-white text-sm font-bold mt-1 text-center">{voucher.discount}</p>
      </div>
      
      {/* Details */}
      <div className="flex-1 p-3">
        <p className="font-semibold text-sm">{voucher.code}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{voucher.description}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Expires: {voucher.expiration}
        </p>
        <p className="text-xs text-blue-500 font-medium">{voucher.shop}</p>
      </div>

      {/* Action Button */}
      <div className="p-3">
        {voucher.isUsed ? (
          <button className="text-xs text-red-500 px-3 py-1 rounded-full border border-red-500">Used</button>
        ) : isExpired ? (
          <button className="text-xs text-gray-500 px-3 py-1 rounded-full border border-gray-500">Expired</button>
        ) : (
          <button 
            onClick={() => onApply(voucher.id)}
            className="text-xs bg-[#7FC354] hover:bg-[#6AA447] text-white px-3 py-1 rounded-full"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

function ShopTab({ name, activeTab, setActiveTab }: ShopTabProps) {
  const isActive = activeTab === name;
  const classes = isActive 
    ? "bg-[#7FC354] text-white" 
    : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600";
  return (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${classes}`}
    >
      {name}
    </button>
  );
}

// --- Main Component ---

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState(MOCK_VOUCHERS);
  const [rewards, setRewards] = useState(MOCK_REWARDS);
  const [points, setPoints] = useState(1250);
  const [shopTab, setShopTab] = useState('Super Market');
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  const shopNames = ['Super Market', 'Health Pharmacy', 'Local Bakery'];

  const handleApplyVoucher = (voucherId: number) => {
    const voucherToApply = vouchers.find(v => v.id === voucherId);
    if (voucherToApply) {
      // Logic to simulate applying a voucher
      setAppliedVoucher(voucherToApply);
      // In a real app, you'd send this to a cart state manager
      alert(`Applied voucher: ${voucherToApply.code}!`);
    }
  };

  const handleClaimReward = (rewardId: number, pointsCost: number) => {
    if (points >= pointsCost) {
      setPoints(prev => prev - pointsCost);
      setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, claimed: true } : r));
      alert(`Successfully claimed reward! ${pointsCost} points deducted.`);
    } else {
      alert("Not enough points to claim this reward.");
    }
  };

  const currentShopVouchers = vouchers.filter(v => v.shop === shopTab && !v.isUsed && !v.isUniversal && new Date(v.expiration) >= new Date());

  const universalVouchers = vouchers.filter(v => v.isUniversal && !v.isUsed && new Date(v.expiration) >= new Date());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center shadow-sm z-10">
        <Link href="/customerPage/profile" className="text-gray-600 dark:text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-semibold ml-4">Vouchers & Rewards</h1>
      </header>

      <main className="max-w-xl mx-auto p-4 space-y-8">

        {/* -------------------- LOYALTY REWARDS SECTION -------------------- */}
        <section>
          <div className="flex justify-between items-center bg-[#ffe0b2] dark:bg-[#7d4e13] p-4 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-[#ff9800]" />
              <div>
                <p className="text-sm font-medium text-[#795548] dark:text-[#ffcc80]">Your MerkaGo Points</p>
                <p className="text-2xl font-bold text-[#795548] dark:text-white">{points}</p>
              </div>
            </div>
            <button className="text-sm text-white bg-[#ff9800] hover:bg-[#fb8c00] py-2 px-4 rounded-full font-semibold">
              How it works
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mt-6 mb-3 flex items-center gap-2">
            <Receipt className="w-5 h-5" /> Claim Your Rewards
          </h2>
          <div className="space-y-3">
            {MOCK_REWARDS.map(reward => (
              <div key={reward.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
                <div>
                  <p className="font-semibold">{reward.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Shop: {reward.shop}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#ff9800]">{reward.pointsCost} pts</span>
                  <button 
                    onClick={() => handleClaimReward(reward.id, reward.pointsCost)}
                    disabled={points < reward.pointsCost || reward.claimed}
                    className={`text-xs text-white py-1 px-3 rounded-full font-semibold transition-colors ${
                      points < reward.pointsCost || reward.claimed 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#ff9800] hover:bg-[#fb8c00]'
                    }`}
                  >
                    {reward.claimed ? 'Claimed' : 'Claim Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------- UNIVERSAL VOUCHERS SECTION -------------------- */}
        <section>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
            <Ticket className="w-5 h-5" /> Universal Vouchers
          </h2>
          {universalVouchers.length > 0 ? (
            universalVouchers.map(voucher => (
              <VoucherCard key={voucher.id} voucher={voucher} onApply={handleApplyVoucher} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No active universal vouchers right now.</p>
          )}
        </section>

        {/* -------------------- SHOP-SPECIFIC VOUCHERS SECTION -------------------- */}
        <section>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
            <Store className="w-5 h-5" /> Vouchers Per Shop
          </h2>

          {/* Shop Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {shopNames.map(shop => (
              <ShopTab 
                key={shop} 
                name={shop} 
                activeTab={shopTab} 
                setActiveTab={setShopTab} 
              />
            ))}
          </div>

          {/* Vouchers List */}
          <div className="mt-3">
            {currentShopVouchers.length > 0 ? (
              currentShopVouchers.map(voucher => (
                <VoucherCard key={voucher.id} voucher={voucher} onApply={handleApplyVoucher} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No active vouchers for {shopTab} right now.
              </p>
            )}
          </div>
        </section>

        {/* -------------------- ADD DISCOUNT CODE -------------------- */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-md font-bold text-gray-700 dark:text-gray-200 mb-2">
                Have a discount code?
            </h2>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Enter code (e.g., BLACKFRIDAY)"
                    className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
                <button className="bg-[#7FC354] hover:bg-[#6AA447] text-white py-2 px-4 rounded-lg font-semibold">
                    Add
                </button>
            </div>
        </section>
      </main>

      {/* -------------------- VOUCHER USAGE AT CHECKOUT SIMULATION -------------------- */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-2xl">
        <div className="max-w-xl mx-auto space-y-2">
            <h3 className="font-bold text-lg">Your Current Order</h3>
            <div className="flex justify-between text-sm">
                <p>Subtotal (3 items)</p>
                <p>₱1060.50</p>
            </div>
            
            <div className="flex justify-between items-center text-sm border-t pt-2">
                <p className="font-semibold flex items-center gap-1">
                    <Wallet className="w-4 h-4 text-green-500" /> Voucher Applied
                </p>
                {appliedVoucher ? (
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#7FC354]">{appliedVoucher.code}</span>
                        <button onClick={() => setAppliedVoucher(null)}>
                            <X className="w-4 h-4 text-red-500" />
                        </button>
                    </div>
                ) : (
                    <span className="text-gray-500">None</span>
                )}
            </div>

            <Link href="/customerPage/checkout" className="w-full mt-3 block">
                <button className="w-full bg-[#7FC354] hover:bg-[#6AA447] text-white font-bold py-3 px-4 rounded-lg">
                    Proceed to Checkout
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
}