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

import Spinner from "../components/ui/spinner";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms & conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);

    setTimeout(() => {
    console.log("Account created:", data);
    localStorage.setItem("token", "fake-jwt-token");
    setLoading(false);
    navigate("/app/dashboard");
  }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4 font-sans">

      <Card className="w-full max-w-[400px] rounded-2xl border-none bg-[#111111] px-6 py-4 text-white shadow-2xl">

        <CardHeader className="space-y-1 pb-5 pt-2 text-center">

          <CardTitle className="text-2xl font-bold text-white">
            Create your account
          </CardTitle>

          <p className="text-[13px] text-neutral-400">
            Sign up to get started with your account
          </p>
        </CardHeader>

        <CardContent className="p-0">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-1.5">

              <Label htmlFor="fullName" className="text-xs font-medium text-white">
                Full Name
              </Label>

              <Input
                id="fullName"
                placeholder=""
                className={`h-9 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm focus:ring-1 focus:ring-neutral-500 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                {...register("fullName")}
              />

              {errors.fullName && (
                <p className="text-[10px] text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">

              <Label htmlFor="email" className="text-xs font-medium text-white">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className={`h-9 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm focus:ring-1 focus:ring-neutral-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-1 text-[11px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">

              <div className="flex items-center justify-between">
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
            </div>

            <div className="space-y-1.5">

              <Label htmlFor="confirmPassword" className="text-xs font-medium text-white">
                Confirm Password
              </Label>

              <div className="relative">

                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`h-9 pr-10 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm focus:ring-1 focus:ring-neutral-500 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>

              </div>
            </div>

            <div className="min-h-[20px]">

              {errors.confirmPassword ? (
                <p className="text-[11px] font-medium text-red-500">
                  {errors.confirmPassword.message}
                </p>
              ) : errors.password ? (
                <p className="text-[11px] font-medium text-red-500">
                  {errors.password.message}
                </p>
              ) : (
                <p className="text-[11px] text-neutral-500">
                  Must be at least 8 characters long.
                </p>
              )}

            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                {...register("terms")}
                className="h-4 w-4 accent-white"
              />

              <label htmlFor="terms" className="text-xs text-neutral-400">
                I accept all terms & conditions
              </label>
            </div>

            {errors.terms && (
              <p className="text-[11px] text-red-500">
                {errors.terms.message}
              </p>
            )}

            <Button
              type="submit"
              className="mt-2 h-10 w-full rounded-md bg-[#f0f0f0] text-sm font-bold text-black hover:bg-white"
              disabled={loading}
            >
              {loading ? <Spinner className="size-3" /> : "Create Account"}
            </Button>

          </form>

          <div className="mt-6 text-center">

            <p className="text-xs text-neutral-400">
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => navigate("/login")}
                className="text-white hover:underline"
              >
                Sign in
              </a>
            </p>

          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;