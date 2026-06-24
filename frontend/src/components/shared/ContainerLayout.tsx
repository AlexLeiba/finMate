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
    <div className={cn(fluid ? "w-full" : "content", flexGrow && "flex-1")}>
      {children}
    </div>
  );
}

export default ContainerLayout;
