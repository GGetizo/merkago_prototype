// /app/customerPage/checkout/page.tsx (or equivalent)
"use client";

import { ChevronLeft, MapPin, NotebookPen, CreditCard, Ticket } from "lucide-react";
import Link from "next/link";
import { useState } from "react"; // 💡 Import useState for local voucher selection
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// --- Mock Data ---
const hardcodedItems = [
  { id: 1, name: "Onion", quantity: 1, price: 120, total: 120 },
  { id: 2, name: "Chicken (Breasts)", quantity: 2, price: 220, total: 440 },
  { id: 3, name: "Bangus", quantity: 2, price: 200, total: 400 },
];

const AVAILABLE_VOUCHERS = [
    { id: 'v1', code: 'MERKAGO50', discount: 50.00, description: '₱50 off all orders' },
    { id: 'v2', code: 'FRESHSHIP', discount: 40.00, description: 'Free Delivery (max ₱40)' },
    { id: 'v3', code: 'SAVE10', discount: 10.00, description: '₱10 off on vegetables' },
];

// --- Calculations ---
const subtotal = hardcodedItems.reduce((sum, item) => sum + item.total, 0);
const deliveryFee = 50.00;
const serviceFee = 10.50;

// Note: Discount calculation will be handled by state below.

export default function CheckoutPage() {
    // 💡 State to manage the selected voucher
    const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>('v1'); // Default to 'v1' applied
    
    // Find the currently applied voucher details
    const appliedVoucher = AVAILABLE_VOUCHERS.find(v => v.id === selectedVoucherId);
    const appliedDiscountAmount = appliedVoucher ? appliedVoucher.discount : 0;
    const appliedVoucherCode = appliedVoucher ? appliedVoucher.code : null;

    const totalAmount = subtotal + deliveryFee + serviceFee - appliedDiscountAmount;

    const handlePlaceOrder = () => {
        toast.success("Order placed successfully! Thank you for shopping with MerkaGo.");
    };

    const handleVoucherSelect = (id: string) => {
        if (selectedVoucherId === id) {
            // Deselect if already selected
            setSelectedVoucherId(null);
        } else {
            // Select new voucher
            setSelectedVoucherId(id);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            
            {/* Header */}
            <header className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center shadow-sm z-10">
                <Link href="/customerPage/" className="text-gray-600 dark:text-gray-400">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-lg font-semibold ml-4">Checkout</h1>
            </header>

            <main className="max-w-xl mx-auto p-4 space-y-6">

                {/* Delivery Address */}
                <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-md font-bold flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#7FC354]" /> Delivery Address
                        </h2>
                        <button className="text-sm text-[#7FC354] font-medium">Change</button>
                    </div>
                    <p className="text-sm font-semibold">Juan Dela Cruz</p>
                    <p className="text-sm text-gray-500">
                        123 Main Street, Unit 5A, Pasig, Philippines
                    </p>
                    <p className="text-sm text-gray-500">
                        +63 917 XXX XXXX
                    </p>
                </section>

                {/* Order Details */}
                <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <h2 className="text-md font-bold mb-3">Order Summary</h2>
                    <div className="space-y-2">
                        {hardcodedItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.quantity}x {item.name}
                                </p>
                                <p>₱{item.total.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <button className="text-sm text-[#7FC354] font-medium mt-3 flex items-center gap-1">
                        <NotebookPen className="w-4 h-4" /> Add instructions
                    </button>
                </section>

                {/* Payment Method */}
                <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <div className="flex justify-between items-center">
                        <h2 className="text-md font-bold flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-[#7FC354]" /> Payment Method
                        </h2>
                        <button className="text-sm text-[#7FC354] font-medium">Change</button>
                    </div>
                    <p className="text-sm font-semibold mt-2">Cash on Delivery</p>
                </section>
                
                {/* 🛒 VOUCHER SELECTION SECTION 🛒 */}
                <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <h2 className="text-md font-bold flex items-center gap-3 mb-3 border-b pb-2">
                        <Ticket className="w-5 h-5 text-[#ff6b35]" /> Available Vouchers
                    </h2>
                    
                    <div className="space-y-2">
                        {AVAILABLE_VOUCHERS.map(voucher => (
                            <div 
                                key={voucher.id} 
                                className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-colors ${selectedVoucherId === voucher.id ? 'bg-[#7FC354]/10 border border-[#7FC354]' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                onClick={() => handleVoucherSelect(voucher.id)}
                            >
                                <div>
                                    <p className="font-semibold text-sm">{voucher.code}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{voucher.description}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-[#ff6b35]">-₱{voucher.discount.toFixed(2)}</span>
                                    <div 
                                        className={`w-4 h-4 rounded-full border-2 ml-3 ${selectedVoucherId === voucher.id ? 'bg-[#7FC354] border-[#7FC354]' : 'border-gray-400 dark:border-gray-500'}`}
                                        role="radio"
                                        aria-checked={selectedVoucherId === voucher.id}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {selectedVoucherId && (
                        <p className="mt-3 text-sm text-center text-green-600 dark:text-green-400 font-medium">
                            {appliedVoucherCode} applied successfully!
                        </p>
                    )}
                    
                </section>

                {/* Price Details */}
                <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                    <h2 className="text-md font-bold mb-3">Price Details</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                            <p>₱{subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-600 dark:text-gray-400">Delivery Fee</p>
                            <p>₱{deliveryFee.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-600 dark:text-gray-400">Service Fee</p>
                            <p>₱{serviceFee.toFixed(2)}</p>
                        </div>
                        
                        {/* Discount Line Item */}
                        {appliedDiscountAmount > 0 && (
                            <div className="flex justify-between text-green-600 dark:text-green-400 font-medium border-t pt-2">
                                <p>Voucher Discount ({appliedVoucherCode})</p>
                                <p>-₱{appliedDiscountAmount.toFixed(2)}</p>
                            </div>
                        )}

                        <div className="flex justify-between pt-3 border-t font-bold text-base">
                            <p>Total</p>
                            <p>₱{totalAmount.toFixed(2)}</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Fixed Footer for Place Order Button */}
            <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg">
                <div className="max-w-xl mx-auto flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Total payable</p>
                        <p className="text-xl font-bold text-[#7FC354]">₱{totalAmount.toFixed(2)}</p>
                    </div>
                    <Button
                        onClick={handlePlaceOrder}
                        className="bg-[#7FC354] hover:bg-[#6AA447] text-white font-bold py-3 px-8 rounded-full"
                    >
                        Place Order
                    </Button>
                </div>
            </footer>
        </div>
    );
}