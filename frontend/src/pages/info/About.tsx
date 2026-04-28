import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Target, ShieldCheck, Sparkles, Quote } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <div className="min-h-screen bg-sand grain">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="container mx-auto text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-neutral-200 text-xs font-bold uppercase tracking-widest text-primary mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                Our Story
              </div>
              <h1 className="mb-8 text-5xl md:text-7xl font-display font-bold leading-[1.1] text-ink">
                Redefining <span className="text-primary italic font-serif">Real Estate</span> <br className="hidden md:block" /> 
                in Modern Nigeria
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-sans">
                RentHob was born out of a simple frustration: finding a reliable, verified, and transparent property in Nigeria is too hard. We're on a mission to bring trust back to the marketplace using AI and a "human-first" verification process.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-32 bg-ink text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096&auto=format&fit=crop" 
              alt="Background" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-primary mb-6">
                  <Quote className="h-12 w-12 opacity-50 fill-current" />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                  Our vision is a <span className="text-primary italic font-serif">trust-first</span> ecosystem for every Nigerian seeker.
                </h2>
                <p className="text-neutral-400 text-lg mb-10 leading-relaxed font-sans">
                  We envision a Nigeria where everyone can find their perfect home or workspace without the fear of scams, hidden fees, or misleading listings. By combining data-driven insights with deep local verification, we're building the ultimate bridge.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Target className="text-primary h-6 w-6 mb-4" />
                    <h4 className="font-bold text-lg mb-2">Precision Search</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">Finding exactly what you need based on electricity, water, and security.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <ShieldCheck className="text-primary h-6 w-6 mb-4" />
                    <h4 className="font-bold text-lg mb-2">Verified Peace</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">Every RentHob-verified listing is checked by our team locally.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1554232456-8727aae3cfa4?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-primary p-10 rounded-3xl shadow-2xl hidden md:block">
                  <p className="text-5xl font-display font-bold mb-1">10k+</p>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-80">Community Members</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { label: "Verified Listings", value: "5,000+" },
                { label: "Neighbourhoods", value: "120+" },
                { label: "Successful Handovers", value: "850+" },
                { label: "Agent Partners", value: "450+" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <p className="text-5xl md:text-6xl font-display font-bold text-ink mb-3 group-hover:text-primary transition-colors duration-500">{stat.value}</p>
                  <div className="h-1 w-8 bg-primary mx-auto mb-4 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-32 container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] bg-ink px-8 py-24 text-center text-white relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
             <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Ready to find your <span className="text-primary italic font-serif">dream home</span>?</h2>
               <p className="text-neutral-400 mb-12 text-lg">Join thousands of Nigerians using RentHob to discover verified properties.</p>
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-primary text-white rounded-2xl px-12 py-5 font-bold shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all text-lg"
               >
                 Start Exploring
               </motion.button>
             </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
