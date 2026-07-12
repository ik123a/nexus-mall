"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, ArrowRight, Github, Chrome, Shield } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand to-emerald flex items-center justify-center shadow-2xl shadow-brand/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-display font-black mb-2">Welcome Back</h1>
            <p className="text-white/50">Sign in to access your NEXUS account</p>
          </div>

          <Card className="p-8">
            {/* Email input */}
            <div className="space-y-4 mb-6">
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
                  <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-6">
              <label className="flex items-center gap-2 text-white/60">
                <input type="checkbox" className="w-4 h-4 rounded accent-brand" />
                Remember me
              </label>
              <Link href="#" className="text-brand hover:text-blue-300 text-xs">Forgot password?</Link>
            </div>

            <Button className="w-full" size="lg">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* OTP option */}
            <div className="mt-4">
              <button onClick={() => setOtpSent(true)} className="w-full text-sm text-brand hover:text-blue-300 transition flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Use biometric / OTP
              </button>
              {otpSent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-xs text-green-400 mt-2"
                >
                  ✓ OTP sent to your device
                </motion.p>
              )}
            </div>
          </Card>

          {/* Social login */}
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-6">
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
            Don&apos;t have an account? <Link href="/auth/signup" className="text-brand hover:text-blue-300 transition">Sign up</Link>
          </p>
        </motion.div>
      </main>
    </>
  );
}