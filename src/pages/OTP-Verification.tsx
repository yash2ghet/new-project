import React, { useState } from "react";

import { Button } from "../components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { Navigate, useNavigate } from "react-router";

import Spinner from "../components/ui/spinner";

const OtpVerify: React.FC = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const email = localStorage.getItem("resetEmail") || ""; 

    if (!email) {
      return <Navigate to="/forgot-password" replace />;
    }

    const verifyUrl = "http://localhost:4000/api/v1/auth/verify-otp";

    await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid OTP");
        }
        return response.json();
      })
      .then((data) => {
        console.log("OTP verified:", data);

        alert("OTP verified successfully");

        localStorage.setItem("resetEmail", email);

        navigate("/reset-password");
      })
      .catch((error) => {
        console.error("OTP verification failed:", error);
        alert("Invalid or expired OTP");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4 font-sans">

      <Card className="w-full max-w-[380px] rounded-2xl border-none bg-[#111111] px-6 py-4 text-white shadow-2xl">

        <CardHeader className="space-y-1 pb-5 pt-2 text-center">

          <CardTitle className="text-2xl font-bold text-white">
            Verify OTP
          </CardTitle>

          <p className="text-[13px] text-neutral-400">
            Enter the 6-digit OTP sent to your email
          </p>

        </CardHeader>

        <CardContent className="p-0">

          <form onSubmit={onSubmit} className="space-y-4">

            <div className="space-y-1.5">

              <Label className="text-xs font-medium text-white">
                OTP
              </Label>

              <Input
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="h-9 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm text-white focus:ring-1 focus:ring-neutral-500"
              />

            </div>

            <Button
              type="submit"
              className="mt-2 h-10 w-full rounded-md bg-[#f0f0f0] text-sm font-bold text-black hover:bg-white"
              disabled={loading}
            >
              {loading ? <Spinner className="size-3" /> : "Verify OTP"}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-400">
              Didn’t receive OTP?{" "}
              <a
                href="/forgot-password"
                className="text-white hover:underline"
              >
                Resend
              </a>
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default OtpVerify;