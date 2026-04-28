import { useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Lock, FileText, Scale, Zap, Users, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const PrivacyTerms = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const navItems = [
    { id: "introduction", label: "1. Introduction", icon: <FileText className="h-4 w-4" /> },
    { id: "data-collection", label: "2. Data Collection", icon: <Lock className="h-4 w-4" /> },
    { id: "property-verification", label: "3. Property Verification", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "fees", label: "4. Fees & Payments", icon: <Zap className="h-4 w-4" /> },
    { id: "user-conduct", label: "5. User Conduct", icon: <Users className="h-4 w-4" /> },
    { id: "liability", label: "6. Limitation of Liability", icon: <Scale className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-sand grain">
      <Navbar />
      
      <main className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-clash text-ink mb-6 tracking-tight">
              Legal <span className="italic font-instrument text-primary">Framework</span>
            </h1>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 text-neutral-500 font-medium">
              <p className="bg-white/50 backdrop-blur-sm px-4 py-1 rounded-full border border-neutral-200/50 inline-block">
                Last updated: April 22, 2026
              </p>
              <span className="hidden lg:block text-neutral-300">•</span>
              <p>Transparent rules for a trusted marketplace</p>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Navigation */}
            <aside className="lg:w-1/3">
               <nav className="sticky top-32 space-y-2">
                 <div className="mb-6 px-4">
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Navigation</h3>
                 </div>
                 {navItems.map((item) => (
                   <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    className="group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-ink/5 border border-transparent hover:border-neutral-200/50"
                   >
                     <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-white border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                         {item.icon}
                       </div>
                       <span className="font-bold text-ink/70 group-hover:text-ink transition-colors">{item.label}</span>
                     </div>
                     <ChevronRight className="h-4 w-4 text-neutral-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                   </a>
                 ))}
               </nav>
            </aside>

            {/* Content */}
            <div className="lg:w-2/3 space-y-16">
              <section id="introduction" className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200/60 shadow-xl shadow-ink/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-clash text-ink">1. Introduction</h2>
                  </div>
                  <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed text-lg space-y-6">
                    <p>
                      Welcome to <span className="text-ink font-bold">RentHob Nigeria</span>. By accessing our platform (via website or app), you agree to comply with and be bound by the following terms and conditions. These terms govern our relationship with you in relation to this platform.
                    </p>
                    <p>
                      Our mission is to provide a seamless, transparent, and luxury-grade property experience for all Nigerians. These terms ensure that all participants—renters, buyers, agents, and landlords—interact within a framework of mutual respect and legal clarity.
                    </p>
                  </div>
                </div>
              </section>

              <section id="data-collection" className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200/60 shadow-xl shadow-ink/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-clash text-ink">2. Data Collection</h2>
                  </div>
                  <div className="text-neutral-600 leading-relaxed text-lg space-y-6">
                    <p>
                      We collect information necessary to provide our premium services. Your privacy is our priority, and we handle your data with the highest security standards. This includes:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      {[
                        "Personal details (Name, Email, Phone)",
                        "Property details for listed homes",
                        "Location data for recommendations",
                        "Search preferences for AI Advisor"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-sand/30 border border-neutral-100">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                          <span className="text-base font-medium text-ink/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="property-verification" className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200/60 shadow-xl shadow-ink/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-clash text-ink">3. Property Verification</h2>
                  </div>
                  <div className="text-neutral-600 leading-relaxed text-lg space-y-6">
                    <p>
                      While RentHob strives to verify all listings manually through our rigorous 4-step process, we cannot guarantee 100% accuracy of all details provided by third-party agents or external sources like Jiji.ng.
                    </p>
                    <div className="mt-8 bg-ink text-white p-8 md:p-10 rounded-[2rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:scale-150" />
                      <div className="relative z-10">
                        <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Safety First</h4>
                        <p className="text-xl md:text-2xl font-instrument italic leading-tight">
                          "NEVER pay for a property until you have inspected it physically and verified the legal documents with a qualified professional."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="fees" className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200/60 shadow-xl shadow-ink/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-clash text-ink">4. Fees & Payments</h2>
                  </div>
                  <div className="text-neutral-600 leading-relaxed text-lg">
                    <p>
                      RentHob provides a marketplace. Any payments for rent, sales, or commissions are handled directly between the buyer/tenant and the landlord/agent. RentHob does not currently process escrow payments through its primary marketplace.
                    </p>
                  </div>
                </div>
              </section>

              <section id="user-conduct" className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200/60 shadow-xl shadow-ink/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-clash text-ink">5. User Conduct</h2>
                  </div>
                  <div className="text-neutral-600 leading-relaxed text-lg">
                    <p>
                      You agree to use this platform only for lawful purposes. You are prohibited from posting fraudulent listings, impersonating property owners, or scraping data from the platform without our express consent.
                    </p>
                  </div>
                </div>
              </section>

              <section id="liability" className="scroll-mt-32">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200/60 shadow-xl shadow-ink/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Scale className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold font-clash text-ink">6. Limitation of Liability</h2>
                  </div>
                  <div className="text-neutral-600 leading-relaxed text-lg">
                    <p>
                      RentHob Nigeria, its directors, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the platform, including any disputes with agents or landlords.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

