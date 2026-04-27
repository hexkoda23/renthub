import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui";
import { Bell, Search, Trash2, ArrowRight, Home } from "lucide-react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"searches" | "listings">("searches");

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sora">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Welcome, {user?.displayName?.split(" ")[0]}</h1>
          <p className="text-neutral-500">Manage your saved searches, alerts, and listed properties.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab("searches")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "searches" 
                  ? "bg-primary text-white" 
                  : "text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <Bell className="w-4 h-4" /> My Alerts & Searches
            </button>
            <button 
              onClick={() => setActiveTab("listings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "listings" 
                  ? "bg-primary text-white" 
                  : "text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <Home className="w-4 h-4" /> My Properties
            </button>

            <div className="pt-8 mt-8 border-t border-neutral-200">
               <Button variant="ghost" onClick={signOut} className="w-full text-red-500 hover:text-red-700 hover:bg-red-50">
                 Sign Out
               </Button>
            </div>
          </aside>

          <section className="flex-1">
            {activeTab === "searches" && <SavedSearchesTab />}
            {activeTab === "listings" && (
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 text-center">
                <Home className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="font-bold text-neutral-900 mb-2">No properties listed</h3>
                <p className="text-neutral-500 mb-6 text-sm">You haven't listed any properties or handovers yet.</p>
                <Link to="/listings/create">
                  <Button>List a Property</Button>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const SavedSearchesTab = () => {
  const [searches, setSearches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    try {
      const { data } = await api.get("/saved-searches");
      setSearches(data.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load saved searches");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAlert = async (id: string, current: boolean) => {
    try {
      setSearches(prev => prev.map(s => s.id === id ? { ...s, alertEnabled: !current } : s));
      await api.put(`/saved-searches/${id}/toggle`, { alertEnabled: !current });
      toast.success(current ? "Alerts paused" : "Alerts enabled");
    } catch (e) {
      // Revert on error
      setSearches(prev => prev.map(s => s.id === id ? { ...s, alertEnabled: current } : s));
      toast.error("Failed to update alert setting");
    }
  };

  const deleteSearch = async (id: string) => {
    if (!window.confirm("Delete this saved search?")) return;
    try {
      await api.delete(`/saved-searches/${id}`);
      setSearches(prev => prev.filter(s => s.id !== id));
      toast.success("Search deleted");
    } catch (e) {
      toast.error("Failed to delete search");
    }
  };

  const viewResults = (filters: any) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.set(key, String(val));
    });
    navigate(`/listings?${params.toString()}`);
  };

  if (isLoading) return <div className="p-8 text-center text-neutral-500 animate-pulse">Loading searches...</div>;

  if (searches.length === 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-neutral-200 text-center">
        <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="font-bold text-neutral-900 mb-2">No saved searches</h3>
        <p className="text-neutral-500 mb-6 text-sm">Save your search filters to get alerted when new properties match.</p>
        <Link to="/listings">
          <Button variant="outline">Browse Properties</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searches.map(search => (
        <div key={search.id} className="bg-white p-6 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
          <div>
            <h3 className="font-bold text-lg text-neutral-900 mb-1">{search.name}</h3>
            <p className="text-xs text-neutral-500 mb-3 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${search.alertEnabled ? "bg-green-500" : "bg-neutral-300"}`} />
              {search.alertEnabled ? "Alerts active" : "Alerts paused"} (Last check: {new Date(search.lastChecked).toLocaleDateString()})
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
               {Object.entries(search.filters).map(([key, val]) => {
                 if (!val || key === "page") return null;
                 return (
                   <span key={key} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                     {key}: {val as any}
                   </span>
                 );
               })}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-neutral-100">
            <Button 
               variant="ghost" 
               size="sm" 
               className={search.alertEnabled ? "text-neutral-500" : "text-primary"}
               onClick={() => toggleAlert(search.id, search.alertEnabled)}
            >
              {search.alertEnabled ? "Pause Alerts" : "Resume Alerts"}
            </Button>
            <Button 
               variant="outline" 
               size="sm" 
               className="gap-2"
               onClick={() => viewResults(search.filters)}
            >
              View <ArrowRight className="w-3 h-3" />
            </Button>
            <button 
              onClick={() => deleteSearch(search.id)}
              className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
