import { Product } from "@/types";

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

export const products: Product[] = [
  {
    id: "p-001", name: "Aerospace Pro Headphones", brand: "Quantum", category: "electronics",
    price: 449, comparePrice: 599, rating: 4.9, reviews: 2847,
    image: img("1505740420928-5e560c06d30e"), description: "Adaptive ANC with spatial audio and 60-hour battery.",
    features: ["Spatial Audio", "Adaptive ANC", "60h Battery", "Titanium Frame", "USB-C Fast Charge"],
    inStock: true, isNew: true, isTrending: true,
    colors: ["#050505", "#b8763e", "#10b981", "#34d399"],
    sizes: ["Standard"], tags: ["audio", "premium", "wireless"],
  },
  {
    id: "p-002", name: "Holographic Smartwatch X9", brand: "Quantum", category: "tech",
    price: 799, comparePrice: 999, rating: 4.8, reviews: 1523,
    image: img("1523275335684-37898b6baf30"), description: "Holographic projection display with ECG & SpO2 sensors.",
    features: ["Holographic Display", "ECG + SpO2", "5ATM Water Resistant", "14-day Battery", "Sapphire Glass"],
    inStock: true, isNew: true, isTrending: true,
    colors: ["#050505", "#1a1a1a", "#b8763e"],
    sizes: ["40mm", "44mm", "48mm"], tags: ["wearable", "smart", "health"],
  },
  {
    id: "p-003", name: "Quantum Lens AR Glasses", brand: "Quantum", category: "tech",
    price: 1299, comparePrice: 1599, rating: 4.7, reviews: 892,
    image: img("1572635196237-34b9ada94842"), description: "Mixed-reality glasses with neural interface.",
    features: ["Neural Interface", "8K Micro-OLED", "Eye Tracking", "Hand Tracking", "Prescription Ready"],
    inStock: true, isNew: true,
    colors: ["#050505", "#1a1a1a"], sizes: ["One Size"], tags: ["ar", "xr", "future"],
  },
  {
    id: "p-004", name: "Luxe Couture Trench Coat", brand: "LUXE", category: "fashion",
    price: 1850, rating: 4.9, reviews: 412,
    image: img("1591047139829-d91aecb6caea"), description: "Hand-tailored wool trench with thermal lining.",
    features: ["Italian Wool", "Thermal Lining", "Hand-stitched", "Limited Edition"],
    inStock: true, isTrending: true,
    colors: ["#050505", "#4a3a2a", "#2a2a2a"],
    sizes: ["XS", "S", "M", "L", "XL"], tags: ["fashion", "luxury", "coat"],
  },
  {
    id: "p-005", name: "Aurora Silk Dress", brand: "LUXE", category: "fashion",
    price: 890, comparePrice: 1200, rating: 4.8, reviews: 678,
    image: img("1566206095992-df2d4c4a1723"), description: "Flowing silk dress with iridescent finish.",
    features: ["100% Silk", "Iridescent Finish", "Reinforced Seams"],
    inStock: true,
    colors: ["#10b981", "#ec4899", "#050505"],
    sizes: ["XS", "S", "M", "L"], tags: ["fashion", "dress", "silk"],
  },
  {
    id: "p-006", name: "Carbon X Running Shoes", brand: "Pulse", category: "sports",
    price: 320, comparePrice: 380, rating: 4.8, reviews: 3421,
    image: img("1542291026-7eec264c27ff"), description: "Carbon-plate shoes with 5% energy return.",
    features: ["Carbon Plate", "5% Energy Return", "Knit Upper", "Vegan Materials"],
    inStock: true, isTrending: true,
    colors: ["#34d399", "#050505", "#b8763e", "#10b981"],
    sizes: ["7", "8", "9", "10", "11", "12"], tags: ["sports", "running", "shoes"],
  },
  {
    id: "p-007", name: "Pulse Smart Home Gym", brand: "Pulse", category: "sports",
    price: 2499, comparePrice: 2999, rating: 4.7, reviews: 234,
    image: img("1571902943202-ea44e2e80d1a"), description: "AI-coached resistance system in one pillar.",
    features: ["AI Coach", "200lb Resistance", "Live Classes", "Space-saving"],
    inStock: true, isNew: true,
    colors: ["#050505"], sizes: ["Standard"], tags: ["fitness", "home-gym", "ai"],
  },
  {
    id: "p-008", name: "Solis Diamond Solitaire", brand: "Solis", category: "jewelry",
    price: 8500, rating: 5.0, reviews: 89,
    image: img("1605100804763-bb79e7e8a2b1"), description: "2.5ct lab-grown diamond, platinum band.",
    features: ["2.5ct Lab Diamond", "VS1 Clarity", "Platinum Band", "GIA Certified"],
    inStock: true,
    colors: ["#ffffff"], sizes: ["4", "5", "6", "7", "8"], tags: ["jewelry", "diamond", "luxury"],
  },
  {
    id: "p-009", name: "Neon Runner Sneakers", brand: "Neo", category: "fashion",
    price: 240, comparePrice: 300, rating: 4.7, reviews: 5621,
    image: img("1549298916-b41d501d3772"), description: "Glow-in-the-dark knit sneakers.",
    features: ["Glow Knit", "React Foam", "Breathable Mesh"],
    inStock: true, isTrending: true,
    colors: ["#34d399", "#10b981", "#b8763e", "#050505"],
    sizes: ["6", "7", "8", "9", "10", "11"], tags: ["sneakers", "fashion", "streetwear"],
  },
  {
    id: "p-010", name: "Nexus Vision Pro TV", brand: "Quantum", category: "electronics",
    price: 3499, comparePrice: 4299, rating: 4.9, reviews: 412,
    image: img("1593359677877-a8135d6f4e0c"), description: "85\" 8K OLED with transparent mode.",
    features: ["85\" 8K OLED", "Transparent Mode", " Dolby Atmos", "AI Upscaling"],
    inStock: true, isNew: true,
    colors: ["#050505"], sizes: ["65\"", "75\"", "85\""], tags: ["tv", "electronics", "8k"],
  },
  {
    id: "p-011", name: "Aura Glow Serum", brand: "Aura", category: "beauty",
    price: 120, comparePrice: 160, rating: 4.8, reviews: 8943,
    image: img("1620916566398-39f1143ab9be"), description: "Niacinamide + peptide night serum.",
    features: ["5% Niacinamide", "Peptide Complex", "Vegan", "Dermatologist Tested"],
    inStock: true, isTrending: true,
    colors: [], sizes: ["30ml", "50ml"], tags: ["beauty", "skincare", "serum"],
  },
  {
    id: "p-012", name: "Studio Smart Sofa", brand: "Studio", category: "home",
    price: 1899, rating: 4.6, reviews: 156,
    image: img("1555041469-a586c61ea9bc"), description: "Modular sofa with built-in wireless charging.",
    features: ["Wireless Charging", "Modular", "Stain-resistant", "Smart Recline"],
    inStock: true,
    colors: ["#2a2a2a", "#b8763e", "#050505"],
    sizes: ["3-seat", "L-shape"], tags: ["home", "furniture", "smart"],
  },
  {
    id: "p-013", name: "Quantum X1 Drone", brand: "Quantum", category: "electronics",
    price: 1299, rating: 4.7, reviews: 234,
    image: img("1473962997488-939e91204976"), description: "8K cinematic drone with AI tracking.",
    features: ["8K Camera", "AI Subject Tracking", "40min Flight", "10km Range"],
    inStock: true, isNew: true,
    colors: ["#050505"], sizes: ["Standard"], tags: ["drone", "electronics", "camera"],
  },
  {
    id: "p-014", name: "Maison Noir Leather Bag", brand: "Maison Noir", category: "luxury",
    price: 3200, rating: 4.9, reviews: 67,
    image: img("1584917895428-46d410e41eac"), description: "Hand-burnished full-grain leather tote.",
    features: ["Full-grain Leather", "Gold Hardware", "Hand-crafted", "Lifetime Warranty"],
    inStock: true,
    colors: ["#1a1a1a", "#4a3a2a"], sizes: ["Standard"], tags: ["luxury", "bag", "leather"],
  },
  {
    id: "p-015", name: "Neo VR Arena Headset", brand: "Neo", category: "gaming",
    price: 599, comparePrice: 749, rating: 4.8, reviews: 1834,
    image: img("1622979155298-3167f4f4a7c1"), description: "Wireless VR with 120Hz pancake lenses.",
    features: ["120Hz Pancake Lenses", "Wireless PC VR", "Eye Tracking", "4K per eye"],
    inStock: true, isNew: true, isTrending: true,
    colors: ["#050505", "#10b981"], sizes: ["Standard"], tags: ["gaming", "vr", "xr"],
  },
  {
    id: "p-016", name: "Aurora Lip Collection", brand: "Aura", category: "beauty",
    price: 85, rating: 4.7, reviews: 4521,
    image: img("1596422846543-75e73977ab94"), description: "6-shade holographic lip set.",
    features: ["6 Shades", "Holographic", "Long-wear", "Cruelty-free"],
    inStock: true,
    colors: [], sizes: ["Set"], tags: ["beauty", "makeup", "lips"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductById = getProduct;
export const getProductsByCategory = (cat: string) => products.filter((p) => p.category === cat);
export const getTrending = () => products.filter((p) => p.isTrending);
export const getNewArrivals = () => products.filter((p) => p.isNew);
export const getRelated = (id: string, n = 4) => {
  const p = getProduct(id);
  if (!p) return [];
  return products.filter((x) => x.id !== id && x.category === p.category).slice(0, n);
};
