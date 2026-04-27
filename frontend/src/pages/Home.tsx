import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SearchBar } from "../components/shared/SearchBar";
import { ListingGrid } from "../components/listings/ListingGrid";
import { Button, Badge } from "../components/ui";
import { Shield, Zap, MessageSquare, ArrowRight, Star, Users, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
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
    <div className="min-h-screen bg-sand overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-ink">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
            alt="Lagos Luxury"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/40 to-ink" />
          <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="glass" className="mb-8 px-5 py-2 text-xs tracking-[0.2em] uppercase">
                <span className="mr-2">✨</span> Nigeria's First AI-Powered Real Estate Hub
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 max-w-5xl mx-auto text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.9] text-white tracking-tighter"
            >
              Find Your Perfect <br/> Home in <span className="font-serif italic text-primary">Nigeria</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12 max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-sans leading-relaxed"
            >
              Verified property listings, interactive area guides, and an AI advisor to help you choose the best neighbourhood for your lifestyle.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full max-w-4xl mx-auto"
            >
              {/* Hero Tabs */}
              <div className="inline-flex gap-1 rounded-full bg-white/5 backdrop-blur-xl p-1.5 border border-white/10 mb-6">
                {[
                  { id: "rent", label: "Rent" },
                  { id: "sale", label: "Buy" },
                  { id: "shortlet", label: "Shortlet" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHeroPurpose(tab.id as any)}
                    className={cn(
                      "relative rounded-full px-8 py-3 text-sm font-display font-bold transition-all duration-300",
                      heroPurpose === tab.id ? "text-white" : "text-neutral-400 hover:text-white"
                    )}
                  >
                    {heroPurpose === tab.id && (
                      <motion.div
                        layoutId="heroTab"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="bg-white/5 backdrop-blur-2xl p-2 rounded-[32px] border border-white/10 shadow-2xl">
                <SearchBar purpose={heroPurpose} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Stat Pills */}
        <div className="hidden lg:block">
          <FloatingStat 
            delay={1} 
            className="top-[20%] left-[10%]" 
            icon={<HomeIcon className="h-4 w-4 text-primary" />} 
            label="2,400+ Listings" 
          />
          <FloatingStat 
            delay={1.2} 
            className="top-[35%] right-[12%]" 
            icon={<Star className="h-4 w-4 text-primary" />} 
            label="Verified Properties" 
          />
          <FloatingStat 
            delay={1.4} 
            className="bottom-[25%] left-[15%]" 
            icon={<Users className="h-4 w-4 text-primary" />} 
            label="12k+ Happy Tenants" 
          />
        </div>

        {/* Bottom Trust Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12 border-t border-white/5 pt-12">
              {[
                { label: "Happy Tenants", value: "12,000+" },
                { label: "Verified Listings", value: "98%" },
                { label: "Agent Fees", value: "₦0" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl font-display font-bold text-white">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "₦2.5B+", label: "Property Value" },
              { value: "36+", label: "Nigerian Cities" },
              { value: "15k+", label: "Monthly Users" },
              { value: "24/7", label: "AI Assistance" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-serif italic text-white mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/70 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RentHub - Value Propositions */}
      <section className="py-32 bg-sand/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-ink mb-6">Redefining <span className="text-primary italic font-serif">Proptech</span> in Nigeria</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg">We've combined local insights with world-class technology to solve the biggest challenges in the Nigerian rental market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Zero Agent Fees", 
                desc: "By facilitating direct handovers between tenants, we eliminate the need for traditional agents and their exorbitant fees.",
                icon: "💰"
              },
              { 
                title: "100% Verified", 
                desc: "Every single property undergoes a rigorous multi-step verification process before it goes live on our platform.",
                icon: "✅"
              },
              { 
                title: "AI Matchmaking", 
                desc: "Our Llama 3.3 powered advisor analyzes your lifestyle to suggest neighbourhoods that truly fit your personality.",
                icon: "🤖"
              }
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[32px] border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-6">{card.icon}</div>
                <h3 className="text-2xl font-display font-bold text-ink mb-4">{card.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-sand relative">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            <FeatureRow 
              number="01"
              title="Verified Listings Only"
              description="Every property on RentHub is manually verified to ensure descriptions and photos match reality. No more fake listings or agent scams."
              icon={<Shield className="h-10 w-10 text-primary" />}
              reverse={false}
              image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
            />
            <FeatureRow 
              number="02"
              title="AI Neighbourhood Advisor"
              description="Get personalized recommendations based on safety scores, traffic patterns, and your specific budget. We help you find a community, not just a house."
              icon={<MessageSquare className="h-10 w-10 text-primary" />}
              reverse={true}
              image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
            />
            <FeatureRow 
              number="03"
              title="Seamless Digital Handover"
              description="Our proprietary digital handover flow ensures a smooth transition between outgoing and incoming tenants, saving you thousands in agent fees."
              icon={<Zap className="h-10 w-10 text-primary" />}
              reverse={false}
              image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
            />
          </div>
        </div>
      </section>

      {/* Curated Neighbourhoods */}
      <section className="py-32 bg-ink overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <Badge variant="glass" className="mb-6">EXPLORE LAGOS</Badge>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter">
              Curated <span className="font-serif italic text-primary">Neighbourhoods</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl font-sans leading-relaxed">
              From the serene streets of Old Ikoyi to the vibrant tech hubs of Yaba, discover the perfect community for your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Ikoyi", tag: "Luxury & Serenity", img: "https://images.unsplash.com/photo-1590059536034-780c8e217278?auto=format&fit=crop&q=80&w=800" },
              { name: "Lekki Phase 1", tag: "Vibrant Lifestyle", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" },
              { name: "Victoria Island", tag: "Business Central", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
              { name: "Maitama", tag: "Abuja Elite", img: "https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&q=80&w=800" }
            ].map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer"
              >
                <img 
                  src={area.img} 
                  alt={area.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <span className="text-primary font-display font-bold text-xs uppercase tracking-widest mb-2 block">{area.tag}</span>
                  <h3 className="text-3xl font-display font-bold text-white tracking-tight">{area.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Listings */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-display font-bold uppercase tracking-widest text-primary">What's Hot in Lagos</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ink">Trending Listings</h2>
              
              {/* Source Tabs */}
              <div className="mt-8 flex gap-1 rounded-full bg-neutral-100 p-1 w-fit">
                {[
                  { id: undefined, label: "All Properties" },
                  { id: "renthub", label: "RentHub Exclusive" },
                  { id: "jiji", label: "Jiji.ng" }
                ].map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setSource(tab.id as any)}
                    className={cn(
                      "relative rounded-full px-6 py-2.5 text-xs font-display font-bold transition-all duration-300",
                      source === tab.id ? "text-ink" : "text-neutral-500 hover:text-ink"
                    )}
                  >
                    {source === tab.id && (
                      <motion.div
                        layoutId="activeTabHome"
                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link to="/listings" className="group flex items-center gap-2 text-ink font-display font-bold hover:text-primary transition-colors">
              View All Properties
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ListingGrid isLoading={isLoading} listings={listings} />
        </div>
      </section>

      {/* AI Advisor CTA Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="rounded-[48px] bg-ink px-8 py-20 text-center text-white overflow-hidden relative border border-white/5">
           {/* Grid pattern background */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #FF5C00 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
           
           <div className="relative z-10 max-w-4xl mx-auto">
             <Badge variant="glass" className="mb-8">AI POWERED</Badge>
             <h2 className="mb-12 text-4xl md:text-6xl font-display font-bold leading-tight">
               Not sure where to live? <br/> Ask our AI Advisor.
             </h2>
             
             {/* Fake chat animation */}
             <div className="mb-16 space-y-4 max-w-lg mx-auto">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-bl-none text-left"
               >
                 <p className="text-sm text-neutral-300">"Where can I find a safe 2-bedroom flat in Lagos for under 1.5M Naira?"</p>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
                 className="bg-primary/20 border border-primary/30 p-4 rounded-2xl rounded-br-none text-right ml-auto max-w-[80%]"
               >
                 <div className="flex items-center justify-end gap-2 mb-1">
                   <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] uppercase font-bold tracking-widest text-primary">RentHub AI</span>
                 </div>
                 <p className="text-sm text-white">Based on recent data, I recommend exploring Yaba or certain parts of Surulere. Would you like to see verified listings there?</p>
               </motion.div>
             </div>

             <Link to="/ai-advisor">
               <Button size="lg" className="bg-primary text-white hover:bg-primary-dark px-12 py-8 text-lg rounded-full shadow-2xl shadow-primary/20 group">
                 Start Chatting Now
                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
               </Button>
             </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FloatingStat = ({ delay, className, icon, label }: { delay: number, className: string, icon: React.ReactNode, label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className={cn(
      "absolute z-10 flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl animate-float",
      className
    )}
  >
    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
      {icon}
    </div>
    <span className="text-white font-display font-bold text-sm whitespace-nowrap">{label}</span>
  </motion.div>
);

const FeatureRow = ({ number, title, description, icon, reverse, image }: { number: string, title: string, description: string, icon: React.ReactNode, reverse: boolean, image: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("flex flex-col md:flex-row items-center gap-16 lg:gap-32", reverse && "md:flex-row-reverse")}>
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex-1 relative"
      >
        <div className="absolute -top-12 -left-8 text-[120px] font-display font-bold text-ink/5 leading-none select-none">
          {number}
        </div>
        <div className="relative z-10">
          <div className="h-20 w-20 bg-ink rounded-2xl flex items-center justify-center mb-8 border-2 border-primary shadow-xl shadow-primary/10">
            {icon}
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6 tracking-tight">{title}</h3>
          <p className="text-xl text-neutral-500 font-sans leading-relaxed max-w-md">{description}</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 w-full aspect-square bg-neutral-200 rounded-[48px] overflow-hidden relative group shadow-2xl"
      >
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors duration-500" />
      </motion.div>
    </div>
  );
};
