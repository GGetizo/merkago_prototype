"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Store, MapPin, Phone, Mail, Clock, Edit2, Save, X } from "lucide-react";

export default function StoreInfoComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    name: "Pwesto ni Aling Lita",
    description: "Your trusted neighborhood sari-sari store since 1995",
    address: "123 Barangay Street, Pasig City, Metro Manila",
    phone: "+63 917 123 4567",
    email: "alinglita@pwesto.com",
    hours: "6:00 AM - 10:00 PM",
  });

  const [editedInfo, setEditedInfo] = useState(storeInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo(storeInfo);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo(storeInfo);
  };

  const handleSave = () => {
    setStoreInfo(editedInfo);
    setIsEditing(false);
    toast.success("Store information updated successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full p-4 space-y-4 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Store Information</h2>
        {!isEditing ? (
          <Button onClick={handleEdit} className="bg-[#7FC354] hover:bg-[#6fa844]">
            <Edit2 className="size-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="size-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#7FC354] hover:bg-[#6fa844]">
              <Save className="size-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Store Logo and Name */}
      <Card>
        <CardHeader>
          <CardTitle>Store Profile</CardTitle>
          <CardDescription>Your store's identity and branding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="size-32">
              <AvatarImage src="/shopLogo/alingLita.png" alt="Pwesto ni Aling Lita" />
              <AvatarFallback className="bg-[#7FC354] text-white text-2xl">
                <Store className="size-12" />
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" size="sm">
                Change Logo
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            {isEditing ? (
              <Input
                id="storeName"
                value={editedInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {storeInfo.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {isEditing ? (
              <Input
                id="description"
                value={editedInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            ) : (
              <p className="text-sm text-muted-foreground">{storeInfo.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How customers can reach you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="size-4" />
              Address
            </Label>
            {isEditing ? (
              <Input
                id="address"
                value={editedInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-900 dark:text-gray-100 pl-6">
                {storeInfo.address}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="size-4" />
              Phone Number
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                value={editedInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-900 dark:text-gray-100 pl-6">
                {storeInfo.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="size-4" />
              Email
            </Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editedInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              <p className="text-sm text-gray-900 dark:text-gray-100 pl-6">
                {storeInfo.email}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>When your store is open for business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Label htmlFor="hours" className="flex items-center gap-2">
            <Clock className="size-4" />
            Operating Hours
          </Label>
          {isEditing ? (
            <Input
              id="hours"
              value={editedInfo.hours}
              onChange={(e) => handleInputChange("hours", e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-900 dark:text-gray-100 pl-6">
              {storeInfo.hours}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
