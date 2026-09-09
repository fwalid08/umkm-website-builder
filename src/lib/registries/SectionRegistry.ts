import { SectionTypeDefinition, SectionCategory } from '../../types/project';
import { HeroSection } from '../../components/sections/HeroSection';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { AboutSection } from '../../components/sections/AboutSection';
import { ProductsSection } from '../../components/sections/ProductsSection';
import { PricingSection } from '../../components/sections/PricingSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { StatsSection } from '../../components/sections/StatsSection';
import { FeaturesSection } from '../../components/sections/FeaturesSection';
import { FaqSection } from '../../components/sections/FaqSection';
import { ProcessSection } from '../../components/sections/ProcessSection';
import { GallerySection } from '../../components/sections/GallerySection';
import { CtaSection } from '../../components/sections/CtaSection';
import { ContactSection } from '../../components/sections/ContactSection';
import { TeamSection } from '../../components/sections/TeamSection';
import { BlogSection } from '../../components/sections/BlogSection';
import { PartnersSection } from '../../components/sections/PartnersSection';
import { NewsletterSection } from '../../components/sections/NewsletterSection';
import { FooterSection } from '../../components/sections/FooterSection';
import { SectionProps } from '../../types/section';

export const SECTION_DEFINITIONS: Record<string, SectionTypeDefinition> = {
  hero: {
    type: 'hero',
    name: 'Hero Banner',
    description: 'Bagian utama penarik perhatian di puncak halaman dengan judul, deskripsi, CTA WhatsApp, dan foto.',
    category: 'Hero',
    icon: 'Sparkles',
    defaultStyle: 'hero-split',
    availableStyles: [
      { id: 'hero-split', name: 'Split 2 Kolom (Standar)', description: 'Teks dan tombol di kiri, visual foto di kanan' },
      { id: 'hero-centered', name: 'Tengah Minimalis & Panorama', description: 'Teks terpusat di tengah dengan foto besar di bawah' },
      { id: 'hero-card', name: 'Hero Kartu Modern', description: 'Tampilan dalam bingkai kartu bergradasi mewah' },
      { id: 'hero-minimal', name: 'Tipografi Editorial Minimalis', description: 'Gaya editorial elegan dengan divider garis tipis' },
      { id: 'hero-overlay-bold', name: 'Full Gambar Latar & Overlay', description: 'Latar foto menyeluruh dengan lapisan gelap dan tombol kontras' },
      { id: 'hero-video-bg', name: 'Glassmorphism Sinematik', description: 'Kartu kaca transparan elegan di atas latar belakang' },
      { id: 'hero-badge-gradient', name: 'Tech Glow & Gradasi', description: 'Lencana berpendar dengan aksen gradasi warna masa kini' },
      { id: 'hero-asymmetric', name: 'Kolase Foto Asimetris', description: 'Komposisi foto dinamis dan kartu sorotan rating' },
      { id: 'hero-modern-slant', name: 'Showcase Sudut Modern', description: 'Bingkai modern bersudut dengan foto tebal berbayang' },
      { id: 'hero-showcase', name: 'Katalog Galeri Interaktif', description: 'Showcase foto utama dengan mini thumbnail pemilih' },
    ],
    defaultContent: () => ({
      heading: 'Layanan Profesional & Terpercaya untuk Kebutuhan Anda',
      subheading: 'Solusi Cepat, Transparan, dan Bergaransi Resmi',
      description: 'Kami berkomitmen memberikan pelayanan terbaik dengan tenaga ahli berpengalaman dan teknologi modern.',
      badgeText: 'Pilihan Utama UMKM Terpercaya',
      badgeIcon: 'Sparkles',
      ctaPrimaryText: 'Chat WhatsApp Sekarang',
      ctaPrimaryUrl: '',
      ctaSecondaryText: 'Lihat Layanan',
      ctaSecondaryUrl: '#services',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      bulletPoints: ['Pengerjaan Cepat & Rapi', 'Konsultasi Gratis Tanpa Biaya', 'Garansi Kepuasan Pelanggan', 'Teknisi Tersertifikasi'],
      bgType: 'none',
      bgOverlay: false,
      bgOverlayColor: '#000000',
      bgOverlayOpacity: 0.65,
    }),
    component: HeroSection,
  },
  services: {
    type: 'services',
    name: 'Layanan / Jasa',
    description: 'Katalog daftar layanan utama dengan ikon, penjelasan singkat, estimasi harga, dan tombol pesan.',
    category: 'Business',
    icon: 'Wrench',
    defaultStyle: 'services-grid',
    availableStyles: [
      { id: 'services-grid', name: 'Grid 3 Kolom Standar', description: 'Kartu layanan rapi dengan ikon berwarna dan tombol pesan' },
      { id: 'services-cards', name: 'Kartu Bergambar', description: 'Kartu layanan lengkap dengan foto header dan rincian harga' },
      { id: 'services-bento', name: 'Bento Grid Dinamis', description: 'Layout bento modern dengan kartu unggulan berukuran ganda' },
      { id: 'services-list', name: 'Daftar Baris Horizontal', description: 'Setiap layanan memanjang horizontal dengan badge harga di kanan' },
      { id: 'services-compact', name: 'Kartu Kompak Minimalis', description: 'Format ramping dengan ikon kecil dan penjelasan ringkas' },
      { id: 'services-numbered', name: 'Layanan Bernomor Urut', description: 'Nomor indeks besar 01-03 yang memberikan kesan terstruktur' },
      { id: 'services-icons-top', name: 'Ikon Besar Terpusat', description: 'Fokus visual pada ikon besar di atas judul' },
      { id: 'services-split', name: 'Split Kategori & Layanan', description: 'Judul dan penjelasan di kiri, kartu layanan di kanan' },
      { id: 'services-accent', name: 'Aksen Border Merek', description: 'Bingkai bergaris tegas menggunakan warna utama brand' },
      { id: 'services-pricing-preview', name: 'Layanan + Estimasi Biaya', description: 'Highlight estimasi tarif transparan dan tombol WhatsApp' },
    ],
    defaultContent: () => ({
      title: 'Layanan Unggulan Kami',
      subtitle: 'Dipilih secara cermat untuk memenuhi seluruh kebutuhan Anda dengan kualitas teruji.',
      items: [
        { title: 'Layanan Prioritas', description: 'Pengerjaan ekspres dengan penanganan langsung oleh master teknisi.', icon: 'Zap', price: 'Mulai Rp 150.000' },
        { title: 'Perawatan Berkala', description: 'Pengecekan mendalam dan perawatan berkala untuk menjaga keawetan jangka panjang.', icon: 'Wrench', price: 'Mulai Rp 200.000' },
        { title: 'Inspeksi & Diagnosa', description: 'Pemeriksaan menyeluruh menggunakan peralatan modern berstandar industri.', icon: 'CheckCircle2', price: 'Gratis saat servis' },
      ],
    }),
    component: ServicesSection,
  },
  about: {
    type: 'about',
    name: 'Tentang Usaha',
    description: 'Profil usaha, sejarah singkat, keunggulan kompetitif, dan nilai kejujuran bisnis Anda.',
    category: 'Business',
    icon: 'Building',
    defaultStyle: 'about-split',
    availableStyles: [
      { id: 'about-split', name: 'Split Foto & Teks', description: 'Foto aktivitas di sisi kiri dengan poin keunggulan di kanan' },
      { id: 'about-story', name: 'Cerita Narasi & Nilai', description: 'Fokus pada narasi sejarah usaha dan dedikasi pelayanan' },
      { id: 'about-stats-side', name: 'Fokus Angka & Pencapaian', description: 'Menampilkan 3 kartu statistik besar di samping penjelasan' },
      { id: 'about-card', name: 'Kartu Profil Terpusat', description: 'Konten terbingkai dalam kartu elegan dengan latar kontras' },
      { id: 'about-quote', name: 'Kutipan Nilai Usaha', description: 'Menonjolkan filosofi bisnis dengan tanda kutip artistik' },
      { id: 'about-timeline', name: 'Perjalanan Usaha', description: 'Rangkuman tonggak penting pertumbuhan bisnis Anda' },
      { id: 'about-badge-list', name: 'Daftar Poin Tersertifikasi', description: 'Daftar keunggulan dengan ikon checklist hijau mencolok' },
      { id: 'about-dual-photo', name: 'Kolase 2 Foto Aktivitas', description: 'Dua foto berdampingan yang memperlihatkan fasilitas kerja' },
      { id: 'about-minimal', name: 'Profil Teks Minimalis Elegan', description: 'Tanpa ornamen berlebih, mengedepankan keterbacaan' },
      { id: 'about-founder', name: 'Pesan dari Pemilik Bisnis', description: 'Pesan personal dari pendiri yang membangun kepercayaan' },
    ],
    defaultContent: () => ({
      title: 'Tentang Kami',
      subtitle: 'Dedikasi Penuh Sejak Hari Pertama',
      description: 'Kami didirikan dengan misi sederhana: memberikan kemudahan, transparansi, dan kualitas tanpa kompromi kepada setiap pelanggan setia.',
      experienceYears: '5+',
      story: 'Bagi kami, kepercayaan pelanggan adalah amanah tertinggi yang senantiasa kami jaga setiap hari.',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
      highlights: [
        'Transparansi harga tanpa biaya tersembunyi',
        'Teknisi bersertifikasi dan terlatih',
        'Penggunaan suku cadang & bahan original',
        'Layanan ramah dan konsultasi jujur',
      ],
      stats: [
        { value: '5+', label: 'Tahun Pengalaman' },
        { value: '1.200+', label: 'Pekerjaan Selesai' },
        { value: '99%', label: 'Kepuasan Klien' },
      ],
      ctaText: 'Konsultasi Sekarang',
    }),
    component: AboutSection,
  },
  products: {
    type: 'products',
    name: 'Menu / Katalog Produk',
    description: 'Daftar produk, menu makanan, atau item dagangan dengan foto, harga, dan tombol pesan langsung ke WhatsApp.',
    category: 'Commerce',
    icon: 'ShoppingBag',
    defaultStyle: 'product-grid',
    availableStyles: [
      { id: 'product-grid', name: 'Grid Katalog Produk', description: 'Kartu produk terstruktur dengan filter kategori dinamis' },
      { id: 'product-card-hover', name: 'Kartu Efek Zoom & Badge Promo', description: 'Foto membesar saat diarahkan dengan lencana diskon' },
      { id: 'product-list-menu', name: 'Menu Makanan & Minuman Resto', description: 'Daftar harga rapi dengan titik pemisah bergaya restoran' },
      { id: 'product-bento', name: 'Bento Showcase Produk Utama', description: 'Produk unggulan tampil dengan ukuran visual dua kali lipat' },
      { id: 'product-carousel', name: 'Koleksi Horizontal Bersih', description: 'Deretan produk yang tersusun rapi dengan tombol geser' },
      { id: 'product-minimal', name: 'List Minimalis & Harga Jelas', description: 'Desain bersih dan hemat ruang untuk katalog banyak' },
      { id: 'product-categories', name: 'Filter Kategori Tab', description: 'Pemisahan jelas per kategori menggunakan tombol tab' },
      { id: 'product-featured-hero', name: 'Highlight Produk Utama + Grid', description: 'Satu produk utama di atas diikuti produk pelengkap' },
      { id: 'product-whatsapp-order', name: 'Pesan Langsung ke WhatsApp', description: 'Tombol hijau WA langsung di setiap kartu produk' },
      { id: 'product-table', name: 'Tabel Spesifikasi & Tarif', description: 'Format tabel perbandingan harga dan spesifikasi' },
    ],
    defaultContent: () => ({
      title: 'Pilihan Menu & Produk Favorit',
      subtitle: 'Disajikan segar dan diolah dari bahan-bahan pilihan bermutu tinggi.',
      categories: ['Semua', 'Makanan', 'Minuman'],
      items: [
        { name: 'Menu Signature Pilihan', category: 'Makanan', price: 'Rp 45.000', description: 'Racikan resep istimewa dengan bumbu khas rempah nusantara.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80', badge: 'Terlaris' },
        { name: 'Kopi Susu Gula Aren', category: 'Minuman', price: 'Rp 22.000', description: 'Espresso murni dipadukan dengan susu segar dan aren organik.', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', badge: 'Favorit' },
      ],
    }),
    component: ProductsSection,
  },
  pricing: {
    type: 'pricing',
    name: 'Daftar Paket / Harga',
    description: 'Tabel paket harga transparan dengan daftar fitur lengkap dan highlight paket favorit.',
    category: 'Commerce',
    icon: 'DollarSign',
    defaultStyle: 'pricing-cards',
    availableStyles: [
      { id: 'pricing-cards', name: 'Kartu 3 Kolom Komparasi', description: '3 tingkatan paket dengan highlight di paket utama' },
      { id: 'pricing-highlight', name: 'Highlight Paket Rekomendasi', description: 'Paket terlaris dibuat lebih tinggi dengan badge menyala' },
      { id: 'pricing-minimal', name: 'Tabel Harga Bersih', description: 'Daftar harga minimalis tanpa ornamen yang membingungkan' },
      { id: 'pricing-simple', name: '2 Kolom Pilihan Praktis', description: 'Perbandingan sederhana antara paket reguler dan komplit' },
      { id: 'pricing-bento', name: 'Bento Paket Layanan', description: 'Tampilan paket bertingkat dengan rincian garansi' },
      { id: 'pricing-accordion', name: 'Rincian Buka-Tutup', description: 'Daftar fitur dapat dibuka untuk membaca rincian pekerjaan' },
      { id: 'pricing-horizontal', name: 'Paket Memanjang Horizontal', description: 'Layout baris horizontal dengan tombol aksi di ujung kanan' },
      { id: 'pricing-custom-quote', name: 'Paket + Konsultasi Kustom', description: 'Paket terstandar ditambah opsi kustomisasi sesuai anggaran' },
      { id: 'pricing-toggle', name: 'Pilihan Rutin vs Sekali Servis', description: 'Tampilan fleksibel untuk pelanggan reguler maupun baru' },
      { id: 'pricing-comparison', name: 'Matriks Fitur Menyeluruh', description: 'Tabel checklist fitur lengkap per tingkatan harga' },
    ],
    defaultContent: () => ({
      title: 'Pilihan Paket Hemat & Lengkap',
      subtitle: 'Investasi terukur untuk perawatan optimal tanpa khawatir overbudget.',
      plans: [
        { name: 'Paket Dasar', price: 'Rp 150.000', description: 'Cocok untuk kebutuhan rutin dan perawatan ringan berkala.', features: ['Pengecekan Dasar', 'Pembersihan Standar', 'Garansi 7 Hari'], ctaText: 'Pilih Dasar' },
        { name: 'Paket Komplit (Rekomendasi)', isFeatured: true, price: 'Rp 350.000', description: 'Paling diminati pelanggan untuk hasil maksimal dan menyeluruh.', features: ['Seluruh Fitur Dasar', 'Diagnosa Mendalam', 'Penggantian Komponen Aus', 'Garansi 30 Hari', 'Free Konsultasi Prioritas'], ctaText: 'Ambil Paket Ini' },
        { name: 'Paket Premium VIP', price: 'Rp 650.000', description: 'Perawatan premium total dengan penanganan prioritas tertinggi.', features: ['Seluruh Fitur Komplit', 'Perawatan Menyeluruh', 'Antar Jemput Kendaraan', 'Garansi 60 Hari'], ctaText: 'Pesan VIP' },
      ],
    }),
    component: PricingSection,
  },
  testimonials: {
    type: 'testimonials',
    name: 'Testimoni Pelanggan',
    description: 'Ulasan dan bukti kepuasan pelanggan dengan rating bintang untuk meningkatkan kepercayaan calon pembeli.',
    category: 'Social Proof',
    icon: 'Star',
    defaultStyle: 'testimonials-grid',
    availableStyles: [
      { id: 'testimonials-grid', name: 'Grid Kartu Ulasan', description: 'Kotak ulasan elegan dengan foto profil dan bintang emas' },
      { id: 'testimonials-single-spotlight', name: 'Spotlight Ulasan Terbaik', description: 'Satu ulasan utama berukuran besar yang paling berbobot' },
      { id: 'testimonials-carousel', name: 'Slider Ulasan Berbintang', description: 'Koleksi ulasan bergeser otomatis atau manual' },
      { id: 'testimonials-quote-cards', name: 'Kartu Kutipan Berlatar', description: 'Latar belakang berwarna lembut dengan tanda kutip besar' },
      { id: 'testimonials-minimal', name: 'Ulasan Teks Bersih', description: 'Tampilan bersih tanpa avatar, fokus pada kepuasan pelanggan' },
      { id: 'testimonials-avatars', name: 'Avatar Pelanggan & Rating', description: 'Wajah pelanggan asli dengan label domisili kota' },
      { id: 'testimonials-compact', name: 'Daftar Baris Ulasan', description: 'Ulasan kompak bersusun vertikal' },
      { id: 'testimonials-masonry', name: 'Masonry Kolom Dinamis', description: 'Tinggi kartu menyesuaikan panjang ulasan masing-masing' },
      { id: 'testimonials-google-review', name: 'Gaya Ulasan Google Maps', description: 'Tampilan menyerupai ulasan bintang 5 Google Maps' },
      { id: 'testimonials-trust-badges', name: 'Ulasan + Lencana Kepuasan', description: 'Dilengkapi lencana skor kepuasan 99% di samping kartu' },
    ],
    defaultContent: () => ({
      title: 'Apa Kata Mereka Tentang Kami',
      subtitle: 'Bukti kepuasan nyata dari ratusan pelanggan yang mempercayakan kebutuhannya pada kami.',
      items: [
        { name: 'Bambang Sudirjo', role: 'Pelanggan Setia (Jakarta)', quote: 'Pelayanannya sangat cepat, jujur, dan mekaniknya komunikatif. Harga sangat bersahabat dibanding tempat lain!', rating: 5 },
        { name: 'Siti Rahmawati', role: 'Ibu Rumah Tangga (Bandung)', quote: 'Hasil pengerjaannya sangat rapi dan bersih. Konsultasi via WhatsApp sangat responsif dan ramah.', rating: 5 },
        { name: 'Andi Pratama', role: 'Wiraswasta (Surabaya)', quote: 'Sangat direkomendasikan untuk siapa saja yang butuh layanan cepat dan kualitas terjamin tanpa repot.', rating: 5 },
      ],
    }),
    component: TestimonialsSection,
  },
  stats: {
    type: 'stats',
    name: 'Statistik & Angka',
    description: 'Sorotan angka pencapaian, jumlah klien, dan jam terbang usaha Anda.',
    category: 'Social Proof',
    icon: 'TrendingUp',
    defaultStyle: 'stats-minimal',
    availableStyles: [
      { id: 'stats-minimal', name: 'Baris Minimalis Memanjang', description: 'Baris angka elegan memanjang horizontal antar seksi' },
      { id: 'stats-cards', name: 'Kotak Kartu Statistik', description: 'Kotak-kotak kartu dengan ikon dan label terstruktur' },
      { id: 'stats-circles', name: 'Lingkaran Angka Modern', description: 'Angka berbingkai lingkaran dengan aksen warna primer' },
      { id: 'stats-gradient', name: 'Kartu Berlatar Gradasi', description: 'Latar gradasi mencolok yang menarik perhatian mata' },
      { id: 'stats-grid', name: 'Grid 4 Kolom dengan Ikon', description: '4 metrik utama bersebelahan dengan ikon industri' },
      { id: 'stats-inline', name: 'Angka Bersebelahan Teks', description: 'Angka tebal di sebelah kiri dengan deskripsi di kanan' },
      { id: 'stats-bold', name: 'Angka Ekstra Besar Berwarna', description: 'Tipografi angka super tebal untuk dampak visual maksimal' },
      { id: 'stats-split', name: 'Split Ringkasan & Metrik', description: 'Penjelasan pencapaian di kiri dan 3 angka di kanan' },
      { id: 'stats-pill', name: 'Kapsul Metrik Terapung', description: 'Bentuk pil membulat halus dengan bayangan lembut' },
      { id: 'stats-dark-accent', name: 'Dark Luxury Beraksen', description: 'Latar gelap kontras tinggi dengan aksen warna brand' },
    ],
    defaultContent: () => ({
      items: [
        { value: '5.000+', label: 'Klien Terlayani', icon: 'Users' },
        { value: '99.5%', label: 'Tingkat Kepuasan', icon: 'ThumbsUp' },
        { value: '6+ Thn', label: 'Pengalaman', icon: 'Award' },
        { value: '100%', label: 'Garansi Servis', icon: 'ShieldCheck' },
      ],
    }),
    component: StatsSection,
  },
  features: {
    type: 'features',
    name: 'Keunggulan / Fitur',
    description: 'Nilai tambah dan keistimewaan bisnis Anda dibanding kompetitor lain.',
    category: 'Business',
    icon: 'ShieldCheck',
    defaultStyle: 'features-grid',
    availableStyles: [
      { id: 'features-grid', name: 'Grid 3 Kolom Ikonik', description: 'Ikon modern dengan judul dan penjelasan keunggulan' },
      { id: 'features-cards', name: 'Kartu Berbingkai Lembut', description: 'Kartu putih dengan efek melayang saat disentuh' },
      { id: 'features-list-horizontal', name: 'Daftar Memanjang Horizontal', description: 'Tersusun rapi dengan tanda checklist hijau' },
      { id: 'features-split-photo', name: 'Split Foto & Keunggulan', description: 'Foto produk di kiri dan 4 poin keunggulan di kanan' },
      { id: 'features-bento', name: 'Bento Grid Nilai Lebih', description: 'Susunan bento asimetris dengan kartu fokus utama' },
      { id: 'features-minimal', name: 'Minimalis Teks Sederhana', description: 'Desain bersih berfokus pada kekuatan kata-kata' },
      { id: 'features-numbered', name: 'Keunggulan Bernomor Urut', description: 'Nomor indeks tebal penegas urutan prioritas' },
      { id: 'features-icons-large', name: 'Ikon Besar & Aksen Warna', description: 'Wadah ikon berwarna yang serasi dengan brand' },
      { id: 'features-badges', name: 'Lencana Kepercayaan Bisnis', description: 'Format lencana seperti garansi, sertifikasi, dan jaminan' },
      { id: 'features-compact', name: '2 Kolom Kompak', description: 'Tata letak 2 kolom rapat yang hemat ruang gulir' },
    ],
    defaultContent: () => ({
      title: 'Keunggulan Kami',
      subtitle: 'Standar kerja disiplin yang membuat ratusan pelanggan memilih kami.',
      items: [
        { title: 'Respon Cepat 24 Jam', description: 'Tim kami selalu sigap merespons chat dan pertanyaan Anda via WhatsApp.', icon: 'Clock' },
        { title: 'Transparansi Biaya', description: 'Estimasi biaya disampaikan di awal sebelum pengerjaan dimulai.', icon: 'DollarSign' },
        { title: 'Garansi Pekerjaan', description: 'Jaminan kepuasan dan perbaikan gratis jika hasil tidak sesuai perjanjian.', icon: 'Shield' },
      ],
    }),
    component: FeaturesSection,
  },
  faq: {
    type: 'faq',
    name: 'Tanya Jawab (FAQ)',
    description: 'Pertanyaan yang sering diajukan pelanggan berserta jawaban lengkap untuk mempercepat keputusan pemesanan.',
    category: 'Content',
    icon: 'HelpCircle',
    defaultStyle: 'faq-accordion',
    availableStyles: [
      { id: 'faq-accordion', name: 'Akordeon Interaktif (Buka-Tutup)', description: 'Pertanyaan dapat dibuka-tutup dengan transisi halus' },
      { id: 'faq-two-columns', name: 'Grid 2 Kolom Tanya Jawab', description: 'Pertanyaan tersusun dalam dua kolom berdampingan' },
      { id: 'faq-cards', name: 'Kartu Tanya Jawab Terpisah', description: 'Setiap pertanyaan dibungkus dalam kartu kotak mandiri' },
      { id: 'faq-minimal', name: 'Daftar Pertanyaan Bersih', description: 'Garis pemisah sederhana tanpa bingkai kotak' },
      { id: 'faq-categorized', name: 'Tanya Jawab Berkelompok', description: 'Dikelompokkan berdasarkan topik pemesanan & garansi' },
      { id: 'faq-split', name: 'Split Header & Akordeon', description: 'Judul dan tombol hubungi di kiri, daftar pertanyaan di kanan' },
      { id: 'faq-bubble', name: 'Percakapan Chat Gelembung', description: 'Format tanya-jawab bergaya pesan obrolan WhatsApp' },
      { id: 'faq-border-accent', name: 'Aksen Garis Warna Merek', description: 'Garis tepi berwarna di sisi pertanyaan yang aktif' },
      { id: 'faq-compact', name: 'Akordeon Ringkas Ramping', description: 'Jarak antar pertanyaan lebih rapat untuk daftar panjang' },
      { id: 'faq-with-support', name: 'FAQ + Kontak Bantuan CS', description: 'Dilengkapi kotak ajakan chat jika pertanyaan belum terjawab' },
    ],
    defaultContent: () => ({
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Segala hal yang perlu Anda ketahui sebelum menggunakan layanan kami.',
      items: [
        { question: 'Bagaimana cara melakukan pemesanan atau booking jadwal?', answer: 'Cukup klik tombol "Chat WhatsApp" di halaman ini. Tim kami akan segera membantu mencatat jadwal dan kebutuhan Anda secara langsung.' },
        { question: 'Apakah ada biaya tambahan di luar estimasi?', answer: 'Tidak ada biaya tersembunyi. Setiap penggantian part atau pengerjaan tambahan akan dikonfirmasikan dan disetujui terlebih dahulu oleh Anda.' },
        { question: 'Metode pembayaran apa saja yang diterima?', answer: 'Kami menerima transfer bank, QRIS, kartu debit, maupun pembayaran tunai langsung di lokasi.' },
        { question: 'Apakah ada garansi setelah pengerjaan?', answer: 'Ya, seluruh pekerjaan kami dilindungi garansi servis resmi hingga 30 hari sesuai jenis paket yang diambil.' },
      ],
    }),
    component: FaqSection,
  },
  process: {
    type: 'process',
    name: 'Alur Kerja (Langkah demi Langkah)',
    description: 'Langkah mudah bagi pelanggan mulai dari konsultasi hingga hasil akhir.',
    category: 'Content',
    icon: 'Layers',
    defaultStyle: 'process-steps',
    availableStyles: [
      { id: 'process-steps', name: '4 Langkah Berurutan dengan Ikon', description: 'Kartu bernomor urut jelas dengan ikon pendukung' },
      { id: 'process-numbered', name: 'Angka Urut Besar 01-04', description: 'Tipografi angka super besar sebagai pemandu alur' },
      { id: 'process-timeline', name: 'Garis Waktu Horizontal', description: 'Titik alur yang terhubung garis lurus horizontal' },
      { id: 'process-vertical', name: 'Alur Vertikal Berkelanjutan', description: 'Garis vertikal yang menuntun langkah dari atas ke bawah' },
      { id: 'process-cards', name: 'Kartu Tahapan Pengerjaan', description: 'Setiap langkah dikemas dalam kartu elegan berbayang' },
      { id: 'process-bento', name: 'Bento Tahapan Konsultasi', description: 'Tata letak modern dengan kotak tahap yang bervariasi' },
      { id: 'process-minimal', name: 'Teks Alur Minimalis', description: 'Desain bersih berfokus pada kemudahan alur' },
      { id: 'process-cycle', name: 'Siklus Alur Terpadu', description: 'Menekankan alur layanan yang tuntas dan berkelanjutan' },
      { id: 'process-badges', name: 'Langkah Kapsul Terhubung', description: 'Bentuk kapsul berurutan dengan panah penghubung' },
      { id: 'process-split', name: 'Split Info & 3 Langkah Sederhana', description: 'Penjelasan umum di kiri dan daftar langkah di kanan' },
    ],
    defaultContent: () => ({
      title: 'Cara Pemesanan Sangat Mudah',
      subtitle: 'Hanya butuh 4 langkah sederhana dari awal konsultasi hingga selesai.',
      steps: [
        { step: '01', title: 'Hubungi WhatsApp', description: 'Konsultasikan masalah atau kebutuhan Anda kepada customer service kami.', icon: 'Phone' },
        { step: '02', title: 'Dapatkan Estimasi', description: 'Kami memberikan rincian harga dan jadwal pengerjaan yang transparan.', icon: 'FileText' },
        { step: '03', title: 'Pengerjaan Ahli', description: 'Pekerjaan ditangani langsung oleh teknisi berpengalaman dan teruji.', icon: 'Wrench' },
        { step: '04', title: 'Pengecekan & Garansi', description: 'Pemeriksaan kepuasan bersama pelanggan sebelum serah terima.', icon: 'CheckCircle2' },
      ],
    }),
    component: ProcessSection,
  },
  gallery: {
    type: 'gallery',
    name: 'Galeri Foto & Dokumentasi',
    description: 'Kumpulan foto hasil pengerjaan, suasana tempat, dan produk untuk meyakinkan calon pelanggan.',
    category: 'Media',
    icon: 'Camera',
    defaultStyle: 'gallery-grid',
    availableStyles: [
      { id: 'gallery-grid', name: 'Grid Foto Responsif', description: 'Susunan foto rapi dengan efek zoom halus saat hover' },
      { id: 'gallery-masonry', name: 'Masonry Asimetris Dinamis', description: 'Tinggi foto bervariasi menyerupai dinding galeri seni' },
      { id: 'gallery-carousel', name: 'Koleksi Geser Horizontal', description: 'Deretan foto yang dapat digeser mulus ke samping' },
      { id: 'gallery-cards', name: 'Kartu Foto dengan Keterangan', description: 'Foto dengan teks deskripsi di bagian bawah kartu' },
      { id: 'gallery-panoramic', name: 'Banner Foto Panorama', description: 'Foto beresolusi tinggi memanjang selebar layar' },
      { id: 'gallery-compact', name: 'Grid Mini 6 Foto', description: 'Susunan 6 foto ringkas yang pas untuk cuplikan' },
      { id: 'gallery-lightbox-style', name: 'Bingkai Halus Berbayang', description: 'Foto dibingkai bingkai putih berkesan premium' },
      { id: 'gallery-square', name: 'Grid Persegi Instagram-style', description: 'Rasio aspek 1:1 persegi yang rapi dan konsisten' },
      { id: 'gallery-before-after', name: 'Sebelum & Sesudah Pengerjaan', description: 'Komparasi visual hasil nyata sebelum dan setelah dikerjakan' },
      { id: 'gallery-highlight', name: '1 Foto Utama + 3 Pendukung', description: 'Satu foto showcase besar didampingi 3 foto kecil' },
    ],
    defaultContent: () => ({
      title: 'Galeri Aktivitas & Pengerjaan',
      subtitle: 'Melihat langsung kualitas dan standar kerapihan kerja kami.',
      images: [
        { src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', caption: 'Pemeriksaan Teliti' },
        { src: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80', caption: 'Alat Standar Industri' },
        { src: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80', caption: 'Ruang Kerja Bersih' },
        { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', caption: 'Hasil Akhir Prima' },
      ],
    }),
    component: GallerySection,
  },
  cta: {
    type: 'cta',
    name: 'Ajakan Bertindak (CTA WhatsApp)',
    description: 'Banner konversi dengan tombol WhatsApp mencolok untuk mendorong pengunjung langsung menghubungi Anda.',
    category: 'Contact',
    icon: 'MessageCircle',
    defaultStyle: 'cta-gradient',
    availableStyles: [
      { id: 'cta-gradient', name: 'Banner Warna Merek', description: 'Warna primer tegas dengan tombol putih mencolok' },
      { id: 'cta-centered', name: 'Tengah Elegan dengan Rating', description: 'Teks terpusat dengan rating bintang 5 dan tombol WA' },
      { id: 'cta-split', name: 'Split Hubungi WhatsApp & Telepon', description: 'Teks di sisi kiri dengan dua tombol aksi di sisi kanan' },
      { id: 'cta-card', name: 'Kartu Mengambang Berbayang Mewah', description: 'Kartu terapung dengan border halus dan bayangan tebal' },
      { id: 'cta-minimal', name: 'Teks Ajakan Minimalis Bersih', description: 'Ajakan singkat tanpa latar belakang yang mencolok' },
      { id: 'cta-dark-bold', name: 'Latar Gelap Kontras Tinggi', description: 'Latar belakang hitam legam dengan tombol WhatsApp hijau' },
      { id: 'cta-whatsapp-banner', name: 'Banner Khusus Chat WhatsApp', description: 'Fokus penuh pada kecepatan respon chat WhatsApp' },
      { id: 'cta-with-guarantee', name: 'CTA + Lencana Garansi', description: 'Dilengkapi lencana garansi 100% uang kembali / revisi' },
      { id: 'cta-urgency', name: 'Penawaran Spesial Terbatas', description: 'Mencantumkan penawaran khusus untuk pemesan hari ini' },
      { id: 'cta-badge-pill', name: 'Kapsul Ajakan Berbingkai', description: 'Desain kapsul membulat ramah pengguna mobile' },
    ],
    defaultContent: () => ({
      title: 'Punya Pertanyaan atau Butuh Bantuan Cepat?',
      description: 'Jangan ragu untuk berkonsultasi secara gratis dengan tim kami via WhatsApp sekarang juga.',
      ctaText: 'Chat WhatsApp Sekarang',
      secondaryText: 'Telepon Langsung',
    }),
    component: CtaSection,
  },
  contact: {
    type: 'contact',
    name: 'Kontak & Alamat Usaha',
    description: 'Informasi lengkap lokasi usaha, jam operasional, no telepon, dan formulir kirim pesan cepat.',
    category: 'Contact',
    icon: 'MapPin',
    defaultStyle: 'contact-split',
    availableStyles: [
      { id: 'contact-split', name: 'Split Detail Alamat & Formulir WA', description: 'Kolom detail alamat di kiri dan formulir kirim WhatsApp di kanan' },
      { id: 'contact-cards', name: '3 Kotak Informasi Kontak Terpisah', description: 'Kartu telepon, kartu alamat, dan kartu jam buka terpisah' },
      { id: 'contact-with-map', name: 'Info Kontak Lengkap dengan Peta', description: 'Peta lokasi Google Maps di samping rincian alamat' },
      { id: 'contact-minimal', name: 'Baris Kontak Bersih Tanpa Form', description: 'Informasi kontak langsung yang ringkas dan lugas' },
      { id: 'contact-centered', name: 'Pusat Informasi & Jam Buka', description: 'Layout terpusat dengan penekanan pada jam operasional' },
      { id: 'contact-whatsapp-direct', name: 'Tombol Chat WhatsApp Langsung', description: 'Tombol besar untuk langsung terhubung ke admin toko' },
      { id: 'contact-bento', name: 'Bento Kontak & Lokasi', description: 'Susunan bento informatif yang memikat secara visual' },
      { id: 'contact-hours-highlight', name: 'Sorotan Jam Buka & Hari', description: 'Tabel jadwal buka mingguan yang jelas dan transparan' },
      { id: 'contact-floating-card', name: 'Kartu Lokasi Terapung', description: 'Kartu info yang melayang di atas peta lokasi' },
      { id: 'contact-office-branch', name: 'Informasi Cabang & Alamat', description: 'Tata letak yang siap menampung alamat cabang usaha' },
    ],
    defaultContent: () => ({
      title: 'Kunjungi Lokasi Kami',
      subtitle: 'Kami selalu siap menyambut kedatangan dan konsultasi Anda.',
    }),
    component: ContactSection,
  },
  team: {
    type: 'team',
    name: 'Tim Profesional',
    description: 'Perkenalkan anggota tim atau spesialis di balik kualitas usaha Anda.',
    category: 'Content',
    icon: 'Users',
    defaultStyle: 'team-grid',
    availableStyles: [
      { id: 'team-grid', name: 'Grid Kartu Tim Standar', description: 'Foto, nama, jabatan, dan bio singkat spesialis' },
      { id: 'team-rounded', name: 'Avatar Bulat Minimalis', description: 'Foto profil melingkar dengan tipografi rapi' },
      { id: 'team-cards-large', name: 'Kartu Foto Besar & Profil', description: 'Foto potret besar dengan keterangan keahlian' },
      { id: 'team-list', name: 'Daftar Baris Horizontal', description: 'Setiap anggota tim tersusun memanjang secara horizontal' },
      { id: 'team-bento', name: 'Bento Grid Tim', description: 'Pemimpin tim mendapat sorotan kartu lebih besar' },
      { id: 'team-minimal', name: 'Minimalis Nama & Jabatan', description: 'Format sederhana hemat ruang' },
      { id: 'team-social', name: 'Kartu Tim dengan Link WhatsApp', description: 'Tombol langsung konsultasi ke anggota tim' },
      { id: 'team-monochrome', name: 'Gaya Monokrom Profesional', description: 'Foto hitam-putih artistik dengan hover warna asli' },
      { id: 'team-badges', name: 'Profil Tim + Sertifikasi', description: 'Menampilkan lencana sertifikasi teknis keahlian' },
      { id: 'team-compact', name: 'Grid 4 Kolom Kompak', description: 'Tampilan padat untuk tim yang memiliki banyak staf' },
    ],
    defaultContent: () => ({
      title: 'Tim Ahli Kami',
      subtitle: 'Tenaga profesional berpengalaman dengan dedikasi tinggi.',
      members: [
        { name: 'Hendra Setiawan', role: 'Kepala Teknisi / Master', bio: 'Berpengalaman lebih dari 8 tahun di bidang permesinan dan otomotif modern.' },
        { name: 'Rian Firdaus', role: 'Spesialis Elektrikal', bio: 'Ahli sistem kelistrikan dengan sertifikasi kompetensi nasional.' },
        { name: 'Dedi Saputra', role: 'Konsultan Layanan', bio: 'Ramah dan siap memberikan rekomendasi solusi paling efisien bagi Anda.' },
      ],
    }),
    component: TeamSection,
  },
  blog: {
    type: 'blog',
    name: 'Artikel & Tips',
    description: 'Bagikan edukasi, tips perawatan, dan berita terbaru seputar bisnis Anda.',
    category: 'Content',
    icon: 'FileText',
    defaultStyle: 'blog-grid',
    availableStyles: [
      { id: 'blog-grid', name: 'Grid 3 Kartu Artikel', description: 'Gambar header, tanggal, judul, dan ringkasan isi' },
      { id: 'blog-magazine', name: 'Gaya Majalah dengan Artikel Utama', description: 'Satu artikel utama besar dan dua artikel sampingan' },
      { id: 'blog-list', name: 'Daftar Baris Artikel', description: 'Thumbnail foto di kiri dan judul ringkasan di kanan' },
      { id: 'blog-minimal', name: 'List Minimalis Tipografi', description: 'Judul dan tanggal tanpa gambar header' },
      { id: 'blog-cards-compact', name: 'Kartu Kompak Responsif', description: 'Ukuran kartu lebih padat untuk membaca cepat' },
      { id: 'blog-bento', name: 'Bento Grid Artikel Pilihan', description: 'Susunan modern dengan sorotan topik terpopuler' },
      { id: 'blog-sidebar', name: 'Split Topik & Daftar Tulisan', description: 'Kategori di kolom kiri dan daftar artikel di kanan' },
      { id: 'blog-timeline', name: 'Kronologi Tips Terkini', description: 'Urutan kronologis berdasarkan tanggal rilis' },
      { id: 'blog-tags', name: 'Artikel dengan Tagar Topik', description: 'Dilengkapi label kategori seperti #Tips, #Panduan' },
      { id: 'blog-fullwidth', name: 'Kartu Memanjang dengan Tombol Baca', description: 'Ringkasan lengkap dengan tautan baca selengkapnya' },
    ],
    defaultContent: () => ({
      title: 'Tips & Berita Edukasi',
      subtitle: 'Wawasan bermanfaat untuk menjaga performa dan keawetan aset Anda.',
      articles: [
        { title: 'Tanda-tanda Awal Komponen Mulai Aus yang Perlu Anda Waspadai', date: '01 Sep 2026', summary: 'Mengetahui tanda awal kerusakan dapat menghemat pengeluaran hingga jutaan rupiah sebelum menjadi parah.' },
        { title: 'Panduan Praktis Perawatan Rutin Mandiri di Rumah', date: '28 Agu 2026', summary: 'Langkah mudah yang dapat Anda lakukan sendiri dalam 15 menit untuk memastikan kondisi selalu prima.' },
        { title: 'Cara Memilih Oli dan Cairan Berkualitas Sesuai Spesifikasi Resmi', date: '15 Agu 2026', summary: 'Pentingnya menggunakan pelumas berstandar resmi demi menjaga keawetan mesin dalam jangka panjang.' },
      ],
    }),
    component: BlogSection,
  },
  partners: {
    type: 'partners',
    name: 'Mitra & Kemitraan',
    description: 'Logo brand terpercaya, distributor resmi, atau partner usaha Anda.',
    category: 'Social Proof',
    icon: 'Tag',
    defaultStyle: 'partners-grid',
    availableStyles: [
      { id: 'partners-grid', name: 'Barisan Logo Mitra Bersih', description: 'Logo-logo mitra berjajar dengan kontras halus' },
      { id: 'partners-cards', name: 'Kartu Kotak Mitra', description: 'Setiap logo dalam kotak kartu dengan bayangan lembut' },
      { id: 'partners-marquee', name: 'Deretan Memanjang Satu Baris', description: 'Tampilan satu baris rapat yang menghemat ruang vertikal' },
      { id: 'partners-grayscale', name: 'Monokrom Elegan (Hover Berwarna)', description: 'Warna abu-abu yang berubah berwarna saat kursor menyentuh' },
      { id: 'partners-split', name: 'Split Judul di Kiri & Logo di Kanan', description: 'Penjelasan kemitraan di kiri dengan logo di kanan' },
      { id: 'partners-minimal', name: 'Teks Nama Mitra Sederhana', description: 'Daftar nama mitra resmi tanpa gambar logo' },
      { id: 'partners-badges', name: 'Lencana Distributor Resmi', description: 'Disertai keterangan status lisensi distributor resmi' },
      { id: 'partners-bento', name: 'Bento Grid Partner', description: 'Mitra utama diletakkan di kotak berukuran ganda' },
      { id: 'partners-pill', name: 'Bentuk Kapsul Modern', description: 'Wadah berbentuk pil dengan border tipis' },
      { id: 'partners-dark', name: 'Kontras Gelap Berpendar', description: 'Latar gelap elegan untuk menonjolkan logo mitra' },
    ],
    defaultContent: () => ({
      title: 'Menggunakan Bahan & Produk Resmi Berstandar Internasional',
      partners: [
        { name: 'Pertamina Lubricants' },
        { name: 'Castrol' },
        { name: 'Motul' },
        { name: 'BOSCH' },
        { name: 'Denso' },
        { name: 'Astra Otoparts' },
      ],
    }),
    component: PartnersSection,
  },
  newsletter: {
    type: 'newsletter',
    name: 'Pendaftaran Promo / Newsletter',
    description: 'Kumpulkan kontak WhatsApp atau email pelanggan untuk program promo dan penawaran khusus.',
    category: 'Marketing' as any,
    icon: 'Mail',
    defaultStyle: 'newsletter-card',
    availableStyles: [
      { id: 'newsletter-card', name: 'Kartu Pendaftaran Bersih', description: 'Formulir satu kolom dengan tombol subscribe terintegrasi' },
      { id: 'newsletter-gradient', name: 'Banner Gradasi Menarik', description: 'Latar gradasi warna mencolok dengan tombol kontras' },
      { id: 'newsletter-split', name: 'Split Ajakan & Kolom Input', description: 'Penjelasan manfaat diskon di kiri dan formulir di kanan' },
      { id: 'newsletter-minimal', name: 'Formulir Minimalis Ramping', description: 'Input memanjang tanpa kartu latar yang tebal' },
      { id: 'newsletter-popup-style', name: 'Bingkai Kotak Berdiskon', description: 'Lencana voucher diskon 25% di sudut kotak' },
      { id: 'newsletter-centered', name: 'Terpusat dengan Jaminan Privasi', description: 'Teks terpusat dengan jaminan tidak ada pesan spam' },
      { id: 'newsletter-dark', name: 'Tema Gelap Mewah', description: 'Latar gelap dengan aksen input emas / primer' },
      { id: 'newsletter-whatsapp-focus', name: 'Khusus Pendaftaran WhatsApp', description: 'Input nomor WhatsApp untuk menerima promo bulanan' },
      { id: 'newsletter-floating', name: 'Kartu Mengambang Berbayang', description: 'Kotak melayang dengan bayangan lembut modern' },
      { id: 'newsletter-pill', name: 'Desain Kapsul Melengkung Penuh', description: 'Formulir menyatu dalam satu kapsul elegan' },
    ],
    defaultContent: () => ({
      title: 'Jangan Ketinggalan Promo Spesial!',
      description: 'Daftarkan nomor WhatsApp Anda untuk memperoleh voucher diskon hingga 25% setiap bulannya.',
    }),
    component: NewsletterSection,
  },
  footer: {
    type: 'footer',
    name: 'Footer (Kaki Halaman)',
    description: 'Informasi penutup, hak cipta, navigasi sekunder, jam kerja, dan link sosial media.',
    category: 'Footer',
    icon: 'Compass',
    defaultStyle: 'footer-columns',
    availableStyles: [
      { id: 'footer-columns', name: '4 Kolom Standar Lengkap', description: 'Kolom profil usaha, navigasi, jam operasional, dan kontak' },
      { id: 'footer-simple', name: '1 Baris Hak Cipta & Sosmed', description: 'Format sederhana satu baris horizontal hemat ruang' },
      { id: 'footer-centered', name: 'Tengah dengan Logo & Deskripsi', description: 'Logo di tengah dengan tautan menu di bawahnya' },
      { id: 'footer-brand', name: 'Sorotan Brand & Jam Buka', description: 'Fokus pada nama usaha dan jam buka mingguan' },
      { id: 'footer-minimal', name: 'Minimalis Tipis & Elegan', description: 'Garis pemisah tipis dengan teks hak cipta sederhana' },
      { id: 'footer-split', name: 'Split Profil Kiri & Menu Kanan', description: 'Kiri profil bisnis, kanan dua kolom tautan cepat' },
      { id: 'footer-badges', name: 'Footer dengan Lencana Kepercayaan', description: 'Dilengkapi lencana UMKM terverifikasi dan pembayaran aman' },
      { id: 'footer-compact', name: '2 Kolom Kompak', description: 'Tata letak 2 kolom yang ringkas dan padat' },
      { id: 'footer-dark-contrast', name: 'Latar Gelap Kontras Mewah', description: 'Latar hitam legam berkelas dengan teks abu terang' },
      { id: 'footer-social-focus', name: 'Fokus Ikon Sosial Media & WA', description: 'Tombol media sosial dan chat WhatsApp berukuran besar' },
    ],
    defaultContent: () => ({}),
    component: FooterSection,
  },
};

export class SectionRegistry {
  public static get(type: string): SectionTypeDefinition | undefined {
    return SECTION_DEFINITIONS[type];
  }

  public static getAll(): SectionTypeDefinition[] {
    return Object.values(SECTION_DEFINITIONS);
  }

  public static getByCategory(category: SectionCategory): SectionTypeDefinition[] {
    return Object.values(SECTION_DEFINITIONS).filter((s) => s.category === category);
  }

  public static getCategories(): SectionCategory[] {
    return ['Hero', 'Business', 'Commerce', 'Social Proof', 'Content', 'Contact', 'Media', 'Footer'];
  }

  public static getStyles(type: string) {
    const def = this.get(type);
    return def ? def.availableStyles : [];
  }

  public static getComponent(type: string): React.ComponentType<SectionProps> {
    const def = this.get(type);
    return def ? def.component : (() => null);
  }

  public static createDefaultSection(type: string, style?: string): { id: string; type: string; style: string; content: Record<string, any> } {
    const def = this.get(type);
    if (!def) {
      return {
        id: `sec-${Date.now()}`,
        type,
        style: 'default',
        content: {},
      };
    }
    const contentData =
      typeof def.defaultContent === 'function'
        ? (def.defaultContent as any)()
        : JSON.parse(JSON.stringify(def.defaultContent || {}));

    return {
      id: `sec-${type}-${Date.now().toString(36)}`,
      type,
      style: style || def.defaultStyle || 'standar',
      content: contentData,
    };
  }
}
