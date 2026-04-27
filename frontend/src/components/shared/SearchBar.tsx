import { useState } from "react";
import { Search, MapPin, Building } from "lucide-react";
import { Button } from "../ui";
import { useNavigate } from "react-router-dom";
import { NIGERIA_STATES, PROPERTY_TYPES } from "@renthub/shared";

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
    <div className="flex w-full max-w-4xl flex-col gap-2 rounded-3xl bg-white p-2 shadow-2xl border border-neutral-100 md:flex-row md:items-center">
      <div className="flex flex-[1.5] items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-neutral-100">
        <Search className="h-5 w-5 text-primary" />
        <input 
          type="text" 
          placeholder="City, area or estate..." 
          className="w-full text-sm font-semibold outline-none placeholder:text-neutral-400 bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      
      <div className="flex flex-1 items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-neutral-100">
        <MapPin className="h-5 w-5 text-primary" />
        <select 
          className="w-full text-sm font-semibold outline-none bg-transparent cursor-pointer"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Location</option>
          {NIGERIA_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
      </div>

      <div className="flex flex-1 items-center gap-3 px-4 py-3">
        <Building className="h-5 w-5 text-primary" />
        <select 
          className="w-full text-sm font-semibold outline-none bg-transparent cursor-pointer"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Type</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <Button onClick={handleSearch} className="md:h-14 px-10 rounded-2xl font-bold shadow-lg shadow-primary/20">Find Home</Button>
    </div>
  );
};
