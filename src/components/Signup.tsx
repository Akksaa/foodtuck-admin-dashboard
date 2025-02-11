"use client";

import { GrUserAdmin } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/dashboard/Loading";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      setLoading(false);

      if (res.status == 403) {
        toast({
          variant: "destructive",
          title: "Foodtuck",
          description: "This is restricted area. Admins only!",
        });
      }

      if (res.status == 409) {
        console.log("condition matched");
        toast({
          variant: "destructive",
          title: "Foodtuck",
          description: "User already exists!",
        });
      }
      if (!res.ok) {
        throw new Error("Signup failed");
      }

      toast({
        variant: "default",
        title: "Foodtuck",
        description: "Logged in! Welcome Admin.",
      });

      router.push("/dashboard");
    } catch (error: unknown) {
      setLoading(false);

      if (error instanceof Error) {
        console.log("Signup failed:", error.message);
      } else {
        console.log("Signup failed with unknown error");
        toast({
          variant: "destructive",
          title: "Foodtuck",
          description: "Sign up failed, try again!",
        });
      }
    }
  };

  useEffect(() => {
    if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center items-center sm:min-h-screen bg-white sm:py-6 lg:py-12">
          <div className="bg-white w-[424px] p-6 h-[624px] shadow-lg">
            <h2 className="flex items-center justify-center">
              <GrUserAdmin size={86} className="text-primYellow text-center" />
            </h2>

            <form className="space-y-4 py-4">
              <div className="relative mt-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CiUser className="h-5 w-5 text-zinc-700" />
                </div>
                <input
                  type="text"
                  name="username"
                  id=""
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Name"
                  className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2 "
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CiMail className="h-5 w-5 text-zinc-700" />
                </div>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Mail"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2 "
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CiLock className="h-5 w-5 text-zinc-700" />
                </div>
                <input
                  type="password"
                  name="password"
                  id=""
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                  className="pl-10 block mt-1 w-full placeholder:text-zinc-700 border-gray-200 border-2 text-xs outline-none px-3 py-2 "
                />
              </div>
              <div className="text-xs text-center justify-center flex ">
                <p>Want to Sign up? Enter this Email: </p>
                <p className="text-gray-500 ml-1">admin@gmail.com</p>
              </div>
              <div className="">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-primYellow w-full block text-sm inter transition-all py-2 border-primYellow border-2 hover:bg-white hover:border-primYellow hover:text-primYellow text-white"
                >
                  {buttonDisabled ? (
                    <div className=" cursor-not-allowed"> Sign Up</div>
                  ) : (
                    <div>Sign Up</div>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-800">
                Don&apos;t Forget to log out before closing the site, Thanks!
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
