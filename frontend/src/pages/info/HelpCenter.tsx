import { useState } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Input, Button } from "../../components/ui";
import { Search, HelpCircle, ChevronRight, Home, Shield, DollarSign, UserCheck } from "lucide-react";

export const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Search Hero */}
        <section className="bg-neutral-900 py-16 px-4 text-center">
          <div className="container mx-auto">
            <h1 className="text-3xl font-extrabold font-sora text-white mb-6">Hello! How can we help?</h1>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
              <Input 
                placeholder="Search for help (e.g. 'how to list a property', 'verification')" 
                className="w-full pl-12 py-7 rounded-2xl border-none text-neutral-900 shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HelpCard 
                  icon={<Home className="text-primary" />}
                  title="Getting Started"
                  description="How to browse, filter and save properties you love."
                />
                <HelpCard 
                  icon={<UserCheck className="text-primary" />}
                  title="Account & Profile"
                  description="Managing your account, notifications and security."
                />
                <HelpCard 
                  icon={<Shield className="text-primary" />}
                  title="Trust & Safety"
                  description="Understanding our verification and avoiding scams."
                />
                <HelpCard 
                  icon={<DollarSign className="text-primary" />}
                  title="Selling & Fees"
                  description="How to list your property and manage enquiries."
                />
             </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-neutral-50/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold font-sora text-neutral-900 mb-12 text-center underline decoration-primary decoration-4 underline-offset-8">Frequently Asked Questions</h2>
            
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
        <section className="py-24 text-center">
          <div className="container mx-auto px-4">
             <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6">
               <HelpCircle className="h-8 w-8" />
             </div>
             <h3 className="text-2xl font-bold font-sora mb-4 text-neutral-900">Still have questions?</h3>
             <p className="text-neutral-500 mb-8 max-w-md mx-auto">Our support agents are available via WhatsApp and Email to assist you with any specific issues.</p>
             <div className="flex justify-center gap-4">
                <Button variant="primary" className="rounded-xl px-8 font-bold">Contact Support</Button>
                <Button variant="outline" className="rounded-xl px-8 font-bold">Join Community</Button>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const HelpCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
    <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
      {icon}
    </div>
    <h4 className="font-bold text-neutral-900 mb-2">{title}</h4>
    <p className="text-sm text-neutral-500 leading-relaxed mb-6">{description}</p>
    <div className="flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all">
      Read More <ChevronRight className="h-3 w-3" />
    </div>
  </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-neutral-100 bg-white rounded-2xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-neutral-900 pr-4">{question}</span>
        <ChevronRight className={`h-5 w-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-sm text-neutral-600 animate-in slide-in-from-top-2">
          {answer}
        </div>
      )}
    </div>
  );
};
