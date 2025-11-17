"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  bank: string;
  accountNumber: string;
  cvv: string;
  expirationDate: string;
}

interface AdPlacementProps {
  showAdPlacementModal: boolean;
  showAdConfirmationModal: boolean;
  onCloseAdPlacement: () => void;
  onCloseAdConfirmation: () => void;
  onOpenAdConfirmation: () => void;
  paymentMethods: PaymentMethod[];
}

const adTiers = [
  {
    id: "basic",
    name: "Basic",
    price: 200,
    reach: "500-1,000",
    description: "Perfect for local promotion",
    features: ["Local area reach", "7 days duration", "Standard placement"]
  },
  {
    id: "standard",
    name: "Standard",
    price: 500,
    reach: "2,000-5,000",
    description: "Expand your visibility",
    features: ["City-wide reach", "14 days duration", "Priority placement", "Weekend boost"]
  },
  {
    id: "premium",
    name: "Premium",
    price: 1000,
    reach: "10,000+",
    description: "Maximum exposure",
    features: ["Regional reach", "30 days duration", "Top placement", "Featured badge", "Analytics dashboard"]
  }
];

export default function AdPlacement({
  showAdPlacementModal,
  showAdConfirmationModal,
  onCloseAdPlacement,
  onCloseAdConfirmation,
  onOpenAdConfirmation,
  paymentMethods
}: AdPlacementProps) {
  const [selectedAdTier, setSelectedAdTier] = useState<"basic" | "standard" | "premium" | null>(null);
  const [selectedAdPaymentMethod, setSelectedAdPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const maskAccountNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    return "•••• •••• •••• " + cleaned.slice(-4);
  };

  const handleAdTierSelect = (tier: "basic" | "standard" | "premium") => {
    setSelectedAdTier(tier);
  };

  const handleProceedToAdConfirmation = () => {
    if (!selectedAdPaymentMethod || !selectedAdTier) {
      toast.error("Please select a payment method and ad tier");
      return;
    }
    onCloseAdPlacement();
    // Small delay to ensure smooth transition
    setTimeout(() => {
      onOpenAdConfirmation();
    }, 100);
  };

  const handlePurchaseAd = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onCloseAdConfirmation();
    setSelectedAdTier(null);
    setSelectedAdPaymentMethod("");
    toast.success("Ad placement purchased successfully! 🎉");
  };

  const handleGoBack = () => {
    onCloseAdConfirmation();
    // Small delay to ensure smooth transition
    setTimeout(() => {
      // This will be handled by parent component
    }, 100);
  };

  return (
    <>
      {/* Ad Placement Modal */}
      <Dialog open={showAdPlacementModal} onOpenChange={onCloseAdPlacement}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <CreditCard className="size-5 text-blue-600" />
              </div>
              <DialogTitle>Promote Your Business</DialogTitle>
            </div>
            <DialogDescription>
              Choose an ad tier to boost your visibility and reach more customers
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Ad Tiers */}
            <div className="grid gap-3">
              {adTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleAdTierSelect(tier.id as "basic" | "standard" | "premium")}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedAdTier === tier.id
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{tier.name} Tier</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tier.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">₱{tier.price}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">one-time</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Reach: {tier.reach} potential buyers
                    </p>
                  </div>
                  <div className="space-y-1">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Check className="size-3 text-green-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Payment Method Selection */}
            {selectedAdTier && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <Label htmlFor="ad-payment-method">Select Payment Method</Label>
                {paymentMethods.length > 0 ? (
                  <Select value={selectedAdPaymentMethod} onValueChange={setSelectedAdPaymentMethod}>
                    <SelectTrigger id="ad-payment-method">
                      <SelectValue placeholder="Choose a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          <div className="flex items-center gap-2">
                            <CreditCard className="size-4" />
                            <span>{method.bank} {maskAccountNumber(method.accountNumber)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-4 border-2 border-dashed rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      No payment methods available. Please add one in Settings.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  onCloseAdPlacement();
                  setSelectedAdTier(null);
                  setSelectedAdPaymentMethod("");
                }}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceedToAdConfirmation}
                disabled={isProcessing || !selectedAdTier || !selectedAdPaymentMethod}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ad Confirmation Modal */}
      <Dialog open={showAdConfirmationModal} onOpenChange={onCloseAdConfirmation}>
        <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <CreditCard className="size-5 text-blue-600" />
              </div>
              <DialogTitle>Confirm Ad Purchase</DialogTitle>
            </div>
            <DialogDescription>
              Please review your ad placement details before confirming
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Payment Summary */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You are about to pay</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    ₱{adTiers.find(t => t.id === selectedAdTier)?.price}.00
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-600">
                  <CreditCard className="size-6 text-white" />
                </div>
              </div>
              <div className="pt-3 border-t border-blue-200 dark:border-blue-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {adTiers.find(t => t.id === selectedAdTier)?.name} Tier Ad Placement
                </p>
              </div>
            </div>

            {/* Ad Details */}
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ad Placement Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tier</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {adTiers.find(t => t.id === selectedAdTier)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Estimated reach</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {adTiers.find(t => t.id === selectedAdTier)?.reach} buyers
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Payment method</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {paymentMethods.find(m => m.id === selectedAdPaymentMethod)?.bank} {maskAccountNumber(paymentMethods.find(m => m.id === selectedAdPaymentMethod)?.accountNumber || "")}
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-900 dark:text-gray-100">Total due today</span>
                    <span className="text-lg text-gray-900 dark:text-gray-100">
                      ₱{adTiers.find(t => t.id === selectedAdTier)?.price}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Included */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Included Features:</p>
              <div className="space-y-1">
                {adTiers.find(t => t.id === selectedAdTier)?.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                    <Check className="size-3 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confirmation Notice */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Note:</strong> By confirming, you authorize us to charge ₱{adTiers.find(t => t.id === selectedAdTier)?.price}.00 to your selected payment method for this ad placement.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleGoBack}
                disabled={isProcessing}
                className="flex-1"
              >
                Go Back
              </Button>
              <Button
                onClick={handlePurchaseAd}
                disabled={isProcessing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="size-4 mr-2" />
                    Confirm Purchase
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
