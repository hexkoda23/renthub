import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, BellOff, X } from "lucide-react";
import { Button, Input } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import toast from "react-hot-toast";

export const SaveSearchButton = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertEnabled, setAlertEnabled] = useState(true);

  // We parse the current URL parameters directly
  const searchParams = new URLSearchParams(location.search);
  const hasFilters = searchParams.toString().length > 0;

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      toast("Please log in to save searches and get alerts.", { icon: "🔒" });
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }
    
    // Attempt somewhat smart defaults for name
    const type = searchParams.get("type");
    const city = searchParams.get("city");
    const parsedName = [type, city].filter(Boolean).join(" in ") || "My RentHob Search";
    setSearchName(parsedName.charAt(0).toUpperCase() + parsedName.slice(1));
    
    setIsModalOpen(true);
  };

  const submitSavedSearch = async () => {
    if (!searchName.trim()) return;
    setIsSubmitting(true);
    
    try {
      const filters: any = {};
      searchParams.forEach((value, key) => {
        filters[key] = value;
      });

      await api.post("/saved-searches", {
        name: searchName,
        filters,
        alertEnabled
      });
      
      toast.success("Search saved! We'll look out for matches.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save search.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasFilters) return null;

  return (
    <>
      <Button 
        variant="outline" 
        onClick={handleSaveClick}
        className="gap-2 border-primary text-primary hover:bg-primary-light/50"
      >
        <Bell className="w-4 h-4" />
        <span className="hidden sm:inline">Save this search & get alerts</span>
        <span className="sm:hidden">Get Alerts</span>
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 bg-neutral-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-2xl font-bold mb-1">Save Search</h3>
            <p className="text-sm text-neutral-500 mb-6">We'll alert you when matching properties are listed or handed over.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Search Name</label>
                <Input 
                  value={searchName} 
                  onChange={e => setSearchName(e.target.value)}
                  placeholder="e.g. 2 Bed in Lekki Phase 1" 
                  className="w-full" 
                  autoFocus
                />
              </div>

              <div 
                className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={() => setAlertEnabled(!alertEnabled)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${alertEnabled ? 'bg-primary/10 text-primary' : 'bg-neutral-100 text-neutral-400'}`}>
                    {alertEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm">Email Alerts</p>
                    <p className="text-xs text-neutral-500">Get notified of new matches</p>
                  </div>
                </div>
                {/* Simple toggle switch */}
                <div className={`w-11 h-6 rounded-full transition-colors relative ${alertEnabled ? "bg-primary" : "bg-neutral-300"}`}>
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${alertEnabled ? "left-6" : "left-1"}`} />
                </div>
              </div>
              
              <Button onClick={submitSavedSearch} className="w-full py-6 mt-2" disabled={isSubmitting || !searchName.trim()}>
                {isSubmitting ? "Saving..." : "Save Search"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
