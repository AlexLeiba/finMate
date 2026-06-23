import { Wallet } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1">
      <Wallet className="text-yellow-500" />
      <p>FineMate</p>
    </Link>
  );
}
