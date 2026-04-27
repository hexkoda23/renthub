import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui";
import { Bell, Search, Trash2, ArrowRight, Home, Settings, LogOut, Sparkles } from "lucide-react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"searches" | "listings">("searches");

  return (
    <div className="min-h-screen bg-sand grain flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              User Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              Welcome back, <br />
              <span className="text-primary italic font-serif capitalize">{user?.displayName?.split(" ")[0]}</span>
            </h1>
          </div>
          <p className="text-neutral-500 max-w-xs text-sm leading-relaxed">
            Manage your saved searches, real-time alerts, and property portfolio in one premium interface.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-72 space-y-2">
            <nav className="space-y-1.5">
              <SidebarButton 
                active={activeTab === "searches"} 
                onClick={() => setActiveTab("searches")}
                icon={<Bell className="w-4 h-4" />}
                label="Saved Searches"
              />
              <SidebarButton 
                active={activeTab === "listings"} 
                onClick={() => setActiveTab("listings")}
                icon={<Home className="w-4 h-4" />}
                label="My Properties"
              />
              <SidebarButton 
                active={false} 
                onClick={() => {}}
                icon={<Settings className="w-4 h-4" />}
                label="Account Settings"
              />
            </nav>

            <div className="pt-8 mt-8 border-t border-neutral-200/60">
               <button 
                 onClick={signOut} 
                 className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-300 group"
               >
                 <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 Sign Out
               </button>
            </div>
          </aside>

          <section className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "searches" && <SavedSearchesTab />}
                {activeTab === "listings" && (
                  <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl border border-neutral-200/60 text-center shadow-sm">
                    <div className="h-20 w-20 bg-sand rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Home className="w-10 h-10 text-neutral-300" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-ink mb-2">No properties listed</h3>
                    <p className="text-neutral-500 mb-8 text-sm max-w-xs mx-auto leading-relaxed">
                      You haven't listed any properties or handovers yet. Start your journey today.
                    </p>
                    <Link to="/listings/create">
                      <Button className="h-12 px-8 rounded-xl bg-ink hover:bg-black text-white font-bold transition-all shadow-lg hover:shadow-xl active:scale-95">
                        List a Property
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const SidebarButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
      active 
        ? "bg-ink text-white shadow-xl shadow-ink/10" 
        : "text-neutral-500 hover:bg-white hover:text-ink hover:shadow-sm"
    }`}
  >
    <span className={active ? "text-primary" : "text-neutral-400 group-hover:text-primary transition-colors"}>
      {icon}
    </span>
    {label}
  </button>
);

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

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-white/50 animate-pulse rounded-2xl border border-neutral-200" />
        ))}
      </div>
    );
  }

  if (searches.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-12 rounded-3xl border border-neutral-200/60 text-center shadow-sm">
        <div className="h-20 w-20 bg-sand rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-neutral-300" />
        </div>
        <h3 className="font-display font-bold text-2xl text-ink mb-2">No saved searches</h3>
        <p className="text-neutral-500 mb-8 text-sm max-w-xs mx-auto leading-relaxed">
          Save your search filters to get alerted when new properties match your criteria.
        </p>
        <Link to="/listings">
          <Button variant="outline" className="h-12 px-8 rounded-xl border-neutral-300 font-bold hover:bg-sand transition-all">
            Browse Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searches.map((search, idx) => (
        <motion.div 
          key={search.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group bg-white p-8 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-display font-bold text-xl text-ink group-hover:text-primary transition-colors">{search.name}</h3>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                search.alertEnabled 
                  ? "bg-success/10 text-success border border-success/20" 
                  : "bg-neutral-100 text-neutral-400 border border-neutral-200"
              }`}>
                {search.alertEnabled ? "Alerts Active" : "Alerts Paused"}
              </span>
            </div>
            
            <p className="text-xs text-neutral-400 mb-4 font-medium uppercase tracking-widest">
              Last check: {new Date(search.lastChecked).toLocaleDateString()}
            </p>

            <div className="flex flex-wrap gap-2">
               {Object.entries(search.filters).map(([key, val]) => {
                 if (!val || key === "page") return null;
                 return (
                   <span key={key} className="text-[10px] font-bold uppercase tracking-wider bg-sand text-neutral-600 px-3 py-1.5 rounded-lg border border-neutral-200/50">
                     {key}: {val as any}
                   </span>
                 );
               })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6 sm:pt-0 border-t sm:border-0 border-neutral-100">
            <Button 
               variant="ghost" 
               size="sm" 
               className={`h-11 px-5 rounded-xl font-bold transition-all ${
                 search.alertEnabled ? "text-neutral-400 hover:text-ink" : "text-primary hover:bg-primary/5"
               }`}
               onClick={() => toggleAlert(search.id, search.alertEnabled)}
            >
              {search.alertEnabled ? "Pause" : "Resume"}
            </Button>
            <Button 
               variant="outline" 
               size="sm" 
               className="h-11 px-5 rounded-xl gap-2 font-bold border-neutral-200 hover:bg-sand transition-all"
               onClick={() => viewResults(search.filters)}
            >
              View <ArrowRight className="w-4 h-4" />
            </Button>
            <button 
              onClick={() => deleteSearch(search.id)}
              className="p-3 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 ml-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
