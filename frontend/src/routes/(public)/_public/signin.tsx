import { createFileRoute } from "@tanstack/react-router";
import SigninPage from "../../../pages/SigninPage";

export const Route = createFileRoute("/(public)/_public/signin")({
  component: SigninPage,
  context: () => ({ title: "Sign In - FineManager" }),
});
