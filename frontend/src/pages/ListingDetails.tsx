import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listingsService } from "../services/listings.service";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button, Badge } from "../components/ui";
import { ELECTRICITY_BANDS, WATER_OPTIONS, PARKING_OPTIONS, PROPERTY_CONDITIONS, LAND_TITLES } from "@renthub/shared";
import { 
  BedDouble, Bath, MapPin, CheckCircle, Share2, Heart, ChevronLeft,
  Calendar, ShieldCheck, Zap, Droplets, Car, Home, FileText, 
  Clock, AlertTriangle, Info
} from "lucide-react";
import { PropertyGallery } from "../components/listings/PropertyGallery";
import { ContactCard } from "../components/listings/ContactCard";

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

export const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => listingsService.getListing(id!),
    enabled: !!id
  });

  const listing = data?.data?.data;

  if (isLoading) return <LoadingSkeleton />;
  if (error || !listing) return <ErrorState />;

  const elecInfo = ELECTRICITY_BANDS.find(b => b.value === listing.electricityBand);
  const waterInfo = WATER_OPTIONS.find(w => w.value === listing.waterSituation);
  const parkingInfo = PARKING_OPTIONS.find(p => p.value === listing.parkingSituation);
  const conditionInfo = PROPERTY_CONDITIONS.find(c => c.value === listing.propertyCondition);
  const titleInfo = LAND_TITLES.find(t => t.value === listing.landTitle);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs & Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link to="/listings" className="flex items-center text-sm font-medium text-neutral-500 hover:text-primary transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to listings
          </Link>
          <div className="flex gap-2">
            {!listing.source || listing.source === "renthub" || listing.source === "handover" ? (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" /> Save
                </Button>
              </>
            ) : null}
          </div>
        </div>

        {listing.source === "jiji" && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white font-bold text-xs uppercase">
              J
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900">Extenal Listing Sourced from Jiji.ng</p>
              <p className="text-xs text-neutral-500">Contact the seller directly via the original Jiji listing page.</p>
            </div>
            <a 
              href={listing.externalUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="ml-auto"
            >
              <Button size="sm" className="gap-2">
                View on Jiji <Share2 className="h-3 w-3" />
              </Button>
            </a>
          </div>
        )}

        {/* Gallery */}
        <PropertyGallery images={listing.images} />

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <section>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Badge variant="neutral" className="capitalize">{listing.type}</Badge>
                    {listing.verified && (
                      <Badge variant="info" className="gap-1">
                        <CheckCircle className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                    {listing.listingPurpose && (
                      <Badge variant="success" className="capitalize">
                        {listing.listingPurpose === "rent" ? "For Rent" : listing.listingPurpose === "sale" ? "For Sale" : "Shortlet"}
                      </Badge>
                    )}
                    {listing.listingType && (
                      <Badge variant={listing.listingType === "owner" ? "info" : "warning"}>
                        {listing.listingType === "owner" ? "🏠 Owner" : "🏢 Agent"}
                      </Badge>
                    )}
                    {listing.isNegotiable && (
                      <Badge variant="success" className="gap-1">💰 Negotiable</Badge>
                    )}
                    {listing.isHandoverListing && (
                      <Badge variant="warning" className="gap-1">🔄 Handover</Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold font-sora text-neutral-900 md:text-4xl">{listing.title}</h1>
                  <div className="mt-3 flex items-center gap-1.5 text-neutral-500">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.address}, {listing.city}, {listing.state}</span>
                  </div>
                  {listing.estateName && (
                    <div className="mt-1 flex items-center gap-1.5 text-neutral-400 text-sm">
                      <Home className="h-3 w-3" />
                      <span>{listing.estateName}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    {formatCompact(listing.yearlyPrice || listing.price)}
                    <span className="text-sm font-normal text-neutral-500">
                      /{listing.rentFrequency === "monthly" ? "mo" : "yr"}
                    </span>
                  </p>
                  {listing.rentFrequency === "yearly" && listing.yearlyPrice && (
                    <p className="mt-1 text-sm text-neutral-400">
                      ≈ {formatCompact(listing.price / 12)}/month
                    </p>
                  )}
                  {conditionInfo && (
                    <span className="mt-2 inline-block text-xs rounded-full bg-neutral-100 px-3 py-1 text-neutral-600 font-medium">
                      {conditionInfo.emoji} {conditionInfo.label}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Specs */}
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-6 sm:grid-cols-4">
                <div className="text-center sm:border-r border-neutral-200">
                  <BedDouble className="mx-auto mb-2 h-6 w-6 text-neutral-400" />
                  <p className="text-sm font-bold text-neutral-900">{listing.bedrooms} Bedrooms</p>
                </div>
                <div className="text-center sm:border-r border-neutral-200">
                  <Bath className="mx-auto mb-2 h-6 w-6 text-neutral-400" />
                  <p className="text-sm font-bold text-neutral-900">{listing.bathrooms} Bathrooms</p>
                </div>
                <div className="text-center sm:border-r border-neutral-200">
                  <Calendar className="mx-auto mb-2 h-6 w-6 text-neutral-400" />
                  <p className="text-sm font-bold text-neutral-900">Added {new Date(listing.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-center">
                  <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-neutral-400" />
                  <p className="text-sm font-bold text-neutral-900">{listing.verified ? "Verified" : "Unverified"}</p>
                </div>
              </div>
            </section>

            {/* Property Conditions Card */}
            <section>
              <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">⚡ Property Conditions</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Electricity */}
                <div className={`rounded-2xl border p-5 ${elecInfo ? elecInfo.bg : "border-neutral-200 bg-neutral-50"}`}>
                  <Zap className={`mb-2 h-6 w-6 ${elecInfo ? elecInfo.color : "text-neutral-400"}`} />
                  <p className={`text-sm font-bold ${elecInfo ? elecInfo.color : "text-neutral-600"}`}>
                    {elecInfo ? elecInfo.label : "Unknown"}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {elecInfo ? elecInfo.description : "No data"}
                  </p>
                </div>
                {/* Water */}
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <Droplets className="mb-2 h-6 w-6 text-blue-500" />
                  <p className="text-sm font-bold text-blue-700">
                    {waterInfo ? waterInfo.label : "Unknown"}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {waterInfo?.value === "running" ? "24/7 water supply available" : waterInfo?.value === "not-running" ? "Water available but not always running" : "No water supply"}
                  </p>
                </div>
                {/* Parking */}
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <Car className="mb-2 h-6 w-6 text-neutral-500" />
                  <p className="text-sm font-bold text-neutral-700">
                    {parkingInfo ? parkingInfo.label : "Unknown"}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {parkingInfo?.value === "compound" ? "Parking within the compound" : parkingInfo?.value === "nearby" ? "Parking available nearby" : parkingInfo?.value === "street" ? "Street parking only" : "No parking available"}
                  </p>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">Description</h3>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </section>

            {/* Fees Breakdown */}
            {(listing.agentFee || listing.cautionFee || listing.agreementFee) && (
              <section>
                <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">💰 Fees Breakdown</h3>
                <div className="rounded-2xl border border-neutral-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100">
                        <th className="text-left p-4 font-semibold text-neutral-600">Fee</th>
                        <th className="text-right p-4 font-semibold text-neutral-600">Amount (₦)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-50">
                        <td className="p-4 text-neutral-700 font-medium">Rent ({listing.rentFrequency || "yearly"})</td>
                        <td className="p-4 text-right font-bold text-neutral-900">{formatNGN(listing.yearlyPrice || listing.price)}</td>
                      </tr>
                      {listing.agentFee != null && listing.agentFee > 0 && (
                        <tr className="border-b border-neutral-50">
                          <td className="p-4 text-neutral-700 font-medium">Agent / Commission Fee</td>
                          <td className="p-4 text-right font-bold text-orange-600">{formatNGN(listing.agentFee)}</td>
                        </tr>
                      )}
                      {listing.cautionFee != null && listing.cautionFee > 0 && (
                        <tr className="border-b border-neutral-50">
                          <td className="p-4 text-neutral-700 font-medium">Caution Fee (refundable)</td>
                          <td className="p-4 text-right font-bold text-neutral-900">{formatNGN(listing.cautionFee)}</td>
                        </tr>
                      )}
                      {listing.agreementFee != null && listing.agreementFee > 0 && (
                        <tr className="border-b border-neutral-50">
                          <td className="p-4 text-neutral-700 font-medium">Agreement Fee</td>
                          <td className="p-4 text-right font-bold text-neutral-900">{formatNGN(listing.agreementFee)}</td>
                        </tr>
                      )}
                      <tr className="bg-primary/5">
                        <td className="p-4 text-neutral-900 font-bold">Total to Move In</td>
                        <td className="p-4 text-right font-bold text-primary text-lg">
                          {formatNGN(
                            (listing.yearlyPrice || listing.price) + 
                            (listing.agentFee || 0) + 
                            (listing.cautionFee || 0) + 
                            (listing.agreementFee || 0)
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Land Title & Property Info */}
            {(titleInfo || listing.estateName || listing.packOutDate) && (
              <section>
                <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">📋 Property Info</h3>
                <div className="space-y-3">
                  {titleInfo && (
                    <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4">
                      <FileText className="h-5 w-5 text-neutral-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-neutral-900">Land Title</p>
                        <p className="text-xs text-neutral-500">{titleInfo.label}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="group relative">
                          <Info className="h-4 w-4 text-neutral-300 cursor-help" />
                        </span>
                      </div>
                    </div>
                  )}
                  {listing.packOutDate && (
                    <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-amber-700">Pack-out Date</p>
                        <p className="text-xs text-amber-600">Current tenant leaves {new Date(listing.packOutDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Amenities */}
            <section>
              <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">Amenities</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {listing.amenities.map((amenity: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600 rounded-xl border border-neutral-100 p-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Contact Card & Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {listing.source === "jiji" ? (
                <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-xl">
                  <h3 className="mb-4 text-xl font-bold font-sora text-neutral-900">Interested?</h3>
                  <p className="text-sm text-neutral-500 mb-6 font-medium">As this property is listed on Jiji.ng, you'll need to view the original ad to see contact details.</p>
                  <a href={listing.externalUrl} target="_blank" rel="noreferrer" className="block w-full">
                    <Button className="w-full py-6 text-lg shadow-xl shadow-primary/20">
                      View on Jiji →
                    </Button>
                  </a>
                  <div className="mt-6 pt-6 border-t border-neutral-50 text-[10px] text-neutral-400 text-center uppercase tracking-widest font-bold">
                    Ref: {listing.externalId?.slice(0, 8)}
                  </div>
                </div>
              ) : (
                <ContactCard listingId={listing.id} landlordId={listing.landlordId} propertyTitle={listing.title} />
              )}
              
              <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share with friends
                </h4>
                <p className="text-xs text-neutral-500 mb-4">Finding a home is better with a roommate.</p>
                <Button variant="outline" size="sm" className="w-full">Copy Link</Button>
              </div>

              {listing.isHandoverListing && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-700 mb-1">Handover Listing</h4>
                      <p className="text-xs text-amber-600">This property is being listed by the current tenant who is moving out. Verify details directly with the landlord.</p>
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
  <div className="min-h-screen bg-white">
    <Navbar />
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="mb-6 h-4 w-32 bg-neutral-100 rounded" />
      <div className="h-[400px] w-full bg-neutral-100 rounded-3xl" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 w-3/4 bg-neutral-100 rounded" />
          <div className="h-6 w-1/2 bg-neutral-100 rounded" />
          <div className="h-24 w-full bg-neutral-100 rounded" />
        </div>
        <div className="lg:col-span-1 h-64 bg-neutral-100 rounded-3xl" />
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
    <h1 className="text-6xl mb-4">😰</h1>
    <h2 className="text-2xl font-bold mb-2">Property not found</h2>
    <p className="text-neutral-500 mb-8">We couldn't find the listing you're looking for.</p>
    <Link to="/listings">
      <Button>Go back to listings</Button>
    </Link>
  </div>
);
