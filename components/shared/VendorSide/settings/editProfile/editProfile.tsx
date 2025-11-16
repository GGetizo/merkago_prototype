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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditProfileModal({ open, onOpenChange }: EditProfileModalProps) {
  const [profile, setProfile] = useState({
    firstName: "Lita",
    lastName: "Roxas",
    email: "lita.roxas@email.com",
    phone: "+63 917 123 4567",
    address: "123 Barangay Street, Pasig City",
    city: "Pasig City",
    region: "Metro Manila",
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProfile(editedProfile);
    setIsLoading(false);
    toast.success("Profile updated successfully!");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <User className="size-5 text-primary" />
            </div>
            <DialogTitle>Edit Profile</DialogTitle>
          </div>
          <DialogDescription>
            Update your personal information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="size-24">
              <AvatarImage src="/shopLogo/alingLita.png" alt="Lita Roxas" />
              <AvatarFallback className="bg-[#7FC354] text-white text-2xl">
                LR
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="size-4" />
              Change Photo
            </Button>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={editedProfile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={editedProfile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="size-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={editedProfile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="size-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={editedProfile.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="size-4" />
              Street Address
            </Label>
            <Input
              id="address"
              value={editedProfile.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* City and Region */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={editedProfile.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={editedProfile.region}
                onChange={(e) => handleInputChange("region", e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
