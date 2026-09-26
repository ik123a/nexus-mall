# NEXUS MALL — The Future of Shopping

<p align="center">
  <img src="demo-assets/demo.gif" alt="NEXUS MALL Demo" width="800"/>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> •
  <a href="#tech-stack"><strong>Tech Stack</strong></a> •
  <a href="#getting-started"><strong>Getting Started</strong></a> •
  <a href="#project-structure"><strong>Project Structure</strong></a> •
  <a href="#screenshots"><strong>Screenshots</strong></a>
</p>

---

## 🎯 Overview

**NEXUS MALL** is a next-generation immersive e-commerce platform built with Next.js 15, React 19, and Three.js. It reimagines online shopping by combining a 3D virtual mall experience with AI-powered assistance, voice search, and real-time 3D product visualization.

> 🚀 **Live Demo**: [nexus-mall.vercel.app](https://nexus-mall.vercel.app)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🏢 3D Virtual Mall** | Navigate a fully interactive 3D shopping mall with multiple floors, stores, and zones |
| **🤖 AI Concierge** | Intelligent shopping assistant with natural language understanding |
| **🎙️ Voice Search** | Hands-free product discovery using Web Speech API |
| **🔮 3D Product Viewer** | Real-time 3D product inspection with rotation, zoom, and AR preview |
| **⚡ Command Menu** | Spotlight-style search (⌘K) with instant results |
| **🛍️ Full E-commerce Flow** | Cart, wishlist, compare, checkout, orders, returns, wallet |
| **🎨 Rich Animations** | GSAP + Framer Motion powered transitions and micro-interactions |
| **🌙 Dark/Light Mode** | System-aware theme with manual toggle |
| **📱 Responsive** | Mobile-first design, works on all devices |

---

## 🛠 Tech Stack

<div align="center">

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 15 (App Router), React 19 |
| **3D Graphics** | Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| **Animation** | Framer Motion, GSAP |
| **Styling** | Tailwind CSS, CSS Variables, next-themes |
| **State** | Zustand, TanStack Query (React Query) |
| **UI Components** | Radix UI primitives, lucide-react |
| **Forms** | React Hook Form |
| **Type Safety** | TypeScript (strict mode) |
| **Code Quality** | ESLint, Prettier |

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ik123a/nexus-mall.git
cd nexus-mall

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth routes (login, signup)
│   ├── (shop)/            # Shop routes (product, cart, checkout)
│   ├── account/           # User account pages
│   ├── admin/             # Admin dashboard
│   ├── assistant/         # AI Concierge
│   ├── mall/              # 3D Mall experience
│   ├── search/            # Search with voice
│   └── ...
├── components/
│   ├── ai-assistant.tsx   # AI shopping concierge
│   ├── custom-cursor.tsx  # Custom cursor with magnetic effects
│   ├── layout/            # Navbar, Mega Menu, Footer
│   ├── products/          # Product cards, grids
│   ├── sections/          # Hero, Brands, Features, Categories
│   ├── search/            # Voice search, Command menu (⌘K)
│   ├── three/             # Three.js scenes (Mall, Product Viewer)
│   └── ui/                # Radix-based UI components
├── constants/
│   └── products.ts        # Product catalog data
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, helpers
├── store/                 # Zustand stores
└── styles/                # Global styles, Tailwind
```

---

## 📸 Screenshots







---

## 🎬 Demo

<p align="center">
  <img src="demo-assets/demo.gif" alt="NEXUS MALL Demo GIF" width="800"/>
</p>

*Click the GIF above to see NEXUS MALL in action!*

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Optional: API keys for enhanced features
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# OPENAI_API_KEY=your_key_here
```

---

## 📦 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ik123a/nexus-mall)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

No LICENSE file has been added to this repository yet, so no license is currently granted. Add one before reusing this code.

---

## 🙏 Acknowledgments

- **Three.js** & **React Three Fiber** communities for 3D web magic
- **Framer Motion** & **GSAP** for buttery-smooth animations
- **Radix UI** for accessible component primitives
- **Vercel** for Next.js and hosting

---

<p align="center">
  Made with ❤️ for the future of e-commerce
</p>