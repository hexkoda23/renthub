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
import { cn } from "../utils/cn";

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
    <div className="min-h-screen bg-surface text-neutral-900">
      <Navbar />
      
      {/* Hero Header Area */}
      <div className="bg-gradient-to-b from-primary-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-display font-bold text-ink mb-4"
            >
              Find Your Perfect Property
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 text-lg"
            >
              Discover verified rentals, properties for sale, and shortlets across Nigeria
            </motion.p>
          </div>

          <div className="flex flex-col items-center gap-6">
            {/* Purpose Tabs - Redesigned as pill tabs */}
            <div className="flex gap-1 rounded-xl bg-white p-1 shadow-sm border border-neutral-100 w-fit">
              {[
                { id: "", label: "All" },
                { id: "rent", label: "Rent" },
                { id: "sale", label: "Buy" },
                { id: "shortlet", label: "Shortlet" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => updateFilters({ purpose: tab.id })}
                  className={cn(
                    "relative rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200",
                    filters.purpose === tab.id 
                      ? "bg-primary text-white" 
                      : "text-neutral-600 hover:text-ink hover:bg-neutral-50"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="w-full max-w-4xl">
              <SearchBar purpose={filters.purpose} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              className="w-full gap-2 py-3 rounded-xl border-neutral-200" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" /> 
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filter Sidebar */}
          <aside className={cn("lg:w-72 flex-shrink-0", showFilters ? 'block' : 'hidden', "lg:block")}>
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-card p-6 border border-neutral-100">
                <h3 className="font-display font-bold text-lg text-ink mb-4">Filters</h3>
                <ListingFilters 
                  filters={filters}
                  onFilterChange={updateFilters} 
                  onClear={clearFilters} 
                />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:flex-1">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-500">
                  Showing <span className="text-ink font-semibold">{total}</span> properties
                </p>
                {filters.q && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-primary-light text-primary px-3 py-1 rounded-full font-semibold flex items-center gap-2">
                      "{filters.q}"
                      <X className="h-3 w-3 cursor-pointer hover:scale-125 transition-transform" onClick={() => updateFilters({ q: "" })} />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <SaveSearchButton />
                <select 
                  className="appearance-none rounded-xl border border-neutral-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-neutral-700 outline-none focus:ring-2 focus:ring-primary hover:border-primary/30 transition-all cursor-pointer"
                  onChange={() => updateFilters({ page: 1 })}
                >
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {isError ? (
              <div className="py-20 text-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 mb-4">
                  <X className="h-6 w-6 text-neutral-400" />
                </div>
                <h3 className="text-lg font-display font-bold text-ink mb-2">Something went wrong</h3>
                <p className="text-neutral-500 mb-6 text-sm">We couldn't load the properties. Please try again.</p>
                <Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            ) : (
              <ListingGrid isLoading={isLoading} listings={listings} />
            )}
            
            {/* Pagination */}
            {total > 0 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <button 
                  disabled={filters.page === 1}
                  onClick={() => updateFilters({ page: filters.page - 1 })}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors"
                >
                  ← Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      onClick={() => updateFilters({ page: p })}
                      className={cn(
                        "h-9 w-9 rounded-lg font-medium text-sm transition-all",
                        filters.page === p 
                          ? "bg-primary text-white" 
                          : "text-neutral-500 hover:bg-neutral-100"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button 
                  disabled={listings.length < filters.limit}
                  onClick={() => updateFilters({ page: filters.page + 1 })}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
