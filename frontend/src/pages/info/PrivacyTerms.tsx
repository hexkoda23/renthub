import { useEffect } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Lock, FileText, Scale, Zap } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold font-sora text-neutral-900 mb-4">Privacy & Terms</h1>
            <p className="text-neutral-500">Last updated: April 22, 2026</p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <aside className="md:w-1/4 space-y-4">
               <nav className="sticky top-24">
                 <ul className="space-y-2">
                   <li><a href="#introduction" className="text-sm font-bold text-primary hover:underline">1. Introduction</a></li>
                   <li><a href="#data-collection" className="text-sm font-medium text-neutral-600 hover:text-primary">2. Data Collection</a></li>
                   <li><a href="#property-verification" className="text-sm font-medium text-neutral-600 hover:text-primary">3. Property Verification</a></li>
                   <li><a href="#fees" className="text-sm font-medium text-neutral-600 hover:text-primary">4. Fees & Payments</a></li>
                   <li><a href="#user-conduct" className="text-sm font-medium text-neutral-600 hover:text-primary">5. User Conduct</a></li>
                   <li><a href="#liability" className="text-sm font-medium text-neutral-600 hover:text-primary">6. Limitation of Liability</a></li>
                 </ul>
               </nav>
            </aside>

            {/* Content */}
            <div className="md:w-3/4 space-y-12 text-neutral-700 leading-relaxed">
              <section id="introduction">
                <h2 className="text-2xl font-bold font-sora text-neutral-900 mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" /> 1. Introduction
                </h2>
                <p>
                  Welcome to RentHub Nigeria. By accessing our platform (via website or app), you agree to comply with and be bound by the following terms and conditions. These terms govern our relationship with you in relation to this platform.
                </p>
              </section>

              <section id="data-collection">
                <h2 className="text-2xl font-bold font-sora text-neutral-900 mb-4 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-primary" /> 2. Data Collection
                </h2>
                <p>
                  We collect information necessary to provide our services. This includes:
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>Personal details (Name, Email, Phone Number).</li>
                  <li>Property details for listed homes.</li>
                  <li>Location data for neighbourhood recommendations.</li>
                  <li>Search preferences to improve our AI advisor.</li>
                </ul>
              </section>

              <section id="property-verification">
                <h2 className="text-2xl font-bold font-sora text-neutral-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" /> 3. Property Verification
                </h2>
                <p>
                  While RentHub strives to verify all listings manually, we cannot guarantee 100% accuracy of all details provided by third-party agents or external sources like Jiji.ng. Users are encouraged to perform their own due diligence before making payments.
                </p>
                <p className="mt-4 font-bold text-amber-700 bg-amber-50 p-4 rounded-xl">
                  NEVER pay for a property until you have inspected it physically and verified the legal documents with a qualified professional.
                </p>
              </section>

              <section id="fees">
                <h2 className="text-2xl font-bold font-sora text-neutral-900 mb-4 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" /> 4. Fees & Payments
                </h2>
                <p>
                  RentHub provides a marketplace. Any payments for rent, sales, or commissions are handled directly between the buyer/tenant and the landlord/agent. RentHub does not currently process escrow payments through its primary marketplace.
                </p>
              </section>

              <section id="user-conduct">
                <h2 className="text-2xl font-bold font-sora text-neutral-900 mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" /> 5. User Conduct
                </h2>
                <p>
                  You agree to use this platform only for lawful purposes. You are prohibited from posting fraudulent listings, impersonating property owners, or scraping data from the platform without our express consent.
                </p>
              </section>

              <section id="liability">
                <h2 className="text-2xl font-bold font-sora text-neutral-900 mb-4 flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" /> 6. Limitation of Liability
                </h2>
                <p>
                  RentHub Nigeria, its directors, and employees shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the platform, including any disputes with agents or landlords.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
