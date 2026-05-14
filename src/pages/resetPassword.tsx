import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

import { Eye, EyeOff } from "lucide-react";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: ResetFormValues) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Password reset:", data);
      setLoading(false);

      navigate("/login");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4 font-sans">
      
      <Card className="w-full max-w-[380px] rounded-2xl border-none bg-[#111111] px-6 py-6 text-white shadow-2xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Reset Password
          </CardTitle>

          <p className="text-[13px] text-neutral-400">
            Create a new password for your account
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-1.5">
              <Label className="text-xs text-white">New Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`h-9 pr-10 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm ${
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
                <p className="text-[11px] text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-white">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className={`h-9 pr-10 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                >
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-10 w-full rounded-md bg-[#f0f0f0] text-sm font-bold text-black hover:bg-white"
            >
              {loading ? "Updating..." : "Reset Password"}
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-xs text-neutral-400 hover:text-white hover:underline"
              >
                Back to login
              </button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;