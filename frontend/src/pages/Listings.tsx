import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ListingGrid } from "../components/listings/ListingGrid";
import { ListingFilters } from "../components/listings/ListingFilters";
import { SearchBar } from "../components/shared/SearchBar";
import { Button } from "../components/ui";
import { SaveSearchButton } from "../components/listings/SaveSearchButton";
import { SlidersHorizontal, X } from "lucide-react";
import { useListingFilters } from "../hooks/useListingFilters";
import { useQuery } from "@tanstack/react-query";
import { listingsService } from "../services/listings.service";

export const Listings = () => {
  const { filters, updateFilters, clearFilters } = useListingFilters();
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings", filters],
    queryFn: () => listingsService.getListings(filters)
  });

  const listings = data?.data?.data || [];
  const total = data?.data?.total || 0;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Header Area */}
      <div className="bg-sand pt-32 pb-16 border-b border-sand-dark/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-display font-bold text-ink mb-4"
            >
              Explore Properties
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-500 font-sans max-w-2xl mx-auto"
            >
              Discover your next home across the finest locations in Nigeria, from luxury apartments in Ikoyi to cozy homes in Abuja.
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Purpose Tabs - Redesigned as horizontal pill tabs */}
            <div className="flex gap-1 rounded-full bg-sand-dark/20 p-1.5 backdrop-blur-sm w-fit">
              {[
                { id: "", label: "All Properties" },
                { id: "rent", label: "For Rent" },
                { id: "sale", label: "For Sale" },
                { id: "shortlet", label: "Shortlet" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => updateFilters({ purpose: tab.id })}
                  className={`relative rounded-full px-6 py-2.5 text-sm font-display font-bold transition-all z-10 ${
                    filters.purpose === tab.id ? "text-white" : "text-neutral-600 hover:text-ink"
                  }`}
                >
                  {filters.purpose === tab.id && (
                    <motion.div
                      layoutId="listingPurposeTab"
                      className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="w-full max-w-5xl">
              <SearchBar purpose={filters.purpose} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              className="w-full gap-2 py-6 rounded-2xl border-neutral-200 bg-sand/30" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" /> 
              {showFilters ? "Hide Filters" : "Filter Properties"}
            </Button>
          </div>

          <aside className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="sticky top-24">
              <ListingFilters 
                filters={filters}
                onFilterChange={updateFilters} 
                onClear={clearFilters} 
              />
            </div>
          </aside>

          <main className="lg:flex-1">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-neutral-100">
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-display font-bold text-ink">Results</h2>
                  <div className="h-1 w-1 rounded-full bg-neutral-300" />
                  <p className="text-sm text-neutral-500 font-medium">
                    <span className="text-ink font-bold">{total}</span> properties found
                  </p>
                </div>
                {filters.q && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold flex items-center gap-2 border border-primary/20">
                      "{filters.q}"
                      <X className="h-3 w-3 cursor-pointer hover:scale-125 transition-transform" onClick={() => updateFilters({ q: "" })} />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <SaveSearchButton />
                <div className="relative">
                  <select 
                    className="appearance-none rounded-full border border-neutral-200 bg-white px-6 py-2.5 pr-10 text-sm font-display font-bold text-neutral-700 outline-none focus:ring-4 focus:ring-primary/5 hover:border-primary/30 transition-all cursor-pointer"
                    onChange={() => updateFilters({ page: 1 })}
                  >
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>
            
            {isError ? (
              <div className="py-24 text-center bg-sand/20 rounded-[32px] border-2 border-dashed border-neutral-200">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 mb-6">
                  <X className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">Something went wrong</h3>
                <p className="text-neutral-500 mb-8 max-w-xs mx-auto">We couldn't load the properties. This might be a temporary connection issue.</p>
                <Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : (
              <ListingGrid isLoading={isLoading} listings={listings} />
            )}
            
            {/* Minimal Pagination */}
            <div className="mt-20 flex items-center justify-center gap-8">
              <button 
                disabled={filters.page === 1}
                onClick={() => updateFilters({ page: filters.page - 1 })}
                className="flex items-center gap-2 text-sm font-display font-bold text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors group"
              >
                <div className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-primary transition-colors">
                  ←
                </div>
                <span>Previous</span>
              </button>
              
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((p) => (
                  <button
                    key={p}
                    onClick={() => updateFilters({ page: p })}
                    className={`h-10 w-10 rounded-full font-display font-bold text-sm transition-all ${
                      filters.page === p 
                        ? "bg-ink text-white shadow-lg" 
                        : "text-neutral-500 hover:bg-neutral-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button 
                disabled={listings.length < filters.limit}
                onClick={() => updateFilters({ page: filters.page + 1 })}
                className="flex items-center gap-2 text-sm font-display font-bold text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors group"
              >
                <span>Next</span>
                <div className="h-10 w-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-primary transition-colors">
                  →
                </div>
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
