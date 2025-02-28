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

export const navLinks = [
  {
    label: "Ventas",
    submenu: [
      { href: "/ventas/canal", label: "Por Canal" },
      { href: "/ventas/producto", label: "Por Producto" },
      { href: "/ventas/categoria", label: "Por Categoría" },
      { href: "/ventas/unidades", label: "Por Unidades" },
    ],
  },
  {
    label: "Plantillas",
    submenu: [
      { href: "/plantillas/blocks", label: "Blocks" },
      { href: "/plantillas/components", label: "Components" },
      { href: "/plantillas/docs", label: "Documentation" },
      { href: "/plantillas/general", label: "General" },
      { href: "/plantillas/tablas", label: "Tablas de Datos" },
    ],
  },
  {
    label: "Formularios",
    submenu: [{ href: "/formularios/ingreso", label: "Ingreso" }],
  },
];
