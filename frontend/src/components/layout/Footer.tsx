import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-neutral-100 bg-neutral-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <span className="text-xl font-bold font-sora">Rent<span className="text-primary">Hub</span></span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Nigeria's #1 AI-powered real estate platform. We help you find verified properties and offer expert neighbourhood advice.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-neutral-900">Platform</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/listings" className="hover:text-primary transition-colors">Browse Properties</Link></li>
              <li><Link to="/ai-advisor" className="hover:text-primary transition-colors">AI Area Advisor</Link></li>
              <li><Link to="/register" className="hover:text-primary transition-colors">List Your Property</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-neutral-900">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy & Terms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-neutral-900">Support</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/verification" className="hover:text-primary transition-colors">Property Verification</Link></li>
              <li><a href="https://t.me/renthub_nigeria" target="_blank" rel="noreferrer" className="hover:text-[#229ED9] transition-colors font-semibold flex items-center gap-1">Telegram Community ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-400 font-medium">© 2025 RentHub Nigeria. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Social Icons Placeholder */}
            <span className="h-5 w-5 rounded bg-neutral-200" />
            <span className="h-5 w-5 rounded bg-neutral-200" />
            <span className="h-5 w-5 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </footer>
  );
};
