/** Resolved, serializable nav data. Safe to pass across the island boundary. */
export interface NavItem {
  label: string;
  href: string;
}

export interface LinkProps {
  label: string;
  href: string;
}
