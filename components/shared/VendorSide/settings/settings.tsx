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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  XCircle,
  Crown,
  Check,
  Zap
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

interface PaymentMethod {
  id: string;
  bank: string;
  accountNumber: string;
  cvv: string;
  expirationDate: string;
}

export default function SettingsComponent() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showManageSubscriptionModal, setShowManageSubscriptionModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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

  // Hardcoded payment methods (same as in stock.tsx and sales.tsx)
  const paymentMethods: PaymentMethod[] = [
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
  ];

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

  const maskAccountNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    return "•••• •••• •••• " + cleaned.slice(-4);
  };

  const handleUnlockPremium = () => {
    if (paymentMethods.length === 0) {
      toast.error("Please add a payment method first in Settings > Payment Methods");
      return;
    }
    setShowPaymentModal(true);
  };

  const handleProceedToConfirmation = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    setShowPaymentModal(false);
    setShowConfirmationModal(true);
  };

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setShowConfirmationModal(false);
    setIsSubscribed(true);
    toast.success("Successfully subscribed to Premium! 🎉");
  };

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    
    // Simulate cancellation processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setShowManageSubscriptionModal(false);
    setIsSubscribed(false);
    toast.success("Subscription cancelled successfully");
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
          {/* Premium Subscription */}
          <Card className={isSubscribed ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20" : ""}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Crown className={`size-5 ${isSubscribed ? "text-yellow-600" : ""}`} />
                <CardTitle>Premium Membership</CardTitle>
              </div>
              <CardDescription>
                {isSubscribed ? "You're enjoying all premium benefits" : "Unlock unlimited features and analytics"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isSubscribed ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border-2 border-yellow-400">
                    <div className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600">
                      <Crown className="size-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Premium Member</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active subscription</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">₱500</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">per month</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Active Benefits:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="size-4 text-green-600 shrink-0" />
                        <span>Unlimited product listings</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="size-4 text-green-600 shrink-0" />
                        <span>Advanced sales analytics</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="size-4 text-green-600 shrink-0" />
                        <span>Priority customer support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <Check className="size-4 text-green-600 shrink-0" />
                        <span>Revenue tracking & insights</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => setShowManageSubscriptionModal(true)}>
                    Manage Subscription
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3 p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Zap className="size-5 text-yellow-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">Upgrade to Premium</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check className="size-4 text-green-600 shrink-0" />
                            <span>Unlimited product listings (currently limited to 20)</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check className="size-4 text-green-600 shrink-0" />
                            <span>Advanced sales analytics & charts</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check className="size-4 text-green-600 shrink-0" />
                            <span>Priority customer support</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check className="size-4 text-green-600 shrink-0" />
                            <span>Detailed revenue tracking</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <Check className="size-4 text-green-600 shrink-0" />
                            <span>Monthly performance insights</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Premium Subscription</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">₱500<span className="text-lg text-gray-500">/month</span></p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleUnlockPremium}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold h-11"
                  >
                    <Crown className="size-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

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

      {/* Payment Selection Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Crown className="size-5 text-yellow-600" />
              </div>
              <DialogTitle>Subscribe to Premium</DialogTitle>
            </div>
            <DialogDescription>
              Select a payment method to unlock all premium features
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
                    No payment methods available. Please add one in Payment Methods.
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
                onClick={() => setShowPaymentModal(false)}
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
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
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
                  setShowConfirmationModal(false);
                  setShowPaymentModal(true);
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

      {/* Manage Subscription Modal */}
      <Dialog open={showManageSubscriptionModal} onOpenChange={setShowManageSubscriptionModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <Crown className="size-5 text-yellow-600" />
              </div>
              <DialogTitle>Manage Subscription</DialogTitle>
            </div>
            <DialogDescription>
              View and manage your premium subscription
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Current Plan */}
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600">
                  <Crown className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">Premium Monthly Plan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active subscription</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">₱500</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">per month</p>
                </div>
              </div>
              <div className="pt-3 border-t border-yellow-200 dark:border-yellow-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Next billing date</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">December 17, 2025</p>
              </div>
            </div>

            {/* Subscription Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Subscription Details</h3>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className="font-medium text-green-600 dark:text-green-500">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Started on</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">November 17, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Payment method</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.bank || "BDO"} •••• {paymentMethods.find(m => m.id === selectedPaymentMethod)?.accountNumber.slice(-4) || "3456"}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Benefits */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Active Benefits</h3>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Unlimited product listings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Advanced sales analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="size-4 text-green-600 shrink-0" />
                  <span>Revenue tracking & insights</span>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-xs text-red-600 dark:text-red-400">
                <strong>Warning:</strong> Cancelling your subscription will remove all premium features immediately. You'll be limited to 20 products and lose access to sales analytics.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowManageSubscriptionModal(false)}
                disabled={isProcessing}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelSubscription}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}