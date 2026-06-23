import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordType,
  type ResetPasswordType,
  type ResetPasswordVerifyEmailType,
  type ResetPasswordVerifyOtpType,
  type VerifyEmailType,
} from "@/lib/schemas/forms/authSchema";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { apiFactory } from "@/api/services/apiFactory";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const [step, setStep] = useState<
    "verifyEmail" | "verifyOtp" | "resetPassword"
  >("verifyEmail");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      step: "verifyEmail",
    },
  });

  useEffect(() => {
    setValue("step", step);
  }, [step, setValue]);

  function onSubmit(data: ForgotPasswordType) {
    console.log(data);

    switch (data.step) {
      case "verifyEmail":
        onVerifyEmailSubmit(data as ResetPasswordVerifyEmailType);
        break;
      case "verifyOtp":
        onVerifyOtpSubmit(data as ResetPasswordVerifyOtpType);
        break;
      case "resetPassword":
        onResetPasswordSubmit(data as ResetPasswordType);
        break;
    }
  }

  async function onVerifyEmailSubmit(data: VerifyEmailType) {
    console.log(data);
    toast.loading("Loading...", { toastId: step });
    try {
      await apiFactory().verifyEmail(data);
      setStep("verifyOtp");
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";

      toast.error(errorMessage);
    } finally {
      toast.dismiss(step);
    }
  }

  async function onVerifyOtpSubmit(data: ResetPasswordVerifyOtpType) {
    console.log(data);
    // if success

    toast.loading("Loading...", { toastId: step });
    try {
      await apiFactory().verifyOTP(data);
      setStep("resetPassword");
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";

      toast.error(errorMessage);
    } finally {
      toast.dismiss(step);
    }
  }

  async function onResetPasswordSubmit(data: ResetPasswordType) {
    toast.loading("Loading...", { toastId: step });
    try {
      await apiFactory().resetPassword(data);
      setStep("verifyEmail");
      toast.success("Password reset successfully");
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      toast.dismiss(step);
    }
  }

  return (
    <main className="flex flex-col gap-8 items-center justify-center h-[calc(100vh-68px)]">
      <h1>Forgot Password</h1>

      <form
        action=""
        autoComplete="off"
        className="flex flex-col gap-4 max-w-100 w-full"
      >
        <input type="hidden" {...register("step")} />
        {step === "verifyEmail" && (
          <Input
            label="Your Email"
            placeholder="Type your email"
            error={errors.email?.message}
            {...register("email")}
          />
        )}

        {step === "verifyOtp" && (
          <Controller
            name="otpCode"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                // value={field.value ?? ""}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>

                <InputOTPSeparator />

                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        )}

        {step === "resetPassword" && (
          <>
            <Input
              label="New Password"
              placeholder="Type your new password"
              error={errors?.newPassword?.message}
              {...register("newPassword")}
            />
            <Input
              label="Repeat New Password"
              placeholder="Repeat your new password"
              error={errors?.repeatNewPassword?.message}
              {...register("repeatNewPassword")}
            />
          </>
        )}

        <div className="flex flex-col">
          <Link to="/signup">
            <Button variant="link">Don&apos;t have an account? Sign Up</Button>
          </Link>
        </div>
      </form>

      <Button
        className="w-full max-w-100"
        size="lg"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </main>
  );
}

export default ForgotPasswordPage;
