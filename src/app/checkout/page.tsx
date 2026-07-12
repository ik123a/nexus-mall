"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Bitcoin, Sparkles, ArrowLeft, Check, Shield } from "lucide-react";
import Link from "next/link";
import { useCart, useCartTotals } from "@/store/use-cart";
import { getProductById } from "@/constants/products";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { CommandMenu } from "@/components/search/command-menu";
import Image from "next/image";

const paymentMethods = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "crypto", label: "Crypto", icon: Bitcoin },
  { id: "bnpl", label: "Buy Now, Pay Later", icon: Sparkles },
];

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const { subtotal, count } = useCartTotals();
  const [payment, setPayment] = useState("card");
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const total = subtotal + 4.99;

  const handlePlaceOrder = () => {
    if (step < 3) {
      setStep(s => Math.min(3, s + 1));
      return;
    }
    setSuccess(true);
    setTimeout(() => clear(), 100);
    // toast notification
    const { toast } = require("@/components/ui/toaster");
  };

  if (success) {
    return (
      <main>
        <Navbar />
        <section className="pt-16 pb-20">
          <div className="max-w-2xl mx-auto px-6 text-center py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald/30 to-brand/30 flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-emerald" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-white/50 mb-6">Your order #{Math.random().toString(36).slice(2, 8).toUpperCase()} has been placed.</p>
            <p className="text-sm text-white/40 mb-10">Estimated delivery: 2-4 hours</p>
            <div className="space-x-4">
              <Button asChild><Link href="/orders">Track Order</Link></Button>
              <Button asChild variant="outline"><Link href="/shop">Continue Shopping</Link></Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/cart" className="text-sm text-white/50 hover:text-white transition flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black mb-10">Checkout</h1>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mb-10">
            {["Shipping", "Payment", "Review"].map((label, i) => (
              <div key={label} className={`flex items-center gap-1 ${i < step ? "text-brand" : "text-white/30"}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-medium ${
                  i < step
                    ? "bg-gradient-to-br from-brand to-emerald text-white"
                    : i === step
                    ? "glass border border-brand/30"
                    : "glass opacity-50"
                }`}>
                  {i + 1}
                </div>
                <span className="text-xs hidden sm:inline">{label}</span>
                {i < 2 && <span className="mx-2 text-white/20">—</span>}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <Card className="p-6">
                  <h2 className="font-bold mb-6">Shipping Address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-xs text-white/50 block mb-1">First Name</label><Input placeholder="Alex" /></div>
                    <div><label className="text-xs text-white/50 block mb-1">Last Name</label><Input placeholder="Chen" /></div>
                    <div className="col-span-full"><label className="text-xs text-white/50 block mb-1">Address</label><Input placeholder="123 Nexus Boulevard" /></div>
                    <div className="col-span-full"><label className="text-xs text-white/50 block mb-1">City</label><Input placeholder="San Francisco" /></div>
                    <div><label className="text-xs text-white/50 block mb-1">State</label><Input placeholder="CA" /></div>
                    <div><label className="text-xs text-white/50 block mb-1">ZIP</label><Input placeholder="94102" /></div>
                    <div><label className="text-xs text-white/50 block mb-1">Phone</label><Input placeholder="+1 (555) 123-4567" /></div>
                    <div><label className="text-xs text-white/50 block mb-1">Email</label><Input type="email" placeholder="alex@nexus.com" /></div>
                  </div>
                </Card>
              )}

              {step === 2 && (
                <Card className="p-6">
                  <h2 className="font-bold mb-6">Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setPayment(m.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition ${
                          payment === m.id
                            ? "border-brand bg-brand/10"
                            : "border-white/10 bg-transparent hover:border-white/30"
                        }`}
                      >
                        <m.icon className={`w-6 h-6 ${payment === m.id ? "text-brand" : "text-white/40"}`} />
                        <span className="font-medium">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {payment === "card" && (
                    <div className="space-y-4">
                      <Input placeholder="Card number · 4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM / YY" />
                        <Input placeholder="CVC" />
                      </div>
                    </div>
                  )}
                  {payment === "crypto" && (
                    <div className="glass rounded-xl p-6 text-center">
                      <Bitcoin className="w-12 h-12 mx-auto mb-3 text-orange-400" />
                      <p className="font-medium mb-1">Scan to Pay with Crypto</p>
                      <p className="text-xs text-white/50">ETH · BTC · SOL · USDC</p>
                    </div>
                  )}
                  {payment === "bnpl" && (
                    <div className="glass rounded-xl p-4">
                      <p className="text-sm text-white/50">4 interest-free payments of <strong>${(total / 4).toFixed(2)}</strong></p>
                    </div>
                  )}
                </Card>
              )}

              {step === 3 && (
                <Card className="p-6">
                  <h2 className="font-bold mb-6">Review Order</h2>
                  {items.map((item) => {
                    const p = getProductById(item.productId);
                    return p ? (
                      <div key={item.productId} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                          <Image src={p.image} alt={p.name} className="w-full h-full object-cover" fill sizes="64px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{p.name}</p>
                          <p className="text-xs text-white/50">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold">${(p.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ) : null;
                  })}
                </Card>
              )}
            </div>

            {/* Order summary sidebar */}
            <div>
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold mb-4">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/50">{count} items</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Shipping</span><span className="text-emerald">Free</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Gift Wrap</span><span>$4.99</span></div>
                  <div className="border-t border-white/10 pt-2 mt-2" />
                  <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-gradient">${total.toFixed(2)}</span></div>
                </div>
                <Button className="w-full mt-6" size="lg" onClick={handlePlaceOrder}>
                  {step < 3 ? `Continue (${["Shipping", "Payment"][step - 1]})` : "Confirm & Pay"}
                </Button>
                <p className="text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> Secured by Stripe
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Toaster />
    </main>
  );
}