import type { MenuItem, PortfolioItem, Testimonial } from './types';

// =====================================================
// Mock Data — digunakan saat Supabase env belum diisi
// Setelah Supabase terkoneksi, website otomatis pakai DB.
// =====================================================

export const mockMenuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Es Kopi Susu Gula Aren',
    description:
      'Espresso double shot dengan susu segar dan gula aren cair khas Nusantara.',
    price: 25000,
    category: 'Kopi',
    image_url:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm2',
    name: 'Matcha Latte',
    description:
      'Matcha premium impor dari Uji, dicampur susu steamed dan sedikit madu.',
    price: 28000,
    category: 'Non-Kopi',
    image_url:
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80',
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm3',
    name: 'Croissant Butter',
    description:
      'Croissant renyah berlapis dengan butter Perancis, dipanggang fresh tiap pagi.',
    price: 18000,
    category: 'Makanan',
    image_url:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    is_featured: true,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm4',
    name: 'V60 Pour Over',
    description:
      'Single origin Ethiopia dengan notes blueberry, diproses secara manual.',
    price: 32000,
    category: 'Kopi',
    image_url:
      'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=800&q=80',
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm5',
    name: 'Coklat Panas Klasik',
    description:
      'Dark chocolate 70% dari Belgia, diseduh dengan susu hangat dan marshmallow.',
    price: 26000,
    category: 'Non-Kopi',
    image_url:
      'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=800&q=80',
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm6',
    name: 'Pisang Goreng Madu',
    description:
      'Pisang goreng crispy dengan madu murni dan keju cheddar parut.',
    price: 15000,
    category: 'Snack',
    image_url:
      'https://images.unsplash.com/photo-1606101205631-a579ec1d6330?w=800&q=80',
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm7',
    name: 'Kopi Tubruk Jawa',
    description:
      'Kopi tubruk tradisional dengan biji kopi pilihan dari pegunungan Jawa.',
    price: 18000,
    category: 'Kopi',
    image_url:
      'https://images.unsplash.com/photo-1559525839-d9acfd23148a?w=800&q=80',
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'm8',
    name: 'Tiramisu Slice',
    description:
      'Tiramisu klasik Italia dengan mascarpone lembut dan taburan kakao.',
    price: 32000,
    category: 'Snack',
    image_url:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    is_featured: false,
    is_available: true,
    created_at: new Date().toISOString(),
  },
];

export const mockPortfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Rebranding Warung Makan Bu Siti',
    slug: 'rebranding-warung-makan-bu-siti',
    description:
      'Proyek rebranding menyeluruh untuk warung makan legendaris Bu Siti yang telah berdiri sejak 1985. Kami melakukan riset mendalam terhadap pelanggan setia, lalu merancang ulang logo, menu, dan pengalaman visual di kedai. Hasilnya: peningkatan omzet 45% dalam 6 bulan pertama.',
    short_description:
      'Rebranding menyeluruh warung makan legendaris, dari logo hingga pengalaman visual.',
    category: 'Branding',
    client_name: 'Warung Makan Bu Siti',
    year: 2024,
    thumbnail_url:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    ],
    is_featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Kampanye Sosial Media — Kopi Lokal',
    slug: 'kampanye-sosial-media-kopi-lokal',
    description:
      'Kampanye 3 bulan untuk mengangkat brand kopi lokal di kalangan anak muda urban. Kami menghasilkan 120+ konten, mengelola 4 platform, dan berhasil meningkatkan follower dari 2K menjadi 35K.',
    short_description:
      'Kampanye 3 bulan: 120+ konten, follower naik dari 2K ke 35K.',
    category: 'Social Media',
    client_name: 'Roastery Nusantara',
    year: 2024,
    thumbnail_url:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80',
    ],
    is_featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p3',
    title: 'Iklan Digital Meta & Google Ads',
    slug: 'iklan-digital-meta-google-ads',
    description:
      'Setup dan optimasi iklan berbayar di Meta (FB + IG) dan Google Ads untuk bisnis fashion lokal. Budget Rp 50 juta/bulan dengan ROAS rata-rata 4.8x.',
    short_description: 'Optimasi Meta & Google Ads dengan ROAS 4.8x.',
    category: 'Iklan Digital',
    client_name: 'Local Fashion Brand',
    year: 2024,
    thumbnail_url:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    ],
    is_featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p4',
    title: 'Desain Kemasan Produk Skincare',
    slug: 'desain-kemasan-skincare',
    description:
      'Desain packaging untuk lini skincare lokal dengan target market Gen Z. Konsep minimalis dengan sentuhan warna earth-tone yang Instagrammable.',
    short_description: 'Packaging skincare Gen Z yang minimalis dan Instagrammable.',
    category: 'Desain',
    client_name: 'Glow Naturals',
    year: 2023,
    thumbnail_url:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80',
    ],
    is_featured: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p5',
    title: 'Identitas Visual Coffee Shop Chain',
    slug: 'identitas-visual-coffee-shop-chain',
    description:
      'Pembuatan brand identity lengkap untuk chain coffee shop: logo, color palette, typography, signage, dan merchandise design.',
    short_description: 'Brand identity lengkap untuk chain coffee shop.',
    category: 'Branding',
    client_name: 'Kopi Manja',
    year: 2023,
    thumbnail_url:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    ],
    is_featured: false,
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p6',
    title: 'Content Calendar & Foto Produk',
    slug: 'content-calendar-foto-produk',
    description:
      'Produksi 60 foto produk dan 30 video pendek untuk konten Instagram dan TikTok. Termasuk penulisan caption dan hashtag strategy.',
    short_description: '60 foto produk + 30 video pendek untuk IG & TikTok.',
    category: 'Social Media',
    client_name: 'Bakery Sweet Corner',
    year: 2024,
    thumbnail_url:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    gallery_urls: [
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=1200&q=80',
    ],
    is_featured: false,
    sort_order: 6,
    created_at: new Date().toISOString(),
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Andini Putri',
    role: 'Pelanggan Setia',
    content:
      'Kopi di sini selalu jadi mood booster pagi saya. Suasana kedainya bikin betah lama-lama, apalagi sambil kerja.',
    rating: 5,
    avatar_url:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't2',
    name: 'Budi Santoso',
    role: 'CEO Startup ABC',
    content:
      'Tim Toko Sitra bantu rebranding startup kami dengan hasil yang luar biasa. Prosesnya komunikatif dan hasilnya tepat waktu!',
    rating: 5,
    avatar_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't3',
    name: 'Sinta Maharani',
    role: 'Owner Warung Bu Siti',
    content:
      'Sejak di-rebranding oleh Toko Sitra, warung saya jadi rame pelanggan baru. Omzet naik 45% — beyond expectation!',
    rating: 5,
    avatar_url:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 't4',
    name: 'Rian Pratama',
    role: 'Mahasiswa',
    content:
      'Tempatnya cozy banget buat nugas. WiFi kencang, kopi enak, harga mahasiswa. Selalu jadi pilihan utama!',
    rating: 5,
    avatar_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    is_active: true,
    created_at: new Date().toISOString(),
  },
];
