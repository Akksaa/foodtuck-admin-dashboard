"use client";
import CustomersTable from "@/components/dashboard/CustomerTable";
// import type { User } from "@/types/customers";
import { useToast } from "@/hooks/use-toast"; // If you want to show notifications
import { useEffect, useState } from "react";
// import DashboardError from "../error";
import Loading from "@/components/dashboard/Loading";

export default function CustomersPage() {
  const { toast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>();

  useEffect(() => {
    fetchUsers();
  }, [users]); 
  
  const fetchUsers = async () => {
    try {
      // setLoading(true);
      // setError(null) // Reset error before retrying
      const userRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/total/users`
      );
  
      if (!userRes.ok) {
        throw new Error("Failed to fetch users");
      }
  
      const data = await userRes.json();
      setUsers(data.users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        // setError(error);
      }
    } finally {
      setLoading(false);
    }
  };
  
   if (loading) return <Loading />;
  // if (error) return <DashboardError error={error} reset={fetchUsers} />; // ✅ Pass function
  


  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/total/users?user_id=${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Foodtuck",
          description: "User deleted successfully",
        });
        // Refresh your users data here
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/total/users`
        );

        if (!userRes.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await userRes.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Foodtuck",
        description: "User deleted successfully",
      });
    }
  };

  const handleBulkDelete = async (userIds: string[]) => {
    try {
      console.log("Deleting users:", userIds);

      toast({
        title: "Bulk delete initiated",
        description: `Deleting ${userIds.length} users`,
      });
      // Add your bulk delete logic here
      const response = await fetch(`/api/delete/users`, {
        method: "DELETE",
        body: JSON.stringify({ user_ids: userIds }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Users deleted successfully",
        });
        // Refresh your users data here
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/total/users`
        );

        if (!userRes.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await userRes.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error bulk deleting users:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Custo<span className="text-primYellow">mers</span> Overview</h1>
      <CustomersTable
        users={users}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
