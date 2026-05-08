import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  Calculator,
  CheckCircle2,
  Heart,
  Home,
  Map as MapIcon,
  MapPin,
  MessageSquare,
  Navigation,
  Shield,
  Sparkles,
  Wallet,
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

const formatNaira = (value: number) => `NGN ${Math.round(value).toLocaleString()}`;

export const AIAdvisor = () => {
  const [activeView, setActiveView] = useState<"match" | "saved" | "map" | "calculator" | "chat">("match");
  const [budget, setBudget] = useState(1200000);
  const [state, setState] = useState("Any");
  const [vibe, setVibe] = useState<Neighborhood["vibe"] | "any">("any");
  const [safetyPriority, setSafetyPriority] = useState(4);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState(neighborhoods[0].id);
  const [rentAmount, setRentAmount] = useState(1000000);
  const [listedBy, setListedBy] = useState<"agent" | "landlord">("agent");

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
      .filter((neighborhood) => state === "Any" || neighborhood.state === state)
      .map((neighborhood) => {
        const budgetDelta = Math.abs(neighborhood.budget - budget);
        const budgetScore = Math.max(0, 45 - Math.round((budgetDelta / Math.max(budget, 1)) * 45));
        const vibeScore = vibe === "any" || neighborhood.vibe === vibe ? 25 : 8;
        const safetyScore = neighborhood.safety >= safetyPriority ? 20 : neighborhood.safety * 3;
        const score = Math.min(98, budgetScore + vibeScore + safetyScore + 10);

        return { neighborhood, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [budget, safetyPriority, state, vibe]);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container py-6 md:py-8">
        <section className="mb-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card md:p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Renthob AI
            </div>
            <h1 className="font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Find the Nigerian neighborhood that fits your budget, lifestyle, and commute.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              Match by rent range, safety priority, lifestyle vibe, and work access. Save neighborhoods, compare them on
              the map, then calculate exactly what you pay with Renthob's transparent pricing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                ["match", "AI Match", Sparkles],
                ["saved", "Saved", Heart],
                ["map", "Map", MapIcon],
                ["calculator", "Calculator", Calculator],
                ["chat", "Ask AI", Bot],
              ].map(([key, label, Icon]) => (
                <Button
                  key={key as string}
                  type="button"
                  variant={activeView === key ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setActiveView(key as typeof activeView)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {label as string}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["45+", "Neighborhoods", MapPin],
              ["0", "Hidden fees", CheckCircle2],
              ["AI", "Local guidance", MessageSquare],
            ].map(([value, label, Icon]) => (
              <div key={label as string} className="rounded-2xl border border-border/60 bg-card p-4 shadow-card">
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <p className="text-2xl font-bold text-foreground">{value as string}</p>
                <p className="text-xs text-muted-foreground">{label as string}</p>
              </div>
            ))}
          </div>
        </section>

        {activeView === "match" ? (
          <section className="grid gap-5 lg:grid-cols-[340px_1fr]">
            <aside className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <h2 className="mb-4 font-display text-xl font-bold">Your preferences</h2>
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Annual rent budget</span>
                  <input
                    type="range"
                    min={200000}
                    max={6000000}
                    step={50000}
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                  <span className="text-sm font-bold text-primary">{formatNaira(budget)}</span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Preferred state</span>
                  <select
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-background px-3 text-sm"
                  >
                    {["Any", "Lagos", "FCT", "Rivers", "Oyo"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Lifestyle vibe</span>
                  <select
                    value={vibe}
                    onChange={(event) => setVibe(event.target.value as Neighborhood["vibe"] | "any")}
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-background px-3 text-sm"
                  >
                    <option value="any">Any lifestyle</option>
                    <option value="quiet">Quiet</option>
                    <option value="family">Family</option>
                    <option value="social">Social</option>
                    <option value="work">Work access</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Safety priority</span>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={safetyPriority}
                    onChange={(event) => setSafetyPriority(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                  <span className="text-sm font-bold text-primary">{safetyPriority}/5 minimum</span>
                </label>
              </div>
            </aside>

            <div className="grid gap-4 md:grid-cols-2">
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
          </section>
        ) : null}

        {activeView === "saved" ? (
          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold">Saved neighborhoods</h2>
                <p className="text-sm text-muted-foreground">Keep your shortlist ready for comparison and map review.</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveView("match")}>
                Browse
              </Button>
            </div>
            {savedNeighborhoods.length ? (
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
              <div className="rounded-xl border border-dashed border-border p-10 text-center">
                <Heart className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-semibold">No saved neighborhoods yet</p>
                <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any AI match to save it here.</p>
              </div>
            )}
          </section>
        ) : null}

        {activeView === "map" ? (
          <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 shadow-card">
              <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
              {neighborhoods.map((neighborhood) => (
                <button
                  key={neighborhood.id}
                  type="button"
                  onClick={() => setSelectedId(neighborhood.id)}
                  className={cn(
                    "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold shadow-lg transition-all",
                    selectedNeighborhood.id === neighborhood.id
                      ? "border-primary bg-primary text-white"
                      : "border-white/80 bg-white text-foreground hover:border-primary"
                  )}
                  style={{ left: `${neighborhood.x}%`, top: `${neighborhood.y}%` }}
                >
                  <MapPin className="h-4 w-4" />
                  {neighborhood.name}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Map selection</p>
              <h2 className="font-display text-2xl font-bold">{selectedNeighborhood.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedNeighborhood.city}, {selectedNeighborhood.state}
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{selectedNeighborhood.summary}</p>
              <div className="mt-4 space-y-3 text-sm">
                <InfoRow icon={Shield} label="Safety" value={`${selectedNeighborhood.safety}/5`} />
                <InfoRow icon={Wallet} label="Rent" value={selectedNeighborhood.rentRange} />
                <InfoRow icon={Navigation} label="Commute" value={selectedNeighborhood.commute} />
              </div>
              <div className="mt-5 flex gap-2">
                <Button className="flex-1 gap-2" onClick={() => toggleSaved(selectedNeighborhood.id)}>
                  <Heart className="h-4 w-4" />
                  {savedIds.includes(selectedNeighborhood.id) ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setRentAmount(selectedNeighborhood.budget);
                    setActiveView("calculator");
                  }}
                >
                  Cost
                </Button>
              </div>
            </div>
          </section>
        ) : null}

        {activeView === "calculator" ? (
          <section className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card p-5 shadow-card md:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Rental Cost Calculator</h2>
                <p className="text-sm text-muted-foreground">Transparent pricing with no inspection fee, legal fee, caution deposit, or total package.</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-semibold">Who listed the property?</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant={listedBy === "agent" ? "primary" : "outline"} onClick={() => setListedBy("agent")}>
                      Agent Listed
                    </Button>
                    <Button
                      variant={listedBy === "landlord" ? "primary" : "outline"}
                      onClick={() => setListedBy("landlord")}
                    >
                      Landlord Listed
                    </Button>
                  </div>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Annual rent amount</span>
                  <input
                    type="range"
                    min={200000}
                    max={10000000}
                    step={50000}
                    value={rentAmount}
                    onChange={(event) => setRentAmount(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                  <span className="text-3xl font-bold text-primary">{formatNaira(rentAmount)}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[500000, 1000000, 2000000, 3000000, 5000000].map((amount) => (
                    <Button key={amount} variant="outline" size="sm" onClick={() => setRentAmount(amount)}>
                      {formatNaira(amount)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="mb-4 font-display text-xl font-bold text-primary">Your cost breakdown</h3>
                <CostRow label="Annual rent" value={formatNaira(rentAmount)} />
                <CostRow label={`Commission (${commissionRate * 100}%)`} value={formatNaira(commission)} />
                {listedBy === "agent" ? <CostRow label="Agent share (10%)" value={formatNaira(agentShare)} muted /> : null}
                <CostRow label={`Renthob share (${listedBy === "agent" ? 5 : 10}%)`} value={formatNaira(renthobShare)} muted />
                <div className="my-4 border-t border-primary/20" />
                <CostRow label="Total you pay" value={formatNaira(totalCost)} strong />
                <div className="mt-5 rounded-xl bg-white p-4 text-center text-sm text-muted-foreground">
                  <p className="font-bold text-primary">No hidden fees</p>
                  <p>No inspection fee. No legal fee. No total package.</p>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {activeView === "chat" ? (
          <section className="grid gap-5 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <h2 className="font-display text-2xl font-bold">Ask Renthob AI</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Ask about safety, rent expectations, lifestyle tradeoffs, commute routes, or which saved neighborhood is
                best for your situation.
              </p>
              <div className="mt-5 space-y-3">
                {["Compare Yaba and Gwarinpa", "Best quiet areas under NGN 1m", "What will I pay on a NGN 2m rent?"].map(
                  (prompt) => (
                    <div key={prompt} className="rounded-xl border border-border bg-background p-3 text-sm text-muted-foreground">
                      {prompt}
                    </div>
                  )
                )}
              </div>
            </aside>
            <ChatWindow />
          </section>
        ) : null}
      </main>
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
  <article className="rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all hover:shadow-soft">
    <div className="mb-3 flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{score}% match</p>
        <h3 className="font-display text-xl font-bold">{neighborhood.name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {neighborhood.city}, {neighborhood.state}
        </p>
      </div>
      <button
        type="button"
        onClick={onSave}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          isSaved ? "border-primary bg-primary text-white" : "border-border text-muted-foreground hover:text-primary"
        )}
        aria-label={isSaved ? "Remove saved neighborhood" : "Save neighborhood"}
      >
        <Heart className="h-5 w-5" />
      </button>
    </div>
    <p className="mb-4 text-sm leading-6 text-muted-foreground">{neighborhood.summary}</p>
    <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
      <Metric icon={Wallet} label="Rent" value={neighborhood.rentRange} />
      <Metric icon={Shield} label="Safety" value={`${neighborhood.safety}/5`} />
      <Metric icon={Home} label="Vibe" value={neighborhood.vibe} />
    </div>
    <div className="mb-4 flex flex-wrap gap-2">
      {neighborhood.amenities.map((amenity) => (
        <span key={amenity} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
          {amenity}
        </span>
      ))}
    </div>
    <div className="flex gap-2">
      <Button size="sm" className="flex-1 gap-2" onClick={onMap}>
        <MapIcon className="h-4 w-4" />
        Map
      </Button>
      <Button size="sm" variant="outline" className="flex-1 gap-2" onClick={onCalculator}>
        <Calculator className="h-4 w-4" />
        Cost
      </Button>
    </div>
  </article>
);

const Metric = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="rounded-xl bg-background p-3">
    <Icon className="mb-2 h-4 w-4 text-primary" />
    <p className="font-semibold text-foreground">{label}</p>
    <p className="mt-1 line-clamp-2 text-muted-foreground">{value}</p>
  </div>
);

const InfoRow = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="flex gap-3 rounded-xl bg-background p-3">
    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);

const CostRow = ({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) => (
  <div className={cn("flex items-center justify-between gap-4 py-2 text-sm", muted && "pl-4 text-muted-foreground", strong && "text-lg font-bold")}>
    <span>{label}</span>
    <span className={cn("font-semibold", strong && "text-primary")}>{value}</span>
  </div>
);
