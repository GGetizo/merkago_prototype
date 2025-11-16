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
import { Switch } from "@/components/ui/switch";
import { Wallet, Calendar, DollarSign, Percent } from "lucide-react";

interface PayoutSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PayoutSettingsModal({ open, onOpenChange }: PayoutSettingsModalProps) {
  const [settings, setSettings] = useState({
    autoPayoutEnabled: true,
    payoutFrequency: "weekly",
    minimumPayout: "500",
    payoutDay: "friday",
    preferredMethod: "BDO",
    platformFee: "5",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(settings);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedSettings(settings);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSettings(settings);
  };

  const handleSave = async () => {
    // Validation
    const minPayout = parseFloat(editedSettings.minimumPayout);
    if (isNaN(minPayout) || minPayout < 100) {
      toast.error("Minimum payout must be at least ₱100");
      return;
    }
    if (minPayout > 50000) {
      toast.error("Minimum payout cannot exceed ₱50,000");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSettings(editedSettings);
    setIsEditing(false);
    setIsLoading(false);
    toast.success("Payout settings updated successfully!");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditedSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value.replace(/[^0-9.]/g, ""));
    return isNaN(number) ? "0" : number.toString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Wallet className="size-5 text-primary" />
            </div>
            <DialogTitle>Payout Settings</DialogTitle>
          </div>
          <DialogDescription>
            Configure how and when you receive your earnings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Current Balance Display */}
          <Card className="bg-gradient-to-r from-[#7FC354] to-[#6fa844]">
            <CardContent className="p-4">
              <p className="text-sm text-white/80 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-white">₱12,450.00</p>
              <p className="text-xs text-white/70 mt-2">
                Next payout: {settings.payoutFrequency === "weekly" ? "This Friday" : "End of Month"}
              </p>
            </CardContent>
          </Card>

          {/* Auto Payout */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#7FC354]" />
                    <p className="text-sm font-medium">Automatic Payouts</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically transfer funds to your account
                  </p>
                </div>
                <Switch
                  checked={isEditing ? editedSettings.autoPayoutEnabled : settings.autoPayoutEnabled}
                  onCheckedChange={(checked) => handleInputChange("autoPayoutEnabled", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payout Frequency */}
          <div className="space-y-2">
            <Label htmlFor="frequency" className="flex items-center gap-2">
              <Calendar className="size-4" />
              Payout Frequency
            </Label>
            {isEditing ? (
              <Select
                value={editedSettings.payoutFrequency}
                onValueChange={(value) => handleInputChange("payoutFrequency", value)}
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm p-2 bg-muted rounded-md capitalize">
                {settings.payoutFrequency}
              </p>
            )}
          </div>

          {/* Payout Day (if weekly) */}
          {(isEditing ? editedSettings.payoutFrequency : settings.payoutFrequency) === "weekly" && (
            <div className="space-y-2">
              <Label htmlFor="payoutDay">Preferred Day</Label>
              {isEditing ? (
                <Select
                  value={editedSettings.payoutDay}
                  onValueChange={(value) => handleInputChange("payoutDay", value)}
                >
                  <SelectTrigger id="payoutDay">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-muted rounded-md capitalize">
                  {settings.payoutDay}
                </p>
              )}
            </div>
          )}

          {/* Minimum Payout Amount */}
          <div className="space-y-2">
            <Label htmlFor="minPayout" className="flex items-center gap-2">
              <DollarSign className="size-4" />
              Minimum Payout Amount
            </Label>
            {isEditing ? (
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">₱</span>
                <Input
                  id="minPayout"
                  type="number"
                  value={editedSettings.minimumPayout}
                  onChange={(e) => handleInputChange("minimumPayout", formatCurrency(e.target.value))}
                  className="pl-7"
                  min="100"
                  max="50000"
                  disabled={isLoading}
                />
              </div>
            ) : (
              <p className="text-sm p-2 bg-muted rounded-md">
                ₱{parseFloat(settings.minimumPayout).toLocaleString()}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Minimum: ₱100 • Maximum: ₱50,000
            </p>
          </div>

          {/* Preferred Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="preferredMethod">Preferred Payment Method</Label>
            {isEditing ? (
              <Select
                value={editedSettings.preferredMethod}
                onValueChange={(value) => handleInputChange("preferredMethod", value)}
              >
                <SelectTrigger id="preferredMethod">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDO">BDO (•••• 3456)</SelectItem>
                  <SelectItem value="BPI">BPI (•••• 7654)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-sm p-2 bg-muted rounded-md">
                {settings.preferredMethod} ({settings.preferredMethod === "BDO" ? "•••• 3456" : "•••• 7654"})
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Manage your payment methods in Payment Methods section
            </p>
          </div>

          {/* Platform Fee Info */}
          <Card className="border-dashed">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Percent className="size-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Platform Fee</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    A {settings.platformFee}% fee is applied to all payouts to cover transaction and platform costs
                  </p>
                  <div className="mt-2 p-2 bg-muted rounded text-xs">
                    <p className="font-medium">Example:</p>
                    <p className="text-muted-foreground">
                      Payout: ₱1,000 → Fee: ₱{(1000 * parseFloat(settings.platformFee) / 100).toFixed(2)} → You receive: ₱{(1000 - (1000 * parseFloat(settings.platformFee) / 100)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 bg-[#7FC354] hover:bg-[#6fa844]"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleEdit}
                className="flex-1 bg-[#7FC354] hover:bg-[#6fa844]"
              >
                Edit Settings
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
