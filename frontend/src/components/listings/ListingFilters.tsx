import { motion } from "framer-motion";
import { NIGERIA_STATES, PROPERTY_TYPES, ELECTRICITY_BANDS, LISTING_PURPOSES } from "@renthub/shared";
import { Button, Input } from "../ui";
import { Filter } from "lucide-react";

interface ListingFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClear: () => void;
}

export const ListingFilters = ({ filters, onFilterChange, onClear }: ListingFiltersProps) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 sticky top-24 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold font-sora text-neutral-900">
          <Filter className="h-5 w-5 text-primary" /> Filters
        </h3>
        <button 
          onClick={onClear} 
          className="text-sm font-medium text-neutral-500 hover:text-primary transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Listing Purpose Tabs */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Purpose</label>
          <div className="flex gap-1 rounded-xl bg-neutral-100 p-1">
            <button
              onClick={() => onFilterChange({ purpose: "" })}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                !filters.purpose ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              All
            </button>
            {LISTING_PURPOSES.map(p => (
              <button
                key={p.value}
                onClick={() => onFilterChange({ purpose: p.value })}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                  filters.purpose === p.value ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                {p.label.replace("For ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Location</label>
          <select 
            className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all bg-neutral-50"
            value={filters.state}
            onChange={(e) => onFilterChange({ state: e.target.value })}
          >
            <option value="">All States</option>
            {NIGERIA_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            {PROPERTY_TYPES.map(type => (
              <label 
                key={type} 
                className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 hover:bg-neutral-50 transition-all ${filters.type === type ? "border-primary bg-primary/5 shadow-sm" : "border-neutral-100"}`}
              >
                <input 
                  type="radio" 
                  name="type"
                  checked={filters.type === type}
                  onChange={() => onFilterChange({ type })}
                  className="h-4 w-4 border-neutral-300 text-primary focus:ring-primary" 
                />
                <span className={`text-xs font-medium ${filters.type === type ? "text-primary" : "text-neutral-600"}`}>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">Min Price</label>
            <Input 
              type="number" 
              placeholder="Min" 
              className="h-11 rounded-xl"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">Max Price (₦)</label>
            <Input 
              type="number" 
              placeholder="Max" 
              className="h-11 rounded-xl"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Bedrooms</label>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map(num => (
              <button 
                key={num} 
                onClick={() => onFilterChange({ bedrooms: filters.bedrooms == num ? "" : num })}
                className={`flex-1 min-w-[40px] rounded-xl border py-2.5 text-sm font-bold transition-all ${filters.bedrooms == num ? "border-primary bg-primary text-white shadow-md" : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary"}`}
              >
                {num}+
              </button>
            ))}
          </div>
        </div>

        {/* Electricity Band */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">⚡ NEPA / Electricity</label>
          <div className="space-y-1.5">
            {ELECTRICITY_BANDS.filter(b => b.value !== "none").map(band => (
              <label 
                key={band.value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                  filters.electricityBand === band.value ? `${band.bg} shadow-sm` : "border-neutral-100 hover:bg-neutral-50"
                }`}
              >
                <input 
                  type="radio"
                  name="electricityBand"
                  checked={filters.electricityBand === band.value}
                  onChange={() => onFilterChange({ electricityBand: filters.electricityBand === band.value ? "" : band.value })}
                  className="h-4 w-4 text-primary"
                />
                <div>
                  <span className={`text-xs font-bold ${band.color}`}>{band.label}</span>
                  <span className="text-[10px] text-neutral-400 ml-2">{band.description}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Owner / Agent Toggle */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Listed By</label>
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange({ listingType: filters.listingType === "owner" ? "" : "owner" })}
              className={`flex-1 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                filters.listingType === "owner" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-neutral-200 text-neutral-600 hover:border-blue-300"
              }`}
            >
              🏠 Owner
            </button>
            <button
              onClick={() => onFilterChange({ listingType: filters.listingType === "agent" ? "" : "agent" })}
              className={`flex-1 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                filters.listingType === "agent" ? "border-orange-400 bg-orange-50 text-orange-600" : "border-neutral-200 text-neutral-600 hover:border-orange-300"
              }`}
            >
              🏢 Agent
            </button>
          </div>
        </div>

        {/* Negotiable Toggle */}
        <div>
          <label 
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
              filters.negotiable === "true" ? "border-green-400 bg-green-50" : "border-neutral-100 hover:bg-neutral-50"
            }`}
          >
            <input 
              type="checkbox"
              checked={filters.negotiable === "true"}
              onChange={() => onFilterChange({ negotiable: filters.negotiable === "true" ? "" : "true" })}
              className="h-4 w-4 text-primary rounded"
            />
            <span className={`text-xs font-bold ${filters.negotiable === "true" ? "text-green-600" : "text-neutral-600"}`}>
              💰 Negotiable only
            </span>
          </label>
        </div>

        {/* Property Source */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-neutral-700">Property Source</label>
          <div className="flex gap-1 rounded-xl bg-neutral-100 p-1 relative">
            {[
              { id: "", label: "All" },
              { id: "renthub", label: "RentHub" },
              { id: "jiji", label: "Jiji.ng" }
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => onFilterChange({ source: tab.id })}
                className={`flex-1 relative rounded-lg px-2 py-2 text-[10px] font-bold transition-all z-10 ${
                  filters.source === tab.id ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {filters.source === tab.id && (
                  <motion.div
                    layoutId="listingSourceTab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Button 
          className="w-full py-6 rounded-xl shadow-lg shadow-primary/20"
          onClick={() => onFilterChange({})}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
