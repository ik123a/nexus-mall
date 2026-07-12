"use client";

import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star, Forward } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/store/use-cart";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  const { add, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);
  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group relative glass rounded-3xl overflow-hidden transition-all duration-500 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-brand to-emerald text-[10px] font-semibold shadow-lg">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-[10px] font-semibold shadow-lg">
            -{discount}%
          </span>
        )}
        {product.isTrending && (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-[10px] font-semibold shadow-lg flex items-center gap-1">
            <Forward className="w-2.5 h-2.5" /> TRENDING
          </span>
        )}
      </div>

      {/* Wishlist & Quick View */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <button onClick={() => toggleWishlist(product.id)} className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition" aria-label="Add to wishlist">
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-400 text-red-400" : "text-white/70"}`} />
        </button>
        <Link href={`/product/${product.id}`} className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition" aria-label="Quick view">
          <Eye className="w-4 h-4 text-white/70" />
        </Link>
      </div>

      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="text-[10px] text-brand uppercase tracking-wider mb-1">{product.brand}</div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-base mb-1 group-hover:text-brand transition line-clamp-1">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 text-[11px] text-white/50">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-white/80">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
          {product.comparePrice && (
            <span className="text-sm text-white/30 line-through">${product.comparePrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to cart */}
        <Button
          onClick={() => add(product.id)}
          disabled={!product.inStock}
          className="w-full"
          size="sm"
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </motion.div>
  );
}