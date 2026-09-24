export interface SiteLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteSettings {
  brand: string;
  navigation: SiteLink[];
  cvUrl?: string;
  cvLabel?: string;
  email?: string;
  socialLinks: SiteLink[];
  footerNote?: string;
}

// Temporary content until the SiteSettings story is connected.
export const defaultSiteSettings: SiteSettings = {
  brand: 'KRISTEL',
  navigation: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
  socialLinks: [],
};
