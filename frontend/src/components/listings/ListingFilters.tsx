import { motion } from "framer-motion";
import { NIGERIA_STATES, PROPERTY_TYPES } from "@renthob/shared";
import { Button, Input } from "../ui";
import { Filter } from "lucide-react";

interface ListingFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClear: () => void;
}

export const ListingFilters = ({ filters, onFilterChange, onClear }: ListingFiltersProps) => {
  return (
    <div className="rounded-[32px] border border-neutral-200 bg-white p-8 sticky top-24 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="flex items-center gap-3 text-xl font-bold font-display text-ink">
          <Filter className="h-5 w-5 text-primary" /> Filters
        </h3>
        <button 
          onClick={onClear} 
          className="text-sm font-display font-bold text-neutral-400 hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Location */}
        <div>
          <label className="mb-3 block text-sm font-display font-bold text-ink">Location</label>
          <div className="relative">
            <select 
              className="w-full appearance-none rounded-2xl border border-neutral-100 p-4 pr-10 text-sm font-medium focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-sand/30 text-neutral-700"
              value={filters.state}
              onChange={(e) => onFilterChange({ state: e.target.value })}
            >
              <option value="">All States</option>
              {NIGERIA_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="mb-4 block text-sm font-display font-bold text-ink">Property Type</label>
          <div className="grid grid-cols-1 gap-2">
            {PROPERTY_TYPES.map(type => (
              <label 
                key={type} 
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all ${
                  filters.type === type 
                    ? "border-primary bg-primary/5" 
                    : "border-neutral-50 bg-neutral-50/50 hover:bg-neutral-50"
                }`}
              >
                <input 
                  type="radio" 
                  name="type"
                  checked={filters.type === type}
                  onChange={() => onFilterChange({ type })}
                  className="h-4 w-4 border-neutral-300 text-primary focus:ring-primary" 
                />
                <span className={`text-sm font-bold ${filters.type === type ? "text-primary" : "text-neutral-600"}`}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-4 block text-sm font-display font-bold text-ink">Price Range (₦)</label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input 
                type="number" 
                placeholder="Min" 
                className="h-12 rounded-2xl bg-sand/30 border-none text-sm font-bold"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
              />
            </div>
            <div className="w-4 h-px bg-neutral-200" />
            <div className="flex-1">
              <Input 
                type="number" 
                placeholder="Max" 
                className="h-12 rounded-2xl bg-sand/30 border-none text-sm font-bold"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-4 block text-sm font-display font-bold text-ink">Bedrooms</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                key={num} 
                onClick={() => onFilterChange({ bedrooms: filters.bedrooms == num ? "" : num })}
                className={`h-11 w-11 rounded-xl font-display font-bold text-sm transition-all border ${
                  filters.bedrooms == num 
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" 
                    : "border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Source */}
        <div>
          <label className="mb-4 block text-sm font-display font-bold text-ink">Listing Source</label>
          <div className="flex gap-1 rounded-2xl bg-neutral-100 p-1.5">
            {[
              { id: "", label: "All" },
              { id: "renthob", label: "RentHob" },
              { id: "jiji", label: "Jiji.ng" }
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => onFilterChange({ source: tab.id })}
                className={`flex-1 relative rounded-xl py-2.5 text-[11px] font-display font-bold transition-all z-10 ${
                  filters.source === tab.id ? "text-ink" : "text-neutral-500"
                }`}
              >
                {filters.source === tab.id && (
                  <motion.div
                    layoutId="listingSourceTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Button 
          size="lg"
          className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20 font-display font-bold text-base"
          onClick={() => onFilterChange({})}
        >
          Show Results
        </Button>
      </div>
    </div>
  );
};
