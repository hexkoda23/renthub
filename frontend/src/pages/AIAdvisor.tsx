import { Navbar } from "../components/layout/Navbar";
import { ChatWindow } from "../components/ai-advisor/ChatWindow";
import { Map as MapIcon, Shield, Coffee, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const AIAdvisor = () => {
  return (
    <div className="min-h-screen bg-sand grain flex flex-col font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-[380px] space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Smart Assistant
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-4">
              Neighbourhood <br />
              <span className="text-primary italic font-serif">Advisor</span>
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed">
              Powered by Groq's Llama 3.3 and RentHob's verified area database. Get local insights you won't find anywhere else.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <InfoCard 
              icon={<Shield className="h-5 w-5 text-primary" />}
              title="Safety Focus"
              description="Real-time analysis of crime rates and security presence for every Lagos district."
              delay={0.3}
            />
            <InfoCard 
              icon={<MapIcon className="h-5 w-5 text-primary" />}
              title="Commute Efficiency"
              description="Traffic patterns and transit accessibility data for your daily work route."
              delay={0.4}
            />
            <InfoCard 
              icon={<Coffee className="h-5 w-5 text-primary" />}
              title="Lifestyle Matching"
              description="Find the perfect vibe, from quiet family enclaves to vibrant social hubs."
              delay={0.5}
            />
          </motion.div>

          <motion.div 
            className="rounded-rent bg-ink p-8 text-white relative overflow-hidden group shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/30 transition-colors duration-500" />
            <h4 className="font-display font-bold text-xl mb-6 relative z-10">Try asking:</h4>
            <ul className="space-y-3 relative z-10">
              {SUGGESTIONS.map((s, i) => (
                <li key={i} className="text-sm bg-white/5 border border-white/10 p-4 rounded-xl cursor-pointer hover:bg-white/10 hover:border-primary/50 transition-all duration-300">
                  <span className="text-primary mr-2">"</span>
                  {s}
                  <span className="text-primary ml-1">"</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </aside>

        <section className="flex-1 min-h-[600px] flex flex-col">
          <motion.div 
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ChatWindow />
          </motion.div>
        </section>
      </main>
    </div>
  );
};

const InfoCard = ({ icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex gap-4 p-5 rounded-rent bg-white/80 backdrop-blur-sm border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="h-12 w-12 flex items-center justify-center shrink-0 rounded-xl bg-sand border border-neutral-100">
      {icon}
    </div>
    <div>
      <h4 className="text-base font-display font-bold text-ink mb-1">{title}</h4>
      <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const SUGGESTIONS = [
  "Safe areas in Lagos under ₦150k/month",
  "Best hoods for young families in Abuja",
  "Areas in Port Harcourt with 24/7 power",
  "Quiet places to work remotely in Ibadan"
];
