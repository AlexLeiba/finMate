import { createFileRoute } from "@tanstack/react-router";
import ForgotPasswordPage from "../../../pages/ForgotPasswordPage";

export const Route = createFileRoute("/(public)/_public/forgot-password")({
  component: ForgotPasswordPage,
  context: () => ({ title: "Forgot Password - FineManager" }),
});
