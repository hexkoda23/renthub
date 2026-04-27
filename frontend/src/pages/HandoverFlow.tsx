import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input } from "../components/ui";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { listingsService } from "../services/listings.service";
import api from "../services/api";

type FlowMode = "entry" | "listing" | "alert" | "success_listing" | "success_alert" | "both_transition";

// We'll store both sets of data in a unified state while navigating the flow
export const HandoverFlow = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<FlowMode>("entry");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeekingAlso, setIsSeekingAlso] = useState(false);

  // Form handling for Listing Flow
  const listingForm = useForm({
    defaultValues: {
      type: "",
      state: "",
      city: "",
      landmark: "",
      budgetSegment: "",
      exactRent: "",
      packOutDate: "",
      electricityBand: "",
      waterSituation: "",
      parkingSituation: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      comments: ""
    }
  });

  // Form handling for Alert Flow
  const alertForm = useForm({
    defaultValues: {
      preferredLocation: "",
      apartmentType: "",
      budgetSegment: "",
      moveInTimeline: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specificAreas: ""
    }
  });

  const handleEntryChoice = (choice: "list" | "alert" | "both") => {
    if (choice === "list" || choice === "both") {
      setIsSeekingAlso(choice === "both");
      setMode("listing");
      setStep(1);
    } else {
      setMode("alert");
      setStep(1); // steps A-E
    }
  };

  const nextListingStep = () => {
    if (step < 6) setStep(step + 1);
  };
  
  const prevListingStep = () => {
    if (step > 1) setStep(step - 1);
    else setMode("entry");
  };

  const nextAlertStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevAlertStep = () => {
    if (step > 1) setStep(step - 1);
    else {
      // If we came from the both transition, going back drops us back to entry
      if (isSeekingAlso) {
        setMode("entry"); 
      } else {
        setMode("entry");
      }
    }
  };

  const submitListing = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Create draft listing
      await listingsService.createListing({
        title: `Handover ${data.type.replace('-', ' ')} in ${data.city || data.state}`,
        description: data.comments || "Handover listing pending verification.",
        price: parseInt(data.exactRent) || 0,
        yearlyPrice: parseInt(data.exactRent) || 0,
        type: data.type === 'mini-flat' ? 'flat' : data.type,
        state: data.state,
        city: data.city,
        address: data.landmark || data.city,
        bedrooms: data.type.includes('bed') ? parseInt(data.type[0]) : 1,
        bathrooms: 1,
        electricityBand: data.electricityBand,
        waterSituation: data.waterSituation,
        parkingSituation: data.parkingSituation,
        isHandoverListing: true,
        packOutDate: data.packOutDate,
        status: "pending" as any, 
        // Just mock some fields for the draft
        amenities: [],
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"], 
        listingType: "owner",
        isNegotiable: true,
      });

      if (isSeekingAlso) {
        // Pre-fill the seeker form with their contact details
        alertForm.setValue("firstName", data.firstName);
        alertForm.setValue("lastName", data.lastName);
        alertForm.setValue("email", data.email);
        alertForm.setValue("phone", data.phone);
        setMode("both_transition");
      } else {
        setMode("success_listing");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit listing. Please ensure you are logged in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const parseBudgetSegment = (segment: string) => {
    if (segment === "Under ₦600k") return { min: 0, max: 600000 };
    if (segment === "₦700k–₦900k") return { min: 700000, max: 900000 };
    if (segment === "₦1m–₦1.5m") return { min: 1000000, max: 1500000 };
    if (segment === "₦1.6m–₦2m") return { min: 1600000, max: 2000000 };
    if (segment === "₦2.1m–₦3m") return { min: 2100000, max: 3000000 };
    if (segment === "₦3.1m–₦4m") return { min: 3100000, max: 4000000 };
    if (segment === "₦4.1m–₦5m") return { min: 4100000, max: 5000000 };
    return { min: 5000001, max: 100000000 };
  };

  const submitAlert = async (data: any) => {
    setIsSubmitting(true);
    try {
      await api.post("/handover/alert", {
        userId: null,
        email: data.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        preferredLocation: data.preferredLocation,
        apartmentType: data.apartmentType,
        yearlyBudgetRange: parseBudgetSegment(data.budgetSegment),
        moveInTimeline: data.moveInTimeline,
        specificAreas: data.specificAreas
      });
      setMode("success_alert");
    } catch (error) {
      console.error(error);
      alert("Failed to create alert.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sora selection:bg-primary selection:text-white">
      {mode !== "entry" && !mode.includes("success") && mode !== "both_transition" && (
        <div className="w-full bg-neutral-100 h-1">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${(step / (mode === "listing" ? 6 : 5)) * 100}%` }}
          />
        </div>
      )}

      <main className="flex-1 max-w-2xl mx-auto w-full p-6 py-12 md:py-24 flex flex-col justify-center">
        
        {/* ENTRY MODE */}
        {mode === "entry" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => navigate("/")} className="mb-12 text-sm text-neutral-500 hover:text-primary flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to RentHub
            </button>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-neutral-900">
              Good places in Nigeria are rare. <br/>
              <span className="text-neutral-400 font-medium">Don't let yours go to waste.</span>
            </h1>
            <p className="text-lg text-neutral-500 mb-12">The RentHub Handover network helps tenants bypass agents. List your outgoing apartment or get notified when one drops.</p>
            
            <div className="flex flex-col gap-4">
              <ChoiceCard 
                title="I'm packing out soon" 
                desc="I want to list my apartment for the next person"
                onClick={() => handleEntryChoice("list")}
              />
              <ChoiceCard 
                title="I'm looking for a place" 
                desc="Alert me when a confirmed apartment matches my search"
                onClick={() => handleEntryChoice("alert")}
              />
              <ChoiceCard 
                title="Both — I'm packing out & looking" 
                desc="I'm leaving and also need somewhere new"
                onClick={() => handleEntryChoice("both")}
              />
            </div>
          </div>
        )}

        {/* LISTING FLOW */}
        {mode === "listing" && (
          <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
            <button onClick={prevListingStep} className="mb-8 text-neutral-400 hover:text-primary flex w-max items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <form onSubmit={listingForm.handleSubmit(submitListing)} className="flex-1 flex flex-col justify-center">
              
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">What type of apartment is it?</h2>
                  <div className="flex flex-wrap gap-3">
                    {["self-contain", "mini-flat", "1-bed", "2-bed", "3-bed", "room-parlour"].map(type => (
                      <Pill 
                        key={type} 
                        label={type.replace("-", " ")} 
                        selected={listingForm.watch("type") === type} 
                        onClick={() => listingForm.setValue("type", type)} 
                      />
                    ))}
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!listingForm.watch("type")} onClick={nextListingStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">Where is it located?</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-neutral-500 font-medium mb-2">State</label>
                      <select {...listingForm.register("state")} className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all">
                        <option value="">Select State...</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Rivers">Rivers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-500 font-medium mb-2">City / Area</label>
                      <Input {...listingForm.register("city")} placeholder="e.g. Yaba, Lekki, Gwarinpa" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-500 font-medium mb-2">Specific Landmark/Bus Stop (Optional)</label>
                      <Input {...listingForm.register("landmark")} placeholder="e.g. Unilag 2nd Gate" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                    </div>
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!listingForm.watch("state") || !listingForm.watch("city")} onClick={nextListingStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">What's the current yearly rent?</h2>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {["Under ₦600k", "₦700k–₦900k", "₦1m–₦1.5m", "₦1.6m–₦2m", "₦2.1m–₦3m", "₦3.1m–₦4m", "₦4.1m–₦5m", "Above ₦5m"].map(seg => (
                      <Pill 
                        key={seg} 
                        label={seg} 
                        selected={listingForm.watch("budgetSegment") === seg} 
                        onClick={() => listingForm.setValue("budgetSegment", seg)} 
                      />
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 font-medium mb-2">Exact amount in Naira</label>
                    <Input type="number" {...listingForm.register("exactRent")} placeholder="e.g. 1200000" className="w-full bg-neutral-50 border-neutral-200 py-6 text-xl" />
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!listingForm.watch("budgetSegment") || !listingForm.watch("exactRent")} onClick={nextListingStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">When are you packing out?</h2>
                  <div className="flex flex-col gap-3">
                    {["Within 1 month", "1–3 months", "3–6 months", "6–12 months"].map(t => (
                      <Pill 
                        key={t} 
                        label={t} 
                        className="w-full justify-start py-5 text-lg"
                        selected={listingForm.watch("packOutDate") === t} 
                        onClick={() => listingForm.setValue("packOutDate", t)} 
                      />
                    ))}
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!listingForm.watch("packOutDate")} onClick={nextListingStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-4 text-neutral-900">A few quick details</h2>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-neutral-700">Light Situation</h3>
                    <div className="flex flex-wrap gap-2">
                       {["Band A (24/7)", "Band B (16–20hrs)", "Band C (12hrs)", "Band D (8hrs)", "No reliable light"].map(b => (
                         <Pill key={b} label={b} selected={listingForm.watch("electricityBand") === b} onClick={() => listingForm.setValue("electricityBand", b)} />
                       ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-neutral-700">Water Situation</h3>
                    <div className="flex flex-wrap gap-2">
                       {["Running water", "Water, not running", "No water"].map(w => (
                         <Pill key={w} label={w} selected={listingForm.watch("waterSituation") === w} onClick={() => listingForm.setValue("waterSituation", w)} />
                       ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-neutral-700">Parking</h3>
                    <div className="flex flex-wrap gap-2">
                       {["Compound parking", "Nearby outside", "Street parking", "No parking"].map(p => (
                         <Pill key={p} label={p} selected={listingForm.watch("parkingSituation") === p} onClick={() => listingForm.setValue("parkingSituation", p)} />
                       ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button type="button" size="lg" disabled={!listingForm.watch("electricityBand") || !listingForm.watch("waterSituation") || !listingForm.watch("parkingSituation")} onClick={nextListingStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">Lastly, how do we contact you?</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <Input {...listingForm.register("firstName")} placeholder="First Name" className="bg-neutral-50 border-neutral-200 py-6" />
                     <Input {...listingForm.register("lastName")} placeholder="Last Name" className="bg-neutral-50 border-neutral-200 py-6" />
                  </div>
                  <Input {...listingForm.register("email")} type="email" placeholder="Email address" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                  <Input {...listingForm.register("phone")} placeholder="Phone / WhatsApp Number" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                  
                  <textarea 
                    {...listingForm.register("comments")} 
                    placeholder="Any extra comments for the next tenant? (Optional)" 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-neutral-900 min-h-[100px] focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-neutral-400"
                  />
                  
                  <div className="pt-8 flex justify-end">
                    <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting || !listingForm.watch("firstName") || !listingForm.watch("email") || !listingForm.watch("phone")}>
                      {isSubmitting ? "Submitting..." : "Submit Listing"}
                    </Button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}


        {/* SEEKER ALERT FLOW */}
        {mode === "alert" && (
          <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
            <button onClick={prevAlertStep} className="mb-8 text-neutral-400 hover:text-primary flex w-max items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            <form onSubmit={alertForm.handleSubmit(submitAlert)} className="flex-1 flex flex-col justify-center">
              
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">Where in Nigeria are you looking?</h2>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {["Lagos Mainland", "Lagos Island", "Abuja", "Port Harcourt", "Ibadan"].map(loc => (
                      <Pill 
                        key={loc} 
                        label={loc} 
                        className="py-4 justify-center"
                        selected={alertForm.watch("preferredLocation") === loc} 
                        onClick={() => alertForm.setValue("preferredLocation", loc)} 
                      />
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 font-medium mb-2">Other State/City</label>
                    <Input 
                      placeholder="e.g. Enugu" 
                      className="w-full bg-neutral-50 border-neutral-200 py-6 text-neutral-900" 
                      onChange={(e) => {
                         alertForm.setValue("preferredLocation", e.target.value);
                      }}
                    />
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!alertForm.watch("preferredLocation")} onClick={nextAlertStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">What type of apartment?</h2>
                  <div className="flex flex-wrap gap-3">
                    {["self-contain", "mini-flat", "1-bed", "2-bed", "3-bed", "flexible"].map(type => (
                      <Pill 
                        key={type} 
                        label={type.replace("-", " ")} 
                        className="py-3 px-6 text-lg"
                        selected={alertForm.watch("apartmentType") === type} 
                        onClick={() => alertForm.setValue("apartmentType", type)} 
                      />
                    ))}
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!alertForm.watch("apartmentType")} onClick={nextAlertStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">What's your yearly budget?</h2>
                  <div className="flex flex-wrap gap-3">
                    {["Under ₦600k", "₦700k–₦900k", "₦1m–₦1.5m", "₦1.6m–₦2m", "₦2.1m–₦3m", "₦3.1m–₦4m", "₦4.1m–₦5m", "Above ₦5m"].map(seg => (
                      <Pill 
                        key={seg} 
                        label={seg} 
                        selected={alertForm.watch("budgetSegment") === seg} 
                        onClick={() => alertForm.setValue("budgetSegment", seg)} 
                      />
                    ))}
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!alertForm.watch("budgetSegment")} onClick={nextAlertStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">When do you need to move in?</h2>
                  <div className="flex flex-col gap-3">
                    {["As soon as possible", "Within 1 month", "1–3 months", "3–6 months (Planning ahead)"].map(t => (
                      <Pill 
                        key={t} 
                        label={t} 
                        className="w-full justify-start py-5 text-lg"
                        selected={alertForm.watch("moveInTimeline") === t} 
                        onClick={() => alertForm.setValue("moveInTimeline", t)} 
                      />
                    ))}
                  </div>
                  <div className="pt-8 flex justify-end">
                    <Button type="button" size="lg" disabled={!alertForm.watch("moveInTimeline")} onClick={nextAlertStep}>Continue</Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-bold mb-8 text-neutral-900">Where should we send alerts?</h2>
                  <div className="grid grid-cols-2 gap-4">
                     <Input {...alertForm.register("firstName")} placeholder="First Name" className="bg-neutral-50 border-neutral-200 py-6" />
                     <Input {...alertForm.register("lastName")} placeholder="Last Name" className="bg-neutral-50 border-neutral-200 py-6" />
                  </div>
                  <Input {...alertForm.register("email")} type="email" placeholder="Email address" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                  <Input {...alertForm.register("phone")} placeholder="Phone / WhatsApp Number" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                  
                  <Input {...alertForm.register("specificAreas")} placeholder="Any highly specific areas? e.g. Yaba Left, Onike (Optional)" className="w-full bg-neutral-50 border-neutral-200 py-6" />
                  
                  <div className="pt-8 flex justify-end">
                    <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isSubmitting || !alertForm.watch("firstName") || !alertForm.watch("email") || !alertForm.watch("phone")}>
                      {isSubmitting ? "Registering Alert..." : "Get Notified"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* TRANSITIONS & SUCCESS STATES */}

        {mode === "both_transition" && (
          <div className="text-center animate-in zoom-in duration-500 max-w-lg mx-auto">
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">Your place is in good hands.</h2>
            <p className="text-neutral-500 text-lg mb-8">We have saved your current place. Now, let's get your preferences for your new apartment.</p>
            <Button size="lg" className="w-full py-6 text-lg" onClick={() => { setMode("alert"); setStep(1); }}>
              Continue to Seeker Alerts
            </Button>
          </div>
        )}

        {mode === "success_listing" && (
          <div className="text-center animate-in zoom-in duration-500 max-w-lg mx-auto">
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4 text-neutral-900">Your place is in good hands.</h2>
            <p className="text-neutral-500 text-lg mb-10 font-medium">You're helping someone find a great home without the usual hassle.</p>
            
            <div className="bg-neutral-50 border border-neutral-100 p-6 rounded-3xl text-left mb-8 space-y-4">
              <h3 className="font-bold text-xl text-neutral-900">Next steps:</h3>
              <div className="flex gap-4 items-start text-neutral-600">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                <p>Send a few clear photos & a short video of the apartment to our verification WhatsApp line.</p>
              </div>
              <div className="flex gap-4 items-start text-neutral-600">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                <p>We'll secretly verify it and get the listing live to thousands of seekers within 24 hours.</p>
              </div>
            </div>

            <a href={`https://wa.me/2349000000000?text=${encodeURIComponent("Hi, I just submitted my apartment on RentHub. Here are the photos:")}`} target="_blank" rel="noreferrer" className="block w-full mb-4">
              <Button size="lg" className="w-full py-6 text-lg bg-[#25D366] hover:bg-[#20bd5a] text-white border-0">
                Send Photos via WhatsApp
              </Button>
            </a>

            <a href="https://t.me/renthub_nigeria" target="_blank" rel="noreferrer" className="block w-full">
              <Button size="lg" variant="outline" className="w-full py-6 text-lg border-neutral-200 hover:bg-[#229ED9] hover:border-[#229ED9] text-neutral-600 hover:text-white transition-all shadow-sm">
                Join our Telegram for instant listing alerts →
              </Button>
            </a>

            <button onClick={() => navigate("/")} className="mt-8 text-neutral-400 hover:text-primary transition-colors font-medium">Return to Home</button>
          </div>
        )}

        {mode === "success_alert" && (
          <div className="text-center animate-in zoom-in duration-500 max-w-lg mx-auto">
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4 text-neutral-900">You're on the list.</h2>
            <p className="text-neutral-500 text-lg mb-8">
              When a verified apartment matching your search is handed over, you'll be among the first to know.
            </p>
            <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl mb-8">
              <p className="text-primary font-bold">Good places don't sit around in Nigeria — so act fast when you receive the email.</p>
            </div>
            <Button size="lg" className="w-full py-6 text-lg shadow-xl shadow-primary/20" onClick={() => navigate("/")}>
               Return to RentHub
            </Button>
          </div>
        )}

      </main>
    </div>
  );
};

// UI Helpers specific to this flow
const ChoiceCard = ({ title, desc, onClick }: { title: string, desc: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full text-left p-6 md:p-8 rounded-3xl border border-neutral-100 bg-white hover:bg-neutral-50 hover:border-primary transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md"
  >
    <div className="flex-1">
      <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-neutral-500 text-sm font-medium">{desc}</p>
    </div>
    <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-all">
      <ArrowLeft className="w-5 h-5 rotate-180 text-neutral-400 group-hover:text-primary" />
    </div>
  </button>
);

const Pill = ({ label, selected, onClick, className = "" }: { label: string, selected: boolean, onClick: () => void, className?: string }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-5 py-3 rounded-2xl border transition-all text-sm font-bold capitalize ${
      selected 
        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
        : "bg-white border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary"
    } ${className}`}
  >
    {label}
  </button>
);
