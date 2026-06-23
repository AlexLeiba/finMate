import ProfilePage from "@/pages/ProfilePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_protected/profile")({
  component: ProfilePage,
  context: () => ({ title: "Profile - FineManager" }),
});
