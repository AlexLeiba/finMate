import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupType } from "@/lib/schemas/forms/authSchema";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";

function SignupPage() {
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupType) {
    toast.loading("Loading...", { toastId: "signup" });
    try {
      await signup(data);
      toast.success("Account created successfully, please sign in");
      navigate({
        to: "/signin",
        replace: true,
      });
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      toast.dismiss("signup");
    }
  }
  return (
    <main className="flex flex-col gap-8 items-center justify-center h-[calc(100vh-68px)]">
      <h1>Sign Up</h1>

      <form
        action=""
        autoComplete="off"
        className="flex flex-col gap-4 max-w-100 w-full"
      >
        <Input
          disabled={isLoading}
          label="Name"
          placeholder="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          disabled={isLoading}
          label="Email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          disabled={isLoading}
          label="Password"
          autoComplete="new-password"
          placeholder="Password"
          type="password"
          error={errors?.password?.message}
          {...register("password")}
        />
        <div className="flex flex-col">
          <Link to="/signin">
            <Button variant="link">Already have an account? Sign in</Button>
          </Link>
          <Link to="/forgot-password">
            <Button variant="link">Forgot password?</Button>
          </Link>
        </div>
      </form>

      <Button
        loading={isLoading}
        className="w-full max-w-100"
        size="lg"
        onClick={handleSubmit(onSubmit)}
      >
        Signin
      </Button>
      {/* </div> */}
    </main>
  );
}

export default SignupPage;
