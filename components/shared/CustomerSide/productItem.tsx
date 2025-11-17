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
import { DialogDescription } from "@radix-ui/react-dialog";
import { Star, User, MessageSquare } from "lucide-react"; // Imported MessageSquare for reviews
import { toast } from "sonner";

// --- Props Definition ---
type ProductItemCardProps = {
  imageUrl: string;
  name: string;
  price: string;
  rating: string,
  sold: string,
  badge?: string;
  category: string;
  subCategory: string;
};

// --- Mock Review Data (Hardcoded) ---
const MOCK_REVIEWS = [
    {
        id: 1,
        author: "Maria S.",
        rating: 5,
        comment: "Excellent quality beef! Perfect for caldereta. Will order again.",
        date: "2 days ago",
    },
    {
        id: 2,
        author: "Juan D.",
        rating: 4,
        comment: "Good product, but the cut was slightly thicker than expected.",
        date: "1 week ago",
    },
    // Adding more mock reviews to force scrolling demonstration
    { id: 3, author: "Pedro P.", rating: 5, comment: "Always fresh and well-packaged!", date: "1 month ago" },
    { id: 4, author: "Liza M.", rating: 3, comment: "The delivery was quick, but the price is a bit high.", date: "3 weeks ago" },
    { id: 5, author: "Chris R.", rating: 5, comment: "Best chicken thigh cut I've had from an online grocer.", date: "2 months ago" },
];

// --- Helper Component for Reviews ---
function ReviewItem({ author, rating, comment, date }: { author: string, rating: number, comment: string, date: string }) {
    return (
        <div className="border-b dark:border-gray-700 py-3 last:border-b-0">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-sm">{author}</span>
                </div>
                <div className="flex items-center">
                    {Array(rating).fill(0).map((_, i) => (
                        <Star key={i} size={12} color="#ff6b35" fill="#ff6b35" />
                    ))}
                    {Array(5 - rating).fill(0).map((_, i) => (
                        <Star key={i} size={12} color="#ff6b35" />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">({rating}.0)</span>
                </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{comment}</p>
            <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
    );
}


export default function ProductItemCard({
  imageUrl,
  name,
  price,
  badge,
  sold,
  rating,
  category,
  subCategory,
}: ProductItemCardProps) {
  // State for all possible options.
  const [cut, setCut] = useState("");
  const [weight, setWeight] = useState("1");
  const [unitValue, setUnitValue] = useState("kg");
  const [part, setPart] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [otherCut, setOtherCut] = useState("");
  const [note, setNote] = useState("");

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
              Quantity
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 1"
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
              Quantity
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 1"
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

    // fish sub category
    if (category === "Meat" && subCategory === "Fish") {
      return (
        <div className="space-y-4">
          {/* UPDATED: Weight Input + Unit Select */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <Input
                id="weight"
                type="number"
                placeholder="e.g. 1"
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
          onChange={(e) => setQuantity(e.target.value)}
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
    toast.success(`${name} (${price}) added to cart!`);
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
          <div className="relative w-32 h-32 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-2">
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
              />
            </div>
          </div>
          {/* Text Details */}
          <div>
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{price}</p>
            <div className="flex justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                {name}
              </p>
              <div className="flex mt-1 space-x-1">
                <p className="flex text-[0.5rem] text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                  <Star size={8} color="#ff6b35" />{rating}
                </p>
                <p className="text-[0.5rem] text-gray-500 dark:text-gray-400 line-clamp-2 leading-tight">
                  ({sold})
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* The Modal Content (now a DialogContent) */}
      {/* 💡 FIX 1: Add flex, flex-col, and max-h-[80vh] to DialogContent */}
      <DialogContent className="sm:max-w-[425px] p-0 flex flex-col max-h-[90vh]">
        {/* Image container at the top (Fixed) */}
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-t-md"
          />
        </div>

        {/* Product Details Header (Fixed) */}
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex gap-1">{name} - <span className="text-sm flex"><Star size={16} color="#ff6b35" className="mt-0.5" />{rating}</span></DialogTitle>
          <DialogDescription>{price} - <span className="text-sm">({sold} sold)</span></DialogDescription>
        </DialogHeader>

        {/* 💡 FIX 2: Scrollable Content Wrapper */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Modal Body (Dynamic Options) */}
          {/* Note: Added pb-4 for separation from reviews */}
          <div className="pt-2 pb-4 px-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Customization Options</h3>
            {renderOptions()}
          </div>

          {/* --------------------------- NEW REVIEWS SECTION --------------------------- */}
          {/* Note: Removed max-h-60 and overflow-y-auto here, as the wrapper handles scrolling */}
          <div className="px-6 pt-0 pb-4 border-t dark:border-gray-700">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  <MessageSquare className="w-5 h-5 text-[#ff6b35]" /> Customer Reviews
              </h3>
              
              {MOCK_REVIEWS.length > 0 ? (
                  MOCK_REVIEWS.map(review => (
                      <ReviewItem key={review.id} {...review} />
                  ))
              ) : (
                  <p className="text-sm text-gray-500">Be the first to leave a review!</p>
              )}
          </div>
          {/* --------------------------------------------------------------------------- */}

        </div> {/* END Scrollable Wrapper */}

        {/* Modal Footer (Add to Cart Button - Fixed) */}
        <DialogFooter className="px-6 pb-6 pt-4 border-t dark:border-gray-700">
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