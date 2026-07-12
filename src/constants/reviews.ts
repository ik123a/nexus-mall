import { Review, User } from "@/types";

export const reviews: Review[] = [
  {
    id: "r-001", productId: "p-001", user: { name: "Alex Chen", avatar: "https://i.pravatar.cc/100?img=1" },
    rating: 5, title: "Best headphones I've ever owned", content: "The spatial audio is mind-blowing. Worth every penny.",
    date: "2026-06-15", verified: true, helpful: 234,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"],
  },
  {
    id: "r-002", productId: "p-001", user: { name: "Mira Patel", avatar: "https://i.pravatar.cc/100?img=2" },
    rating: 5, title: "60 hour battery is real", content: "Took these on a transatlantic flight — didn't need to charge once.",
    date: "2026-06-20", verified: true, helpful: 156,
  },
  {
    id: "r-003", productId: "p-006", user: { name: "James Rodriguez", avatar: "https://i.pravatar.cc/100?img=3" },
    rating: 5, title: "Marathon game-changer", content: "Shaved 4 minutes off my PR. The carbon plate is no joke.",
    date: "2026-07-01", verified: true, helpful: 412,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"],
  },
  {
    id: "r-004", productId: "p-011", user: { name: "Sofia Kim", avatar: "https://i.pravatar.cc/100?img=4" },
    rating: 4, title: "Skin transformed in 2 weeks", content: "Texture is smoother, my dark spots are visibly fading.",
    date: "2026-06-10", verified: true, helpful: 89,
  },
  {
    id: "r-005", productId: "p-015", user: { name: "Liam Foster", avatar: "https://i.pravatar.cc/100?img=5" },
    rating: 5, title: "Wireless VR finally good", content: "No more cable anxiety. Pancake lenses are crystal clear.",
    date: "2026-06-25", verified: true, helpful: 198,
  },
];

export const userReviews: Review[] = [
  {
    id: "ur-001", productId: "mall", user: { name: "Emma Watson", avatar: "https://i.pravatar.cc/100?img=10" },
    rating: 5, title: "Best shopping experience ever", content: "Felt like stepping into the future. The 3D mall is gorgeous.",
    date: "2026-07-02", verified: true, helpful: 1245,
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80"],
  },
  {
    id: "ur-002", productId: "mall", user: { name: "Maya Devi", avatar: "https://i.pravatar.cc/100?img=11" },
    rating: 5, title: "AI stylist nailed it", content: "It picked out outfits I never would have chosen. Love them all.",
    date: "2026-06-28", verified: true, helpful: 892,
  },
];

export const currentUser: User = {
  id: "u-001",
  name: "Alex Chen",
  email: "alex@nexus.com",
  avatar: "https://i.pravatar.cc/200?img=1",
  membership: "Nexus Elite",
  points: 12840,
  joinedAt: "2024-03-15",
};

export const trendingSearches = [
  "Quantum Lens AR", "Neon Sneakers", "Solis Diamond", "Aurora Dress", "Smart Sofa",
  "VR Headset", "Holographic Watch", "Carbon X", "Aura Glow",
];

export const recentlyViewed = ["p-001", "p-006", "p-015", "p-002"];
