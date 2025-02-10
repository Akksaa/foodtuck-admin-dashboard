"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AdminIntroPage = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <ShieldCheck className="w-16 h-16 text-primYellow" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Admin Access Portal</h1>
        <p className="text-gray-600 mb-6">
          Secure administrative access for FoodTuck management. Begin by
          creating your admin account.
        </p>
        <Button
          onClick={handleGetStarted}
          className="w-full bg-primYellow hover:bg-white hover:text-primYellow hover:border hover:border-primYellow"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};

export default AdminIntroPage;
