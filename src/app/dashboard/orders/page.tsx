"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/dashboard/Loading";
import OrderTable from "@/components/dashboard/OrderTable";

export default function CustomersPage() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Orde<span className="text-primYellow">rs</span> Overview
      </h1>
      <OrderTable
        orders={orders}
      />
    </div>
  );
}