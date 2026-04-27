import { Navbar } from "../components/layout/Navbar";
import { ChatWindow } from "../components/ai-advisor/ChatWindow";
import { Map as MapIcon, Shield, Coffee } from "lucide-react";

export const AIAdvisor = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1 flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold font-sora text-neutral-900 mb-2">Neighbourhood Advisor</h1>
            <p className="text-neutral-500 text-sm">Powered by Groq's Llama 3.3 and RentHub's verified area database.</p>
          </div>

          <div className="space-y-4">
            <InfoCard 
              icon={<Shield className="h-5 w-5 text-green-600" />}
              title="Safety Focus"
              description="We analyze crime rates and security presence to give each area a safety score."
            />
            <InfoCard 
              icon={<MapIcon className="h-5 w-5 text-blue-600" />}
              title="Commute Efficiency"
              description="Tell us where you work, and we'll find areas with the best traffic patterns for your route."
            />
            <InfoCard 
              icon={<Coffee className="h-5 w-5 text-orange-600" />}
              title="Lifestyle Matching"
              description="From quiet family suburbs to vibrant nightlife districts, find what suits you."
            />
          </div>

          <div className="rounded-rent bg-primary px-6 py-8 text-white">
            <h4 className="font-bold font-sora text-lg mb-4 text-center">Try asking:</h4>
            <ul className="space-y-3">
              {SUGGESTIONS.map((s, i) => (
                <li key={i} className="text-xs bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
                  "{s}"
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="flex-1">
          <ChatWindow />
        </section>
      </main>
    </div>
  );
};

const InfoCard = ({ icon, title, description }: any) => (
  <div className="flex gap-4 p-4 rounded-rent bg-white border border-neutral-200 shadow-sm">
    <div className="h-10 w-10 flex items-center justify-center shrink-0 rounded-lg bg-neutral-50 border border-neutral-100">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-neutral-900 mb-1">{title}</h4>
      <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

const SUGGESTIONS = [
  "Safe areas in Lagos under 150k/month",
  "Best hoods for young families in Abuja",
  "Areas in Port Harcourt with 24/7 power",
  "Quiet places to work remotely in Ibadan"
];
