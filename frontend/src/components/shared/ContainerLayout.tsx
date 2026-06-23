import React from "react";
import { cn } from "../../lib/utils/tailwindUtils";

function ContainerLayout({
  children,
  fluid = false,
  flexGrow,
}: {
  children: React.ReactNode;
  fluid?: boolean;
  flexGrow?: boolean;
}) {
  return (
    <main className={cn(fluid ? "w-full" : "content", flexGrow && "flex-1")}>
      {children}
    </main>
  );
}

export default ContainerLayout;
