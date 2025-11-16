"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface RequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
  onPayoutSuccess: (amount: number, method: string) => void;
}

const PLATFORM_FEE_PERCENT = 5;
const MINIMUM_PAYOUT = 500;

export default function RequestPayoutModal({ open, onOpenChange, availableBalance, onPayoutSuccess }: RequestPayoutModalProps) {
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("BDO");
  const [isLoading, setIsLoading] = useState(false);

  const parsedAmount = parseFloat(amount) || 0;
  const platformFee = (parsedAmount * PLATFORM_FEE_PERCENT) / 100;
  const netAmount = parsedAmount - platformFee;

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const cleaned = value.replace(/[^\d.]/g, "");
    // Prevent multiple decimal points
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    
    setAmount(cleaned);
  };

  const handleMaxAmount = () => {
    setAmount(availableBalance.toString());
  };

  const validatePayout = () => {
    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return false;
    }
    if (parsedAmount < MINIMUM_PAYOUT) {
      toast.error(`Minimum payout amount is ₱${MINIMUM_PAYOUT.toLocaleString()}`);
      return false;
    }
    if (parsedAmount > availableBalance) {
      toast.error("Insufficient balance");
      return false;
    }
    if (!selectedAccount) {
      toast.error("Please select a payment method");
      return false;
    }
    return true;
  };

  const handleRequestPayout = async () => {
    if (!validatePayout()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    
    // Deduct the requested amount from the available balance and add to history
    const methodDisplay = selectedAccount === "BDO" ? "BDO (•••• 3456)" : "BPI (•••• 7654)";
    onPayoutSuccess(parsedAmount, methodDisplay);
    
    toast.success(`Payout request of ₱${netAmount.toFixed(2)} submitted successfully!`, {
      description: "Your funds will be transferred within 1-3 business days",
    });
    
    // Reset form
    setAmount("");
    setSelectedAccount("BDO");
    onOpenChange(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      setAmount("");
      setSelectedAccount("BDO");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Wallet className="size-5 text-primary" />
            </div>
            <DialogTitle>Request Payout</DialogTitle>
          </div>
          <DialogDescription>
            Transfer your earnings to your bank account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Available Balance */}
          <Card className="bg-gradient-to-r from-[#7FC354] to-[#6fa844]">
            <CardContent className="p-4">
              <p className="text-sm text-white/80 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-white">
                ₱{availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </CardContent>
          </Card>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Payout Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm font-medium">₱</span>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="pl-7 pr-20 text-lg font-semibold"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleMaxAmount}
                className="absolute right-1 top-1 h-8 text-[#7FC354] hover:text-[#6fa844]"
                disabled={isLoading}
              >
                MAX
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum: ₱{MINIMUM_PAYOUT.toLocaleString()} • Maximum: ₱{availableBalance.toLocaleString()}
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="account">Payment Method</Label>
            <Select
              value={selectedAccount}
              onValueChange={setSelectedAccount}
              disabled={isLoading}
            >
              <SelectTrigger id="account">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BDO">BDO (•••• 3456)</SelectItem>
                <SelectItem value="BPI">BPI (•••• 7654)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Breakdown */}
          {parsedAmount > 0 && (
            <Card className="border-2">
              <CardContent className="p-4 space-y-2">
                <p className="text-sm font-medium mb-2">Payout Breakdown</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Requested Amount</span>
                    <span className="font-medium">₱{parsedAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee ({PLATFORM_FEE_PERCENT}%)</span>
                    <span className="font-medium text-red-500">-₱{platformFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-1.5 mt-2 flex justify-between">
                    <span className="font-semibold">You'll Receive</span>
                    <span className="font-bold text-[#7FC354] text-lg">₱{netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Messages */}
          {parsedAmount > 0 && parsedAmount < MINIMUM_PAYOUT && (
            <div className="flex gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg">
              <AlertCircle className="size-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  Below minimum amount
                </p>
                <p className="text-yellow-700 dark:text-yellow-400 mt-0.5">
                  Minimum payout is ₱{MINIMUM_PAYOUT.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {parsedAmount >= MINIMUM_PAYOUT && parsedAmount <= availableBalance && (
            <div className="flex gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
              <CheckCircle2 className="size-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800 dark:text-green-300">
                  Payout ready to process
                </p>
                <p className="text-green-700 dark:text-green-400 mt-0.5">
                  Funds will arrive in 1-3 business days
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestPayout}
              disabled={isLoading || parsedAmount < MINIMUM_PAYOUT || parsedAmount > availableBalance}
              className="flex-1 bg-[#7FC354] hover:bg-[#6fa844]"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Request Payout
                  <ArrowRight className="size-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
