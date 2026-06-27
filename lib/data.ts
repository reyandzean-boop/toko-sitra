import { supabase, isSupabaseConfigured } from './supabase';
import type {
  MenuItem,
  PortfolioItem,
  Testimonial,
  ContactMessage,
  ContactFormInput,
  MenuCategory,
  PortfolioCategory,
} from './types';
import {
  mockMenuItems,
  mockPortfolioItems,
  mockTestimonials,
} from './mock-data';

// =====================================================
// Data Access Layer
// Otomatis fallback ke mock data kalau Supabase belum dikonfigurasi
// =====================================================

// ----- MENU -----
export async function getFeaturedMenu(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockMenuItems.filter((m) => m.is_featured);
  }
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);
  if (error) {
    console.error('[getFeaturedMenu]', error);
    return mockMenuItems.filter((m) => m.is_featured);
  }
  return data || [];
}

export async function getAllMenu(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockMenuItems;
  }
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)
    .order('category', { ascending: true })
    .order('name', { ascending: true });
  if (error) {
    console.error('[getAllMenu]', error);
    return mockMenuItems;
  }
  return data || [];
}

// ----- PORTFOLIO -----
export async function getFeaturedPortfolio(): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockPortfolioItems
      .filter((p) => p.is_featured)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, 6);
  }
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(6);
  if (error) {
    console.error('[getFeaturedPortfolio]', error);
    return mockPortfolioItems
      .filter((p) => p.is_featured)
      .sort((a, b) => a.sort_order - b.sort_order)
      .slice(0, 6);
  }
  return data || [];
}

export async function getAllPortfolio(): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockPortfolioItems.sort(
      (a, b) => a.sort_order - b.sort_order
    );
  }
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('[getAllPortfolio]', error);
    return mockPortfolioItems;
  }
  return data || [];
}

export async function getPortfolioBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  if (!isSupabaseConfigured || !supabase) {
    return mockPortfolioItems.find((p) => p.slug === slug) || null;
  }
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) {
    console.error('[getPortfolioBySlug]', error);
    return mockPortfolioItems.find((p) => p.slug === slug) || null;
  }
  return data;
}

// ----- TESTIMONIALS -----
export async function getActiveTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) {
    return mockTestimonials.filter((t) => t.is_active);
  }
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[getActiveTestimonials]', error);
    return mockTestimonials.filter((t) => t.is_active);
  }
  return data || [];
}

// ----- CONTACT MESSAGES -----
export async function submitContactMessage(
  input: ContactFormInput
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    console.log('[Mock] Contact message:', input);
    return { success: true };
  }
  const { error } = await supabase
    .from('contact_messages')
    .insert([input]);
  if (error) {
    console.error('[submitContactMessage]', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ----- ADMIN: GET ALL -----
export async function adminGetAllMenu(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured || !supabase) return mockMenuItems;
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[adminGetAllMenu]', error);
    return mockMenuItems;
  }
  return data || [];
}

export async function adminGetAllPortfolio(): Promise<PortfolioItem[]> {
  if (!isSupabaseConfigured || !supabase) return mockPortfolioItems;
  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('[adminGetAllPortfolio]', error);
    return mockPortfolioItems;
  }
  return data || [];
}

export async function adminGetAllMessages(): Promise<ContactMessage[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [
      {
        id: 'msg1',
        full_name: 'Contoh Pelanggan',
        email: 'contoh@email.com',
        whatsapp: '628123456789',
        purpose: 'penawaran',
        message:
          'Ini contoh pesan. Data ini akan diganti dengan data asli setelah Supabase terkoneksi.',
        is_read: false,
        created_at: new Date().toISOString(),
      },
    ];
  }
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[adminGetAllMessages]', error);
    return [];
  }
  return data || [];
}

export async function adminGetAllTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) return mockTestimonials;
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('[adminGetAllTestimonials]', error);
    return mockTestimonials;
  }
  return data || [];
}

// =====================================================
// HERO IMAGES (untuk section hero di homepage)
// =====================================================

export type HeroSection = 'home_hero' | 'home_about' | 'home_cta';

export interface HeroImage {
  section: HeroSection;
  image_url: string;
  alt_text: string | null;
  updated_at: string;
}

const DEFAULT_HERO_IMAGES: Record<HeroSection, { url: string; alt: string }> = {
  home_hero: {
    url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1920&q=80',
    alt: 'Suasana Toko Sitra',
  },
  home_about: {
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=900&q=80',
    alt: 'Tentang Toko Sitra',
  },
  home_cta: {
    url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80',
    alt: 'Hubungi kami',
  },
};

export async function getHeroImages(): Promise<Record<HeroSection, { url: string; alt: string }>> {
  if (!isSupabaseConfigured || !supabase) {
    return DEFAULT_HERO_IMAGES;
  }
  const { data, error } = await supabase
    .from('hero_images')
    .select('*');
  if (error) {
    console.error('[getHeroImages]', error);
    return DEFAULT_HERO_IMAGES;
  }
  const result = { ...DEFAULT_HERO_IMAGES };
  (data || []).forEach((row: HeroImage) => {
    if (row.section in DEFAULT_HERO_IMAGES) {
      result[row.section as HeroSection] = {
        url: row.image_url,
        alt: row.alt_text || DEFAULT_HERO_IMAGES[row.section as HeroSection].alt,
      };
    }
  });
  return result;
}

export async function adminUpdateHeroImage(
  section: HeroSection,
  image_url: string,
  alt_text: string | null
): Promise<{ error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Mock: update default
    DEFAULT_HERO_IMAGES[section] = { url: image_url, alt: alt_text || DEFAULT_HERO_IMAGES[section].alt };
    return {};
  }
  const { error } = await supabase
    .from('hero_images')
    .upsert(
      { section, image_url, alt_text, updated_at: new Date().toISOString() },
      { onConflict: 'section' }
    );
  if (error) return { error: error.message };
  return {};
}

// =====================================================
// ADMIN: STORAGE UPLOAD
// =====================================================

/**
 * Upload file ke Supabase Storage.
 * Return public URL yang siap disimpan di database.
 */
export async function uploadImage(
  bucket: 'menu-images' | 'portfolio-images',
  file: File
): Promise<{ url: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Mock mode: return blob URL untuk preview, tapi tidak akan persist
    return { url: URL.createObjectURL(file), error: 'Mode demo — gambar tidak benar-benar terupload.' };
  }

  // Generate unique filename
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .slice(0, 50);
  const filename = `${Date.now()}-${cleanName}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    console.error('[uploadImage]', error);
    return { url: '', error: error.message };
  }

  const { data: pubData } = supabase.storage.from(bucket).getPublicUrl(filename);
  return { url: pubData.publicUrl };
}

/**
 * Hapus file dari storage berdasarkan public URL.
 */
export async function deleteImageByUrl(
  bucket: 'menu-images' | 'portfolio-images',
  url: string
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  if (!url || !url.includes(bucket)) return;
  try {
    const path = url.split(`${bucket}/`)[1];
    if (path) {
      await supabase.storage.from(bucket).remove([path]);
    }
  } catch (e) {
    console.warn('[deleteImageByUrl] gagal:', e);
  }
}

// =====================================================
// ADMIN: MENU CRUD
// =====================================================

export type MenuInput = {
  name: string;
  description: string | null;
  price: number;
  category: MenuCategory;
  image_url: string | null;
  is_featured: boolean;
  is_available: boolean;
};

export async function adminCreateMenu(
  input: MenuInput
): Promise<{ data: MenuItem | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Mock mode
    const newItem: MenuItem = {
      ...input,
      id: 'mock-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    mockMenuItems.unshift(newItem);
    return { data: newItem };
  }
  const { data, error } = await supabase
    .from('menu_items')
    .insert([input])
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function adminUpdateMenu(
  id: string,
  input: Partial<MenuInput>
): Promise<{ data: MenuItem | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = mockMenuItems.findIndex(m => m.id === id);
    if (idx === -1) return { data: null, error: 'Menu tidak ditemukan' };
    mockMenuItems[idx] = { ...mockMenuItems[idx], ...input };
    return { data: mockMenuItems[idx] };
  }
  const { data, error } = await supabase
    .from('menu_items')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function adminDeleteMenu(id: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = mockMenuItems.findIndex(m => m.id === id);
    if (idx !== -1) mockMenuItems.splice(idx, 1);
    return {};
  }
  const { error } = await supabase.from('menu_items').delete().eq('id', id);
  if (error) return { error: error.message };
  return {};
}

// =====================================================
// ADMIN: PORTFOLIO CRUD
// =====================================================

export type PortfolioInput = {
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
};

export async function adminCreatePortfolio(
  input: PortfolioInput
): Promise<{ data: PortfolioItem | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newItem: PortfolioItem = {
      ...input,
      id: 'mock-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    mockPortfolioItems.unshift(newItem);
    return { data: newItem };
  }
  const { data, error } = await supabase
    .from('portfolio_items')
    .insert([input])
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function adminUpdatePortfolio(
  id: string,
  input: Partial<PortfolioInput>
): Promise<{ data: PortfolioItem | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = mockPortfolioItems.findIndex(p => p.id === id);
    if (idx === -1) return { data: null, error: 'Portfolio tidak ditemukan' };
    mockPortfolioItems[idx] = { ...mockPortfolioItems[idx], ...input };
    return { data: mockPortfolioItems[idx] };
  }
  const { data, error } = await supabase
    .from('portfolio_items')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function adminDeletePortfolio(id: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = mockPortfolioItems.findIndex(p => p.id === id);
    if (idx !== -1) mockPortfolioItems.splice(idx, 1);
    return {};
  }
  const { error } = await supabase.from('portfolio_items').delete().eq('id', id);
  if (error) return { error: error.message };
  return {};
}

// =====================================================
// ADMIN: TESTIMONIAL CRUD
// =====================================================

export type TestimonialInput = {
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
  is_active: boolean;
};

export async function adminCreateTestimonial(
  input: TestimonialInput
): Promise<{ data: Testimonial | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const newItem: Testimonial = {
      ...input,
      id: 'mock-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    mockTestimonials.unshift(newItem);
    return { data: newItem };
  }
  const { data, error } = await supabase
    .from('testimonials')
    .insert([input])
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function adminUpdateTestimonial(
  id: string,
  input: Partial<TestimonialInput>
): Promise<{ data: Testimonial | null; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = mockTestimonials.findIndex(t => t.id === id);
    if (idx === -1) return { data: null, error: 'Testimoni tidak ditemukan' };
    mockTestimonials[idx] = { ...mockTestimonials[idx], ...input };
    return { data: mockTestimonials[idx] };
  }
  const { data, error } = await supabase
    .from('testimonials')
    .update(input)
    .eq('id', id)
    .select()
    .single();
  if (error) return { data: null, error: error.message };
  return { data };
}

export async function adminDeleteTestimonial(id: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    const idx = mockTestimonials.findIndex(t => t.id === id);
    if (idx !== -1) mockTestimonials.splice(idx, 1);
    return {};
  }
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) return { error: error.message };
  return {};
}
