"use client";

import { useState } from "react";
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

export default function OrdersComponent() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

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
      <h2 className="text-xl font-bold text-gray-900">Today&apos;s Orders</h2>



     {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>Manage and update order statuses</CardDescription>
        </CardHeader>
        <CardContent>
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
              {orders.map((order) => (
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
                      <span className="italic text-gray-600">&quot;{order.notes}&quot;</span>
                    ) : (
                      <span className="text-gray-400">No notes</span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">{order.total}</TableCell>
                  <TableCell className="text-xs text-gray-600">{order.time}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Order Status Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm">Preparing</CardTitle>
            <CardDescription>Orders being prepared</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getOrderCount("Preparing")}</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="text-sm">On the Way</CardTitle>
            <CardDescription>Orders for delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{getOrderCount("On the Way")}</div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-sm">Completed</CardTitle>
            <CardDescription>Delivered orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{getOrderCount("Completed")}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-sm">Refunded</CardTitle>
            <CardDescription>Refunded orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getOrderCount("Refunded")}</div>
          </CardContent>
        </Card>
      </div>

     
    </div>
  );
}