import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-ink text-neutral-400 pt-16 pb-8 border-t-2 border-gradient-to-r from-primary to-accent relative overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center mb-6 group">
              <div className="bg-white p-2 rounded-xl">
                <img src="/logo.jpg" alt="RentHob Logo" className="h-10 w-auto object-contain" />
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-md mb-8">
              Nigeria's smartest property platform. Find verified rentals, properties for sale, and shortlets with AI-powered neighbourhood insights.
            </p>
            
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Send, href: "https://t.me/renthob_nigeria" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-display font-semibold text-white mb-6">Platform</h4>
              <ul className="space-y-3">
                {["Browse Properties", "AI Area Advisor", "List Your Property", "Verified Listings"].map((item) => (
                  <li key={item}>
                    <Link to={item === "Browse Properties" ? "/listings" : item === "AI Area Advisor" ? "/ai-advisor" : "/register"} className="text-sm text-neutral-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm font-display font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                {["Help Center", "Property Verification", "Safety Guide", "Telegram Community"].map((item) => (
                  <li key={item}>
                    <Link to="/help" className="text-sm text-neutral-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            © 2025 RentHob Nigeria. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
