import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bath,
  Bed,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Home as HomeIcon,
  MapPin,
  Scale,
  Search,
  Share2,
  Shield,
  Square,
  Users,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { renthobProperties, type RenthobProperty } from "../data/renthobProperties";

const properties = renthobProperties;

const stats = [
  ["500+", "Renters"],
  ["200+", "Landlords"],
  ["98%", "Satisfied"],
];

const benefits = [
  {
    title: "Verified Listings",
    copy: "Every property verified for quality.",
    icon: Shield,
  },
  {
    title: "Quick Applications",
    copy: "Apply in minutes, not hours.",
    icon: Clock,
  },
  {
    title: "Direct Messaging",
    copy: "Message landlords securely.",
    icon: Users,
  },
];

const audiences = [
  {
    title: "For Renters",
    copy: "Search, save, and apply to properties all in one place.",
    action: "Start Searching",
    to: "/search",
    icon: HomeIcon,
    className: "from-accent to-secondary",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "For Landlords",
    copy: "List your property and connect with qualified renters.",
    action: "List Property",
    to: "/list-property",
    icon: Building2,
    className: "from-renthob-blue-50 to-accent",
    buttonClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    title: "For Agents",
    copy: "Manage listings and grow your real estate business.",
    action: "Join as Agent",
    to: "/join-agent",
    icon: Briefcase,
    className: "from-purple-50 to-purple-100",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
  },
];

const PropertyCard = ({ property, index }: { property: RenthobProperty; index: number }) => {
  return (
    <div className="animate-fade-in" style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}>
      <div className="group overflow-hidden rounded-lg border border-border/50 bg-card text-card-foreground shadow-card transition-all duration-300 hover:shadow-soft">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={`${property.title} - Image 1`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            draggable="false"
            loading="lazy"
          />
          <button
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {property.images.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  dotIndex === 0 ? "bg-background" : "bg-background/50"
                }`}
              />
            ))}
          </div>

          <div className="absolute left-3 top-3 flex gap-2">
            <div className="inline-flex items-center rounded-full border border-transparent bg-background/90 px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground backdrop-blur-sm">
              {property.type}
            </div>
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            {[
              ["Save property", Heart],
              ["Add to comparison", Scale],
              ["Share listing", Share2],
            ].map(([label, Icon]) => (
              <button
                key={label as string}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background"
                aria-label={label as string}
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">{property.price}</span>
            <span className="text-sm text-muted-foreground">/yr</span>
          </div>
          <h3 className="mb-1 line-clamp-1 font-semibold text-foreground">{property.title}</h3>
          <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{property.address}</span>
          </div>
          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.beds} beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.baths} baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.sqft}</span>
            </div>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="gradient-hero py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="animate-fade-in mb-3 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Find Your Perfect <span className="text-gradient">Rental Home</span>
              </h1>
              <p className="animate-fade-in mb-5 text-base text-muted-foreground [animation-delay:100ms] md:text-lg">
                Discover rental properties across Nigeria. Connect with trusted landlords instantly.
              </p>

              <div className="relative z-10 rounded-2xl bg-card p-3 shadow-soft animate-fade-in [animation-delay:200ms]">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                        placeholder="Enter city, neighborhood, or address"
                      />
                    </div>
                  </div>
                  <Link
                    to="/search"
                    className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-4 animate-fade-in [animation-delay:300ms] sm:gap-8">
                {stats.map(([value, label], index) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-foreground">{value}</span>
                    <span className="text-xs text-muted-foreground">{label}</span>
                    {index < stats.length - 1 ? (
                      <span className="ml-4 hidden text-border sm:ml-8 sm:inline">|</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">Featured Properties</h2>
                <p className="mt-0.5 text-sm text-muted-foreground">Hand-picked rentals across Nigeria</p>
              </div>
              <Link
                to="/search"
                className="inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {properties.map((property, index) => (
                <PropertyCard key={property.title} property={property} index={index} />
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/listings"
                className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Browse All Properties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-6 md:py-8">
          <div className="container">
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-2 rounded-xl bg-card p-3 shadow-card md:gap-3 md:p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent md:h-10 md:w-10">
                    <benefit.icon className="h-4 w-4 text-accent-foreground md:h-5 md:w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold leading-tight text-foreground md:text-sm">{benefit.title}</h3>
                    <p className="mt-0.5 hidden text-xs text-muted-foreground md:block">{benefit.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 md:py-10">
          <div className="container">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {audiences.map((audience) => (
                <div
                  key={audience.title}
                  className={`flex flex-col rounded-2xl bg-gradient-to-br p-5 md:p-6 ${audience.className}`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <audience.icon
                      className={`h-5 w-5 ${audience.title === "For Agents" ? "text-purple-600" : "text-primary"}`}
                    />
                    <h3 className="font-display text-lg font-bold text-foreground">{audience.title}</h3>
                  </div>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{audience.copy}</p>
                  <Link
                    to={audience.to}
                    className={`inline-flex h-9 items-center justify-center gap-2 self-start whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors ${audience.buttonClass}`}
                  >
                    {audience.action}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gradient-primary py-8">
          <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="font-display text-xl font-bold text-primary-foreground md:text-2xl">
                Ready to Find Your New Home?
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Join thousands of happy renters and landlords on Renthob.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                to="/register"
                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Create Account
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-primary-foreground bg-primary-foreground/10 px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
