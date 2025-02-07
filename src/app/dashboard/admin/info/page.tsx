"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "@/components/dashboard/LogoutButton";
import Loading from "@/components/dashboard/Loading";
import React from "react";
import moment from "moment";
import {
  ArrowRight,
  Bell,
  Calendar,
  Edit,
  HomeIcon,
  Lock,
  Mail,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    created: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/info`);
        setUserData(res.data.data[0]);
        setLoading(false);
        console.log("user data", res.data.data[0]);
      } catch (error) {
        if (error instanceof Error) {
          setLoading(false);
          return { error: error.message };
        }
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <>

      {userData ? (
        <div className="min-h-screen flex flex-col items-center justify-center md:p-4 p-2">
          <div className="bg-white shadow-2xl rounded-md md:p-8 p-3 max-w-md w-full">
            <div className="flex items-center justify-end md:mb-8 mb-4">
              <div className="flex md:space-x-2">
                <button className="p-2 text-gray-600 hover:text-primYellow transition-colors">
                  <Bell size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-primYellow transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>

            <div className="relative md:w-24 w-16 h-16 md:h-24 mx-auto md:mb-6 mb-3">
              <div className="w-full h-full rounded-full openSans bg-gradient-to-r from-primYellow to-orange-200 flex items-center justify-center text-white text-3xl font-bold">
                {userData?.username?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Edit size={16} className="text-gray-600" />
              </button>
            </div>

            {userData && (
              <div className="md:space-y-6 space-y-2 inter">
                <div className="bg-gray-50 rounded-md p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <User className="text-primYellow" />
                    <div>
                      <label className="block md:text-sm text-[12px] font-semibold text-gray-600">
                        Admin
                      </label>
                      <p className="md:text-[16px] text-[14px] font-medium text-gray-900">
                        {userData.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-md p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-primYellow" />
                    <div>
                      <label className="block md:text-sm text-[12px] font-semibold text-gray-600">
                        Email
                      </label>
                      <p className="md:text-[16px] text-[14px] font-medium text-gray-900">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-4 transition-all hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-primYellow" />
                    <div>
                      <label className="block md:text-sm text-[12px] font-semibold text-gray-600">
                        Member Since
                      </label>
                      <p className="md:text-[16px] text-[14px] font-medium text-gray-900">
                        {moment(userData.created).format("YYYY-MM-DD")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <LogoutButton userId={userData.id} />
              <div>
                <Link href={`${process.env.NEXT_PUBLIC_API_URL}/dashboard`}>
                  <button className="mt-2 w-full bg-white openSans text-primYellow py-3 px-6 rounded-md font-semibold flex items-center justify-center space-x-2 border-primYellow border-[1px] hover:border-none  hover:bg-primYellow hover:text-white transition-colors">
                    <HomeIcon size={20} />
                    <span>Continue to Dashboard</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform transition-all hover:scale-105">
            <div className="flex flex-col items-center text-center ">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 ">
                <Lock className="w-8 h-8 text-red-600" />
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-2 openSans">
                Authentication Required
              </h1>

              <p className="text-gray-600 font-normal mb-8 inter text-sm">
                Please sign in to view your profile. If you don&apos;t have an
                account yet, you can create one for free.
              </p>

              <div className="space-y-4 w-full openSans">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="w-full bg-primYellow text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-amber-400 transition-colors"
                >
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="w-full bg-white text-primYellow border-2 border-primYellow py-3 px-6 rounded-xl font-semibold hover:bg-yellow-50 transition-colors"
                >
                  Create Account
                </button>
              </div>

              <p className="mt-6 text-sm text-gray-500 inter">
                Need help?{" "}
                <a href="/support" className="text-primYellow hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
