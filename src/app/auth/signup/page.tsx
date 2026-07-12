"use client";

import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center shadow-2xl shadow-brand/30">
              <User className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-display font-black mb-2">Join NEXUS</h1>
            <p className="text-white/50">Get exclusive access to the future of shopping</p>
          </div>

          <Card className="p-8">
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/60 block mb-1.5">First Name</label>
                  <Input placeholder="Alex" />
                </div>
                <div>
                  <label className="text-xs text-white/60 block mb-1.5">Last Name</label>
                  <Input placeholder="Chen" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/60 block mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input placeholder="you@example.com" type="email" className="pl-10" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/60 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input type="password" placeholder="••••••••" className="pl-10" />
                </div>
                <p className="text-[10px] text-white/40 mt-1">Min 8 characters, 1 number, 1 symbol</p>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-white/60 mb-6">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded accent-brand" />
              <span>I agree to the <Link href="/terms" className="text-brand hover:underline">Terms</Link> and <Link href="/privacy" className="text-brand hover:underline">Privacy Policy</Link></span>
            </label>

            <Button className="w-full" size="lg">
              Create Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-white/30">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline"><Chrome className="w-4 h-4" /> Google</Button>
              <Button variant="outline"><Github className="w-4 h-4" /> GitHub</Button>
            </div>
          </div>

          <p className="text-center text-sm text-white/50 mt-8">
            Already have an account? <Link href="/auth/login" className="text-brand hover:text-blue-300 transition">Sign in</Link>
          </p>
        </motion.div>
      </main>
    </>
  );
}