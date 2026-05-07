import { Link } from "react-router-dom";
import { BarChart3, Briefcase, CheckCircle, MessageSquare, Users } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

const benefits = [
  ["Centralized listings", "Manage all active rental inventory from one clean workspace.", Briefcase],
  ["Qualified renters", "Receive enquiries from renters who already know location, budget, and move-in timeline.", Users],
  ["Lead messaging", "Keep conversations organized and respond faster to serious prospects.", MessageSquare],
  ["Performance insights", "Track views, saves, and enquiries so you know what is working.", BarChart3],
];

export const JoinAgent = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="gradient-hero py-10 md:py-16">
          <div className="container grid gap-8 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                For Agents & Agencies
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
                Grow your rental business with Renthob
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Publish verified listings, manage renter enquiries, and build trust with a professional agency profile.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#agent-form"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-purple-600 px-5 text-sm font-medium text-white hover:bg-purple-700"
                >
                  Join as Agent
                </a>
                <Link
                  to="/list-property"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-accent"
                >
                  List a Property
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-5 shadow-soft">
              <div className="grid gap-3">
                {benefits.map(([title, copy, Icon]) => (
                  <div key={title as string} className="rounded-xl bg-secondary/50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-purple-600" />
                      <h2 className="font-semibold text-foreground">{title as string}</h2>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{copy as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container grid gap-8 lg:grid-cols-[1fr_420px]">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Built for high-trust rental work</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  "Agency profile and verification badge",
                  "Property publishing workflow",
                  "Renter contact history",
                  "Listing performance metrics",
                  "Role-based agent accounts",
                  "Support for premium properties",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form id="agent-form" className="rounded-2xl border border-border bg-card p-5 shadow-soft md:p-6">
              <h2 className="font-display text-2xl font-bold text-foreground">Create agency profile</h2>
              <p className="mt-1 text-sm text-muted-foreground">Tell us about your agency and we will prepare your workspace.</p>

              <div className="mt-5 grid gap-4">
                {[
                  ["Agency name", "PrimeKey Realty"],
                  ["Contact person", "Ada Johnson"],
                  ["Work email", "agent@example.com"],
                  ["Phone number", "+234 800 000 0000"],
                  ["Primary city", "Lagos"],
                ].map(([label, placeholder]) => (
                  <label key={label} className="grid gap-1.5 text-sm font-medium text-foreground">
                    {label}
                    <input
                      className="h-11 rounded-md border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
                      placeholder={placeholder}
                    />
                  </label>
                ))}
              </div>

              <button
                type="button"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-purple-600 px-5 text-sm font-medium text-white hover:bg-purple-700"
              >
                Submit Agent Profile
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
