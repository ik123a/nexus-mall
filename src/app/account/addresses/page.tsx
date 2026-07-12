"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, Plus, Edit, Trash2, Home, Building, Mail, Phone, Shield, ArrowRight, X } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandMenu } from "@/components/search/command-menu";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const addresses = [
  { id: "addr-1", name: "Home", isDefault: true, type: "residential", fullName: "Alex Chen", phone: "+91 98765 43210", line1: "401, Sea View Apartments", line2: "Carter Road, Bandra West", city: "Mumbai", state: "Maharashtra", pincode: "400050", country: "India" },
  { id: "addr-2", name: "Office", isDefault: false, type: "commercial", fullName: "Alex Chen", phone: "+91 98765 43210", line1: "12th Floor, Nexus Tower", line2: "Bandra Kurla Complex", city: "Mumbai", state: "Maharashtra", pincode: "400051", country: "India" },
  { id: "addr-3", name: "Mom's Place", isDefault: false, type: "residential", fullName: "Mei Chen", phone: "+91 98765 43211", line1: "B-204, Sunshine Residency", line2: "Koramangala 4th Block", city: "Bengaluru", state: "Karnataka", pincode: "560034", country: "India" },
];

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "", type: "residential", fullName: "", phone: "",
    line1: "", line2: "", city: "", state: "", pincode: "", country: "India"
  });

  const handleEdit = (addr: typeof addresses[0]) => {
    setFormData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this address?")) {
      // delete logic
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // submit logic
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", type: "residential", fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", country: "India" });
  };

  return (
    <main>
      <Navbar />
      <CommandMenu />
      <Toaster />

      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-4xl font-display font-black">Saved Addresses</h1>
              <p className="text-white/50 mt-1">Manage your delivery addresses for faster checkout</p>
            </div>
            <Button variant="premium" className="gap-2" onClick={() => { setFormData({ name: "", type: "residential", fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", country: "India" }); setEditingId(null); setShowForm(true); }}>
              <Plus className="w-4 h-4" />
              Add Address
            </Button>
          </motion.div>

          {/* Address Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {addresses.map((addr, i) => (
              <motion.div key={addr.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className={`relative h-full ${addr.isDefault ? "border-brand/30" : ""}`}>
                  {addr.isDefault && (
                    <div className="absolute -top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-brand to-emerald text-white">
                      Default
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${addr.type === "residential" ? "bg-emerald/20" : "bg-brand/20"}`}>
                          {addr.type === "residential" ? <Home className="w-4 h-4 text-emerald" /> : <Building className="w-4 h-4 text-brand" />}
                        </div>
                        <span className="font-semibold">{addr.name}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-white/70 text-sm mb-4">
                      <p className="font-medium">{addr.fullName}</p>
                      <p>{addr.phone}</p>
                      <p>{addr.line1}</p>
                      {addr.line2 && <p>{addr.line2}</p>}
                      <p>{addr.city}, {addr.state} {addr.pincode}</p>
                      <p>{addr.country}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                      {addr.isDefault ? (
                        <span className="flex items-center gap-1 text-xs text-emerald">
                          <Check className="w-3 h-3" />
                          Default address
                        </span>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => {}}>
                          <Check className="w-3.5 h-3.5" />
                          Set Default
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(addr)}>
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10" onClick={() => handleDelete(addr.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {/* Add New Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: addresses.length * 0.1 }}
            >
              <Button variant="outline" className="w-full h-64 flex flex-col items-center justify-center gap-3" onClick={() => { setFormData({ name: "", type: "residential", fullName: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "", country: "India" }); setEditingId(null); setShowForm(true); }}>
                <Plus className="w-10 h-10 text-white/30" />
                <span className="text-white/50">Add New Address</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Address Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowForm(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="glass-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold">{editingId ? "Edit Address" : "Add New Address"}</h2>
                      <button type="button" onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Label *</label>
                        <Input placeholder="Home, Office, etc." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Type</label>
                        <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full h-11 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand/50">
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                      <Input placeholder="John Doe" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Phone *</label>
                      <Input placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Address Line 1 *</label>
                      <Input placeholder="Flat/Building, Street" value={formData.line1} onChange={(e) => setFormData({...formData, line1: e.target.value})} required />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Address Line 2</label>
                      <Input placeholder="Area, Landmark (optional)" value={formData.line2} onChange={(e) => setFormData({...formData, line2: e.target.value})} />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">City *</label>
                        <Input placeholder="Mumbai" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">State *</label>
                        <Input placeholder="Maharashtra" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">PIN Code *</label>
                        <Input placeholder="400050" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Country</label>
                      <Input placeholder="India" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-brand" />
                        <span className="text-sm text-white/70">Set as default address</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" type="button" onClick={() => setShowForm(false)} className="flex-1">Cancel</Button>
                      <Button type="submit" variant="premium" className="flex-1 gap-2">
                        {editingId ? "Save Changes" : "Save Address"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function Check({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>;
}