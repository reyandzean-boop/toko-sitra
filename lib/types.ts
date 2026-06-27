// =====================================================
// Tipe Data — Toko Sitra
// =====================================================
// Tipe ini harus sinkron dengan schema SQL di supabase/schema.sql
// =====================================================

export type MenuCategory = 'Kopi' | 'Non-Kopi' | 'Makanan' | 'Snack';

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: MenuCategory;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
}

export type PortfolioCategory =
  | 'Branding'
  | 'Social Media'
  | 'Iklan Digital'
  | 'Desain';

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  category: PortfolioCategory;
  client_name: string | null;
  year: number | null;
  thumbnail_url: string | null;
  gallery_urls: string[] | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export type ContactPurpose = 'menu' | 'penawaran' | 'kolaborasi' | 'lainnya';

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  whatsapp: string | null;
  purpose: ContactPurpose | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

// Tipe untuk form input (di admin & contact form)
export type ContactFormInput = Omit<
  ContactMessage,
  'id' | 'is_read' | 'created_at'
>;

export type MenuFormInput = Omit<MenuItem, 'id' | 'created_at'>;

export type PortfolioFormInput = Omit<
  PortfolioItem,
  'id' | 'created_at' | 'slug'
> & { slug?: string };

export type TestimonialFormInput = Omit<Testimonial, 'id' | 'created_at'>;
