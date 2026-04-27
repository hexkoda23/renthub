import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, Menu, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => cn(
    "relative text-sm font-medium transition-all duration-300 py-1",
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full",
    isScrolled || !isHomePage ? "text-white/90 hover:text-white" : "text-neutral-700 hover:text-ink",
    isActive && "after:w-full text-primary"
  );

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled 
          ? "h-14 bg-ink/90 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
          : "h-20 bg-transparent"
      )}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="relative flex items-center">
            <span className={cn(
              "text-2xl font-display font-bold tracking-tight transition-colors duration-300",
              isScrolled || !isHomePage ? "text-white" : "text-ink"
            )}>
              Rent<span className="text-primary">Hub</span>
            </span>
            <motion.div 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -right-2 top-1 h-1.5 w-1.5 rounded-full bg-primary"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/listings?purpose=rent" className={navLinkClass}>Rent</NavLink>
          <NavLink to="/listings?purpose=sale" className={navLinkClass}>Buy</NavLink>
          <NavLink to="/ai-advisor" className={navLinkClass}>AI Advisor</NavLink>
          <NavLink to="/handover" className={navLinkClass}>Handover</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/create-listing">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "border border-white/10 text-white hover:bg-white/10",
                  !(isScrolled || !isHomePage) && "border-ink/10 text-ink hover:bg-ink/5"
                )}
              >
                <Plus className="mr-2 h-4 w-4" />
                List Property
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-display text-xs font-bold hover:bg-primary hover:text-white transition-all">
                    {(user?.displayName || "U").charAt(0).toUpperCase()}
                  </div>
                </Link>
                <button 
                  onClick={signOut}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    isScrolled || !isHomePage ? "text-white/60 hover:text-white hover:bg-white/10" : "text-neutral-500 hover:text-ink hover:bg-ink/5"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className={cn(
                  "text-sm font-display font-medium transition-colors",
                  isScrolled || !isHomePage ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-ink"
                )}>
                  Sign In
                </Link>
                <Link to="/register">
                  <Button size="sm" variant="primary">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button 
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled || !isHomePage ? "text-white/80 hover:bg-white/10" : "text-ink hover:bg-ink/5"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 z-[60] bg-ink flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display font-bold text-white">
                Rent<span className="text-primary">Hub</span>
              </span>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { label: "Home", to: "/" },
                { label: "Rent", to: "/listings?purpose=rent" },
                { label: "Buy", to: "/listings?purpose=sale" },
                { label: "AI Advisor", to: "/ai-advisor" },
                { label: "Handover", to: "/handover" },
                { label: "List Property", to: "/create-listing" }
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-display font-bold text-white hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/30" />
      )}
    </nav>
  );
};
