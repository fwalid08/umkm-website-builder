import { WebsiteConfig, SectionConfig } from '../../types/project';
import { getWhatsAppLink } from '../themes/themeUtils';

function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function generateStaticHtml(config: WebsiteConfig): string {
  const business = config.business;
  const branding = config.branding;
  const primaryColor = branding.primaryColor || '#2563eb';
  const headingFont = branding.fontHeading || 'Plus Jakarta Sans';
  const bodyFont = branding.fontBody || 'Inter';
  const waLink = getWhatsAppLink(config);
  const homePage = config.pages[0] || { sections: [] };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': config.seo.schemaType || 'LocalBusiness',
    name: business.name,
    description: business.description || business.tagline,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressCountry: 'ID',
    },
    openingHours: business.openingHours,
    url: config.seo.canonicalUrl || '',
  };

  // Render navigation links
  const navItemsHtml = (config.navigation.items || [])
    .map(
      (item) =>
        `<a href="${escapeHtml(item.url)}" class="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">${escapeHtml(
          item.label
        )}</a>`
    )
    .join('\n        ');

  // Render sections
  const sectionsHtml = (homePage.sections || [])
    .filter((s) => !s.hidden)
    .map((sec) => renderSectionToHtml(sec, config))
    .join('\n\n');

  const keywordsStr = Array.isArray(config.seo.keywords)
    ? config.seo.keywords.join(', ')
    : config.seo.keywords || '';

  return `<!DOCTYPE html>
<html lang="${escapeHtml(config.seo.siteLanguage || config.seo.language || 'id')}" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(config.seo.title || business.name)}</title>
  <meta name="description" content="${escapeHtml(config.seo.description || business.description)}" />
  <meta name="keywords" content="${escapeHtml(keywordsStr)}" />
  <meta name="robots" content="${escapeHtml(config.seo.robots || 'index,follow')}" />

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(config.seo.ogTitle || config.seo.title || business.name)}" />
  <meta property="og:description" content="${escapeHtml(config.seo.ogDescription || config.seo.description || business.description)}" />
  ${config.seo.ogImage ? `<meta property="og:image" content="${escapeHtml(config.seo.ogImage)}" />` : ''}

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;0,800&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: '${primaryColor}',
          },
          fontFamily: {
            heading: ['"${headingFont}"', 'sans-serif'],
            body: ['"${bodyFont}"', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>

  <style>
    :root {
      --primary: ${primaryColor};
    }
    body {
      font-family: "${bodyFont}", sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: "${headingFont}", sans-serif;
    }
    ${config.customCss || ''}
  </style>
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased selection:bg-blue-500 selection:text-white">

  <!-- Header & Navigation -->
  <header class="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-100 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-md" style="background-color: ${primaryColor}">
          ${escapeHtml(business.name.charAt(0) || 'U')}
        </div>
        <div>
          <span class="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight block leading-tight">
            ${escapeHtml(business.name)}
          </span>
          <span class="text-[11px] text-gray-500 dark:text-gray-400 block font-normal leading-tight">
            ${escapeHtml(business.tagline)}
          </span>
        </div>
      </a>

      <nav class="hidden md:flex items-center gap-8">
        ${navItemsHtml}
        ${
          config.navigation.showCtaButton
            ? `<a href="${escapeHtml(
                config.navigation.ctaUrl || waLink
              )}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm hover:opacity-90 transition-all" style="background-color: ${primaryColor}">
              ${escapeHtml(config.navigation.ctaText || 'Chat WhatsApp')}
            </a>`
            : ''
        }
      </nav>
    </div>
  </header>

  <!-- Main Content Sections -->
  <main>
${sectionsHtml}
  </main>

  <!-- Floating WhatsApp CTA -->
  ${
    config.whatsapp.enabled
      ? `<a href="${escapeHtml(
          waLink
        )}" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-xl hover:scale-105 active:scale-95 transition-all font-bold text-xs cursor-pointer" style="background-color: #25D366" title="Chat WhatsApp">
        <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.077-.062-.239-.077-.55-.174-1.011-.371-1.954-.836-3.23-2.825-3.327-2.955-.097-.133-.794-1.055-.794-2.012 0-.957.502-1.428.681-1.621.179-.193.391-.242.522-.242.13 0 .261.002.375.008.12.006.28-.046.438.334.163.391.556 1.356.604 1.455.049.098.082.213.016.342-.065.13-.098.212-.196.326-.098.115-.207.257-.295.345-.098.098-.201.205-.087.401.114.196.508.838 1.092 1.358.751.669 1.385.877 1.581.974.196.098.311.082.424-.049.115-.13.49-.572.621-.768.13-.196.262-.163.441-.098.179.065 1.144.539 1.34.637.196.098.327.147.375.229.049.082.049.474-.095.879z"/></svg>
        <span>${escapeHtml(config.whatsapp.buttonText || 'Chat WhatsApp')}</span>
      </a>`
      : ''
  }

  <!-- Smooth Scroll Script -->
  <script>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  </script>
</body>
</html>`;
}

function renderSectionToHtml(sec: SectionConfig, config: WebsiteConfig): string {
  const content = sec.content || {};
  const primaryColor = config.branding.primaryColor || '#2563eb';
  const waLink = getWhatsAppLink(config);

  switch (sec.type) {
    case 'hero':
      return `
    <!-- Hero Section -->
    <section id="${escapeHtml(sec.id)}" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7 space-y-6">
          ${
            content.badgeText
              ? `<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              <span>★</span>
              <span>${escapeHtml(content.badgeText)}</span>
            </div>`
              : ''
          }
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            ${escapeHtml(content.heading || config.business.name)}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
            ${escapeHtml(content.description || content.subheading || '')}
          </p>
          <div class="pt-2 flex flex-wrap items-center gap-4">
            <a href="${escapeHtml(
              content.ctaPrimaryUrl || waLink
            )}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow hover:opacity-90 transition-all" style="background-color: ${primaryColor}">
              ${escapeHtml(content.ctaPrimaryText || 'Chat WhatsApp Sekarang')}
            </a>
            ${
              content.ctaSecondaryText
                ? `<a href="${escapeHtml(
                    content.ctaSecondaryUrl || '#services'
                  )}" class="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                ${escapeHtml(content.ctaSecondaryText)}
              </a>`
                : ''
            }
          </div>
        </div>
        <div class="lg:col-span-5 relative">
          <img src="${escapeHtml(
            content.imageUrl ||
              'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
          )}" alt="${escapeHtml(
        content.heading || ''
      )}" class="w-full h-80 sm:h-[440px] object-cover rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800" />
        </div>
      </div>
    </section>`;

    case 'services':
      const serviceItems = (content.items || [])
        .map(
          (item: any) => `
        <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-bold text-xl" style="background-color: ${primaryColor}15; color: ${primaryColor}">
            ✓
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${escapeHtml(item.title)}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">${escapeHtml(item.description)}</p>
          ${item.price ? `<div class="text-xs font-bold text-emerald-600 mb-3">${escapeHtml(item.price)}</div>` : ''}
          <a href="${escapeHtml(
            item.ctaUrl || getWhatsAppLink(config, `Halo, saya mau tanya layanan ${item.title}`)
          )}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-xs font-semibold hover:underline" style="color: ${primaryColor}">
            Pesan / Tanya Layanan →
          </a>
        </div>`
        )
        .join('\n');

      return `
    <!-- Services Section -->
    <section id="services" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">${escapeHtml(
          content.title || 'Layanan Kami'
        )}</h2>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">${escapeHtml(content.subtitle || '')}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${serviceItems}
      </div>
    </section>`;

    case 'pricing':
      const pricingPlans = (content.plans || [])
        .map((p: any) => {
          const feats = (p.features || [])
            .map((f: string) => `<li class="text-sm flex items-center gap-2">✓ ${escapeHtml(f)}</li>`)
            .join('\n');
          return `
        <div class="p-8 bg-white dark:bg-gray-900 border ${
          p.isFeatured ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl' : 'border-gray-200 dark:border-gray-800'
        } rounded-2xl flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${escapeHtml(p.name)}</h3>
            <p class="text-xs text-gray-500 mb-4">${escapeHtml(p.description || '')}</p>
            <div class="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">${escapeHtml(p.price)}</div>
            <ul class="space-y-2.5 text-gray-600 dark:text-gray-300 mb-6">
              ${feats}
            </ul>
          </div>
          <a href="${escapeHtml(
            p.ctaUrl || getWhatsAppLink(config, `Halo, saya ingin ambil paket: ${p.name}`)
          )}" target="_blank" rel="noopener noreferrer" class="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow" style="background-color: ${primaryColor}">
            ${escapeHtml(p.ctaText || 'Pilih Paket Ini')}
          </a>
        </div>`;
        })
        .join('\n');

      return `
    <!-- Pricing Section -->
    <section id="pricing" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">${escapeHtml(
          content.title || 'Daftar Paket & Biaya'
        )}</h2>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">${escapeHtml(content.subtitle || '')}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${pricingPlans}
      </div>
    </section>`;

    case 'cta':
      return `
    <!-- CTA Banner -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="p-8 sm:p-14 text-center text-white rounded-3xl shadow-2xl" style="background-color: ${primaryColor}">
        <div class="max-w-3xl mx-auto space-y-6">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">${escapeHtml(
            content.title || 'Siap Mendapatkan Layanan Terbaik?'
          )}</h2>
          <p class="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">${escapeHtml(
            content.description || 'Hubungi kami sekarang untuk konsultasi langsung via WhatsApp.'
          )}</p>
          <div class="pt-4">
            <a href="${escapeHtml(
              content.ctaUrl || waLink
            )}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold bg-white text-gray-900 shadow-lg hover:bg-gray-50 transition-all">
              ${escapeHtml(content.ctaText || 'Chat WhatsApp Sekarang')}
            </a>
          </div>
        </div>
      </div>
    </section>`;

    case 'contact':
      return `
    <!-- Contact Section -->
    <section id="contact" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-14">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">${escapeHtml(
          content.title || 'Hubungi Kami'
        )}</h2>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">${escapeHtml(
          content.subtitle || 'Kami siap membantu menjawab segala pertanyaan Anda.'
        )}</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-6 shadow-sm">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">Alamat & Jam Operasional</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Alamat:</strong> ${escapeHtml(
            config.business.address
          )}, ${escapeHtml(config.business.city)}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Telepon:</strong> ${escapeHtml(
            config.business.phone
          )}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Email:</strong> ${escapeHtml(
            config.business.email
          )}</p>
          <p class="text-sm text-gray-600 dark:text-gray-300"><strong>Jam Buka:</strong> ${escapeHtml(
            config.business.openingHours
          )}</p>
          <div class="pt-4">
            <a href="${escapeHtml(
              waLink
            )}" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white shadow" style="background-color: #25D366">
              Chat WhatsApp Langsung
            </a>
          </div>
        </div>
        <div class="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Kirim Pesan WhatsApp Cepat</h3>
          <p class="text-sm text-gray-500 mb-6">Klik tombol di bawah ini untuk memulai obrolan langsung bersama tim layanan pelanggan kami.</p>
          <a href="${escapeHtml(
            waLink
          )}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl text-base font-bold text-white shadow hover:opacity-95 transition-all" style="background-color: ${primaryColor}">
            Mulai Percakapan WhatsApp
          </a>
        </div>
      </div>
    </section>`;

    case 'footer':
      return `
    <!-- Footer -->
    <footer class="bg-gray-950 text-gray-300 border-t border-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© ${new Date().getFullYear()} ${escapeHtml(config.business.name)}. ${escapeHtml(
        config.footer.copyrightText || 'Hak Cipta Dilindungi.'
      )}</p>
        <p class="text-gray-500">Website Dibuat dengan SitusUMKM Template Builder</p>
      </div>
    </footer>`;

    default:
      return '';
  }
}

export function downloadHtmlFile(filename: string, htmlContent: string): void {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.html') ? filename : `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
