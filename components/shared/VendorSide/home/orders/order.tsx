"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type OrderStatus = "Preparing" | "On the Way" | "Completed" | "Refunded";

type Order = {
  id: number;
  customerName: string;
  customerAvatar: string;
  items: string;
  total: string;
  status: OrderStatus;
  time: string;
  notes?: string;
};

const initialOrders: Order[] = [
  {
    id: 1,
    customerName: "Maria Santos",
    customerAvatar: "/shopLogo/alingRosa.png",
    items: "Chicken Breast (2kg), Pork Belly (1kg)",
    total: "₱610",
    status: "Preparing",
    time: "10:30 AM",
    notes: "I want only breast part, please remove skin",
  },
  {
    id: 2,
    customerName: "Juan Dela Cruz",
    customerAvatar: "/shopLogo/mangBerto.png",
    items: "Fresh Tomatoes (3kg)",
    total: "₱150",
    status: "On the Way",
    time: "9:45 AM",
    notes: "Please pick the ripest ones",
  },
  {
    id: 3,
    customerName: "Ana Reyes",
    customerAvatar: "/shopLogo/nenita.png",
    items: "Ground Pork (1.5kg)",
    total: "₱375",
    status: "Completed",
    time: "8:20 AM",
    notes: "Please grind it finely for lumpia",
  },
  {
    id: 4,
    customerName: "Pedro Cruz",
    customerAvatar: "/shopLogo/alingLita.png",
    items: "Chicken Wings (1kg)",
    total: "₱200",
    status: "Preparing",
    time: "11:00 AM",
    notes: "Extra spicy marinade please",
  },
];

const statusColors: Record<OrderStatus, string> = {
  "Preparing": "bg-blue-100 text-blue-700",
  "On the Way": "bg-yellow-100 text-yellow-700",
  "Completed": "bg-green-100 text-green-700",
  "Refunded": "bg-red-100 text-red-700",
};

const OrderTableSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="text-xs">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </TableCell>
          <TableCell className="text-xs">
            <Skeleton className="h-4 w-full max-w-xs" />
          </TableCell>
          <TableCell className="text-xs">
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell className="text-xs">
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="text-xs">
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell className="text-xs">
            <Skeleton className="h-6 w-24 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

const StatusCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-32 mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-12" />
      </CardContent>
    </Card>
  );
};

export default function OrdersComponent() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const loadTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadTimeout);
  }, []);

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getOrderCount = (status: OrderStatus) => {
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="w-full p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Today&apos;s Orders</h2>



     {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription className="flex items-center gap-1">
            Manage and update order statuses
            <span className="text-muted-foreground/60 flex items-center gap-1 ml-2">
              <ArrowRight className="size-3" />
              Scroll to view all
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Customer</TableHead>
                  <TableHead className="text-xs">Items</TableHead>
                  <TableHead className="text-xs">Notes</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Time</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <OrderTableSkeleton />
                ) : (
                  orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2">
                        <Avatar className="ring-[#7FC354] ring-2 w-8 h-8">
                          <AvatarImage src={order.customerAvatar} alt={order.customerName} />
                          <AvatarFallback className="text-xs">
                            {order.customerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{order.customerName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs max-w-xs truncate">{order.items}</TableCell>
                    <TableCell className="text-xs max-w-xs">
                      {order.notes ? (
                        <span className="italic text-gray-600 dark:text-gray-400">&quot;{order.notes}&quot;</span>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">No notes</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-semibold">{order.total}</TableCell>
                    <TableCell className="text-xs text-gray-600 dark:text-gray-400">{order.time}</TableCell>
                    <TableCell className="text-xs">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`px-3 py-1 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#7FC354] ${statusColors[order.status]}`}
                      >
                        <option value="Preparing">Preparing</option>
                        <option value="On the Way">On the Way</option>
                        <option value="Completed">Completed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </TableCell>
                  </TableRow>
                )))
                }
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Status Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
            <StatusCardSkeleton />
          </>
        ) : (
          <>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-sm">Preparing</CardTitle>
                <CardDescription>Orders being prepared</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{getOrderCount("Preparing")}</div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="text-sm">On the Way</CardTitle>
                <CardDescription>Orders for delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{getOrderCount("On the Way")}</div>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-sm">Completed</CardTitle>
                <CardDescription>Delivered orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{getOrderCount("Completed")}</div>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-sm">Refunded</CardTitle>
                <CardDescription>Refunded orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{getOrderCount("Refunded")}</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

     
    </div>
  );
}