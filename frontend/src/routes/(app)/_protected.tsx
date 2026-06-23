import ContainerLayout from "@/components/shared/ContainerLayout";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected")({
  beforeLoad: ({ context, location }) => {
    const { user } = context.auth.getState(); //zustand store was passed in main.tsx under the context, when router was created: createRouter
    console.log("🚀 ~ PROTECTED=>>>>>>:", user, "\n\n\n\n\n\n\n\n");

    if (!user) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return (
    <ContainerLayout>
      <div className="h-21" />
      <Outlet />
    </ContainerLayout>
  );
}
