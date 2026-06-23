import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "../../../pages/SignupPage";

export const Route = createFileRoute("/(public)/_public/signup")({
  component: SignupPage,
  context: () => ({ title: "Sign Up - FineManager" }),
});
