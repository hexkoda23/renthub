import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const companyLinks = [
  { label: "How It Works", to: "/help" },
  { label: "Features", to: "/verification" },
  { label: "FAQs", to: "/help" },
  { label: "About Us", to: "/about" },
];

const renterLinks = [
  { label: "Search Properties", to: "/search" },
  { label: "Create Account", to: "/signup?role=renter" },
  { label: "Renter FAQ", to: "/help" },
];

const landlordLinks = [
  { label: "List Your Property", to: "/list-property" },
  { label: "Landlord Features", to: "/verification" },
  { label: "Landlord FAQ", to: "/help" },
];

const agencyLinks = [
  { label: "Join as Agency", to: "/join-agent" },
  { label: "Agency Features", to: "/verification" },
  { label: "Agency FAQ", to: "/help" },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Renthob" className="h-10" />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Making rental searching simple and stress-free. Find your perfect home or list your property with ease.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@renthob.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display font-semibold text-foreground">For Renters</h3>
            <ul className="space-y-3">
              {renterLinks.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-8 font-display font-semibold text-foreground">For Landlords</h3>
            <ul className="space-y-3">
              {landlordLinks.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display font-semibold text-foreground">For Agencies</h3>
            <ul className="space-y-3">
              {agencyLinks.map((link) => (
                <li key={link.label}>
                  <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">Copyright 2026 Renthob. All rights reserved.</p>
          <div className="flex gap-6">
            <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to="/terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
