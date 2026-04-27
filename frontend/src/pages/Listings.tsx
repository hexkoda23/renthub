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
      
      <div className="bg-neutral-50 py-12 border-b border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold font-sora text-neutral-900 md:text-4xl">Explore Properties</h1>
              <p className="mt-2 text-neutral-500">Discover your next home across the finest locations in Nigeria.</p>
            </div>
            
            {/* Purpose Tabs */}
            <div className="flex gap-1 rounded-2xl bg-white p-1.5 border border-neutral-100 shadow-sm w-fit">
              {[
                { id: "", label: "All" },
                { id: "rent", label: "For Rent" },
                { id: "sale", label: "For Sale" },
                { id: "shortlet", label: "Shortlet" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => updateFilters({ purpose: tab.id })}
                  className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all z-10 ${
                    filters.purpose === tab.id ? "text-white" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {filters.purpose === tab.id && (
                    <motion.div
                      layoutId="listingPurposeTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-20">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          <SearchBar purpose={filters.purpose} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              className="w-full gap-2 py-6 rounded-xl border-neutral-200" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" /> 
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <ListingFilters 
              filters={filters}
              onFilterChange={updateFilters} 
              onClear={clearFilters} 
            />
          </aside>

          <main className="lg:flex-1">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-sm text-neutral-600 font-medium">
                  Showing <span className="text-neutral-900 font-bold">{listings.length} of {total} Properties</span> 
                  <span className="text-neutral-400 font-normal"> (including external Jiji listings)</span>
                </p>
                {filters.q && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                      Search: {filters.q}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ q: "" })} />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <SaveSearchButton />
                <select 
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary transition-all"
                  onChange={() => updateFilters({ page: 1 })}
                >
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {isError ? (
              <div className="py-20 text-center">
                <p className="text-neutral-500">Failed to load listings. Please try again.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : (
              <ListingGrid isLoading={isLoading} listings={listings} />
            )}
            
            <div className="mt-16 flex justify-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={filters.page === 1}
                onClick={() => updateFilters({ page: filters.page - 1 })}
              >
                Previous
              </Button>
              <Button variant="primary" size="sm">{filters.page}</Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={listings.length < filters.limit}
                onClick={() => updateFilters({ page: filters.page + 1 })}
              >
                Next
              </Button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
