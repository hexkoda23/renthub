import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { ShieldCheck, CheckCircle, Camera, UserCheck, ShieldAlert, Zap } from "lucide-react";

export const VerificationInfo = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="py-24 px-4 border-b border-neutral-100">
           <div className="container mx-auto text-center max-w-4xl">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-8">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h1 className="text-4xl font-extrabold font-sora text-neutral-900 mb-6 md:text-6xl">Trust is Our <span className="text-primary italic">#1 Priority</span></h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto">
                In Nigeria's chaotic real estate market, RentHub stands out as the beacon of trust. We go where others won't, verifying listings at the source so you can sleep easy.
              </p>
           </div>
        </section>

        {/* Verification Steps */}
        <section className="py-24 bg-neutral-50/50">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl font-bold font-sora text-neutral-900 mb-16 text-center">Our 4-Step Verification Process</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StepCard 
                  num="01"
                  icon={<UserCheck className="text-primary" />}
                  title="Identity Matching"
                  description="We verify the landlord or agent's government-issued ID and property ownership documents (C of O, Deed)."
                />
                <StepCard 
                  num="02"
                  icon={<Camera className="text-primary" />}
                  title="On-Site Inspection"
                  description="A RentHub representative physically visits the site to ensure the photos on the platform are 100% current."
                />
                <StepCard 
                  num="03"
                  icon={<Zap className="text-primary" />}
                  title="Utility Check"
                  description="We test the water, confirm the NEPA band (A, B, or C), and check the strength of the security setup."
                />
                <StepCard 
                  num="04"
                  icon={<CheckCircle className="text-primary" />}
                  title="Badge Issued"
                  description="Only after passing all checks do we issue the purple 'Verified' badge and listing priority."
                />
             </div>
          </div>
        </section>

        {/* Sync Disclaimer */}
        <section className="py-24 container mx-auto px-4">
           <div className="max-w-5xl mx-auto rounded-3xl bg-amber-50 border border-amber-100 p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="bg-amber-100 p-4 rounded-2xl">
                    <ShieldAlert className="h-8 w-8 text-amber-700" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold font-sora text-neutral-900 mb-4">A Note on External Listings (Jiji.ng)</h3>
                    <p className="text-neutral-700 leading-relaxed mb-6">
                      RentHub automatically syncs thousands of properties from verified external sources like Jiji.ng to ensure you have the widest variety of choices. 
                    </p>
                    <p className="text-neutral-700 leading-relaxed mb-6 font-bold">
                      Important: Listings labeled "via Jiji.ng" have NOT undergone our full 4-step on-site verification unless they ALSO carry the purple RentHub badge.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                          <CheckCircle className="h-4 w-4" /> RentHub Badge = Guaranteed Safe
                       </div>
                       <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                          <ShieldAlert className="h-4 w-4" /> No Badge = Use caution & inspect
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Be Safe Section */}
        <section className="py-24">
           <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="text-3xl font-bold font-sora text-neutral-900 mb-8">Safety Tips for Nigerian Property Seekers</h2>
              <div className="text-left space-y-6">
                 <div className="p-6 border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-colors">
                    <h4 className="font-bold text-neutral-900 mb-2">1. Never pay before inspection</h4>
                    <p className="text-neutral-500 text-sm">Valid landlords will never ask for "commitment fees" or "inspection fees" upfront before showing you the house. Use the Contact form to report anyone who does.</p>
                 </div>
                 <div className="p-6 border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-colors">
                    <h4 className="font-bold text-neutral-900 mb-2">2. Verify the Legal Title</h4>
                    <p className="text-neutral-500 text-sm">For land or house purchases, always request a copy of the C of O (Certificate of Occupancy) or Deed of Assignment and verify it at the state land registry.</p>
                 </div>
                 <div className="p-6 border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-colors">
                    <h4 className="font-bold text-neutral-900 mb-2">3. Chat through RentHub</h4>
                    <p className="text-neutral-500 text-sm">Keep your conversations on the platform or through our verified WhatsApp links so we can assist you if any disputes arise.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const StepCard = ({ num, icon, title, description }: { num: string, icon: any, title: string, description: string }) => (
  <div className="relative p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm transition-all hover:shadow-md">
    <span className="absolute top-4 right-6 text-5xl font-extrabold text-neutral-50 font-sora">{num}</span>
    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 relative z-10">
      {icon}
    </div>
    <h4 className="font-bold text-neutral-900 mb-2 relative z-10">{title}</h4>
    <p className="text-sm text-neutral-500 leading-relaxed relative z-10">{description}</p>
  </div>
);
