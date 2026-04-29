import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SearchBar } from "../components/shared/SearchBar";
import { ListingGrid } from "../components/listings/ListingGrid";
import { Button, Badge } from "../components/ui";
import { Shield, MessageSquare, ArrowRight, CheckCircle, Zap as ZapIcon, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listingsService } from "../services/listings.service";
import { cn } from "../utils/cn";

export const Home = () => {
  const [source, setSource] = useState<string | undefined>();
  const [heroPurpose, setHeroPurpose] = useState<"rent" | "sale" | "shortlet">("rent");
  
  const { data, isLoading } = useQuery({
    queryKey: ["listings", { featured: true, source }],
    queryFn: () => listingsService.getListings({ limit: 6, source })
  });

  const listings = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-4 overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-50" />
        
        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob [animation-delay:2s]" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="glass" className="mb-6 px-4 py-1.5 text-xs font-semibold tracking-wide inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Nigeria's Smartest Property Platform
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight text-ink"
              >
                Find Your Next <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Home</span> in Nigeria
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8 text-neutral-500 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Discover verified rentals, properties for sale, and shortlets across Nigeria with AI-powered neighbourhood insights.
              </motion.p>
              
              {/* Hero Tabs */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start"
              >
                {[
                  { id: "rent", label: "Rent" },
                  { id: "sale", label: "Buy" },
                  { id: "shortlet", label: "Shortlet" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHeroPurpose(tab.id as any)}
                    className={cn(
                      "px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200",
                      heroPurpose === tab.id 
                        ? "bg-primary text-white shadow-md shadow-primary/20" 
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <SearchBar purpose={heroPurpose} />
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-3 justify-center lg:justify-start"
              >
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-light text-primary text-xs font-semibold rounded-full">
                  <CheckCircle className="h-3.5 w-3.5" /> 12,000+ Listings
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-light text-primary text-xs font-semibold rounded-full">
                  <Shield className="h-3.5 w-3.5" /> Verified Only
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-light text-primary text-xs font-semibold rounded-full">
                  <ZapIcon className="h-3.5 w-3.5" /> Free to Browse
                </span>
              </motion.div>
            </div>

            {/* Right Content - Floating Cards */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Main property card visual */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-3xl shadow-card-hover overflow-hidden"
              >
                <div className="h-48 bg-neutral-200 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800" 
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ink">For Rent</div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-display font-bold text-lg text-ink mb-1">Luxury 3 Bedroom Apartment</h4>
                  <p className="text-neutral-400 text-sm flex items-center gap-1 mb-3">
                    <MapPin className="h-3.5 w-3.5" /> Lekki Phase 1, Lagos
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary font-bold text-xl">₦3.5M/yr</span>
                    <span className="text-neutral-500">3 bed • 2 bath</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating stat badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-10 -left-4 px-4 py-2 bg-white rounded-2xl shadow-card flex items-center gap-2 animate-float"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold text-ink">Verified</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute top-32 -right-4 px-4 py-2 bg-white rounded-2xl shadow-card flex items-center gap-2 animate-float [animation-delay:1s]"
              >
                <span className="text-lg">🔥</span>
                <span className="text-sm font-semibold text-ink">Popular Area</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-20 -left-8 px-4 py-2 bg-white rounded-2xl shadow-card flex items-center gap-2 animate-float [animation-delay:0.5s]"
              >
                <ZapIcon className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-semibold text-ink">Band A Power</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-dark py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "5,000+", label: "Listings" },
              { value: "98%", label: "Verified" },
              { value: "24hrs", label: "Response" },
              { value: "₦0", label: "Agent Fee" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-5xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">WHY RENTHOB</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Everything you need to find your perfect home</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Zero Agent Fees", 
                desc: "By facilitating direct handovers between tenants, we eliminate the need for traditional agents and their exorbitant fees.",
                icon: "💰",
                gradient: "from-primary to-primary-dark"
              },
              { 
                title: "100% Verified", 
                desc: "Every single property undergoes a rigorous multi-step verification process before it goes live on our platform.",
                icon: "✅",
                gradient: "from-accent to-accent-dark"
              },
              { 
                title: "AI Matchmaking", 
                desc: "Our AI-powered advisor analyzes your lifestyle to suggest neighbourhoods that truly fit your personality.",
                icon: "🤖",
                gradient: "from-gold to-amber-600"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl mb-6`}>
                  {card.icon}
                </div>
                <span className="text-primary/30 font-display font-bold text-6xl absolute top-4 right-6">0{i + 1}</span>
                <h3 className="text-xl font-display font-bold text-ink mb-3">{card.title}</h3>
                <p className="text-neutral-500 leading-relaxed text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Listings */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Featured Properties</h2>
              
              {/* Source Tabs */}
              <div className="mt-6 flex gap-2 rounded-xl bg-neutral-100 p-1 w-fit">
                {[
                  { id: undefined, label: "All Properties" },
                  { id: "renthob", label: "RentHob Exclusive" },
                  { id: "jiji", label: "Jiji.ng" }
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setSource(tab.id as any)}
                    className={cn(
                      "relative rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300",
                      source === tab.id ? "bg-white text-ink shadow-sm" : "text-neutral-500 hover:text-ink"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <Link to="/listings" className="group flex items-center gap-2 text-primary font-semibold hover:underline">
              View All Properties →
            </Link>
          </div>
          <ListingGrid isLoading={isLoading} listings={listings} />
        </div>
      </section>

      {/* AI Advisor CTA Section */}
      <section className="py-24 bg-ink relative overflow-hidden">
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #6C63FF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="text-primary font-bold text-sm uppercase tracking-widest mb-3 block">AI POWERED</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                Not sure where to live?
              </h2>
              
              {/* Fake chat animation */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0 text-left mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="bg-white/10 border border-white/10 p-4 rounded-2xl rounded-bl-none"
                >
                  <p className="text-sm text-neutral-300">"Where can I find a safe 2-bedroom flat in Lagos for under 1.5M Naira?"</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-primary/20 border border-primary/30 p-4 rounded-2xl rounded-br-none ml-8"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">RentHob AI</span>
                  </div>
                  <p className="text-sm text-white">Based on recent data, I recommend exploring Yaba or Surulere. Would you like to see verified listings there?</p>
                </motion.div>
              </div>

              <Link to="/ai-advisor">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all">
                  Start Chatting Now
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </Button>
              </Link>
            </div>

            {/* Right side - floating illustration */}
            <div className="hidden lg:block relative">
              <div className="w-96 h-96 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-ink-soft rounded-3xl p-6 border border-primary/20 shadow-glow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">AI Advisor</p>
                    <p className="text-neutral-400 text-xs">Online now</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-neutral-800 p-3 rounded-xl rounded-bl-none">
                    <p className="text-sm text-neutral-300">What's the safest area in Lagos for families?</p>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-xl rounded-br-none">
                    <p className="text-sm text-white">Ikoyi and Victoria Island are known for their security and family-friendly environment...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
