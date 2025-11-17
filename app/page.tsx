"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const accounts = {
  customer: {
    username: "customer",
    password: "1234",
    redirect: "/customerPage",
  },
  vendor: {
    username: "vendor",
    password: "5678",
    redirect: "/vendorPage",
  },
};

const handleLogin = () => {
  if (
    loginUser === accounts.customer.username &&
    loginPass === accounts.customer.password
  ) {
    window.location.href = accounts.customer.redirect;
    return;
  }

  if (
    loginUser === accounts.vendor.username &&
    loginPass === accounts.vendor.password
  ) {
    window.location.href = accounts.vendor.redirect;
    return;
  }

  toast.error("Invalid login credentials!");
};

  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE (Desktop/Large Screens) */}
      <div className="hidden flex-1 relative xl:flex flex-col justify-center items-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/merkago-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#75c354]/85 backdrop-blur-sm" />

        <div className="relative z-10 flex flex-col justify-center items-center">
          <div className="bg-white text-[#75c354] w-36 h-36 rounded-2xl flex justify-center items-center text-7xl font-bold shadow-lg">
            <div className="shrink-0 relative">
              <Image
                src="/imageAssets/MERKAGOLOGO.svg"
                alt="MerkaGo"
                width={170}
                height={50}
              />
            </div>
          </div>

          <h1 className="text-5xl font-bold mt-6">MerkaGo</h1>

          <p className="text-lg mt-4 text-center leading-relaxed">
            Light & Fresh Shopping Experience <br />
            Always Near You
          </p>
        </div>
      </div>

      {/* RIGHT SIDE CARD (Mobile & Desktop) */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#75c354]/85 xl:bg-[#F1F8E9]">
        
        {/* 💡 FIX: Mobile Logo Container - Added fixed size and position adjustments */}
        <div className="xl:hidden relative mb-4 z-10"> 
            <Image
              src="/imageAssets/MERKAGOLOGO.svg"
              alt="MerkaGo"
              width={100} // Set explicit width
              height={30} // Set explicit height
            />
        </div>
        {/* END Mobile Logo */}

        <div className="w-80 bg-white shadow-lg p-6 rounded-xl">
          {/* CONDITIONAL TITLE */}
          <h2 className="text-2xl font-semibold text-[#064232] mb-4">
            {isRegister ? "Create Account" : "Log In"}
          </h2>

          {/* CONDITIONAL FORM */}
          {isRegister ? (
            <>
              {/* NOTE: You had two separate divs for first/last name with no gap/layout. 
                 I've wrapped them in a flex container with a small gap for better mobile display. */}
              <div className="flex gap-2">
                <div className="flex-1"> {/* Added flex-1 */}
                  <Label htmlFor="firstName" className="text-black">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Juan"
                    className="w-full border p-2 rounded bg-[#FFFDE7]"
                  />
                </div>
                <div className="flex-1"> {/* Added flex-1 */}
                  <Label htmlFor="lastName" className="text-black">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Dela Cruz"
                    className="w-full border p-2 rounded bg-[#FFFDE7]"
                  />
                </div>
              </div>
              <Label htmlFor="email" className="text-black mt-2 block">
                Email
              </Label>
              <Input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded bg-[#FFFDE7]"
              />
              <Label htmlFor="Phone Number" className="text-black mt-2 block">
                Phone Number
              </Label>
              <Input
                type="text"
                placeholder="+63XXXXXXXXXX"
                className="w-full border p-2 rounded mt-2 bg-[#FFFDE7]"
              />
              <Label htmlFor="Password" className="text-black mt-2 block">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded mt-2 bg-[#FFFDE7]"
              />

              <Button className="w-full bg-[#75c354] text-white py-2 rounded font-bold mt-4 hover:bg-[#82d463] transition">
                SIGN UP
              </Button>
              <p className="text-black text-xs font-semibold mt-2">Sign up with:</p>
              <div className="flex gap-2 mt-1">
                <Button className="flex-1 bg-[#3d6656] hover:bg-[#35594C] text-white py-2 rounded flex items-center justify-center gap-2">
                  <Image
                    src="/imageAssets/facebooklogo.png"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                  Facebook
                </Button>

                <Button className="flex-1 bg-white hover:bg-[#F3F3F3] border py-2 rounded flex items-center justify-center gap-2">
                  <Image
                    src="/imageAssets/googlelogo.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Google
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button className="w-full bg-[#ffde59] py-2 rounded border border-yellow-500 mb-4 text-[#231f20] font-semibold">
                Log in with QR
              </Button>

              <Input
                type="text"
                placeholder="Username"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full border p-2 rounded bg-[#FFFDE7]"
              />

              <Input
                type="password"
                placeholder="Password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full border p-2 rounded mt-2 bg-[#FFFDE7]"
              />

              <Button
                onClick={handleLogin}
                className="w-full bg-[#ff6b35] text-white py-2 rounded font-bold mt-4 hover:bg-[#ff8845] transition"
              >
                LOG IN
              </Button>

              <a
                href="#"
                className="text-green-700 text-sm mt-2 block text-right"
              >
                Forgot Password?
              </a>

              <div className="flex items-center my-4">
                <div className="grow h-px bg-gray-300" />
                <span className="px-2 text-sm text-gray-600">OR</span>
                <div className="grow h-px bg-gray-300" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-[#3d6656] hover:bg-[#35594C] text-white py-2 rounded flex items-center justify-center gap-2">
                  <Image
                    src="/imageAssets/facebooklogo.png"
                    alt="Facebook"
                    width={20}
                    height={20}
                  />
                  Facebook
                </Button>

                <Button className="flex-1 bg-white hover:bg-[#F3F3F3] text-black border py-2 rounded flex items-center justify-center gap-2">
                  <Image
                    src="/imageAssets/googlelogo.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  Google
                </Button>
              </div>
            </>
          )}

          {/* FOOTER SWITCH */}
          <p className="text-center text-sm mt-4 text-[#1d1d1b]">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-[#75c354] font-semibold"
                >
                  Log In
                </button>
              </>
            ) : (
              <>
                New to MerkaGo?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-[#75c354] font-semibold"
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}