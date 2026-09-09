import { NavigationItem, SectionConfig, PageConfig } from '../../types/project';

const SECTION_ALIASES: Record<string, string[]> = {
  hero: ['beranda', 'home', 'hero', 'header', 'top'],
  services: ['layanan', 'services', 'service', 'jasa', 'keunggulan-layanan'],
  about: ['tentang', 'tentang-kami', 'about', 'about-us', 'profil', 'profil-usaha'],
  products: ['produk', 'products', 'product', 'menu', 'katalog', 'daftar-menu', 'makanan', 'minuman'],
  pricing: ['harga', 'pricing', 'biaya', 'paket', 'tarif', 'price', 'daftar-harga'],
  testimonials: ['testimoni', 'testimonials', 'ulasan', 'review', 'kata-mereka', 'kepuasan-pelanggan'],
  stats: ['stats', 'statistik', 'angka', 'pencapaian'],
  gallery: ['galeri', 'gallery', 'portfolio', 'portofolio', 'foto', 'karya'],
  faq: ['faq', 'tanya-jawab', 'pertanyaan', 'tanya'],
  contact: ['kontak', 'contact', 'lokasi', 'alamat', 'hubungi', 'hubungi-kami'],
  team: ['tim', 'team', 'staff'],
  blog: ['blog', 'artikel', 'berita', 'news'],
  features: ['fitur', 'features', 'keunggulan'],
  process: ['proses', 'cara-kerja', 'alur', 'process'],
  partners: ['mitra', 'partner', 'partners', 'klien'],
  cta: ['cta', 'ajakan', 'order'],
};

/**
 * Checks if an anchor URL corresponds to an existing, non-hidden section on the active page.
 */
export function isSectionActiveOnPage(
  url: string,
  sections: SectionConfig[],
  pages?: PageConfig[]
): boolean {
  if (!url) return false;

  // External links always remain visible
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('tel:') || url.startsWith('mailto:')) {
    return true;
  }

  // Multi-page slug check (e.g. '/about' or '/services')
  if (url.startsWith('/') && pages && pages.length > 0) {
    const slug = url.replace('/', '').toLowerCase().trim();
    return pages.some((p) => (p.slug || '').toLowerCase().trim() === slug);
  }

  // Anchor target check (e.g. '#services' or '#sec-services-...')
  if (url.startsWith('#')) {
    const target = url.replace('#', '').toLowerCase().trim();
    if (!target) return true;

    const activeSections = (sections || []).filter((s) => !s.hidden);

    return activeSections.some((s) => {
      const sId = (s.id || '').toLowerCase();
      const sType = (s.type || '').toLowerCase();

      // Exact ID or Type match
      if (sId === target || sType === target) return true;

      // Partial containment (e.g., target 'services' matches 'sec-services-123')
      if (sId.includes(target) || target.includes(sId)) return true;

      // Alias lookup
      for (const [canonType, aliasList] of Object.entries(SECTION_ALIASES)) {
        const isTargetMatch = canonType === target || aliasList.includes(target);
        if (isTargetMatch && (sType === canonType || sId.includes(canonType))) {
          return true;
        }
      }

      return false;
    });
  }

  return true;
}

/**
 * Filters out navigation items whose corresponding section does not exist or is hidden.
 */
export function filterActiveNavItems(
  items: NavigationItem[],
  sections: SectionConfig[],
  pages?: PageConfig[]
): NavigationItem[] {
  if (!items || !Array.isArray(items)) return [];
  return items.filter((item) => isSectionActiveOnPage(item.url, sections, pages));
}
