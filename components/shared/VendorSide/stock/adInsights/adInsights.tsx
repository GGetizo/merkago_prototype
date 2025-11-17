"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, MousePointerClick, ShoppingCart, TrendingUp, Calendar, X } from "lucide-react";
import { useState } from "react";

interface AdInsightsProps {
  showInsightsModal: boolean;
  onCloseInsights: () => void;
}

interface AdCampaign {
  id: string;
  productName: string;
  tier: "Basic" | "Standard" | "Premium";
  startDate: string;
  endDate: string;
  status: "Active" | "Completed" | "Scheduled";
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
    ctr: number; // Click-through rate
    conversionRate: number;
  };
}

export default function AdInsights({ showInsightsModal, onCloseInsights }: AdInsightsProps) {
  // Hardcoded ad campaign data
  const adCampaigns: AdCampaign[] = [
    {
      id: "1",
      productName: "Chicken Breast",
      tier: "Premium",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      status: "Active",
      metrics: {
        impressions: 12450,
        clicks: 892,
        conversions: 134,
        revenue: 24120,
        ctr: 7.16,
        conversionRate: 15.02,
      },
    },
    {
      id: "2",
      productName: "Fresh Tomatoes",
      tier: "Standard",
      startDate: "2024-11-05",
      endDate: "2024-11-19",
      status: "Active",
      metrics: {
        impressions: 4820,
        clicks: 312,
        conversions: 45,
        revenue: 2250,
        ctr: 6.47,
        conversionRate: 14.42,
      },
    },
    {
      id: "3",
      productName: "Pork Belly",
      tier: "Basic",
      startDate: "2024-10-20",
      endDate: "2024-10-27",
      status: "Completed",
      metrics: {
        impressions: 1890,
        clicks: 98,
        conversions: 12,
        revenue: 3000,
        ctr: 5.19,
        conversionRate: 12.24,
      },
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Premium":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Standard":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Basic":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const totalImpressions = adCampaigns.reduce((sum, campaign) => sum + campaign.metrics.impressions, 0);
  const totalClicks = adCampaigns.reduce((sum, campaign) => sum + campaign.metrics.clicks, 0);
  const totalConversions = adCampaigns.reduce((sum, campaign) => sum + campaign.metrics.conversions, 0);
  const totalRevenue = adCampaigns.reduce((sum, campaign) => sum + campaign.metrics.revenue, 0);
  const avgCTR = adCampaigns.length > 0 
    ? adCampaigns.reduce((sum, campaign) => sum + campaign.metrics.ctr, 0) / adCampaigns.length 
    : 0;

  return (
    <Dialog open={showInsightsModal} onOpenChange={onCloseInsights}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="size-5 text-blue-600" />
            Ad Campaign Insights
          </DialogTitle>
          <DialogDescription>
            Track performance metrics and insights for your ad campaigns
          </DialogDescription>
        </DialogHeader>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="size-4 text-blue-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Impressions</p>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {totalImpressions.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <MousePointerClick className="size-4 text-green-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Clicks</p>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {totalClicks.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart className="size-4 text-purple-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Conversions</p>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {totalConversions}
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="size-4 text-yellow-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Avg CTR</p>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {avgCTR.toFixed(2)}%
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="size-4 text-green-600" />
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Revenue</p>
              </div>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                ₱{totalRevenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign List */}
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Campaign Details</h3>
          
          {adCampaigns.map((campaign) => (
            <Card key={campaign.id} className="border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{campaign.productName}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="size-3" />
                      <span className="text-xs">
                        {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTierColor(campaign.tier)}`}>
                      {campaign.tier}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Impressions</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {campaign.metrics.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Clicks</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {campaign.metrics.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversions</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {campaign.metrics.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CTR</p>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {campaign.metrics.ctr.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conv. Rate</p>
                    <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {campaign.metrics.conversionRate.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                      ₱{campaign.metrics.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {adCampaigns.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No ad campaigns yet. Create your first campaign to start tracking insights!
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={onCloseInsights}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
