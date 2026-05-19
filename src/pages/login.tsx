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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router";

import { z } from "zod";

import { Eye, EyeOff } from "lucide-react";

import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import  Spinner  from "../components/ui/spinner";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    console.log(data.email);
    console.log(data.password);

    setTimeout(() => {
    localStorage.setItem("token", "fake-jwt-token");
    setLoading(false);
    navigate("/app/dashboard");
    }, 1500);

    const {email, password} = data;

    const loginUrl = "http://localhost:4000/api/v1/auth/login";

    await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      })
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4 font-sans">

      <Card className="w-full max-w-[380px] rounded-2xl border-none bg-[#111111] px-6 py-4 text-white shadow-2xl">

        <CardHeader className="space-y-1 pb-5 pt-2 text-center">

          <CardTitle className="text-2xl font-bold text-white">
            Welcome back
          </CardTitle>

          <p className="text-[13px] text-neutral-400">
            Login with your account
          </p>
        </CardHeader>

        <CardContent className="p-0">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-1.5">

              <Label htmlFor="email" className="text-xs font-medium text-white">
                Email
              </Label>

              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                className={`h-9 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm focus:ring-1 focus:ring-neutral-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-[11px] font-medium text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">

              <div className="flex justify-between">

                <Label htmlFor="password" className="text-xs font-medium text-white">
                  Password
                </Label>

                <a
                  href="/forgot-password"
                  className="text-[11px] text-neutral-300 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`h-9 pr-10 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm focus:ring-1 focus:ring-neutral-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-[11px] font-medium text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="mt-2 h-10 w-full rounded-md bg-[#f0f0f0] text-sm font-bold text-black hover:bg-white"
              disabled={loading}
            >
              {loading ? <Spinner className="size-3" /> : "Login"}
            </Button>

            <div className="relative flex items-center mt-4">
              <div className="flex-grow border-t border-[#262626]"></div>
              <span className="mx-3 text-[11px] uppercase tracking-wider text-neutral-500">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[#262626]"></div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">

              <Button
                variant="outline"
                className="h-10 rounded-lg border-[#2d2d2d] bg-[#1a1a1a] text-xs text-white hover:bg-[#252525] flex items-center justify-center gap-2"
              >
                <FaApple className="text-base" />
                Login with Apple
              </Button>

              <Button
                variant="outline"
                className="h-10 rounded-lg border-[#2d2d2d] bg-[#1a1a1a] text-xs text-white hover:bg-[#252525] flex items-center justify-center gap-2"
              >
                <FaGoogle className="text-base" />
                Login with Google
              </Button>

            </div>

          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-neutral-400">
              Don't have an account?{" "}
              <a href="#" className="text-white hover:underline" onClick={() => navigate("/signup")}>
                Sign up
              </a>
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;