import { NAV_LINKS } from "@/lib/consts/links";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function Links() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  return (
    <nav>
      <ul className="flex gap-4">
        {NAV_LINKS.map((link) => (
          <Link to={link.href} key={link.href}>
            <Button variant={pathname === link.href ? "link" : "ghost"}>
              <li>{link.label}</li>
            </Button>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
