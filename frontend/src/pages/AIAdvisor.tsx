import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  Calculator,
  CheckCircle2,
  ChevronLeft,
  Heart,
  Home,
  Map as MapIcon,
  MapPin,
  MessageSquare,
  Mic,
  Moon,
  Navigation,
  Search,
  Shield,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { ChatWindow } from "../components/ai-advisor/ChatWindow";
import { Button } from "../components/ui";
import { cn } from "../utils/cn";

type Neighborhood = {
  id: string;
  name: string;
  city: string;
  state: string;
  summary: string;
  budget: number;
  rentRange: string;
  safety: number;
  vibe: "quiet" | "family" | "social" | "work";
  commute: string;
  amenities: string[];
  highlights: string[];
  x: number;
  y: number;
};

const neighborhoods: Neighborhood[] = [
  {
    id: "yaba",
    name: "Yaba",
    city: "Lagos Mainland",
    state: "Lagos",
    summary: "A practical tech and student hub with strong transit access and plenty of mid-budget rentals.",
    budget: 900000,
    rentRange: "NGN 650k - 1.6m/year",
    safety: 4,
    vibe: "work",
    commute: "Fast access to Unilag, Tejuosho, and the Third Mainland axis.",
    amenities: ["Coworking", "BRT", "Markets", "Schools"],
    highlights: ["Good for remote workers", "Strong public transport", "Active rental market"],
    x: 34,
    y: 42,
  },
  {
    id: "lekki-phase-1",
    name: "Lekki Phase 1",
    city: "Lagos Island",
    state: "Lagos",
    summary: "Premium, social, and highly serviced with restaurants, offices, gyms, and gated streets.",
    budget: 3500000,
    rentRange: "NGN 2.6m - 8m/year",
    safety: 5,
    vibe: "social",
    commute: "Best for Island work routes; mainland commutes can be heavy.",
    amenities: ["Restaurants", "Gyms", "Gated estates", "Nightlife"],
    highlights: ["Premium lifestyle", "High security", "Many serviced options"],
    x: 58,
    y: 62,
  },
  {
    id: "gwarinpa",
    name: "Gwarinpa",
    city: "Abuja",
    state: "FCT",
    summary: "A large, family-friendly district with balanced pricing, schools, shops, and estate living.",
    budget: 1400000,
    rentRange: "NGN 900k - 2.8m/year",
    safety: 4,
    vibe: "family",
    commute: "Reliable routes to Jabi, Wuse, and Central Area.",
    amenities: ["Schools", "Hospitals", "Estates", "Supermarkets"],
    highlights: ["Family friendly", "Good road network", "Balanced cost"],
    x: 70,
    y: 31,
  },
  {
    id: "old-gra",
    name: "Old GRA",
    city: "Port Harcourt",
    state: "Rivers",
    summary: "Quiet, established, and secure with larger homes and strong access to business districts.",
    budget: 1800000,
    rentRange: "NGN 1.2m - 4.5m/year",
    safety: 4,
    vibe: "quiet",
    commute: "Central for Aba Road and government/business corridors.",
    amenities: ["Security", "Hospitals", "Schools", "Low noise"],
    highlights: ["Calm streets", "Established infrastructure", "Good for professionals"],
    x: 47,
    y: 78,
  },
  {
    id: "bodija",
    name: "Bodija",
    city: "Ibadan",
    state: "Oyo",
    summary: "Spacious, calmer, and cost-efficient with market access and mature residential streets.",
    budget: 550000,
    rentRange: "NGN 350k - 1.1m/year",
    safety: 3,
    vibe: "quiet",
    commute: "Easy access to UI, Dugbe, and Ring Road routes.",
    amenities: ["Markets", "Schools", "Low density", "Transit"],
    highlights: ["Affordable space", "Quiet lifestyle", "Good for families"],
    x: 25,
    y: 68,
  },
];

const savedKey = "renthob-ai-saved-neighborhoods";

export const AIAdvisor = () => {
  const [activeView, setActiveView] = useState<"match" | "saved" | "map" | "calculator">("match");
  const [showChat, setShowChat] = useState(false);
  const [budget, setBudget] = useState(1200000);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(neighborhoods[0].id);
  const [rentAmount, setRentAmount] = useState(1000000);
  const [listedBy, setListedBy] = useState<"agent" | "landlord">("agent");
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    try {
      setSavedIds(JSON.parse(localStorage.getItem(savedKey) || "[]"));
    } catch {
      setSavedIds([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(savedKey, JSON.stringify(savedIds));
  }, [savedIds]);

  const rankedNeighborhoods = useMemo(() => {
    return neighborhoods
      .map((neighborhood) => {
        const budgetDelta = Math.abs(neighborhood.budget - budget);
        const budgetScore = Math.max(0, 45 - Math.round((budgetDelta / Math.max(budget, 1)) * 45));
        const score = Math.min(98, budgetScore + 35);
        return { neighborhood, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [budget]);

  const savedNeighborhoods = neighborhoods.filter((neighborhood) => savedIds.includes(neighborhood.id));
  const selectedNeighborhood = neighborhoods.find((neighborhood) => neighborhood.id === selectedId) || neighborhoods[0];
  const commissionRate = listedBy === "agent" ? 0.15 : 0.1;
  const commission = rentAmount * commissionRate;
  const renthobShare = listedBy === "agent" ? rentAmount * 0.05 : rentAmount * 0.1;
  const agentShare = listedBy === "agent" ? rentAmount * 0.1 : 0;
  const totalCost = rentAmount + commission;

  const toggleSaved = (id: string) => {
    setSavedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const budgetRanges = [
    { label: "₦200k – ₦500k", min: 200000, max: 500000 },
    { label: "₦500k – ₦1M", min: 500000, max: 1000000 },
    { label: "₦1M – ₦3M", min: 1000000, max: 3000000 },
    { label: "₦3M+", min: 3000000, max: 10000000 },
  ];

  const locations = ["Yaba", "Lekki", "Surulere", "Ikeja", "Abuja", "Gbagada", "Port Harcourt", "Ibadan", "Enugu", "Onitsha"];

  const lifestyles = [
    { label: "Quiet", emoji: "🤫" },
    { label: "Social", emoji: "🎉" },
    { label: "Work proximity", emoji: "💼" },
    { label: "Affordable", emoji: "💰" },
    { label: "Family-friendly", emoji: "👨‍👩‍👧‍👦" },
    { label: "Safe & Secure", emoji: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <Navbar />

      <main className="pt-4 md:pt-6">
        <header className="container mb-4 md:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              {activeView !== "match" && (
                <button
                  onClick={() => setActiveView("match")}
                  className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-50"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              )}
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-blue-500 text-white shadow-md">
                  <MapPin className="h-5 w-5 md:h-7 md:w-7" />
                </div>
                <div>
                  <h1 className="font-display text-xl md:text-2xl font-bold">Renthob AI</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setActiveView("saved")}
                className={cn(
                  "flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm transition-colors",
                  activeView === "saved" ? "bg-blue-500 text-white" : "text-slate-600 hover:bg-white hover:text-slate-900"
                )}
              >
                <Heart className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Saved</span>
              </button>
              <button
                onClick={() => setActiveView("map")}
                className={cn(
                  "flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm transition-colors",
                  activeView === "map" ? "bg-blue-500 text-white" : "text-slate-600 hover:bg-white hover:text-slate-900"
                )}
              >
                <MapIcon className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Map</span>
              </button>
              <button
                onClick={() => setActiveView("calculator")}
                className={cn(
                  "flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm transition-colors",
                  activeView === "calculator" ? "bg-blue-500 text-white" : "text-slate-600 hover:bg-white hover:text-slate-900"
                )}
              >
                <Calculator className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Calculator</span>
              </button>
            </div>
          </div>
        </header>

        {activeView === "match" && (
          <section className="container">
            <div className="mx-auto max-w-4xl text-center mb-6 md:mb-10">
              <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                Find the right home for your <span className="text-blue-500">life</span> and income.
              </h2>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto px-2">
                Describe what you need or use the quick filters below. Our AI will find the best neighborhoods and available listings for you.
              </p>
            </div>

            <div className="mx-auto max-w-4xl mb-6 md:mb-8">
              <div className="relative bg-white rounded-xl md:rounded-2xl border border-slate-200 p-3 md:p-4 shadow-sm">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe what you need... e.g., 'I need a quiet 2-bedroom apartment in Lagos with good schools nearby, budget ₦1.5M per year'"
                  className="w-full min-h-[80px] md:min-h-[100px] resize-none border-none outline-none text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                />
                <div className="flex items-center justify-end gap-2 md:gap-3">
                  <button className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
                    <Mic className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 h-10 md:h-12 text-sm md:text-lg rounded-xl md:rounded-2xl">
                    <Search className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">Find Homes</span>
                    <span className="sm:hidden">Find</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2 md:mb-3 uppercase tracking-wide">
                  Budget (Yearly)
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setBudget((range.min + range.max) / 2)}
                      className={cn(
                        "px-3 md:px-4 py-1.5 md:py-2 rounded-full border transition-all font-semibold text-sm md:text-base",
                        budget >= range.min && budget <= range.max
                          ? "border-blue-500 bg-blue-500 text-white"
                          : "border-slate-300 bg-white text-slate-900 hover:border-blue-400"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2 md:mb-3 uppercase tracking-wide">
                  Location
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-slate-300 bg-white text-slate-900 hover:border-blue-400 font-semibold transition-all text-sm md:text-base"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-500 mb-2 md:mb-3 uppercase tracking-wide">
                  Lifestyle
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {lifestyles.map((style) => (
                    <button
                      key={style.label}
                      className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-slate-300 bg-white text-slate-900 hover:border-blue-400 font-semibold transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base"
                    >
                      <span>{style.emoji}</span>
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 pt-3 md:pt-4">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-10 h-12 md:h-14 text-base md:text-lg rounded-xl md:rounded-2xl shadow-lg w-full sm:w-auto">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                  Get AI Recommendations
                </Button>
                <button className="text-slate-500 hover:text-slate-700 font-medium flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 md:h-5 md:w-5" />
                  Take the Quiz Instead
                </button>
              </div>
            </div>

            {rankedNeighborhoods.length > 0 && (
              <div className="mt-8 md:mt-12">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6">AI Recommended Neighborhoods</h3>
                <div className="grid gap-4 md:gap-5 md:grid-cols-2">
                  {rankedNeighborhoods.map(({ neighborhood, score }) => (
                    <NeighborhoodCard
                      key={neighborhood.id}
                      neighborhood={neighborhood}
                      score={score}
                      isSaved={savedIds.includes(neighborhood.id)}
                      onSave={() => toggleSaved(neighborhood.id)}
                      onMap={() => {
                        setSelectedId(neighborhood.id);
                        setActiveView("map");
                      }}
                      onCalculator={() => {
                        setRentAmount(neighborhood.budget);
                        setActiveView("calculator");
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {activeView === "saved" && (
          <section className="container">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold">Saved Neighborhoods</h2>
                <p className="text-slate-500 mt-1 text-sm md:text-base">{savedNeighborhoods.length} neighborhoods saved</p>
              </div>
              <button className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm hover:bg-slate-50">
                <Moon className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>

            <div className="bg-white rounded-xl md:rounded-2xl border border-dashed border-slate-300 p-6 md:p-12 text-center">
              {savedNeighborhoods.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {savedNeighborhoods.map((neighborhood) => (
                    <NeighborhoodCard
                      key={neighborhood.id}
                      neighborhood={neighborhood}
                      score={95}
                      isSaved={true}
                      onSave={() => toggleSaved(neighborhood.id)}
                      onMap={() => {
                        setSelectedId(neighborhood.id);
                        setActiveView("map");
                      }}
                      onCalculator={() => {
                        setRentAmount(neighborhood.budget);
                        setActiveView("calculator");
                      }}
                    />
                  ))}
                </div>
              ) : (
                <>
                  <Heart className="mx-auto mb-4 md:mb-6 h-12 w-12 md:h-20 md:w-20 text-slate-300" />
                  <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">No saved neighborhoods yet</h3>
                  <p className="text-slate-500 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
                    Tap the heart icon on any neighborhood to save it here for quick access and comparison.
                  </p>
                  <Button onClick={() => setActiveView("match")} className="bg-slate-900 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl text-base md:text-lg">
                    Browse Neighborhoods
                  </Button>
                </>
              )}
            </div>
          </section>
        )}

        {activeView === "map" && (
          <section className="container">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display text-xl md:text-2xl font-bold">Neighborhood Map</h2>
                <p className="text-slate-500 text-xs md:text-sm">279 neighborhoods across Nigeria</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 md:h-4 md:w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    placeholder="Search..."
                    className="h-9 md:h-10 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-xs md:text-sm outline-none focus:border-blue-400 w-full"
                  />
                </div>
                <select className="h-9 md:h-10 rounded-xl border border-slate-200 bg-white px-3 md:px-4 text-xs md:text-sm outline-none focus:border-blue-400">
                  <option>All States</option>
                  <option>Lagos</option>
                  <option>FCT</option>
                </select>
                <button className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex-shrink-0">
                  <RefreshCw className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:gap-5 lg:grid-cols-[1fr_320px]">
              <div className="relative min-h-[350px] md:min-h-[520px] overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50 shadow-sm">
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:44px_44px]" />
                {neighborhoods.map((neighborhood) => (
                  <button
                    key={neighborhood.id}
                    type="button"
                    onClick={() => setSelectedId(neighborhood.id)}
                    className={cn(
                      "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-bold shadow-md transition-all",
                      selectedNeighborhood.id === neighborhood.id
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-white bg-white text-slate-700 hover:border-blue-400"
                    )}
                    style={{ left: `${neighborhood.x}%`, top: `${neighborhood.y}%` }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{neighborhood.name}</span>
                  </button>
                ))}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="text-[10px] md:text-xs text-white font-semibold mb-1.5">Cost:</div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-white">
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                      Affordable
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                      Moderate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                      Expensive
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      Premium
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl md:rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                <p className="mb-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-500">Map selection</p>
                <h2 className="font-display text-xl md:text-2xl font-bold">{selectedNeighborhood.name}</h2>
                <p className="mt-1 text-xs md:text-sm text-slate-500">
                  {selectedNeighborhood.city}, {selectedNeighborhood.state}
                </p>
                <p className="mt-3 md:mt-4 text-xs md:text-sm leading-6 text-slate-600">{selectedNeighborhood.summary}</p>
                <div className="mt-3 md:mt-4 space-y-2.5 md:space-y-3 text-xs md:text-sm">
                  <InfoRow icon={Shield} label="Safety" value={`${selectedNeighborhood.safety}/5`} />
                  <InfoRow icon={Wallet} label="Rent" value={selectedNeighborhood.rentRange} />
                  <InfoRow icon={Navigation} label="Commute" value={selectedNeighborhood.commute} />
                </div>
                <div className="mt-4 md:mt-5 flex gap-2">
                  <Button className="flex-1 gap-1.5 md:gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm h-9 md:h-10" onClick={() => toggleSaved(selectedNeighborhood.id)}>
                    <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    {savedIds.includes(selectedNeighborhood.id) ? "Saved" : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-xs md:text-sm h-9 md:h-10"
                    onClick={() => {
                      setRentAmount(selectedNeighborhood.budget);
                      setActiveView("calculator");
                    }}
                  >
                    Cost
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeView === "calculator" && (
          <section className="container">
            <div className="space-y-5 md:space-y-6 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-5 md:p-6 lg:p-8 shadow-sm">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-6 md:mb-8">Who listed the property?</h3>
                <div className="grid gap-3 md:gap-4 md:grid-cols-2">
                  <button
                    onClick={() => setListedBy("agent")}
                    className={cn(
                      "rounded-xl md:rounded-2xl p-4 md:p-6 border-2 transition-all text-center",
                      listedBy === "agent" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-200 bg-slate-900 text-white hover:border-slate-400"
                    )}
                  >
                    <Users className="h-6 w-6 md:h-7 md:w-7 mx-auto mb-2 md:mb-3" />
                    <h4 className="font-display text-lg md:text-xl font-bold mb-1.5 md:mb-2">Agent Listed</h4>
                    <p className="text-xs md:text-sm opacity-90">15% commission</p>
                  </button>
                  <button
                    onClick={() => setListedBy("landlord")}
                    className={cn(
                      "rounded-xl md:rounded-2xl p-4 md:p-6 border-2 transition-all text-center",
                      listedBy === "landlord" ? "border-blue-500 bg-blue-500 text-white" : "border-slate-200 bg-slate-900 text-white hover:border-slate-400"
                    )}
                  >
                    <Home className="h-6 w-6 md:h-7 md:w-7 mx-auto mb-2 md:mb-3" />
                    <h4 className="font-display text-lg md:text-xl font-bold mb-1.5 md:mb-2">Landlord Listed</h4>
                    <p className="text-xs md:text-sm opacity-90">10% commission</p>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-5 md:p-6 lg:p-8 shadow-sm">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-6 md:mb-8">Annual Rent Amount</h3>
                <div className="text-center mb-4 md:mb-6">
                  <div className="text-3xl md:text-5xl font-bold text-blue-500">
                    ₦{rentAmount.toLocaleString()}
                    <span className="text-lg md:text-2xl text-slate-400 font-normal">/year</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={10000000}
                  step={50000}
                  value={rentAmount}
                  onChange={(event) => setRentAmount(Number(event.target.value))}
                  className="w-full h-2.5 md:h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8">
                  {[500000, 1000000, 2000000, 3000000, 5000000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setRentAmount(amount)}
                      className={cn(
                        "px-3 md:px-4 py-2 md:py-3 rounded-xl font-bold text-sm md:text-lg transition-all",
                        rentAmount === amount
                          ? "bg-blue-500 text-white"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      )}
                    >
                      ₦{(amount / 1000000).toFixed(amount >= 1000000 ? 0 : 1)}M
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl md:rounded-2xl border border-blue-200 bg-blue-50/50 p-5 md:p-6 lg:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-blue-600">Your Cost Breakdown</h3>
                  <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
                </div>
                <div className="space-y-3 md:space-y-4 text-sm md:text-lg">
                  <CostRow label="Annual Rent" value={`₦${rentAmount.toLocaleString()}`} />
                  <CostRow label={`Commission (${commissionRate * 100}%)`} value={`₦${Math.round(commission).toLocaleString()}`} />
                  {listedBy === "agent" && (
                    <>
                      <div className="pl-4 md:pl-6 border-l-2 border-blue-200 ml-1 md:ml-2 space-y-3 md:space-y-4 text-sm md:text-lg text-slate-600">
                        <CostRow label="→ Agent (10%)" value={`₦${Math.round(agentShare).toLocaleString()}`} />
                        <CostRow label="→ Renthob (5%)" value={`₦${Math.round(renthobShare).toLocaleString()}`} />
                      </div>
                    </>
                  )}
                  <div className="border-t border-blue-200 pt-3 md:pt-4 mt-3 md:mt-4">
                    <CostRow label="Total You Pay" value={`₦${Math.round(totalCost).toLocaleString()}`} strong blue />
                  </div>
                </div>
                <div className="mt-6 md:mt-8 bg-blue-100/50 rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                  <p className="font-display text-lg md:text-xl font-bold text-blue-600 mb-1.5 md:mb-2 flex items-center justify-center gap-1.5 md:gap-2">
                    <CheckSquare className="h-5 w-5 md:h-6 md:w-6" />
                    No hidden fees
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm">No inspection fee • No legal fee • No caution deposit • No total package</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-10 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/20">
                      <TrendingDown className="h-7 w-7 md:h-10 md:w-10" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm md:text-lg">Renthob Promise</p>
                      <h3 className="font-display text-xl md:text-3xl font-bold">Transparent Pricing</h3>
                      <p className="text-blue-100 text-sm md:text-lg mt-1 max-w-md">
                        Only 15% commission — split between agent (10%) and Renthob (5%)
                      </p>
                    </div>
                  </div>
                  <div className="text-center md:text-right w-full md:w-auto">
                    <p className="text-blue-100 text-sm md:text-lg mb-2 md:mb-3">What you'll never pay:</p>
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-end">
                      <span className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-lg">
                        <Ban className="h-4 w-4 md:h-5 md:w-5" />
                        Inspection fee
                      </span>
                      <span className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-lg">
                        <Ban className="h-4 w-4 md:h-5 md:w-5" />
                        Hidden charges
                      </span>
                      <span className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-lg">
                        <Ban className="h-4 w-4 md:h-5 md:w-5" />
                        Total package
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg z-50 transition-all text-sm md:text-base"
      >
        <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
        Ask AI
      </button>

      {showChat && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[90vw] md:w-96 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-blue-500 p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <Bot className="h-5 w-5 md:h-6 md:w-6 text-white" />
                <h3 className="font-bold text-white text-sm md:text-base">Ask Renthob AI</h3>
              </div>
              <button onClick={() => setShowChat(false)} className="text-white hover:bg-white/20 rounded-full p-1">
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
            <div className="h-[60vh] md:h-96">
              <ChatWindow />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NeighborhoodCard = ({
  neighborhood,
  score,
  isSaved,
  onSave,
  onMap,
  onCalculator,
}: {
  neighborhood: Neighborhood;
  score: number;
  isSaved: boolean;
  onSave: () => void;
  onMap: () => void;
  onCalculator: () => void;
}) => (
  <article className="rounded-xl md:rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm transition-all hover:shadow-md">
    <div className="mb-2.5 md:mb-3 flex items-start justify-between gap-2 md:gap-3">
      <div>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-blue-500">{score}% match</p>
        <h3 className="font-display text-lg md:text-xl font-bold">{neighborhood.name}</h3>
        <p className="flex items-center gap-1 text-xs md:text-sm text-slate-500">
          <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
          {neighborhood.city}, {neighborhood.state}
        </p>
      </div>
      <button
        type="button"
        onClick={onSave}
        className={cn(
          "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full border transition-colors flex-shrink-0",
          isSaved ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300 text-slate-500 hover:text-blue-500"
        )}
        aria-label={isSaved ? "Remove saved neighborhood" : "Save neighborhood"}
      >
        <Heart className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
    <p className="mb-3 md:mb-4 text-xs md:text-sm leading-6 text-slate-600">{neighborhood.summary}</p>
    <div className="mb-3 md:mb-4 grid grid-cols-3 gap-1.5 md:gap-2 text-[10px] md:text-xs">
      <Metric icon={Wallet} label="Rent" value={neighborhood.rentRange} />
      <Metric icon={Shield} label="Safety" value={`${neighborhood.safety}/5`} />
      <Metric icon={Home} label="Vibe" value={neighborhood.vibe} />
    </div>
    <div className="mb-3 md:mb-4 flex flex-wrap gap-1.5 md:gap-2">
      {neighborhood.amenities.map((amenity) => (
        <span key={amenity} className="rounded-full bg-slate-100 px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs text-slate-700">
          {amenity}
        </span>
      ))}
    </div>
    <div className="flex gap-1.5 md:gap-2">
      <Button size="sm" className="flex-1 gap-1.5 md:gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm h-8 md:h-9" onClick={onMap}>
        <MapIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        Map
      </Button>
      <Button size="sm" variant="outline" className="flex-1 gap-1.5 md:gap-2 text-xs md:text-sm h-8 md:h-9" onClick={onCalculator}>
        <Calculator className="h-3.5 w-3.5 md:h-4 md:w-4" />
        Cost
      </Button>
    </div>
  </article>
);

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="rounded-lg md:rounded-xl bg-slate-50 p-2 md:p-3">
    <Icon className="mb-1.5 md:mb-2 h-3.5 w-3.5 md:h-4 md:w-4 text-blue-500" />
    <p className="font-semibold text-slate-900 text-[10px] md:text-xs">{label}</p>
    <p className="mt-0.5 line-clamp-2 text-slate-500 text-[10px] md:text-xs">{value}</p>
  </div>
);

const InfoRow = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex gap-2.5 md:gap-3 rounded-lg md:rounded-xl bg-slate-50 p-2.5 md:p-3">
    <Icon className="mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 text-blue-500" />
    <div>
      <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-xs md:text-sm font-semibold text-slate-900">{value}</p>
    </div>
  </div>
);

const CostRow = ({ label, value, strong, blue }: { label: string; value: string; strong?: boolean; blue?: boolean }) => (
  <div className="flex items-center justify-between gap-3 md:gap-4 py-1.5 md:py-2">
    <span className={cn("text-slate-600 text-sm md:text-base", strong && "text-xl md:text-2xl font-bold text-slate-900")}>{label}</span>
    <span className={cn("font-semibold text-sm md:text-xl", strong && "text-2xl md:text-3xl", blue && "text-blue-500")}>{value}</span>
  </div>
);

function ClipboardList(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function CheckSquare(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function TrendingDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  );
}

function Ban(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m4.9 4.9 14.2 14.2" />
    </svg>
  );
}
