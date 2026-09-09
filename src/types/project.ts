export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  openingHours: string;
  logo?: string;
  logoUrl?: string;
  logoText?: string;
  showLogo?: boolean;
  showLogoWithText?: boolean;
  logoHeight?: number;
  favicon?: string;
  faviconUrl?: string;
}

export interface BrandingConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  buttonStyle: 'solid' | 'outline' | 'soft' | 'shadow';
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string; // e.g. '#services' or '/services'
  isButton?: boolean;
  openNewTab?: boolean;
}

export interface NavigationConfig {
  logoText?: string;
  logoImage?: string;
  showBusinessName?: boolean;
  logoHeight?: number;
  sticky: boolean;
  showCtaButton: boolean;
  ctaText: string;
  ctaUrl: string;
  items: NavigationItem[];
}

export interface SocialLink {
  id: string;
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'x' | 'whatsapp';
  url: string;
  enabled: boolean;
}

export interface WhatsAppConfig {
  enabled: boolean;
  number: string; // e.g. '6281234567890'
  defaultMessage: string;
  floatingButton: boolean;
  floatingPosition: 'bottom-right' | 'bottom-left';
  buttonText: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[] | string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  author?: string;
  robots?: 'index,follow' | 'noindex,nofollow' | 'index,nofollow' | 'noindex,follow' | string;
  siteLanguage?: string;
  language?: string;
  schemaType?: 'LocalBusiness' | 'Restaurant' | 'ProfessionalService' | 'Store' | 'Organization' | 'MedicalBusiness' | 'AutomotiveBusiness' | string;
}

export interface AnimationsConfig {
  enabled: boolean;
  preset: 'none' | 'subtle' | 'smooth' | 'energetic' | 'elegant' | 'fade';
}

export interface GoToTopConfig {
  enabled: boolean;
  showAfterScroll: number;
  position?: 'bottom-right' | 'bottom-left';
}

export interface FooterConfig {
  copyrightText?: string;
  showBusinessInfo: boolean;
  showSocials: boolean;
  showQuickLinks: boolean;
  showOpeningHours: boolean;
  showContact?: boolean;
  showWhatsAppButton?: boolean;
  whatsAppButtonText?: string;
  columnsCount: 2 | 3 | 4;
  customDescription?: string;
  badgeText?: string;
  quickLinksTitle?: string;
  openingHoursTitle?: string;
  contactTitle?: string;
  themeStyle?: 'dark' | 'light' | 'brand';
  bottomNote?: string;
  showAttribution?: boolean;
  attributionText?: string;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type SectionType =
  | 'hero'
  | 'services'
  | 'about'
  | 'products'
  | 'pricing'
  | 'testimonials'
  | 'stats'
  | 'features'
  | 'faq'
  | 'process'
  | 'gallery'
  | 'cta'
  | 'contact'
  | 'team'
  | 'blog'
  | 'partners'
  | 'newsletter'
  | 'footer'
  | string;

export type SectionStyle = string;

export interface SectionConfig {
  id: string;
  type: SectionType;
  style: SectionStyle;
  hidden?: boolean;
  content: Record<string, any>;
  styleConfig?: Record<string, any>;
}

export type SectionCategory =
  | 'Hero'
  | 'Business'
  | 'Commerce'
  | 'Social Proof'
  | 'Content'
  | 'Contact'
  | 'Media'
  | 'Footer'
  | string;

export interface SectionStyleOption {
  id: string;
  name: string;
  description: string;
  preview?: string;
}

export interface SectionTypeDefinition {
  type: SectionType;
  name: string;
  category: SectionCategory;
  description: string;
  icon: string;
  defaultStyle?: string;
  availableStyles?: SectionStyleOption[];
  styles?: SectionStyle[];
  defaultContent: Record<string, any> | (() => Record<string, any>);
  component?: any;
}

export interface PageConfig {
  id: string;
  title: string;
  slug: string;        // e.g. '' for home, 'about', 'services'
  isHome?: boolean;
  hideFromNav?: boolean;
  seo?: Partial<SeoConfig>;
  sections: SectionConfig[];
}

export interface WebsiteConfig {
  version: string;
  business: BusinessInfo;
  branding: BrandingConfig;
  theme: ThemeConfig;
  navigation: NavigationConfig;
  pageType: 'single' | 'multi';
  pages: PageConfig[];
  social: SocialLink[];
  whatsapp: WhatsAppConfig;
  seo: SeoConfig;
  animations: AnimationsConfig;
  smoothScroll?: boolean;
  goToTop: GoToTopConfig;
  footer: FooterConfig;
  customCss: string;
  customJs: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
  templateId: string;
  config: WebsiteConfig;
}
