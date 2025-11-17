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
import { Check, Crown, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  bank: string;
  accountNumber: string;
  cvv: string;
  expirationDate: string;
}

interface PremiumSubscriptionProps {
  showPaymentModal: boolean;
  showConfirmationModal: boolean;
  onClosePayment: () => void;
  onCloseConfirmation: () => void;
  onOpenConfirmation: () => void;
  onSubscribeSuccess: () => void;
  paymentMethods: PaymentMethod[];
}

export default function PremiumSubscription({
  showPaymentModal,
  showConfirmationModal,
  onClosePayment,
  onCloseConfirmation,
  onOpenConfirmation,
  onSubscribeSuccess,
  paymentMethods
}: PremiumSubscriptionProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const maskAccountNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    return "•••• •••• •••• " + cleaned.slice(-4);
  };

  const handleProceedToConfirmation = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    onClosePayment();
    setTimeout(() => {
      onOpenConfirmation();
    }, 100);
  };

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    onCloseConfirmation();
    setSelectedPaymentMethod("");
    onSubscribeSuccess();
    toast.success("Successfully subscribed to Premium! 🎉");
  };

  return (
    <>
      {/* Payment Selection Modal */}
      <Dialog open={showPaymentModal} onOpenChange={onClosePayment}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Crown className="size-5 text-yellow-600" />
              </div>
              <DialogTitle>Subscribe to Premium</DialogTitle>
            </div>
            <DialogDescription>
              Select a payment method to unlock unlimited product listings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Subscription Details */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Premium Monthly Plan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Billed monthly</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">₱500</p>
              </div>
              <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Unlimited product listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Advanced sales analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Priority support</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <Label htmlFor="payment-method">Select Payment Method</Label>
              {paymentMethods.length > 0 ? (
                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <SelectTrigger id="payment-method">
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

            {/* Terms */}
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will auto-renew monthly until cancelled.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClosePayment}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceedToConfirmation}
                disabled={isProcessing || !selectedPaymentMethod}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold"
              >
                <Crown className="size-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={onCloseConfirmation}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <CreditCard className="size-5 text-yellow-600" />
              </div>
              <DialogTitle>Confirm Payment</DialogTitle>
            </div>
            <DialogDescription>
              Please review your subscription details before confirming
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Payment Summary */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">You are about to pay</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">₱500.00</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600">
                  <Crown className="size-6 text-white" />
                </div>
              </div>
              <div className="pt-3 border-t border-yellow-200 dark:border-yellow-700">
                <p className="text-xs text-gray-600 dark:text-gray-400">Premium Monthly Subscription</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Plan</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Premium Monthly</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Billing cycle</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Monthly</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Payment method</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.bank} {maskAccountNumber(paymentMethods.find(m => m.id === selectedPaymentMethod)?.accountNumber || "")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Next billing date</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">December 17, 2025</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-900 dark:text-gray-100">Total due today</span>
                    <span className="text-lg text-gray-900 dark:text-gray-100">₱500.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmation Notice */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-600 dark:text-blue-400">
                <strong>Note:</strong> By confirming, you authorize us to charge ₱500.00 to your selected payment method. Your subscription will auto-renew monthly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  onCloseConfirmation();
                }}
                disabled={isProcessing}
                className="flex-1"
              >
                Go Back
              </Button>
              <Button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="size-4 mr-2" />
                    Confirm Payment
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
