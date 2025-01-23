import Link from "next/link";
import { usePathname } from "next/navigation";
// Types
import type { NavigationLinks } from "./navigation";

export function DesktopNavigation({ navLinks }: NavigationLinks) {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 text-sm font-medium">
      {navLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href ?? "#"}
          className={`transition-colors hover:text-foreground/80 ${
            pathname === item.href
              ? "text-foreground font-semibold"
              : "text-foreground/60"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
