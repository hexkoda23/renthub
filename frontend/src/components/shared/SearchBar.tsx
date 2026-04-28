import { useState } from "react";
import { Search, MapPin, Building } from "lucide-react";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";
import { NIGERIA_STATES, PROPERTY_TYPES } from "@renthob/shared";

export const SearchBar = ({ purpose }: { purpose?: string }) => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (state) params.set("state", state);
    if (type) params.set("type", type);
    if (purpose) params.set("purpose", purpose);
    
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="flex w-full max-w-5xl flex-col gap-0 rounded-2xl md:rounded-full bg-white shadow-xl shadow-neutral-900/10 border border-neutral-100 md:flex-row md:items-center p-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/5">
      <div className="flex flex-[1.5] items-center gap-3 px-6 py-4">
        <Search className="h-5 w-5 text-primary" />
        <input 
          type="text" 
          placeholder="City, area or estate..." 
          className="w-full text-base font-medium outline-none placeholder:text-neutral-400 bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      
      <div className="hidden md:block w-px h-10 bg-neutral-100" />

      <div className="flex flex-1 items-center gap-3 px-6 py-4">
        <MapPin className="h-5 w-5 text-primary/60" />
        <select 
          className="w-full text-base font-medium outline-none bg-transparent cursor-pointer appearance-none"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Location</option>
          {NIGERIA_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
      </div>

      <div className="hidden md:block w-px h-10 bg-neutral-100" />

      <div className="flex flex-1 items-center gap-3 px-6 py-4">
        <Building className="h-5 w-5 text-primary/60" />
        <select 
          className="w-full text-base font-medium outline-none bg-transparent cursor-pointer appearance-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Type</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <Button 
        onClick={handleSearch} 
        size="lg"
        className="md:h-14 px-8 rounded-xl md:rounded-full font-display font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
      >
        <Search className="h-5 w-5" />
        <span className="md:hidden lg:inline">Search</span>
      </Button>
    </div>
  );
};
