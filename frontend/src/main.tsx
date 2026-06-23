import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { useAuthStore } from "./store/useAuthStore";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { auth: useAuthStore }, //passing the store to context, so inside routes we can edit store through context.
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function renderRoute() {
  // Initialize the auth store

  try {
    await useAuthStore.getState().getProfile();
  } catch (error: unknown) {
    const errorMessage =
      typeof error === "string" ? error : "Something went wrong";

    console.log(errorMessage);
  }
  //vanilla store, no reactive, no re-renders, used outside React
  // run authentication before load the app UIб All is ready before the app loads.

  // Render the app
  const rootElement = document.getElementById("root")!;
  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <StrictMode>
        <RouterProvider router={router} context={{ auth: useAuthStore }} />
      </StrictMode>,
    );
  }
}

renderRoute();
