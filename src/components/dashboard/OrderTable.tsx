"use client";

import React, { useState, useCallback } from "react";
import { Table } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronUp,
  ChevronDown,
  User,
  Calendar,
  Coins,
  CircleCheck,
  Clock,
  CircleX,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Order } from "@/types/orders";

const ITEMS_PER_PAGE = 10;

interface SortConfig {
  key: keyof Order | "orderDate";
  direction: "asc" | "desc";
}

const OrderTable = ({ orders }: { orders: Order[] }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "orderDate",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return <CircleCheck className="w-4 h-4 text-green-500 inline-block" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400 inline-block" />;
      case "cancelled":
        return <CircleX className="w-4 h-4 text-red-500 inline-block" />;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortData = useCallback((key: SortConfig["key"]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }, []);

  const getSortedData = useCallback(() => {
    return [...filteredOrders].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let aValue: any = a[sortConfig.key as keyof Order];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let bValue: any = b[sortConfig.key as keyof Order];

      if (
        sortConfig.key === "orderDate" &&
        typeof aValue === "string" &&
        typeof bValue === "string"
      ) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredOrders, sortConfig]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedData = getSortedData().slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const SortIcon: React.FC<{ columnKey: SortConfig["key"] }> = ({
    columnKey,
  }) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="w-4 h-4 ml-1" />
      ) : (
        <ChevronDown className="w-4 h-4 ml-1" />
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-sm font-medium p-4 text-gray-500">
                <div className="flex items-center space-x-2">
                  <User className="text-primYellow w-4 h-4" />
                  <span>Customer Name</span>
                </div>
              </th>
              <th
                className="text-left text-sm font-medium text-gray-500 p-4 cursor-pointer"
                onClick={() => sortData("orderDate")}
              >
                {" "}
                <div className="flex items-center space-x-2">
                  <Calendar className="text-primYellow w-4 h-4" />{" "}
                  <span>Order Date</span> <SortIcon columnKey="orderDate" />
                </div>
              </th>
              <th className="text-left text-sm font-medium text-gray-500 p-4">
                <div className=" flex items-center space-x-2">
                  <Coins className="text-primYellow w-4 h-4" />
                  <span>Amount</span>
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">
                <div className=" flex items-center space-x-2">
                    <Info className="text-primYellow w-4 h-4"/>
                <span>Status</span>
                </div>
                </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order) => (
              <tr key={order.orderId} className="border-t hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-900">
                  {order.customerName}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
                <td className="p-4 text-sm text-green-500">
                  ${order.paymentDetails.totalAmount}
                </td>
                <td className="p-4 text-sm text-gray-900 flex items-center space-x-1">
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </Button>
      </div> */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}{" "}
          of {filteredOrders.length} products
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
