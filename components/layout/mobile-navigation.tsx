"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// Types
import type { NavigationLinks } from "./navigation";

export default function MobileNavigation({ navLinks }: NavigationLinks) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 mr-2 sm:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        aria-label="Navigation menu"
        aria-describedby="navigation-description"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Quick links to navigate through our site.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-4">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              onClick={() => setIsOpen(false)}
              className={`text transition-colors hover:text-foreground/80 ${
                pathname === item.href
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
