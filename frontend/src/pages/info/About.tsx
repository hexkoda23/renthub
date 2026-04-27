import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Badge } from "../../components/ui";
import { Target, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden border-b border-neutral-100">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-light/30 via-white to-white" />
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="info" className="mb-6 rounded-full px-4 py-1 text-sm font-medium">Our Story</Badge>
              <h1 className="mb-8 text-4xl font-extrabold font-sora leading-tight text-neutral-900 md:text-6xl">
                Redefining Real Estate <br/> in <span className="text-primary italic">Nigeria</span>
              </h1>
              <p className="text-lg text-neutral-600 md:text-xl leading-relaxed">
                RentHub was born out of a simple frustration: finding a reliable, verified, and transparent property in Nigeria is too hard. We're on a mission to bring trust back to the marketplace using AI and a "human-first" verification process.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Values */}
        <section className="py-24 bg-neutral-50/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold font-sora text-neutral-900 mb-6">Our Vision</h2>
                <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
                  We envision a Nigeria where everyone can find their perfect home or workspace without the fear of scams, hidden fees, or misleading listings. By combining Jiji's massive inventory with RentHub's deep verification, we're building the ultimate bridge for Nigerian property seekers.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: <Target className="text-primary" />, title: "Precision Search", desc: "Finding exactly what you need based on electricity, water, and security." },
                    { icon: <ShieldCheck className="text-primary" />, title: "Verified Peace of Mind", desc: "Every RentHub-verified listing is checked by our team locally." },
                    { icon: <Zap className="text-primary" />, title: "AI-Powered Advice", desc: "Our advisor knows the vibes and safety of every major Lagos/Abuja area." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900">{item.title}</h4>
                        <p className="text-neutral-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1554232456-8727aae3cfa4?q=80&w=2070&auto=format&fit=crop" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 border-t border-neutral-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Verified Listings", value: "5,000+" },
                { label: "Neighbourhoods Covered", value: "120+" },
                { label: "Successful Handovers", value: "850+" },
                { label: "Community Members", value: "10k+" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-extrabold text-primary font-sora mb-2">{stat.value}</p>
                  <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 container mx-auto px-4">
          <div className="rounded-3xl bg-neutral-900 px-8 py-16 text-center text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
             <h2 className="text-3xl font-bold font-sora mb-6 relative z-10">Ready to find your next home?</h2>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-primary text-white rounded-xl px-10 py-4 font-bold relative z-10 shadow-lg shadow-primary/20"
             >
               Explore Property
             </motion.button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
