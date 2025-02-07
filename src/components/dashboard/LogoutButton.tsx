"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Loading from "./Loading";

const LogoutButton = ({ userId }: { userId: string }) => {
const {toast} = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    if (!userId) return toast({
        variant: "destructive",
        title: "Foodtuck",
        description: "User not found!",
      });

    ;

    try {
        toast({
            variant: "default",
            title: "Foodtuck",
            description: "Admin Logging out!",
          });
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/logout`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();


      if (!res.ok) throw new Error(data.error);

      
      router.push("/");
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Foodtuck",
            description: "Failed to log out!",
          });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 if (loading) {
    <Loading/>
 }

  return (
    <button
      className="mt-6 w-full bg-primYellow openSans text-white py-3 px-6 rounded-md font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut size={20} />
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;
