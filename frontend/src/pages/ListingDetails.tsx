import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listingsService } from "../services/listings.service";
import { aiService } from "../services/ai.service";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button, Badge } from "../components/ui";
import { ELECTRICITY_BANDS, WATER_OPTIONS, PARKING_OPTIONS, LAND_TITLES } from "@renthob/shared";
import { 
  BedDouble, Bath, MapPin, CheckCircle, Share2, Heart, ChevronLeft,
  Calendar, ShieldCheck, Zap, Droplets, Car, FileText, 
  Clock, AlertTriangle, Info, Copy, Check, Bot, Sparkles, ChevronDown, ChevronUp
} from "lucide-react";
import { PropertyGallery } from "../components/listings/PropertyGallery";
import { ContactCard } from "../components/listings/ContactCard";
import { DEMO_LISTINGS } from "../components/listings/ListingGrid";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const formatNGN = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatCompact = (price: number) => {
  if (price >= 1000000) return `₦${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `₦${(price / 1000).toFixed(0)}K`;
  return formatNGN(price);
};

// AI Neighbourhood Insight Widget
const NeighbourhoodInsightWidget = ({ city, state, address }: { city: string; state: string; address: string }) => {
  const [insight, setInsight] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchInsight = async () => {
    if (hasLoaded) {
      setIsExpanded(!isExpanded);
      return;
    }
    setIsLoading(true);
    setIsExpanded(true);
    try {
      const prompt = `Give me a brief neighbourhood insight (3-4 sentences max) about ${address}, ${city}, ${state}, Nigeria. Cover: safety level, typical resident profile, key amenities nearby, and traffic situation. Be concise and practical for someone considering renting there.`;
      const response = await aiService.sendMessage(prompt, undefined);
      setInsight(response.data.data.content);
      setHasLoaded(true);
    } catch {
      setInsight("Unable to load neighbourhood insights right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      <button
        onClick={fetchInsight}
        className="w-full flex items-center justify-between p-5 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary-light flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-sm text-neutral-900">AI Neighbourhood Insight</p>
            <p className="text-xs text-neutral-400">About {city}, {state}</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-neutral-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-neutral-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-5">
          {isLoading ? (
            <div className="flex items-center gap-3 py-3">
              <Bot className="h-5 w-5 text-primary animate-pulse" />
              <div className="flex gap-1">
                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
              <p className="text-xs text-neutral-400">Analysing neighbourhood...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-neutral-600 leading-relaxed">{insight}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-primary/10">
                <Bot className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-neutral-400">Powered by RentHob AI · </span>
                <Link to="/ai-advisor" className="text-xs text-primary font-semibold hover:underline">
                  Ask more questions →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isCopied, setIsCopied] = useState(false);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => listingsService.getListing(id!),
    enabled: !!id && !id.startsWith("demo-")
  });

  const demoListing = id?.startsWith("demo-") ? DEMO_LISTINGS.find(l => l.id === id) : null;
  const listing = demoListing || data?.data?.data;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading && !demoListing) return <LoadingSkeleton />;
  if ((error || !listing) && !demoListing) return <ErrorState />;

  const elecInfo = ELECTRICITY_BANDS.find((b: any) => b.value === listing.electricityBand);
  const waterInfo = WATER_OPTIONS.find((w: any) => w.value === listing.waterSituation);
  const parkingInfo = PARKING_OPTIONS.find((p: any) => p.value === listing.parkingSituation);
  const titleInfo = LAND_TITLES.find((t: any) => t.value === listing.landTitle);

  return (
    <div className="min-h-screen bg-sand/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Navigation & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <Link to="/listings" className="group flex items-center text-sm font-bold text-ink/60 hover:text-clay transition-all">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm group-hover:bg-clay group-hover:text-white transition-all">
              <ChevronLeft className="h-4 w-4" />
            </div>
            Back to listings
          </Link>
          <div className="flex gap-3">
            {!listing.source || listing.source === "renthob" || listing.source === "handover" ? (
              <>
                <Button variant="outline" size="sm" className="gap-2 rounded-full border-clay/10 bg-white hover:bg-clay hover:text-white transition-all">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-full border-clay/10 bg-white hover:bg-clay hover:text-white transition-all">
                  <Heart className="h-4 w-4" /> Save
                </Button>
              </>
            ) : null}
          </div>
        </motion.div>

        {listing.source === "jiji" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 flex flex-col md:flex-row items-center gap-6 rounded-[2rem] border border-clay/10 bg-white p-8 shadow-xl"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-white font-display font-bold text-2xl">
              J
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xl font-display font-bold text-ink">External Listing Sourced from Jiji.ng</p>
              <p className="text-ink/50 font-medium">This property is managed by an external vendor. View details on Jiji.</p>
            </div>
            <a href={listing.externalUrl} target="_blank" rel="noreferrer">
              <Button className="h-14 px-8 rounded-2xl bg-ink hover:bg-ink/90 text-white gap-3 font-bold">
                View on Jiji <Share2 className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        )}

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PropertyGallery images={listing.images} />
        </motion.div>

        {/* Content Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <section>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant="neutral" className="bg-clay/10 text-clay border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{listing.type}</Badge>
                  {listing.verified && (
                    <Badge className="bg-palm/10 text-palm border-none px-4 py-1.5 rounded-full text-xs font-bold gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5" /> Verified
                    </Badge>
                  )}
                  {listing.listingPurpose && (
                    <Badge className="bg-ink text-white border-none px-4 py-1.5 rounded-full text-xs font-bold capitalize">
                      {listing.listingPurpose === "rent" ? "For Rent" : listing.listingPurpose === "sale" ? "For Sale" : "Shortlet"}
                    </Badge>
                  )}
                  {listing.listingType && (
                    <Badge className={`${listing.listingType === "owner" ? "bg-clay/10 text-clay" : "bg-sand text-ink"} border-none px-4 py-1.5 rounded-full text-xs font-bold`}>
                      {listing.listingType === "owner" ? "🏠 Owner" : "🏢 Agent"}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-serif text-ink leading-tight">{listing.title}</h1>
                    <div className="flex items-center gap-2 text-ink/50 font-medium">
                      <MapPin className="h-5 w-5 text-clay" />
                      <span className="text-lg">{listing.address}, {listing.city}, {listing.state}</span>
                    </div>
                  </div>
                  <div className="md:text-right space-y-1">
                    <p className="text-4xl md:text-5xl font-display font-bold text-clay">
                      {formatCompact(listing.yearlyPrice || listing.price)}
                    </p>
                    <p className="text-ink/40 font-bold uppercase tracking-widest text-sm">
                      Per {listing.rentFrequency === "monthly" ? "Month" : "Year"}
                    </p>
                  </div>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-clay/10">
                  <div className="space-y-1">
                    <p className="text-ink/40 text-xs font-bold uppercase tracking-widest">Bedrooms</p>
                    <div className="flex items-center gap-3">
                      <BedDouble className="h-5 w-5 text-clay" />
                      <p className="text-xl font-display font-bold text-ink">{listing.bedrooms}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-ink/40 text-xs font-bold uppercase tracking-widest">Bathrooms</p>
                    <div className="flex items-center gap-3">
                      <Bath className="h-5 w-5 text-clay" />
                      <p className="text-xl font-display font-bold text-ink">{listing.bathrooms}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-ink/40 text-xs font-bold uppercase tracking-widest">Status</p>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-palm" />
                      <p className="text-xl font-display font-bold text-ink">{listing.verified ? "Verified" : "Unverified"}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-ink/40 text-xs font-bold uppercase tracking-widest">Listed On</p>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-clay" />
                      <p className="text-xl font-display font-bold text-ink">{new Date(listing.createdAt).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Description */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-display font-bold text-ink">About this property</h3>
              <p className="text-ink/70 text-lg leading-relaxed whitespace-pre-line font-medium max-w-3xl">
                {listing.description}
              </p>
            </motion.section>

            {/* Property Conditions */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-display font-bold text-ink">Property Conditions</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {/* Electricity */}
                <div className={`rounded-[2rem] border p-8 transition-all hover:shadow-xl ${elecInfo ? "bg-white border-clay/10" : "border-clay/5 bg-sand/20"}`}>
                  <div className={`mb-6 h-14 w-14 rounded-2xl flex items-center justify-center ${elecInfo ? "bg-clay/10 text-clay" : "bg-ink/5 text-ink/20"}`}>
                    <Zap className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/30 mb-1">Electricity</p>
                  <p className="text-xl font-display font-bold text-ink mb-2">
                    {elecInfo ? elecInfo.label : "Unknown"}
                  </p>
                  <p className="text-sm text-ink/50 font-medium">
                    {elecInfo ? elecInfo.description : "No data available"}
                  </p>
                </div>

                {/* Water */}
                <div className="rounded-[2rem] border border-clay/10 bg-white p-8 transition-all hover:shadow-xl">
                  <div className="mb-6 h-14 w-14 rounded-2xl bg-palm/10 text-palm flex items-center justify-center">
                    <Droplets className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/30 mb-1">Water Supply</p>
                  <p className="text-xl font-display font-bold text-ink mb-2">
                    {waterInfo ? waterInfo.label : "Unknown"}
                  </p>
                  <p className="text-sm text-ink/50 font-medium">
                    {waterInfo?.value === "running" ? "24/7 steady water supply" : waterInfo?.value === "not-running" ? "Intermittent water supply" : "No direct supply"}
                  </p>
                </div>

                {/* Parking */}
                <div className="rounded-[2rem] border border-clay/10 bg-white p-8 transition-all hover:shadow-xl">
                  <div className="mb-6 h-14 w-14 rounded-2xl bg-ink/5 text-ink flex items-center justify-center">
                    <Car className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/30 mb-1">Parking</p>
                  <p className="text-xl font-display font-bold text-ink mb-2">
                    {parkingInfo ? parkingInfo.label : "Unknown"}
                  </p>
                  <p className="text-sm text-ink/50 font-medium">
                    {parkingInfo?.value === "compound" ? "Secure compound parking" : "Nearby or street parking"}
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Fees Breakdown */}
            {(listing.agentFee || listing.cautionFee || listing.agreementFee) && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-3xl font-display font-bold text-ink">Financial Breakdown</h3>
                <div className="rounded-[2.5rem] bg-white border border-clay/10 overflow-hidden shadow-sm">
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold text-ink">Base Rent</p>
                        <p className="text-sm text-ink/50 font-medium uppercase tracking-wider">{listing.rentFrequency || "yearly"}</p>
                      </div>
                      <p className="text-xl font-display font-bold text-ink">{formatNGN(listing.yearlyPrice || listing.price)}</p>
                    </div>

                    {listing.agentFee != null && listing.agentFee > 0 && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-ink">Agent & Commission</p>
                          <p className="text-sm text-ink/50 font-medium">One-time payment</p>
                        </div>
                        <p className="text-xl font-display font-bold text-clay">{formatNGN(listing.agentFee)}</p>
                      </div>
                    )}

                    {listing.cautionFee != null && listing.cautionFee > 0 && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-ink">Caution Fee</p>
                          <p className="text-sm text-ink/50 font-medium italic">Refundable deposit</p>
                        </div>
                        <p className="text-xl font-display font-bold text-ink">{formatNGN(listing.cautionFee)}</p>
                      </div>
                    )}

                    {listing.agreementFee != null && listing.agreementFee > 0 && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-bold text-ink">Legal & Agreement</p>
                          <p className="text-sm text-ink/50 font-medium">Processing fees</p>
                        </div>
                        <p className="text-xl font-display font-bold text-ink">{formatNGN(listing.agreementFee)}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-ink p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h4 className="text-white/60 text-sm font-bold uppercase tracking-[0.2em] mb-1">Total Move-in Cost</h4>
                      <p className="text-white/40 text-xs font-medium italic">Including all legal and agent fees</p>
                    </div>
                    <p className="text-5xl font-display font-bold text-white">
                      {formatNGN(
                        (listing.yearlyPrice || listing.price) + 
                        (listing.agentFee || 0) + 
                        (listing.cautionFee || 0) + 
                        (listing.agreementFee || 0)
                      )}
                    </p>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Amenities */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-display font-bold text-ink">Amenities & Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listing.amenities.map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-clay/5 group hover:border-clay/20 transition-all">
                    <div className="h-10 w-10 rounded-full bg-palm/5 text-palm flex items-center justify-center group-hover:bg-palm group-hover:text-white transition-all">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-ink">{amenity}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Property Info & Legal */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 pb-12"
            >
              <h3 className="text-3xl font-display font-bold text-ink">Legal & Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {titleInfo && (
                  <div className="flex items-start gap-6 rounded-[2rem] border border-clay/10 bg-white p-8">
                    <div className="h-14 w-14 rounded-2xl bg-clay/10 text-clay flex items-center justify-center shrink-0">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xl font-display font-bold text-ink">Land Title</p>
                        <Info className="h-4 w-4 text-ink/20" />
                      </div>
                      <p className="text-ink/60 font-medium">{titleInfo.label}</p>
                    </div>
                  </div>
                )}
                {listing.packOutDate && (
                  <div className="flex items-start gap-6 rounded-[2rem] border border-clay/10 bg-clay/5 p-8">
                    <div className="h-14 w-14 rounded-2xl bg-white text-clay flex items-center justify-center shrink-0">
                      <Clock className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-ink mb-1">Availability</p>
                      <p className="text-ink/60 font-medium">Available from {new Date(listing.packOutDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {listing.source === "jiji" ? (
                <div className="rounded-[2.5rem] border border-clay/10 bg-white p-8 shadow-2xl">
                  <h3 className="mb-6 text-2xl font-display font-bold text-ink">External Listing</h3>
                  <p className="text-ink/50 mb-8 font-medium">This property is listed on Jiji.ng. Please contact the seller directly through their platform.</p>
                  <a href={listing.externalUrl} target="_blank" rel="noreferrer" className="block w-full">
                    <Button className="w-full h-16 rounded-2xl bg-ink text-white font-bold text-lg shadow-xl shadow-ink/20">
                      View on Jiji →
                    </Button>
                  </a>
                </div>
              ) : (
                <ContactCard listingId={listing.id} landlordId={listing.landlordId} propertyTitle={listing.title} />
              )}
              {/* 2. AI NEIGHBOURHOOD INSIGHT WIDGET */}
              <NeighbourhoodInsightWidget city={listing.city} state={listing.state} address={listing.address} />
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-[2.5rem] bg-clay p-10 text-white shadow-2xl shadow-clay/20 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-colors" />
                <h4 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                  <Share2 className="h-6 w-6" />
                  Invite a friend
                </h4>
                <p className="text-white/70 mb-8 font-medium leading-relaxed">Finding the perfect home is better with someone you trust. Share this listing.</p>
                <Button 
                  onClick={handleCopyLink}
                  variant="outline" 
                  className="w-full h-14 rounded-2xl border-white/20 bg-white/10 hover:bg-white text-white hover:text-clay font-bold transition-all gap-2"
                >
                  {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {isCopied ? "Link Copied!" : "Copy Link"}
                </Button>
              </motion.div>

              {listing.isHandoverListing && (
                <div className="rounded-[2rem] border border-sand bg-sand/30 p-8">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-6 w-6 text-clay" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-ink mb-1 text-lg">Handover Listing</h4>
                      <p className="text-sm text-ink/60 font-medium">This is a tenant-to-tenant transfer. Please verify all documents with the property owner.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-surface">
    <Navbar />
    <div className="container mx-auto px-4 py-12 max-w-7xl animate-pulse space-y-8">
      <div className="h-8 w-32 bg-neutral-200 rounded-lg" />
      <div className="h-[400px] w-full bg-neutral-200 rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-16 w-3/4 bg-neutral-200 rounded-xl" />
          <div className="h-6 w-1/2 bg-neutral-200 rounded-lg" />
          <div className="h-32 w-full bg-neutral-200 rounded-2xl" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-32 bg-neutral-200 rounded-2xl" />
            <div className="h-32 bg-neutral-200 rounded-2xl" />
            <div className="h-32 bg-neutral-200 rounded-2xl" />
          </div>
        </div>
        <div className="lg:col-span-1 h-[400px] bg-neutral-200 rounded-3xl" />
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-8 text-center">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-12 rounded-3xl shadow-card border border-neutral-100 max-w-lg"
    >
      <div className="text-6xl mb-6">🏠</div>
      <h2 className="text-2xl font-display font-bold text-ink mb-4">Property Not Found</h2>
      <p className="text-neutral-500 text-lg mb-8">
        We couldn't find the property you're looking for. It might have been taken or the link is broken.
      </p>
      <Link to="/listings">
        <Button className="h-12 px-8 rounded-xl bg-primary text-white font-semibold">
          Browse Other Properties
        </Button>
      </Link>
    </motion.div>
  </div>
);
