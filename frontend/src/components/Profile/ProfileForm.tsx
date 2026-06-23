import {
  profileSchema,
  type ProfileFormType,
} from "@/lib/schemas/forms/profileSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

export function ProfileForm({
  onCloseEditProfile,
}: {
  onCloseEditProfile: () => void;
}) {
  const userProfile = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name,
      email: userProfile?.email,
      newPassword: undefined,
      repeatNewPassword: undefined,
    },
  });

  async function handleSave(data: ProfileFormType) {
    if (!data.name && !data.newPassword) {
      return;
    }
    toast.loading("Loading...", { toastId: "update" });
    try {
      await updateProfile({
        ...(data.name && { name: data.name }),
        ...(data.newPassword && { password: data.newPassword }),
      });
      reset();
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "string" ? error : "Something went wrong";
      toast.error(errorMessage);
    } finally {
      toast.dismiss("update");
    }

    console.log("🚀 ~ handleSave ~ data:", data);
  }

  function handleCancel() {
    setValue("name", userProfile?.name || "");
    onCloseEditProfile();
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(handleSave)}
        action=""
        autoComplete="off"
        className="flex flex-col gap-4  w-full border p-4"
      >
        <Input
          disabled={isLoading}
          label="Name"
          placeholder="Name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          disabled={true}
          label="Email"
          placeholder="Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          disabled={isLoading}
          label="New Password"
          autoComplete="new-password"
          placeholder="type your new password"
          type="password"
          error={errors?.newPassword?.message}
          {...register("newPassword")}
        />
        <Input
          disabled={isLoading}
          label="Repeat New Password"
          autoComplete="new-password"
          placeholder="type your new password"
          type="password"
          error={errors?.repeatNewPassword?.message}
          {...register("repeatNewPassword")}
        />

        <div className="flex gap-4">
          <Button loading={isLoading} variant={"accent"}>
            Save changes
          </Button>
          <Button
            disabled={isLoading}
            type="button"
            onClick={handleCancel}
            variant={"destructive"}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
