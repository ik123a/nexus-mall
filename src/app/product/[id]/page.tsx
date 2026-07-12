import { Product } from "@/types";
import { products, getProductById, getRelated } from "@/constants/products";
import { ProductPageClient } from "./ProductPageClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return <ProductNotFound />;
  }

  return <ProductPageClient product={product} />;
}

function ProductNotFound() {
  return (
    <main className="pt-16 pb-20 flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-white/50">The product you're looking for doesn't exist.</p>
      </div>
    </main>
  );
}