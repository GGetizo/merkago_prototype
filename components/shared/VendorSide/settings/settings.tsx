"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Moon, 
  Sun, 
  Shield, 
  Bell, 
  Wallet, 
  Store, 
  User, 
  ChevronRight,
  Lock,
  CreditCard,
  Package
} from "lucide-react";

export default function SettingsComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="w-full p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            {darkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Customize how your app looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="size-5" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Order Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified when you receive new orders</p>
            </div>
            <Switch checked={orderAlerts} onCheckedChange={setOrderAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive order updates via email</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="size-5" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>Protect your account and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
          </div>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Lock className="size-4" />
              <span>Change Password</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="size-5" />
            <CardTitle>Store Settings</CardTitle>
          </div>
          <CardDescription>Manage your store preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Auto-Accept Orders</p>
              <p className="text-xs text-muted-foreground">Automatically accept incoming orders</p>
            </div>
            <Switch checked={autoAcceptOrders} onCheckedChange={setAutoAcceptOrders} />
          </div>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Package className="size-4" />
              <span>Manage Products</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Store className="size-4" />
              <span>Store Information</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Payment */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="size-5" />
            <CardTitle>Payment</CardTitle>
          </div>
          <CardDescription>Manage payment methods and payouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <span>Payment Methods</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="size-4" />
              <span>Payout Settings</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-[#7FC354]">₱12,450.00</p>
            <Button className="w-full mt-3 bg-[#7FC354] hover:bg-[#6fa844]">
              Request Payout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="size-5" />
            <CardTitle>Account</CardTitle>
          </div>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>Edit Profile</span>
            </div>
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="destructive" className="w-full">
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}