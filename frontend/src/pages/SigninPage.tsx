import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, type SigninType } from "@/lib/schemas/forms/authSchema";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/useAuthStore";

function SigninPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signin);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => {
    return state.user;
  });

  if (user) {
    navigate({ to: "/dashboard", replace: true });
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SigninType) {
    toast.loading("Loading...", { toastId: "signin" });
    try {
      await signIn(data);

      toast.success("Welcome back!");
      navigate({ to: "/dashboard", replace: true });
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      toast.dismiss("signin");
    }
  }
  return (
    <main className="flex flex-col gap-8 items-center justify-center h-[calc(100vh-68px)]">
      <h1>Sign In</h1>

      <form
        action=""
        autoComplete="off"
        className="flex flex-col gap-4 max-w-100 w-full"
      >
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
          <Link to="/signup">
            <Button variant="link">Don&apos;t have an account? Sign Up</Button>
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
    </main>
  );
}

export default SigninPage;
