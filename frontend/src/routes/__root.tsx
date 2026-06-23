import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/Navigation/Header";
import { Footer } from "../components/Navigation/Footer";
import type { useAuthStore } from "@/store/useAuthStore";

interface RouterContext {
  auth: typeof useAuthStore;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { matches } = useRouterState();

  const activeMatch = matches.at(-1);

  const { title = "fineManager" } = activeMatch?.context as { title: string };

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <ToastContainer position="bottom-right" pauseOnHover theme="dark" />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 ">
          <Outlet />
        </main>

        <Footer />
      </div>

      <TanStackRouterDevtools />
    </>
  );
}
