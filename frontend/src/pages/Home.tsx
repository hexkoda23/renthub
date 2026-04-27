import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SearchBar } from "../components/shared/SearchBar";
import { ListingGrid } from "../components/listings/ListingGrid";
import { Button } from "../components/ui";
import { Shield, Zap, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { listingsService } from "../services/listings.service";

export const Home = () => {
  const [source, setSource] = useState<string | undefined>();
  const [heroPurpose, setHeroPurpose] = useState<"rent" | "sale" | "shortlet">("rent");
  
  const { data, isLoading } = useQuery({
    queryKey: ["listings", { featured: true, source }],
    queryFn: () => listingsService.getListings({ limit: 6, source })
  });

  const listings = data?.data?.data || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 text-center md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/50 via-white to-white" />
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
        
        <div className="container mx-auto">
          <Badge variant="info" className="mb-6 rounded-full px-4 py-1 text-sm font-medium">✨ Nigeria's First AI-Powered Real Estate Hub</Badge>
          <h1 className="mb-6 max-w-4xl mx-auto text-4xl font-extrabold font-sora leading-tight text-neutral-900 md:text-6xl lg:text-7xl">
            Find Your Perfect Home <br/> in <span className="text-primary italic">Nigeria</span>
          </h1>
          <p className="mb-10 max-w-2xl mx-auto text-lg text-neutral-600 md:text-xl">
            Verified property listings, interactive area guides, and an AI advisor to help you choose the best neighbourhood for your lifestyle.
          </p>
          
          <div className="mx-auto flex flex-col items-center gap-2">
            {/* Hero Tabs */}
            <div className="flex gap-1 rounded-2xl bg-white/50 backdrop-blur-md p-1.5 border border-neutral-100 shadow-sm mb-4">
              {[
                { id: "rent", label: "Rent" },
                { id: "sale", label: "Buy" },
                { id: "shortlet", label: "Shortlet" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setHeroPurpose(tab.id as any)}
                  className={`relative rounded-xl px-6 py-2.5 text-sm font-bold transition-all z-10 ${
                    heroPurpose === tab.id ? "text-white" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {heroPurpose === tab.id && (
                    <motion.div
                      layoutId="heroTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{tab.label}</span>
                </button>
              ))}
            </div>
            <SearchBar purpose={heroPurpose} />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white/50 backdrop-blur rounded-2xl border border-neutral-100/50 shadow-sm transition-all hover:shadow-md">
              <span className="text-sm font-bold text-neutral-600 font-sora">Packing out soon?</span>
              <div className="flex gap-2">
                 <Link to="/handover">
                   <Button size="sm" variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white font-bold px-5">List Property</Button>
                 </Link>
                 <Link to="/handover">
                   <Button size="sm" variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white font-bold px-5">Get Alerts</Button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold font-sora text-neutral-900 md:text-4xl text-gradient">Why Choose RentHub?</h2>
            <p className="text-neutral-500">Bringing transparency and intelligence to Nigerian real estate.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Verified Listings"
              description="Every property on RentHub is manually verified to ensure descriptions and photos match reality."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6 text-primary" />}
              title="AI Area Advisor"
              description="Get personalized neighborhood recommendations based on safety scores, traffic, and your budget."
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Instant Contact"
              description="Chat directly with verified landlords and agents via secure WhatsApp or in-app messaging."
            />
          </div>
        </div>
      </section>

      {/* Trending Listings */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold font-sora text-neutral-900">Featured Properties</h2>
              <p className="text-neutral-500 mt-2">Hand-picked listings in prime locations.</p>
              
              {/* Source Tabs */}
              <div className="mt-6 flex gap-1 rounded-xl bg-neutral-100 p-1 w-fit relative">
                {[
                  { id: undefined, label: "All" },
                  { id: "renthub", label: "RentHub" },
                  { id: "jiji", label: "Jiji.ng" }
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setSource(tab.id as any)}
                    className={`relative rounded-lg px-4 py-2 text-xs font-bold transition-all z-10 ${
                      source === tab.id ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {source === tab.id && (
                      <motion.div
                        layoutId="activeTabHome"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-20">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link to="/listings">
              <Button variant="outline" className="rounded-xl font-bold border-neutral-200">View All Properties</Button>
            </Link>
          </div>
          <ListingGrid isLoading={isLoading} listings={listings} />
        </div>
      </section>

      {/* AI CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-white md:py-24 overflow-hidden relative">
           <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
           <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/20 blur-3xl" />
           
           <h2 className="mb-6 mx-auto max-w-2xl text-3xl font-bold font-sora md:text-5xl leading-tight">Not sure where to live? Ask our AI Advisor.</h2>
           <p className="mb-10 mx-auto max-w-xl text-primary-light/90 md:text-lg">
             "Where can I find a safe 2-bedroom flat in Lagos for under 1.5M Naira?" — Get the answer in seconds.
           </p>
           <Link to="/ai-advisor">
             <Button size="lg" className="bg-white text-primary hover:bg-neutral-100 px-10">Start Chatting Now</Button>
           </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-all hover:shadow-md">
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
      {icon}
    </div>
    <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">{title}</h3>
    <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
  </div>
);

const Badge = ({ children, variant, className }: any) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", variant === "info" ? "bg-primary-light text-primary" : "bg-neutral-100 text-neutral-600", className)}>
    {children}
  </span>
);

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
