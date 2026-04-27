import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui";
import { useAuth } from "../../hooks/useAuth";
import { User, LogOut, Menu } from "lucide-react";

export const Navbar = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <span className="text-xl font-bold font-sora tracking-tight">Rent<span className="text-primary">Hub</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-neutral-600"}`}>Home</NavLink>
          <NavLink to="/listings?purpose=rent" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-neutral-600"}`}>Rent</NavLink>
          <NavLink to="/listings?purpose=sale" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-neutral-600"}`}>Buy</NavLink>
          <NavLink to="/ai-advisor" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-neutral-600"}`}>AI Advisor</NavLink>
          <NavLink to="/handover" className={({ isActive }) => `text-sm font-bold transition-colors hover:text-primary ${isActive ? "text-primary" : "text-neutral-600"}`}>Tenant Handover</NavLink>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
               <Link to="/dashboard">
                <Button size="sm" variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{(user?.displayName || "User").split(" ")[0]}</span>
                </Button>
              </Link>
              <Button size="sm" variant="outline" onClick={signOut} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button size="sm" variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
          <button 
            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white p-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            <NavLink 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-neutral-600"}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/listings?purpose=rent" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-neutral-600"}`}
            >
              Rent
            </NavLink>
            <NavLink 
              to="/listings?purpose=sale" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-neutral-600"}`}
            >
              Buy
            </NavLink>
            <NavLink 
              to="/ai-advisor" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-neutral-600"}`}
            >
              AI Advisor
            </NavLink>
            <NavLink 
              to="/handover" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `text-sm font-bold transition-colors ${isActive ? "text-primary" : "text-neutral-600"}`}
            >
              Tenant Handover
            </NavLink>
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-start">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
