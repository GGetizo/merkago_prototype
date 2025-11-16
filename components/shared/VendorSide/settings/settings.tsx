"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
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
  Package,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import ChangePasswordModal from "./changePassword/changePassword";
import PaymentMethodModal from "./paymentMethod/paymentMethod";
import PayoutSettingsModal from "./payoutSettings/payoutSettings";
import RequestPayoutModal from "./requestPayout/requestPayout";
import EditProfileModal from "./editProfile/editProfile";

const SettingsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-4 w-48 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-6 w-11 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-56" />
          </div>
          <Skeleton className="h-6 w-11 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-4 w-56 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="bg-muted p-4 rounded-lg space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SettingsComponent() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
  const [isPayoutSettingsOpen, setIsPayoutSettingsOpen] = useState(false);
  const [isRequestPayoutOpen, setIsRequestPayoutOpen] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(12450.00);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Use theme resolution check instead of mounted state
  const isDarkMode = theme === "dark";

  useEffect(() => {
    // Simulate loading delay
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadTimeout);
  }, []);

  // Hardcoded payout history - now as state
  const [payoutHistory, setPayoutHistory] = useState([
    {
      id: "1",
      amount: 5000.00,
      status: "successful" as const,
      date: "Nov 10, 2025",
      method: "BDO (•••• 3456)",
    },
    {
      id: "2",
      amount: 3200.50,
      status: "pending" as const,
      date: "Nov 15, 2025",
      method: "BPI (•••• 7654)",
    },
    {
      id: "3",
      amount: 1500.00,
      status: "unsuccessful" as const,
      date: "Nov 8, 2025",
      method: "BDO (•••• 3456)",
      reason: "Insufficient funds",
    },
    {
      id: "4",
      amount: 7800.00,
      status: "successful" as const,
      date: "Nov 3, 2025",
      method: "BDO (•••• 3456)",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "successful":
        return <CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />;
      case "pending":
        return <Clock className="size-4 text-yellow-600 dark:text-yellow-500" />;
      case "unsuccessful":
        return <XCircle className="size-4 text-red-600 dark:text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "text-green-600 dark:text-green-500";
      case "pending":
        return "text-yellow-600 dark:text-yellow-500";
      case "unsuccessful":
        return "text-red-600 dark:text-red-500";
      default:
        return "";
    }
  };

  const handlePayoutSuccess = (amount: number, method: string) => {
    // Deduct balance
    setAvailableBalance(availableBalance - amount);
    
    // Add new payout to history as pending
    const newPayout = {
      id: Date.now().toString(),
      amount: amount,
      status: "pending" as const,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      method: method,
    };
    
    // Add to the beginning of the array
    setPayoutHistory([newPayout, ...payoutHistory]);
  };

  return (
    <div className="w-full p-4 space-y-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Settings</h2>

      {isLoading ? (
        <>
          <SettingsCardSkeleton />
          <SettingsCardSkeleton />
          <SettingsCardSkeleton />
          <SettingsCardSkeleton />
          <PaymentCardSkeleton />
          <SettingsCardSkeleton />
        </>
      ) : (
        <>
          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
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
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                    toast.success(checked ? "Dark mode enabled" : "Light mode enabled");
                  }} 
                />
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
                <Switch 
                  checked={notifications} 
                  onCheckedChange={(checked) => {
                    setNotifications(checked);
                    toast.success(checked ? "Push notifications enabled" : "Push notifications disabled");
                  }} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Order Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified when you receive new orders</p>
                </div>
                <Switch 
                  checked={orderAlerts} 
                  onCheckedChange={(checked) => {
                    setOrderAlerts(checked);
                    toast.success(checked ? "Order alerts enabled" : "Order alerts disabled");
                  }} 
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive order updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={(checked) => {
                    setEmailNotifications(checked);
                    toast.success(checked ? "Email notifications enabled" : "Email notifications disabled");
                  }} 
                />
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
                <Switch 
                  checked={twoFactorAuth} 
                  onCheckedChange={(checked) => {
                    setTwoFactorAuth(checked);
                    toast.success(checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
                  }} 
                />
              </div>
              <Button variant="outline" className="w-full justify-between" onClick={() => setIsChangePasswordOpen(true)}>
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
                <Switch 
                  checked={autoAcceptOrders} 
                  onCheckedChange={(checked) => {
                    setAutoAcceptOrders(checked);
                    toast.success(checked ? "Auto-accept orders enabled" : "Auto-accept orders disabled");
                  }} 
                />
              </div>
              <Button variant="outline" className="w-full justify-between" onClick={() => router.push('/vendorPage/stock')}>
                <div className="flex items-center gap-2">
                  <Package className="size-4" />
                  <span>Manage Products</span>
                </div>
                <ChevronRight className="size-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={() => router.push('/vendorPage/settings/storeInfo')}>
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
              <Button variant="outline" className="w-full justify-between" onClick={() => setIsPaymentMethodOpen(true)}>
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4" />
                  <span>Payment Methods</span>
                </div>
                <ChevronRight className="size-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between" onClick={() => setIsPayoutSettingsOpen(true)}>
                <div className="flex items-center gap-2">
                  <Wallet className="size-4" />
                  <span>Payout Settings</span>
                </div>
                <ChevronRight className="size-4" />
              </Button>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-1">Available Balance</p>
                <p className="text-2xl font-bold text-[#7FC354]">
                  ₱{availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <Button className="w-full mt-3 bg-[#7FC354] hover:bg-[#6fa844]" onClick={() => setIsRequestPayoutOpen(true)}>
                  Request Payout
                </Button>
              </div>

              {/* Payout History */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Payouts</h3>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    View All
                  </Button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {payoutHistory.map((payout) => (
                    <div
                      key={payout.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(payout.status)}
                            <span className={`text-sm font-medium capitalize ${getStatusColor(payout.status)}`}>
                              {payout.status}
                            </span>
                          </div>
                          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            ₱{payout.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          <div className="flex flex-col gap-0.5 mt-1">
                            <p className="text-xs text-muted-foreground">{payout.method}</p>
                            <p className="text-xs text-muted-foreground">{payout.date}</p>
                            {payout.status === "unsuccessful" && payout.reason && (
                              <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                                Reason: {payout.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              <Button variant="outline" className="w-full justify-between" onClick={() => setIsEditProfileOpen(true)}>
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
        </>
      )}      {/* Change Password Modal */}
      <ChangePasswordModal 
        open={isChangePasswordOpen} 
        onOpenChange={setIsChangePasswordOpen} 
      />

      {/* Payment Method Modal */}
      <PaymentMethodModal 
        open={isPaymentMethodOpen} 
        onOpenChange={setIsPaymentMethodOpen} 
      />

      {/* Payout Settings Modal */}
      <PayoutSettingsModal 
        open={isPayoutSettingsOpen} 
        onOpenChange={setIsPayoutSettingsOpen} 
      />

      {/* Request Payout Modal */}
      <RequestPayoutModal 
        open={isRequestPayoutOpen} 
        onOpenChange={setIsRequestPayoutOpen}
        availableBalance={availableBalance}
        onPayoutSuccess={handlePayoutSuccess}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal 
        open={isEditProfileOpen} 
        onOpenChange={setIsEditProfileOpen} 
      />
    </div>
  );
}