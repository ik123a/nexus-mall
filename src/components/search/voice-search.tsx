"use client";

import { motion } from "framer-motion";
import { Mic, Square, Upload, X, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VoiceSearchProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function VoiceSearch({ open, onOpenChange }: VoiceSearchProps) {
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (recording) {
      const start = Date.now();
      const tick = () => {
        setTime(Math.floor((Date.now() - start) / 1000));
        animationRef.current = requestAnimationFrame(tick);
      };
      tick();
    } else {
      cancelAnimationFrame(animationRef.current);
      setTime(0);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [recording]);

  useEffect(() => {
    if (!recording || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const bars = 60;
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2;
        const h = 30 + Math.random() * 40;
        const x1 = cx + Math.cos(angle) * 60;
        const y1 = cy + Math.sin(angle) * 60;
        const x2 = cx + Math.cos(angle) * (60 + h);
        const y2 = cy + Math.sin(angle) * (60 + h);
        ctx.strokeStyle = `rgba(184, 118, 62, ${0.3 + Math.random() * 0.7})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      if (recording) animationRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [recording]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10" 
          onClick={() => onOpenChange(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-strong rounded-3xl p-10 max-w-md w-full text-center border border-blue-400/20"
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-4 h-4" />
          </button>

          <Sparkles className="w-6 h-6 mx-auto mb-3 text-brand" />
          <h3 className="text-xl font-bold mb-1">Voice Search</h3>
          <p className="text-xs text-white/50 mb-8">Speak naturally — NEXUS understands context</p>

          <div className="relative w-44 h-44 mx-auto mb-6">
            <canvas ref={canvasRef} width={176} height={176} className="w-full h-full" />
            <button
              onClick={() => setRecording(!recording)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-br from-brand to-emerald flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:scale-105 transition-transform"
            >
              {recording ? <Square className="w-5 h-5" /> : <Mic className="w-7 h-7" />}
            </button>
          </div>

          <div className="font-mono text-2xl text-gradient mb-6">
            {recording ? `00:${time.toString().padStart(2, "0")}` : "Ready"}
          </div>

          {recording && (
            <p className="text-xs text-white/50 mb-4">"Quantum Lens..."</p>
          )}

          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => setRecording(false)} disabled={!recording}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => { setRecording(false); onOpenChange(false); }}>
              Search
            </Button>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}

export function ImageSearch({ open, onOpenChange }: VoiceSearchProps) {
  const [dragOver, setDragOver] = useState(false);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10" 
          onClick={() => onOpenChange(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-strong rounded-3xl p-10 max-w-md w-full text-center border border-blue-400/20 relative"
        >
          <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition">
            <X className="w-4 h-4" />
          </button>

          <Sparkles className="w-6 h-6 mx-auto mb-3 text-purple-400" />
          <h3 className="text-xl font-bold mb-1">Image Search</h3>
          <p className="text-xs text-white/50 mb-6">Upload a photo — we&apos;ll find similar products in the mall</p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            className={`border-2 border-dashed rounded-2xl p-10 mb-4 transition-all ${
              dragOver ? "border-blue-400 bg-blue-500/10" : "border-white/20"
            }`}
          >
            <Upload className="w-8 h-8 mx-auto mb-3 text-white/40" />
            <p className="text-sm text-white/60 mb-1">Drag & drop an image here</p>
            <p className="text-xs text-white/30">PNG, JPG, WEBP · Max 10MB</p>
          </div>

          <Button className="w-full">Choose File</Button>
        </motion.div>
      </div>
    </Dialog>
  );
}