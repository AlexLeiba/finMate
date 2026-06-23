import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { Trash, Upload } from "lucide-react";

export function Avatar() {
  const userProfile = useAuthStore((state) => state.user);
  const userInitials =
    (userProfile?.name?.split(" ")[0].substring(0, 1) || "") +
    (userProfile?.name?.split(" ")[1].substring(0, 1) || "");
  const userAvatar = "";
  // https://picsum.photos/200/200
  return (
    <>
      <section className="flex ">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center justify-center rounded-full size-30 overflow-hidden ring-1 ">
            {userAvatar ? (
              <img
                src="https://picsum.photos/200/200"
                alt="avatar"
                className="object-cover"
              />
            ) : (
              <h4>{userInitials}</h4>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              title="upload avatar"
              aria-label="upload avatar"
              classNameChildren="flex items-center gap-1"
            >
              <Upload /> Upload
            </Button>
            <Button
              title="remove avatar"
              aria-label="remove avatar"
              variant="destructive"
              classNameChildren="flex items-center gap-1"
            >
              <Trash /> Remove
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
