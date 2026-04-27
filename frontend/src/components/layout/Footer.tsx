import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-ink text-white pt-24 pb-12 border-t-2 border-primary relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block mb-8 group">
              <span className="text-4xl font-display font-bold tracking-tight">
                Rent<span className="text-primary transition-colors group-hover:text-primary-light">Hub</span>
              </span>
            </Link>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-md font-sans">
              Nigeria's premium AI-powered real estate platform. We're redefining the property search experience with Lagos luxury and modern tech.
            </p>
            
            <div className="mt-10 flex items-center gap-6">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Send, href: "https://t.me/renthub_nigeria" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-sm font-display font-bold uppercase tracking-widest text-primary mb-8">Platform</h4>
              <ul className="space-y-4">
                {["Browse Properties", "AI Area Advisor", "List Your Property", "Verified Listings"].map((item) => (
                  <li key={item}>
                    <Link to={item === "Browse Properties" ? "/listings" : item === "AI Area Advisor" ? "/ai-advisor" : "/register"} className="text-neutral-400 hover:text-white transition-colors font-sans">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display font-bold uppercase tracking-widest text-primary mb-8">Company</h4>
              <ul className="space-y-4">
                {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="text-neutral-400 hover:text-white transition-colors font-sans">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-sm font-display font-bold uppercase tracking-widest text-primary mb-8">Support</h4>
              <ul className="space-y-4">
                {["Help Center", "Property Verification", "Safety Guide", "Telegram Community"].map((item) => (
                  <li key={item}>
                    <Link to="/help" className="text-neutral-400 hover:text-white transition-colors font-sans">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium font-sans">
            © 2026 RentHub Nigeria. Lagos Luxury Meets Modern Proptech.
          </p>
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium font-sans">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
