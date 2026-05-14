import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const forgotSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

const ForgotPassword: React.FC = () => {
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: ForgotFormValues) => {
    console.log("Reset link sent to:", data.email);
    alert("Reset link sent!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1a1a] px-4 font-sans">

      <Card className="w-full max-w-[380px] rounded-2xl border-none bg-[#111111] px-6 py-6 text-white shadow-2xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Forgot Password
          </CardTitle>

          <p className="text-[13px] text-neutral-400">
            Enter your email and we’ll send you reset instructions
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="space-y-1.5">
              <Label className="text-xs text-white">Email</Label>

              <Input
                type="email"
                placeholder="m@example.com"
                className={`h-9 rounded-md border-[#2d2d2d] bg-[#1a1a1a] text-sm text-white focus:ring-1 focus:ring-neutral-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-[11px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-10 w-full rounded-md bg-[#2a2a2a] text-sm font-semibold text-white hover:bg-[#3a3a3a]"
            >
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <a
                href="/login"
                className="text-xs text-neutral-400 hover:text-white hover:underline"
              >
                Back to login
              </a>
            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  );
};

export default ForgotPassword;