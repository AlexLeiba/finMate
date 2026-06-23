import ContainerLayout from "../shared/ContainerLayout";
import { Logo } from "../shared/Logo";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Links } from "./Links";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu";

export function Header() {
  const user = useAuthStore((state) => {
    return state.user;
  });

  // console.log("🚀 ~ Header ~ user:", user);
  return (
    <header className=" w-full border-b border-gray-600  fixed top-0 left-0 right-0 z-50 bg-background-element-primary">
      <ContainerLayout>
        <div className="flex items-center justify-between py-4">
          <Logo />
          {user && <Links />}

          {!user && (
            <div className="flex items-center gap-2">
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>

              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          {user && <ProfileMenu />}
        </div>
      </ContainerLayout>
    </header>
  );
}
