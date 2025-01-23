interface SubmenuItem {
  href: string;
  label: string;
}

interface NavigationLink {
  href?: string;
  label: string;
  submenu?: SubmenuItem[];
}

export interface NavigationLinks {
  navLinks: NavigationLink[];
}

export const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services",
    submenu: [
      { href: "/services/web-development", label: "Web Development" },
      { href: "/services/mobile-apps", label: "Mobile Apps" },
      { href: "/services/consulting", label: "Consulting" },
    ],
  },
  { href: "/contact", label: "Contact" },
];
