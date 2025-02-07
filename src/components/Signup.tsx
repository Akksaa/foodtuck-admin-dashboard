"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { useToast } from "@/hooks/use-toast";
import Loading from "@/components/dashboard/Loading";

function Signup() {
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
       });
       setLoading(false)
       
       if (!res.ok) {
        throw new Error('Signup failed');
       }
       
       

      if (res.status == 409) {
        toast({
          variant: "destructive",
          title: "Foodtuck",
          description: "User already exists",
        });
      }
      

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
        <div className="flex justify-center items-center min-h-screen bg-white sm:py-6 lg:py-12">
          <div className="bg-white w-[424px] p-6 h-[624px] shadow-lg">
            <h2 className="openSans text-[20px] leading-[26px] text-black">
              Sign up!
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
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="check"
                  className=""
                />
                <p className="text-[16px]">Remember me?</p>
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
              <div className="text-xs text-center justify-center flex ">
                <p>Already have an Account? </p>
                <Link
                  href={"./login"}
                  className="text-primYellow ml-2 underline"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
