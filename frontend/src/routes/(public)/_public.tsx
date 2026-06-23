import ContainerLayout from "@/components/shared/ContainerLayout";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_public")({
  beforeLoad: ({ context, location }) => {
    const { user } = context.auth.getState(); //zustand store was passed in main.tsx under the context, when router was created: createRouter
    console.log("🚀 ~ user public:", user);

    if (user) {
      throw redirect({
        to: "/dashboard",
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
      <Outlet />
    </ContainerLayout>
  );
}
