"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleMinus } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
};

const mockCart: CartItem[] = [
  {
    id: 1,
    name: "Onion",
    price: 120,
    qty: 1,
    image: "/imageAssets/onion.jpg",
  },
  {
    id: 2,
    name: "Chicken Breast",
    price: 220,
    qty: 2,
    image: "/imageAssets/manok.jpg",
  },
];

export default function CartItems() {
  if (mockCart.length === 0) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Cart is empty.
      </div>
    );
  }

  return (
    <div className="space-y-2 py-4 mx-2">
      {mockCart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border rounded-lg p-3"
        >
          {/* IMAGE */}
          <div className="flex items-center gap-3">
            <Image
              src={item.image}
              width={50}
              height={50}
              alt={item.name}
              className="rounded-lg"
            />

            {/* DETAILS */}
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">₱{item.price}</p>
              <p className="text-xs text-gray-400">Qty: {item.qty}</p>
            </div>
          </div>

          {/* REMOVE BUTTON */}
          <Button variant="ghost" size="icon">
            <CircleMinus className="w-4 h-4" color="#fb2c36"/>
          </Button>
        </div>
      ))}
    </div>
  );
}
