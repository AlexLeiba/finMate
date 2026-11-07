import { useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, Settings } from "lucide-react";
import { toast } from "react-toastify";
import ContainerLayout from "../shared/ContainerLayout";
import { Logo } from "../shared/Logo";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Links } from "./Links";
import { ProfileMenu } from "./ProfileMenu/ProfileMenu";
import { NAV_LINKS } from "@/lib/consts/links";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { router } from "@/main";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const user = useAuthStore((state) => {
    return state.user;
  });
  const logout = useAuthStore((state) => state.logout);

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      await router.invalidate();
      await navigate({ to: "/signin", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <header className="w-full border-b border-gray-600 fixed top-0 left-0 right-0 z-50 bg-background-element-primary">
      <ContainerLayout>
        <div className="flex items-center justify-between py-4">
          <Logo />
          {user && (
            <div className="hidden lg:block">
              <Links />
            </div>
          )}

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
          {user && (
            <>
              <div className="hidden lg:block">
                <ProfileMenu />
              </div>
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                >
                  <Menu aria-hidden="true" />
                </Button>
                <SheetContent side="right" className="w-[min(20rem,85vw)]">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>Navigate FineManager.</SheetDescription>
                  </SheetHeader>
                  <nav aria-label="Main navigation" className="px-4">
                    <ul className="flex flex-col gap-1">
                      {NAV_LINKS.filter((item) => item.href !== "/profile").map((item) => (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex min-h-11 items-center rounded-md px-3 text-sm ${
                              pathname === item.href
                                ? "bg-primary text-text-primary"
                                : "hover:bg-secondary"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="mt-auto flex flex-col gap-2 border-t p-4">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-9 w-full items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <Settings aria-hidden="true" />
                      Settings
                    </Link>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-start"
                      classNameChildren="flex items-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut aria-hidden="true" />
                      Log out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </ContainerLayout>
    </header>
  );
}
