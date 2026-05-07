import { Link } from "react-router-dom";
import { Bath, Bed, Filter, Heart, MapPin, Search, SlidersHorizontal, Square } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { renthobProperties } from "../data/renthobProperties";

const locations = ["All Lagos", "Lekki", "Ikoyi", "Yaba", "Victoria Island"];
const types = ["Any Type", "Apartment", "Duplex", "Penthouse", "Studio"];

export const RenthobSearch = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="gradient-hero py-8 md:py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Start Searching</h1>
              <p className="mt-2 text-muted-foreground">
                Browse verified rentals across Nigeria and connect with trusted landlords instantly.
              </p>
            </div>

            <div className="mx-auto mt-6 max-w-5xl rounded-2xl bg-card p-3 shadow-soft">
              <div className="grid gap-2 md:grid-cols-[1fr_180px_180px_auto]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="h-11 w-full rounded-md border border-input bg-background px-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-ring"
                    placeholder="City, area or estate..."
                  />
                </div>
                <select className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                  {locations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
                <select className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground">
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent">
                <SlidersHorizontal className="h-4 w-4" />
                Show Filters
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">{renthobProperties.length}</strong> properties
                </span>
                <select className="h-11 rounded-md border border-input bg-background px-4 text-sm outline-none">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
              <aside className="hidden rounded-2xl border border-border bg-card p-5 shadow-card lg:block">
                <div className="mb-4 flex items-center gap-2 font-display font-semibold text-foreground">
                  <Filter className="h-4 w-4" />
                  Filters
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Location</p>
                    <div className="space-y-2">
                      {locations.slice(1).map((location) => (
                        <label key={location} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="h-4 w-4 accent-primary" />
                          {location}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Property Type</p>
                    <div className="space-y-2">
                      {types.slice(1).map((type) => (
                        <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <input type="checkbox" className="h-4 w-4 accent-primary" />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              <div className="grid gap-5 md:grid-cols-2">
                {renthobProperties.map((property) => (
                  <Link
                    key={property.id}
                    to={`/property/${property.id}`}
                    className="group overflow-hidden rounded-lg border border-border/50 bg-card shadow-card transition-all duration-300 hover:shadow-soft"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-semibold">
                        {property.type}
                      </span>
                      <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-2xl font-bold text-foreground">{property.price}</span>
                        <span className="text-sm text-muted-foreground">/yr</span>
                      </div>
                      <h2 className="line-clamp-1 font-semibold text-foreground">{property.title}</h2>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="line-clamp-1">{property.address}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {property.beds} beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {property.baths} baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          {property.sqft}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
