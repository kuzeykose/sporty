export type NavbarSectionChildren = {
  key: string;
  title: string;
  icon: React.ReactNode;
  href: string;
};

export type NavbarSection = {
  key: string;
  sectionName: string;
  children: NavbarSectionChildren[];
};
