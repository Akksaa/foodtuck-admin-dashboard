"use client"; // app/dashboard/page.tsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - replace with your actual data fetching logic

interface Order {
  orderDate: string;
  paymentDetails: { totalAmount: number };
}

interface RevenueData {
  date: string;
  revenue: number;
}

const transformOrdersToRevenueData = (orders: Order[]): RevenueData[] => {
  const revenueMap = orders.reduce(
    (acc, order) => {
      const date = order.orderDate.split("T")[0];
      acc[date] = (acc[date] || 0) + order?.paymentDetails?.totalAmount;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(revenueMap)
    .map(([date, revenue]) => ({ date, revenue: Number(revenue.toFixed(2)) }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};


export default function ChartPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const ordersRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/total/orders`
      );

      if (!ordersRes.ok) {
        throw new Error("Failed to fetch users");
      }
      const ordersData = await ordersRes.json();
      const orders = ordersData.data;

      setOrders(orders);
    } catch (error: unknown) {
      if (error instanceof Error) {
      }
    }
  };
  const revenueData = transformOrdersToRevenueData(orders);
  console.log(revenueData);

  return (
    <div className="grid grid-cols-1 space-y-8 mt-12">
      {/* Revenue Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
