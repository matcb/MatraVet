export type PageKey =
  | "dashboard"
  | "appointments"
  | "patients"
  | "vaccines"
  | "hospital"
  | "pos"
  | "inventory"
  | "grooming"
  | "finance"
  | "reports"
  | "marketing"
  | "clients";

export interface NavItem {
  key: PageKey;
  label: string;
  icon: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  module: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Visão geral",
    module: "Todos os módulos",
    items: [{ key: "dashboard", label: "Dashboard", icon: "dashboard" }],
  },
  {
    title: "Clínica Veterinária",
    module: "Módulo 1",
    items: [
      { key: "appointments", label: "Consultas", icon: "calendar", badge: "8" },
      { key: "patients", label: "Pacientes e Prontuários", icon: "paw" },
      { key: "vaccines", label: "Vacinas", icon: "syringe", badge: "2" },
    ],
  },
  {
    title: "Hospital Veterinário",
    module: "Módulo 2",
    items: [{ key: "hospital", label: "Internação", icon: "hospital", badge: "5" }],
  },
  {
    title: "Pet Shop",
    module: "Módulo 3",
    items: [
      { key: "pos", label: "Ponto de Venda", icon: "cart" },
      { key: "inventory", label: "Estoque", icon: "box", badge: "3" },
    ],
  },
  {
    title: "Banho & Tosa",
    module: "Módulo 4",
    items: [{ key: "grooming", label: "Banho e Tosa", icon: "scissors", badge: "5" }],
  },
  {
    title: "Gestão",
    module: "Incluso",
    items: [
      { key: "finance", label: "Financeiro", icon: "wallet" },
      { key: "reports", label: "Relatórios", icon: "chart" },
      { key: "marketing", label: "Marketing e CRM", icon: "megaphone" },
      { key: "clients", label: "Tutores", icon: "users" },
    ],
  },
];

/** @deprecated use NAV_SECTIONS */
export const NAV: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
