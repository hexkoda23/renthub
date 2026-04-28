import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ShieldCheck, CheckCircle, Camera, UserCheck, ShieldAlert, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const VerificationInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-sand grain">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto text-center max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white shadow-xl shadow-ink/5 text-primary mb-10 border border-neutral-100"
            >
              <ShieldCheck className="h-12 w-12" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold font-clash text-ink mb-8 leading-[1.1] tracking-tight"
            >
              The Gold Standard <br />
              <span className="italic font-instrument text-primary">of Trust</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              In Nigeria's chaotic real estate market, RentHob stands out as the beacon of trust. We go where others won't, verifying listings at the source.
            </motion.p>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-ink text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Protocol</h4>
                <h2 className="text-4xl md:text-5xl font-bold font-clash leading-tight">4-Step On-Site Verification</h2>
              </div>
              <p className="text-neutral-400 max-w-xs text-lg font-medium">
                Rigorous, manual, and uncompromising. We don't just list; we validate.
              </p>
            </div>
             
             <motion.div 
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
             >
                <StepCard 
                  num="01"
                  icon={<UserCheck className="h-6 w-6" />}
                  title="Identity Matching"
                  description="We verify the landlord or agent's government-issued ID and property ownership documents."
                  variants={itemVariants}
                />
                <StepCard 
                  num="02"
                  icon={<Camera className="h-6 w-6" />}
                  title="On-Site Inspection"
                  description="A RentHob representative physically visits the site to ensure photos are 100% current."
                  variants={itemVariants}
                />
                <StepCard 
                  num="03"
                  icon={<Zap className="h-6 w-6" />}
                  title="Utility Check"
                  description="We test the water, confirm the NEPA band, and check the strength of the security setup."
                  variants={itemVariants}
                />
                <StepCard 
                  num="04"
                  icon={<CheckCircle className="h-6 w-6" />}
                  title="Badge Issued"
                  description="Only after passing all checks do we issue the purple 'Verified' badge and listing priority."
                  variants={itemVariants}
                />
             </motion.div>
          </div>
        </section>

        {/* Sync Disclaimer */}
        <section className="py-32 px-4">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="max-w-6xl mx-auto rounded-[3rem] bg-white border border-neutral-200/60 p-8 md:p-20 shadow-2xl shadow-ink/5 relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-amber-100 transition-colors" />
              
              <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
                 <div className="bg-amber-100 p-6 rounded-[2rem] text-amber-700">
                    <ShieldAlert className="h-10 w-10" />
                 </div>
                 <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold font-clash text-ink mb-6">A Note on External Listings</h3>
                    <div className="space-y-6 text-neutral-600 text-lg leading-relaxed max-w-3xl">
                      <p>
                        RentHob automatically syncs thousands of properties from verified external sources like <span className="text-ink font-bold underline decoration-primary/30">Jiji.ng</span> to ensure you have the widest variety of choices. 
                      </p>
                      <p className="font-bold text-ink p-6 bg-sand/50 rounded-2xl border-l-4 border-primary">
                        Important: Listings labeled "via Jiji.ng" have NOT undergone our full 4-step on-site verification unless they ALSO carry the purple RentHob badge.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 mt-10">
                       <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20 text-sm font-bold text-primary">
                          <CheckCircle className="h-5 w-5" /> RentHob Badge = Guaranteed Safe
                       </div>
                       <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-50 border border-neutral-200 text-sm font-bold text-neutral-500">
                          <ShieldAlert className="h-5 w-5" /> No Badge = Use caution & inspect
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Safety Tips */}
        <section className="py-32 bg-sand/30">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Stay Vigilant</h4>
                <h2 className="text-4xl md:text-5xl font-bold font-clash text-ink mb-6">Safety Tips for Property Seekers</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                 <SafetyCard 
                   num="1"
                   title="Never pay before inspection"
                   description="Valid landlords will never ask for 'commitment fees' or 'inspection fees' upfront before showing you the house."
                 />
                 <SafetyCard 
                   num="2"
                   title="Verify the Legal Title"
                   description="For land or house purchases, always request a copy of the C of O or Deed of Assignment and verify it at the state land registry."
                 />
                 <SafetyCard 
                   num="3"
                   title="Chat through RentHob"
                   description="Keep your conversations on the platform so we can assist you if any disputes arise. Use our verified WhatsApp links."
                 />
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold font-clash text-ink mb-8">Ready to find your verified home?</h2>
            <button className="h-16 px-10 bg-primary text-white rounded-2xl font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20 flex items-center gap-3 mx-auto">
              Browse Listings <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const StepCard = ({ num, icon, title, description, variants }: { num: string, icon: any, title: string, description: string, variants: any }) => (
  <motion.div 
    variants={variants}
    className="relative group"
  >
    <div className="absolute -top-10 -right-4 text-9xl font-bold text-white/5 font-clash pointer-events-none transition-all group-hover:text-primary/10">
      {num}
    </div>
    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <h4 className="text-2xl font-bold mb-4 font-clash">{title}</h4>
    <p className="text-neutral-400 leading-relaxed font-medium">{description}</p>
  </motion.div>
);

const SafetyCard = ({ num, title, description }: { num: string, title: string, description: string }) => (
  <div className="p-10 bg-white rounded-[2.5rem] border border-neutral-200/60 shadow-xl shadow-ink/5 hover:shadow-2xl hover:shadow-ink/10 transition-all duration-500 hover:-translate-y-2 group">
    <div className="h-12 w-12 rounded-2xl bg-sand border border-neutral-100 flex items-center justify-center text-ink font-bold mb-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
      {num}
    </div>
    <h4 className="text-xl font-bold text-ink mb-4 font-clash">{title}</h4>
    <p className="text-neutral-500 leading-relaxed font-medium">{description}</p>
  </div>
);
