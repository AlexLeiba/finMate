import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/iconButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { router } from "@/main";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "@tanstack/react-router";
import { User } from "lucide-react";

export function ProfileMenu() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => {
    return state.logout;
  });

  async function handleLogout() {
    await logout();

    await router.invalidate();
    navigate({
      to: "/signin",
      replace: true,
    });
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton className="outline rounded-full">
            <User />
          </IconButton>
        </PopoverTrigger>

        <PopoverContent className="w-80 flex flex-col gap-4 ">
          <div>User Profile</div>
          <Link to="/profile">
            <Button variant={"link"}>Settings</Button>
          </Link>
          <Button variant={"outline"} onClick={handleLogout}>
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
