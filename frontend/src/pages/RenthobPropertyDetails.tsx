import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  CheckCircle,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Square,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { getRenthobProperty } from "../data/renthobProperties";

export const RenthobPropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const property = getRenthobProperty(id);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-secondary/30 py-5">
          <div className="container flex items-center justify-between gap-4">
            <Link to="/search" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to search
            </Link>
            <div className="flex gap-2">
              <button className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm hover:bg-accent">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm hover:bg-accent">
                <Heart className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </section>

        <section className="py-6 md:py-10">
          <div className="container">
            <div className="grid gap-3 md:grid-cols-[2fr_1fr]">
              <div className="overflow-hidden rounded-2xl">
                <img src={property.images[0]} alt={property.title} className="h-full min-h-[360px] w-full object-cover" />
              </div>
              <div className="grid gap-3">
                {property.images.slice(1, 3).map((image) => (
                  <div key={image} className="overflow-hidden rounded-2xl">
                    <img src={image} alt={property.title} className="h-full min-h-[172px] w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    {property.type}
                  </span>
                  {property.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified Listing
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">{property.title}</h1>
                    <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {property.address}, {property.state}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-3xl font-bold text-foreground">{property.price}</p>
                    <p className="text-sm text-muted-foreground">per year</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-border py-5 md:grid-cols-4">
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <Bed className="mb-2 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">{property.beds} Bedrooms</p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <Bath className="mb-2 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">{property.baths} Bathrooms</p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <Square className="mb-2 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">{property.sqft}</p>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <Calendar className="mb-2 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">Available {new Date(property.availableFrom).toLocaleDateString()}</p>
                  </div>
                </div>

                <section className="mt-8">
                  <h2 className="font-display text-2xl font-bold text-foreground">About this property</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{property.description}</p>
                </section>

                <section className="mt-8">
                  <h2 className="font-display text-2xl font-bold text-foreground">Amenities</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-8">
                  <h2 className="font-display text-2xl font-bold text-foreground">Why renters like this place</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {property.highlights.map((highlight) => (
                      <div key={highlight} className="rounded-xl bg-secondary/50 p-4 text-sm font-medium text-foreground">
                        {highlight}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <h2 className="font-display text-xl font-bold text-foreground">Contact landlord</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{property.landlord.response}</p>

                  <div className="mt-5 rounded-xl bg-secondary/50 p-4">
                    <p className="font-semibold text-foreground">{property.landlord.name}</p>
                    <p className="text-sm text-muted-foreground">{property.landlord.role}</p>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      {property.landlord.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      {property.landlord.email}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <Link
                      to="/register"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Apply Now
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Ask a Question
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
