export interface WordPressPage {
  id: number;
  title: string;
  slug: string;
  content: string; // rendered HTML from WordPress
  excerpt?: string;
  date?: string;
  modified?: string;
  acf?: Record<string, unknown>;
}

export async function fetchWordPressPage(slug: string): Promise<WordPressPage | null> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://admin.abeautynfashion.com";
  try {
    const res = await fetch(`${wpUrl}/wp-json/wp/v2/pages?slug=${slug}&_embed=1`, {
      next: { revalidate: 60 }, // ISR: 60 seconds
    });
    if (!res.ok) {
      return null;
    }
    const pages = await res.json();
    if (!Array.isArray(pages) || pages.length === 0) {
      return null;
    }
    const p = pages[0];
    return {
      id: p.id,
      title: p.title?.rendered || "",
      slug: p.slug,
      content: p.content?.rendered || "",
      excerpt: p.excerpt?.rendered || "",
      date: p.date,
      modified: p.modified,
      acf: p.acf || {},
    };
  } catch (error) {
    console.error(`Failed to fetch WordPress page "${slug}":`, error);
    return null;
  }
}
