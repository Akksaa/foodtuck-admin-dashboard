// import Chart from "@/components/dashboard/Chart";
"use client";
import { useState, useEffect } from "react";
import Chart from "@/components/dashboard/Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import React from "react";

export default async function DashboardPage() {

  // const userRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/total/users`
  // );
  // const { users } = await userRes.json();

  // const productsRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/total/products`
  // );
  // const productData = await productsRes.json();
  // const products = productData.data;

  // const ordersRes = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/total/orders`
  // );
  // const ordersData = await ordersRes.json();
  // const orders = ordersData.data;

  // const totalAvenueSum = orders.reduce(
  //   (sum: number, order: { paymentDetails: { totalAmount: number } }) =>
  //     sum + order.paymentDetails.totalAmount,
  //   0
  // );
  // const totalAvenue = totalAvenueSum.toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });

  // console.log(totalAvenue);
  // console.log("products", products.length);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalAvenue, setTotalAvenue] = useState("$0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/total/users`).then(res => res.json());
        setUsers(userData.users || []);

        const productData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/total/products`).then(res => res.json());
        setProducts(productData.data || []);

        const ordersData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/total/orders`).then(res => res.json());
        setOrders(ordersData.data || []);

        // Calculate total revenue
        const total = ordersData?.data.reduce((sum: number, order: { paymentDetails: { totalAmount: number; }; }) => sum + order.paymentDetails.totalAmount, 0) || 0;
        setTotalAvenue(total.toLocaleString("en-US", { style: "currency", currency: "USD" }));

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dash<span className="text-primYellow">board</span> Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-primYellow hover:shadow-sm transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 ">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-500 group-hover:text-primYellow transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAvenue}</div>
            <p className="text-sm text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primYellow hover:shadow-sm transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-gray-500 group-hover:text-primYellow transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orders.length}</div>
            <p className="text-sm text-gray-500">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primYellow hover:shadow-sm transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="w-4 h-4 text-gray-500 group-hover:text-primYellow transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-sm text-gray-500">+{products.length -8}% from last month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-primYellow hover:shadow-sm transition-colors group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="w-4 h-4 text-gray-500 group-hover:text-primYellow transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{users.length}</div>
            <p className="text-sm text-gray-500">
              +{users.length - 4} since last hour
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
    <div className='p-6 space-y-4'>
        <h1 className="text-3xl font-bold">Analy<span className="text-primYellow">tics</span> Overview</h1>
      <Chart/>
    </div>
    </>
  );
}
