import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/listings?purpose=rent", label: "Rent" },
    { to: "/listings?purpose=sale", label: "Buy" },
    { to: "/listings?purpose=shortlet", label: "Shortlet" },
    { to: "/ai-advisor", label: "AI Advisor", highlight: true },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-100" 
        : "bg-white/70 backdrop-blur-md"
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img src="/logo.jpg" alt="RentHob Logo" className="h-10 w-auto object-contain rounded-lg" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  link.highlight
                    ? isActive
                      ? "text-primary bg-primary-light"
                      : "text-primary hover:bg-primary-light"
                    : isActive
                    ? "text-primary bg-primary-light"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
            >
              {link.highlight && <Sparkles className="inline h-3.5 w-3.5 mr-1.5 opacity-70" />}
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button size="sm" variant="ghost" className="gap-2 font-medium">
                  <div className="h-6 w-6 rounded-full bg-primary-light flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {(user?.displayName || "U")[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{(user?.displayName || "User").split(" ")[0]}</span>
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={signOut} className="gap-2 border-neutral-200 hidden sm:flex">
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button size="sm" variant="ghost" className="hidden sm:flex font-medium text-neutral-600">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-primary hover:bg-primary-dark text-white rounded-xl shadow-sm shadow-primary/30 font-semibold px-5">
                  Get Started
                </Button>
              </Link>
            </>
          )}
          <button
            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-neutral-100 bg-white"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive ? "text-primary bg-primary-light" : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                >
                  {link.label}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-neutral-100">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-white">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
