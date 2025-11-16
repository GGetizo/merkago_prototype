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
import { Lock } from "lucide-react";

// Hardcoded password for demonstration
const CURRENT_PASSWORD = "merkago123";

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ChangePasswordModal({ open, onOpenChange }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Validation
    if (currentPassword !== CURRENT_PASSWORD) {
      toast.error("Current password is incorrect");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      setIsLoading(false);
      return;
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password");
      setIsLoading(false);
      return;
    }

    // Success
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Lock className="size-5 text-primary" />
            </div>
            <DialogTitle>Change Password</DialogTitle>
          </div>
          <DialogDescription>
            Enter your current password and choose a new password. Password must be at least 6 characters.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">Hint: merkago123</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-[#7FC354] hover:bg-[#6fa844]"
            >
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
