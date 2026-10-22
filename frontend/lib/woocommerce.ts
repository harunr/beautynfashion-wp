/**
 * WooCommerce REST API & WPGraphQL Client for ABeauty & Fashion
 * Fully typed with no explicit any.
 */

export interface ProductItem {
  id: number;
  name: string;
  nameBn?: string;
  slug: string;
  price: number;
  regularPrice: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  images: { id: number; src: string; alt: string }[];
  category: string;
  categoryBn?: string;
  description?: string;
  descriptionBn?: string;
  shortDescription?: string;
  inStock: boolean;
  stockQuantity?: number;
  sku: string;
  attributes?: { name: string; options: string[] }[];
}

interface RawWooImage {
  id: number;
  src: string;
  alt?: string;
}

interface RawWooCategory {
  id: number;
  name: string;
  slug: string;
}

interface RawWooProduct {
  id: number;
  name: string;
  slug: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  average_rating?: string;
  rating_count?: number;
  images?: RawWooImage[];
  categories?: RawWooCategory[];
  description?: string;
  short_description?: string;
  stock_status?: string;
  stock_quantity?: number;
  sku?: string;
}

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://www.abeautynfashion.com';
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || `${WP_URL}/graphql`;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';

// Base64 helper for basic auth
function getAuthHeader(): string {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) return '';
  const token = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  return `Basic ${token}`;
}

/**
 * Fetch products from WooCommerce REST API v3
 */
export async function getWooProducts(params: {
  category?: string;
  featured?: boolean;
  search?: string;
  per_page?: number;
  page?: number;
} = {}): Promise<ProductItem[]> {
  try {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.featured) query.set('featured', 'true');
    if (params.search) query.set('search', params.search);
    query.set('per_page', (params.per_page || 12).toString());
    query.set('page', (params.page || 1).toString());

    const url = `${WP_URL}/wp-json/wc/v3/products?${query.toString()}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const auth = getAuthHeader();
    if (auth) headers['Authorization'] = auth;

    const res = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[WooCommerce] Failed to fetch products: ${res.statusText}`);
      return [];
    }

    const data: RawWooProduct[] = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map((item: RawWooProduct) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: parseFloat(item.price || item.regular_price || '0'),
      regularPrice: parseFloat(item.regular_price || item.price || '0'),
      salePrice: item.sale_price ? parseFloat(item.sale_price) : undefined,
      rating: parseFloat(item.average_rating || '5.0'),
      reviewsCount: item.rating_count || 0,
      images: (item.images || []).map((img: RawWooImage) => ({
        id: img.id,
        src: img.src,
        alt: img.alt || item.name,
      })),
      category: item.categories?.[0]?.name || 'Beauty',
      description: item.description,
      shortDescription: item.short_description,
      inStock: item.stock_status === 'instock',
      stockQuantity: item.stock_quantity ?? 10,
      sku: item.sku || `ABF-${item.id}`,
    }));
  } catch (err) {
    console.error('[WooCommerce] Error fetching products:', err);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getWooProductById(id: number | string): Promise<ProductItem | null> {
  try {
    const url = `${WP_URL}/wp-json/wc/v3/products/${id}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const auth = getAuthHeader();
    if (auth) headers['Authorization'] = auth;

    const res = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const item: RawWooProduct = await res.json();
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: parseFloat(item.price || item.regular_price || '0'),
      regularPrice: parseFloat(item.regular_price || item.price || '0'),
      salePrice: item.sale_price ? parseFloat(item.sale_price) : undefined,
      rating: parseFloat(item.average_rating || '5.0'),
      reviewsCount: item.rating_count || 0,
      images: (item.images || []).map((img: RawWooImage) => ({
        id: img.id,
        src: img.src,
        alt: img.alt || item.name,
      })),
      category: item.categories?.[0]?.name || 'Beauty',
      description: item.description,
      shortDescription: item.short_description,
      inStock: item.stock_status === 'instock',
      stockQuantity: item.stock_quantity ?? 10,
      sku: item.sku || `ABF-${item.id}`,
    };
  } catch (err) {
    console.error(`[WooCommerce] Error fetching product ${id}:`, err);
    return null;
  }
}

/**
 * Execute GraphQL Query
 */
export async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[GraphQL] Query failed: ${res.statusText}`);
      return null;
    }

    const json = (await res.json()) as { data?: T };
    return json.data ?? null;
  } catch (err) {
    console.error('[GraphQL] Error executing query:', err);
    return null;
  }
}
