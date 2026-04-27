import { useState } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Input, Button } from "../../components/ui";
import { Search, HelpCircle, ChevronRight, Home, Shield, DollarSign, UserCheck, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-sand grain">
      <Navbar />
      
      <main>
        {/* Search Hero */}
        <section className="bg-ink py-24 px-4 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="container mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                How can we help?
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                Search the <span className="text-primary italic font-serif">Help Center</span>
              </h1>
              <div className="max-w-2xl mx-auto relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 h-6 w-6 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search for articles, guides, or verification info..." 
                  className="w-full pl-16 py-8 rounded-[2rem] border-none text-ink bg-white shadow-2xl shadow-black/20 text-lg placeholder:text-neutral-400 focus:ring-4 focus:ring-primary/20 transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <HelpCard 
                  icon={<Home className="text-primary h-7 w-7" />}
                  title="Getting Started"
                  description="How to browse, filter and save properties you love."
                  delay={0}
                />
                <HelpCard 
                  icon={<UserCheck className="text-primary h-7 w-7" />}
                  title="Account & Profile"
                  description="Managing your account, notifications and security."
                  delay={0.1}
                />
                <HelpCard 
                  icon={<Shield className="text-primary h-7 w-7" />}
                  title="Trust & Safety"
                  description="Understanding our verification and avoiding scams."
                  delay={0.2}
                />
                <HelpCard 
                  icon={<DollarSign className="text-primary h-7 w-7" />}
                  title="Selling & Fees"
                  description="How to list your property and manage enquiries."
                  delay={0.3}
                />
             </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-32 bg-ink/5 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
                Common <span className="text-primary italic font-serif">Questions</span>
              </h2>
              <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
            </div>
            
            <div className="space-y-4">
              <FaqItem 
                question="How do I know if a property is really verified?" 
                answer="Look for the 'Verified' badge on the property card. This means one of our RentHub representatives has physically visited the property, verified the owner's identity, and confirmed the photos match the building."
              />
              <FaqItem 
                question="Can I trust Jiji listings on RentHub?" 
                answer="Jiji listings are synced for your convenience to offer the widest choice. However, we do not manually verify Jiji listings unless they also have the RentHub 'Verified' badge. Always proceed with caution."
              />
              <FaqItem 
                question="Do I have to pay any commission to RentHub?" 
                answer="No. RentHub is free for property seekers. We make money by offering premium listing placement and verification services to agents and landlords."
              />
              <FaqItem 
                question="What is the AI Advisor?" 
                answer="Our AI Advisor is trained on real neighbourhood data in Nigeria. It helps you decide where to live based on traffic patterns, safety scores (provided by local communities), and your specific budget."
              />
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-32 text-center">
          <div className="container mx-auto px-4">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="max-w-3xl mx-auto p-16 rounded-[3rem] bg-white border border-neutral-200/60 shadow-2xl shadow-ink/5"
             >
               <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-sand text-ink mb-8">
                 <HelpCircle className="h-10 w-10" />
               </div>
               <h3 className="text-4xl font-display font-bold mb-4 text-ink">Still have questions?</h3>
               <p className="text-neutral-500 mb-10 text-lg max-w-md mx-auto leading-relaxed">Our support agents are available via WhatsApp and Email to assist you with any specific issues.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-ink text-white hover:bg-neutral-800 rounded-2xl px-12 h-16 font-bold text-lg shadow-xl shadow-ink/10 transition-all">Contact Support</Button>
                  <Button variant="outline" className="border-neutral-200 hover:bg-sand rounded-2xl px-12 h-16 font-bold text-lg transition-all">Join Community</Button>
               </div>
             </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const HelpCard = ({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-10 rounded-[2.5rem] bg-white border border-neutral-200/60 shadow-xl shadow-ink/5 hover:border-primary/30 transition-all duration-500 cursor-pointer group"
  >
    <div className="h-16 w-16 rounded-2xl bg-sand flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <h4 className="text-2xl font-display font-bold text-ink mb-3">{title}</h4>
    <p className="text-neutral-500 leading-relaxed mb-8">{description}</p>
    <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all duration-300">
      Explore Guide <ArrowRight className="h-4 w-4" />
    </div>
  </motion.div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/60 shadow-xl shadow-ink/5 overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left group"
      >
        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-ink group-hover:text-primary'}`}>{question}</span>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-90' : 'bg-sand text-neutral-400'}`}>
          <ChevronRight className="h-5 w-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-neutral-600 leading-relaxed font-sans text-lg border-t border-neutral-50 pt-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
