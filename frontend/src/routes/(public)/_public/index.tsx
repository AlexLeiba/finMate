import HomePage from "../../../pages/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/_public/")({
  component: HomePage,
  context: () => ({ title: "Home - FineManager" }),
});
