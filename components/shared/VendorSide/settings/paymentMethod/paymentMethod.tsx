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
import { CreditCard, Trash2, Plus } from "lucide-react";

interface PaymentMethod {
  id: string;
  bank: string;
  accountNumber: string;
  cvv: string;
  expirationDate: string;
}

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BANKS = [
  "BDO",
  "BPI",
  "Metrobank",
  "Landbank",
  "UnionBank",
  "Security Bank",
  "PNB",
  "RCBC",
  "Chinabank",
  "EastWest Bank",
];

export default function PaymentMethodModal({ open, onOpenChange }: PaymentMethodModalProps) {
  // Hardcoded existing payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      bank: "BDO",
      accountNumber: "1234 5678 9012 3456",
      cvv: "123",
      expirationDate: "12/25",
    },
    {
      id: "2",
      bank: "BPI",
      accountNumber: "9876 5432 1098 7654",
      cvv: "456",
      expirationDate: "06/26",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newMethod, setNewMethod] = useState({
    bank: "",
    accountNumber: "",
    cvv: "",
    expirationDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNew = () => {
    setIsAdding(true);
    setNewMethod({
      bank: "",
      accountNumber: "",
      cvv: "",
      expirationDate: "",
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewMethod({
      bank: "",
      accountNumber: "",
      cvv: "",
      expirationDate: "",
    });
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpirationDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === "accountNumber") {
      formattedValue = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    } else if (field === "expirationDate") {
      formattedValue = formatExpirationDate(value.slice(0, 5));
    }

    setNewMethod((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSaveMethod = async () => {
    // Validation
    if (!newMethod.bank) {
      toast.error("Please select a bank");
      return;
    }
    if (newMethod.accountNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Account number must be 16 digits");
      return;
    }
    if (newMethod.cvv.length !== 3) {
      toast.error("CVV must be 3 digits");
      return;
    }
    if (newMethod.expirationDate.length !== 5) {
      toast.error("Please enter a valid expiration date (MM/YY)");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      ...newMethod,
    };

    setPaymentMethods((prev) => [...prev, newPaymentMethod]);
    setIsAdding(false);
    setIsLoading(false);
    toast.success("Payment method added successfully!");
    
    setNewMethod({
      bank: "",
      accountNumber: "",
      cvv: "",
      expirationDate: "",
    });
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
    toast.success("Payment method removed");
  };

  const handleClose = () => {
    setIsAdding(false);
    setNewMethod({
      bank: "",
      accountNumber: "",
      cvv: "",
      expirationDate: "",
    });
    onOpenChange(false);
  };

  const maskAccountNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    return "•••• •••• •••• " + cleaned.slice(-4);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <CreditCard className="size-5 text-primary" />
            </div>
            <DialogTitle>Payment Methods</DialogTitle>
          </div>
          <DialogDescription>
            Manage your payment methods for receiving payouts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Existing Payment Methods */}
          {paymentMethods.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Saved Payment Methods
              </h3>
              {paymentMethods.map((method) => (
                <Card key={method.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="size-4 text-[#7FC354]" />
                          <span className="font-semibold text-sm">{method.bank}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                          {maskAccountNumber(method.accountNumber)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires: {method.expirationDate}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMethod(method.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Add New Payment Method Form */}
          {isAdding ? (
            <div className="space-y-4 p-4 border-2 border-dashed rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Add New Payment Method
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="bank">Bank</Label>
                <Select
                  value={newMethod.bank}
                  onValueChange={(value) => handleInputChange("bank", value)}
                >
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {BANKS.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  placeholder="1234 5678 9012 3456"
                  value={newMethod.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  maxLength={19}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    placeholder="MM/YY"
                    value={newMethod.expirationDate}
                    onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                    maxLength={5}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    value={newMethod.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    maxLength={3}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={handleCancelAdd}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveMethod}
                  disabled={isLoading}
                  className="flex-1 bg-[#7FC354] hover:bg-[#6fa844]"
                >
                  {isLoading ? "Saving..." : "Save Method"}
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={handleAddNew}
              className="w-full border-dashed border-2"
            >
              <Plus className="size-4 mr-2" />
              Add New Payment Method
            </Button>
          )}

          {!isAdding && (
            <Button
              variant="default"
              onClick={handleClose}
              className="w-full bg-[#7FC354] hover:bg-[#6fa844]"
            >
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
