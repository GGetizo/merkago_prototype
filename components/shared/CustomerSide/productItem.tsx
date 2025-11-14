"use client"; // This component now uses state, so it must be a Client Component

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // shadcn
import { Label } from "@/components/ui/label"; // shadcn
import { Input } from "@/components/ui/input"; // shadcn

// --- Props Definition ---
type ProductItemCardProps = {
  imageUrl: string;
  name: string;
  price: string;
  badge?: string;
  category: string;
  subCategory: string;
};

export default function ProductItemCard({
  imageUrl,
  name,
  price,
  badge,
  category,
  subCategory,
}: ProductItemCardProps) {
  // State for all possible options.
  // We'll only show the ones that are relevant.
  const [cut, setCut] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string | undefined>(undefined);
  const [unitValue, setUnitValue] = useState<string | undefined>(undefined);
  const [part, setPart] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [otherCut, setOtherCut] = useState<string>("");
  const [note, setNote] = useState<string>("");

  // This function renders the dynamic options using shadcn components
  const renderOptions = () => {
    // meat sub category
    if (category === "Meat" && subCategory === "Beef") {
      // Your request: 4 dropdowns for Beef
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cut" className="text-right">
              Cut
            </Label>
            <Select onValueChange={setCut} value={cut}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a cut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ground">Ground</SelectItem>
                <SelectItem value="caldereta">Caldereta Cut</SelectItem>
                <SelectItem value="adobo">Adobo Cut</SelectItem>
                <SelectItem value="Nilaga">Nilaga Cut</SelectItem>
                <SelectItem value="mechado">Mechado Cut</SelectItem>
                <SelectItem value="menudo">Menudo Cut</SelectItem>
                <SelectItem value="BBQ">BBQ Cut</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NEW: Conditional Input for "Others" */}
          {cut === "others" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="otherCut" className="text-right">
                Specify Cut
              </Label>
              <Input
                id="otherCut"
                placeholder="e.g. Sinigang Cut"
                className="col-span-3"
                value={otherCut}
                onChange={(e) => setOtherCut(e.target.value)}
              />
            </div>
          )}

          {/* UPDATED: Weight Input + Unit Select */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 1"
                defaultValue={1}
                className="col-span-2"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Select onValueChange={setUnitValue} value={unitValue} defaultValue="kg">
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              placeholder="Special Request"
              className="col-span-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      );
    }

    // chicken sub category
    if (category === "Meat" && subCategory === "Chicken") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="part" className="text-right">
              Part
            </Label>
            <Select onValueChange={setPart} value={part}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a part" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breast">Breast</SelectItem>
                <SelectItem value="thigh">Thigh</SelectItem>
                <SelectItem value="wings">Wings</SelectItem>
                <SelectItem value="drumstick">Leg Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* UPDATED: Weight Input + Unit Select */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 1"
                defaultValue={1}
                className="col-span-2"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Select onValueChange={setUnitValue} value={unitValue} defaultValue="kg">
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              placeholder="Special Request"
              className="col-span-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
      );
    }

    // Vegetable sub category
    if (category === "Produce" && subCategory === "Vegetable") {
      return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 1"
                defaultValue={1}
                className="col-span-2"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Select onValueChange={setUnitValue} value={unitValue} defaultValue="kg">
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
      );
    }

    // Default for all other items (like bread, onions)
    return (
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="quantity" className="text-right">
          Quantity
        </Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
          className="col-span-3"
        />
      </div>
    );
  };

  const handleAddToCart = () => {
    // Here you would gather all the state
    // and send it to your cart.
    const cartItem = {
      name,
      price,
      quantity,
      cut,
      weight,
      part,
      note,
    };
    console.log("Adding to cart:", cartItem);
    // You would then call your cart context or state manager
    // and finally close the dialog (which happens automatically
    // if you don't prevent it, or you can manage open state)
  };

  return (
    <Dialog>
      {/* The card is now the Dialog Trigger */}
      <DialogTrigger asChild>
        <div className="shrink-0 w-32 mr-3 text-left cursor-pointer">
          {/* Card Image Container */}
          <div className="relative w-32 h-32 bg-white rounded-xl border border-gray-200 flex items-center justify-center mb-2">
            {badge && (
              <span className="absolute top-2 left-2 bg-[#E91E63] text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                {badge}
              </span>
            )}
            <div className="relative w-24 h-24">
              <Image
                src={imageUrl}
                alt={name}
                fill
                objectFit="contain"
              />
            </div>
          </div>
          {/* Text Details */}
          <div>
            <p className="font-bold text-sm text-gray-900">{price}</p>
            <p className="text-xs text-gray-500 line-clamp-2 leading-tight">
              {name}
            </p>
          </div>
        </div>
      </DialogTrigger>

      {/* The Modal Content (now a DialogContent) */}
      <DialogContent className="sm:max-w-[425px] p-0">
        {/* Image container at the top */}
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover" // 'cover' fills the container
            className="rounded-t-md"
          />
        </div>

        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>

        {/* Modal Body (Dynamic Options) */}
        <div className="py-4 px-6">{renderOptions()}</div>

        {/* Modal Footer */}
        <DialogFooter className="px-6 pb-6">
          <Button
            onClick={handleAddToCart}
            className="bg-[#7FC354] text-white font-bold hover:bg-green-700 w-full"
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
