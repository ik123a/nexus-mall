/**
 * The NEXUS Journal posts, in one place.
 *
 * These lived inline in /blog/page.tsx, which meant the new /blog/[slug] route
 * had no way to resolve a slug to a post. Both routes now import from here, so
 * the index and the article page can never drift apart.
 */
export const posts = [
  { slug: "spring-2026-trends", category: "Trends", title: "The 10 Trends Defining Spring 2026", excerpt: "From holographic fabrics to AI-generated silhouettes, here's what's next.", author: "Marie Laurent", date: "Jul 5, 2026", readTime: "6 min", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { slug: "behind-luxe", category: "Behind the Scenes", title: "Inside LUXE Atelier: Crafting the Future", excerpt: "A rare look at the atelier where haute couture meets advanced materials science.", author: "James Chen", date: "Jul 2, 2026", readTime: "8 min", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  { slug: "quantum-lens", category: "Tech", title: "Quantum Lens AR: The Future Is Transparent", excerpt: "How mixed-reality glasses are changing the way we shop, work, and play.", author: "Dr. Sarah Kim", date: "Jun 28, 2026", readTime: "5 min", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" },
  { slug: "beauty-science", category: "Beauty", title: "The Science of Glow: Aura's Peptide Breakthrough", excerpt: "Why dermatologists are calling this serum the most innovative of the decade.", author: "Dr. Priya Sharma", date: "Jun 25, 2026", readTime: "4 min", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80" },
  { slug: "home-ai", category: "Style", title: "Studio Home: When AI Designs Your Living Room", excerpt: "We tested the AI room designer — the results were surprisingly personal.", author: "Alex Rivera", date: "Jun 20, 2026", readTime: "7 min", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { slug: "sustainable-luxury", category: "Trends", title: "Sustainable Luxury Is No Longer an Oxymoron", excerpt: "How NEXUS brands are proving that opulence and ecology can coexist.", author: "Emma Watson", date: "Jun 15, 2026", readTime: "6 min", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80" },
];

export type Post = (typeof posts)[number];
