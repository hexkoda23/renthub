import { Link } from "react-router-dom";
import { ArrowRight, Building2, Camera, CheckCircle, Home, ShieldCheck } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const steps = [
  ["Add property details", "Tell renters the location, price, type, and availability."],
  ["Upload clear photos", "Show rooms, exterior, amenities, and access roads."],
  ["Verify ownership", "Build renter trust with simple document checks."],
];

export const ListProperty = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="gradient-hero py-10 md:py-16">
          <div className="container grid gap-8 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                For Landlords
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">List your property on Renthob</h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Reach renters who are ready to move, manage enquiries, and verify your listing for more trust.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#property-form"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Start Listing
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/search"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-accent"
                >
                  View Marketplace
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <div className="grid gap-3">
                {[
                  ["Verified landlords get better responses", ShieldCheck],
                  ["Manage photos and property information", Camera],
                  ["Connect directly with qualified renters", Home],
                ].map(([copy, Icon]) => (
                  <div key={copy as string} className="flex items-center gap-3 rounded-xl bg-secondary/50 p-4">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{copy as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container grid gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">How listing works</h2>
              <div className="mt-5 space-y-4">
                {steps.map(([title, copy], index) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4 shadow-card">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <form id="property-form" className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
              <div className="mb-6 flex items-center gap-3">
                <Building2 className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">Property Details</h2>
                  <p className="text-sm text-muted-foreground">Create a draft listing. You can verify it before publishing.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Property title", "Luxury 3-bedroom apartment"],
                  ["Location", "Lekki Phase 1, Lagos"],
                  ["Yearly rent", "4500000"],
                  ["Property type", "Apartment"],
                  ["Bedrooms", "3"],
                  ["Bathrooms", "3"],
                ].map(([label, placeholder]) => (
                  <label key={label} className="grid gap-1.5 text-sm font-medium text-foreground">
                    {label}
                    <input
                      className="h-11 rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                      placeholder={placeholder}
                    />
                  </label>
                ))}
                <label className="grid gap-1.5 text-sm font-medium text-foreground md:col-span-2">
                  Description
                  <textarea
                    className="min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Describe the apartment, amenities, access, and move-in terms."
                  />
                </label>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <CheckCircle className="h-4 w-4" />
                Save Listing Draft
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
