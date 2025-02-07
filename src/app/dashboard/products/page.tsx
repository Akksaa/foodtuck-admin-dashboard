"use client";
import FoodProductTable from "@/components/dashboard/ProductTable";
import { useEffect, useState } from "react";
// import DashboardError from "../error";
import Loading from "@/components/dashboard/Loading";


export default function CustomersPage() {
;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<Error | null>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // setLoading(true);
      // setError(null) // Reset error before retrying
      const productsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/total/products`
      );

      if (!productsRes.ok) {
        throw new Error("Failed to fetch users");
      }
      const productData = await productsRes.json();
      const products = productData.data;

      setUsers(products);
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

  // const handleDelete = async (productId: string) => {
  //   try {
  //     const response = await client.delete(productId);


  //     if (response.ok) {
  //       console.log(`Product with ID ${productId} deleted successfully.`);

  //       toast({
  //         title: "Success",
  //         description: "Product deleted successfully",
  //       });
  //       const result = await response.json();
  //       console.log("Delete response:", result);
  //       // Refresh your users data here
  //       const productsRes = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/total/products`
  //       );

  //       if (!productsRes.ok) {
  //         throw new Error("Failed to fetch users");
  //       }
  //       const productData = await productsRes.json();
  //       const products = productData.data;

  //       setUsers(products);
  //     }
  //     toast({
  //       title: "FoodTuck",
  //       description: "Product deletetion functionality is not available yet",
  //     });

  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //     toast({
  //       title: "FoodTuck",
  //       description: "Product deletetion functionality is not available yet",
  //     });
  //   }
  // };

  // const handleBulkDelete = async (productIds: string[]) => {
  //   try {
  //     const transaction = client.transaction();

  //     productIds.forEach((id) => {
  //       transaction.delete(id);
  //     });

  //     await transaction.commit();
  //     console.log(
  //       `Products with IDs ${productIds.join(", ")} deleted successfully.`
  //     );

  //     toast({
  //       title: "Success",
  //       description: "Products deleted successfully",
  //     });

  //     const productsRes = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/total/products`
  //     );

  //     if (!productsRes.ok) {
  //       throw new Error("Failed to fetch users");
  //     }
  //     const productData = await productsRes.json();
  //     const products = productData.data;

  //     setUsers(products);
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Prod<span className="text-primYellow">ucts</span> Overview
      </h1>
      <FoodProductTable
        products={users}
        // onDelete={handleDelete}
        // onBulkDelete={handleBulkDelete}
      />
    </div>
  );
}
