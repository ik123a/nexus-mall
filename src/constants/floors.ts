import { Floor } from "@/types";

export const floors: Floor[] = [
  {
    id: -1,
    name: "Parking Garage",
    description: "Valet & smart parking — 500 EV-ready bays",
    theme: "subterranean",
    stores: [
      { id: "park-01", name: "Nexus Valet", category: "parking", floor: -1, position: { x: 0, y: 0 }, rating: 4.8, isOpen: true, image: "", description: "EV charging & valet concierge" },
      { id: "park-02", name: "Auto Showcase", category: "auto", floor: -1, position: { x: 3, y: 0 }, rating: 4.9, isOpen: true, image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80", description: "Concept cars & test drive booking" },
    ],
  },
  {
    id: 0,
    name: "Ground Floor",
    description: "Atrium · Fashion · Supermarket · Beauty",
    theme: "cosmic",
    stores: [
      { id: "gf-01", name: "LUXE Atelier", category: "fashion", floor: 0, position: { x: -4, y: -2 }, brand: "LUXE", rating: 4.9, isOpen: true, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", description: "Haute couture & runway exclusives" },
      { id: "gf-02", name: "Nova Market", category: "supermarket", floor: 0, position: { x: 4, y: -2 }, brand: "Nova", rating: 4.7, isOpen: true, image: "https://images.unsplash.com/photo-1542838132-7c767ae3e0c2?w=800&q=80", description: "Organic & gourmet essentials" },
      { id: "gf-03", name: "Aura Beauty", category: "beauty", floor: 0, position: { x: 0, y: 2 }, brand: "Aura", rating: 4.8, isOpen: true, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80", description: "AI skin analysis & clean beauty" },
      { id: "gf-04", name: "Kids Galaxy", category: "kids", floor: 0, position: { x: -4, y: 2 }, brand: "Kids Galaxy", rating: 4.6, isOpen: true, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80", description: "Playful fashion & toys" },
    ],
  },
  {
    id: 1,
    name: "First Floor",
    description: "Electronics · Sports · Home · Gaming",
    theme: "electric",
    stores: [
      { id: "ff-01", name: "Quantum Tech", category: "electronics", floor: 1, position: { x: -3, y: -2 }, brand: "Quantum", rating: 4.9, isOpen: true, image: "https://images.unsplash.com/photo-1498049794587-ad4bed8fd1c1?w=800&q=80", description: "Next-gen gadgets & AR demos" },
      { id: "ff-02", name: "Pulse Sports", category: "sports", floor: 1, position: { x: 3, y: -2 }, brand: "Pulse", rating: 4.7, isOpen: true, image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80", description: "Performance gear & athlete fittings" },
      { id: "ff-03", name: "Studio Home", category: "home", floor: 1, position: { x: 0, y: 2 }, brand: "Studio", rating: 4.8, isOpen: true, image: "https://images.unsplash.com/photo-1556228453-efd6901fdbca?w=800&q=80", description: "AI room designer & smart furniture" },
      { id: "ff-04", name: "Neo Arcade", category: "gaming", floor: 1, position: { x: -3, y: 2 }, brand: "Neo", rating: 4.9, isOpen: true, image: "https://images.unsplash.com/photo-1542751371-adc38448a05c?w=800&q=80", description: "VR arenas & esports lounge" },
      { id: "ff-05", name: "Gadget Lab", category: "tech", floor: 1, position: { x: 3, y: 2 }, brand: "Lab", rating: 4.7, isOpen: true, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", description: "Phones, wearables & accessories" },
    ],
  },
  {
    id: 2,
    name: "Second Floor",
    description: "Luxury · Jewelry · Books · Cinema · Food",
    theme: "aurora",
    stores: [
      { id: "sf-01", name: "Maison Noir", category: "luxury", floor: 2, position: { x: -4, y: -2 }, brand: "Maison Noir", rating: 5.0, isOpen: true, image: "https://images.unsplash.com/photo-1609081214828-98e1b6b6e1c3?w=800&q=80", description: "Private client suites & rare pieces" },
      { id: "sf-02", name: "Solis Jewels", category: "jewelry", floor: 2, position: { x: 4, y: -2 }, brand: "Solis", rating: 4.9, isOpen: true, image: "https://images.unsplash.com/photo-1515562140728-774106c84e0c?w=800&q=80", description: "Diamond atelier & custom design" },
      { id: "sf-03", name: "The Library", category: "books", floor: 2, position: { x: 0, y: 2 }, brand: "Library", rating: 4.8, isOpen: true, image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80", description: "Rare editions & reading lounge" },
      { id: "sf-04", name: "Nexus Cinema", category: "cinema", floor: 2, position: { x: -4, y: 2 }, brand: "Nexus", rating: 4.7, isOpen: true, image: "https://images.unsplash.com/photo-1489599849927-e2ed4a7d6f1e?w=800&q=80", description: "4DX & IMAX holographic theater" },
      { id: "sf-05", name: "Skyfood Court", category: "food", floor: 2, position: { x: 4, y: 2 }, brand: "Skyfood", rating: 4.8, isOpen: true, image: "https://images.unsplash.com/photo-1517248135467-3c73898e0a05?w=800&q=80", description: "Michelin kiosks & sky lounge" },
    ],
  },
];
