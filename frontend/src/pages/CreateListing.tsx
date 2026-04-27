import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button, Input } from "../components/ui";
import { listingsService } from "../services/listings.service";
import { 
  NIGERIA_STATES, 
  PROPERTY_TYPES, 
  ELECTRICITY_BANDS, 
  WATER_OPTIONS, 
  PARKING_OPTIONS, 
  PROPERTY_CONDITIONS, 
  LAND_TITLES, 
  LISTING_PURPOSES,
  AMENITIES
} from "@renthub/shared";

const createListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().positive("Price must be a positive number"),
  type: z.enum(["flat", "duplex", "self-contain", "room", "bungalow", "mansion"]),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(5, "Address is required"),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  amenities: z.array(z.string()),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  
  // Nigerian-specific fields
  listingPurpose: z.enum(["rent", "sale", "shortlet"]).optional(),
  rentFrequency: z.enum(["monthly", "yearly"]).optional(),
  yearlyPrice: z.number().positive().optional().or(z.literal(0)),
  estateName: z.string().optional(),
  
  // Buy & Shortlet specific fields
  salePrice: z.number().positive().optional().or(z.literal(0)),
  landSize: z.string().optional(),
  landSizeUnit: z.enum(["sqm", "plots", "acres"]).optional().or(z.literal("")),
  
  shortletPricing: z.object({
    perNight: z.number().positive().optional().or(z.literal(0)),
    perWeek: z.number().positive().optional().or(z.literal(0)),
    minimumStay: z.number().int().positive().optional().or(z.literal(0)),
  }).optional(),

  electricityBand: z.enum(["band-a", "band-b", "band-c", "band-d", "none"]).optional().or(z.literal("")),
  waterSituation: z.enum(["running", "not-running", "none"]).optional().or(z.literal("")),
  parkingSituation: z.enum(["compound", "nearby", "street", "none"]).optional().or(z.literal("")),
  propertyCondition: z.enum(["newly-built", "renovated", "old-but-clean", "needs-work"]).optional().or(z.literal("")),
  landTitle: z.enum(["c-of-o", "r-of-o", "excision", "deed-of-assignment", "none"]).nullable().optional().or(z.literal("")),
  
  isNegotiable: z.boolean().optional(),
  agentFee: z.number().nonnegative().optional().or(z.literal(0)),
  cautionFee: z.number().nonnegative().optional().or(z.literal(0)),
  agreementFee: z.number().nonnegative().optional().or(z.literal(0)),
  listingType: z.enum(["owner", "agent"]).optional(),
  
  isHandoverListing: z.boolean().optional(),
  packOutDate: z.string().nullable().optional(),
  
  // Hardcoded for now
  coordinates: z.object({ lat: z.number(), lng: z.number() }).default({ lat: 6.5244, lng: 3.3792 }),
});

type CreateListingFormValues = z.infer<typeof createListingSchema>;

export const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateListingFormValues>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      type: "flat",
      state: "",
      city: "",
      address: "",
      bedrooms: 1,
      bathrooms: 1,
      amenities: [],
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"], // mock image
      listingPurpose: "rent",
      rentFrequency: "yearly",
      yearlyPrice: 0,
      estateName: "",
      electricityBand: "",
      waterSituation: "",
      parkingSituation: "",
      propertyCondition: "",
      landTitle: "",
      isNegotiable: true,
      agentFee: 0,
      cautionFee: 0,
      agreementFee: 0,
      listingType: "owner",
      isHandoverListing: false,
      packOutDate: "",
      coordinates: { lat: 6.5244, lng: 3.3792 },
      salePrice: 0,
      landSize: "",
      landSizeUnit: "",
      shortletPricing: {
        perNight: 0,
        perWeek: 0,
        minimumStay: 1,
      },
    },
  });

  const purpose = form.watch("listingPurpose");

  const onSubmit = async (data: CreateListingFormValues) => {
    setIsSubmitting(true);
    try {
      // Clean up empty strings for enums
      const cleanedData = {
        ...data,
        electricityBand: data.electricityBand === "" ? undefined : data.electricityBand,
        waterSituation: data.waterSituation === "" ? undefined : data.waterSituation,
        parkingSituation: data.parkingSituation === "" ? undefined : data.parkingSituation,
        propertyCondition: data.propertyCondition === "" ? undefined : data.propertyCondition,
        landTitle: data.landTitle === "" ? undefined : data.landTitle,
        packOutDate: data.packOutDate === "" ? null : data.packOutDate,
      };

      if (cleanedData.rentFrequency === "monthly" && !cleanedData.yearlyPrice && cleanedData.price) {
         cleanedData.yearlyPrice = cleanedData.price * 12;
      }

      await listingsService.createListing(cleanedData as any);
      toast.success("Listing created successfully!");
      navigate("/listings");
    } catch (error: any) {
      toast.error(error.message || "Failed to create listing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    // Ideally trigger validation for the fields in the current step
    setStep(prev => Math.min(prev + 1, 4));
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
          
          <div className="mb-8 border-b pb-6">
            <h1 className="text-2xl font-bold font-sora text-neutral-900">List Your Property</h1>
            <p className="text-neutral-500 mt-1">Provide detailed information to help tenants find your property faster.</p>
            
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-primary' : 'bg-neutral-100'}`} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-neutral-500">
              <span>Basic Info</span>
              <span>Details</span>
              <span>Conditions</span>
              <span>Fees & Pricing</span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* STEP 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-lg font-bold text-neutral-900 border-b pb-2">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <Input {...form.register("title")} placeholder="e.g. Spacious 3 Bedroom Flat with BQ" className="w-full" />
                    {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <textarea 
                      {...form.register("description")} 
                      className="w-full rounded-xl border border-neutral-200 p-3 min-h-[120px] focus:ring-2 focus:ring-primary outline-none" 
                      placeholder="Describe the property..."
                    />
                    {form.formState.errors.description && <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Purpose</label>
                    <select {...form.register("listingPurpose")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                      {LISTING_PURPOSES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-1">Property Type</label>
                    <select {...form.register("type")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                      {PROPERTY_TYPES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Bedrooms</label>
                    <Input type="number" {...form.register("bedrooms", { valueAsNumber: true })} className="w-full" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-1">Bathrooms</label>
                    <Input type="number" {...form.register("bathrooms", { valueAsNumber: true })} className="w-full" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Location & Details */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-lg font-bold text-neutral-900 border-b pb-2">Location & Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">State</label>
                    <select {...form.register("state")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                      <option value="">Select State</option>
                      {NIGERIA_STATES.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                    </select>
                    {form.formState.errors.state && <p className="text-red-500 text-xs mt-1">{form.formState.errors.state.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-1">City/Area</label>
                    <Input {...form.register("city")} placeholder="e.g. Lekki Phase 1" className="w-full" />
                    {form.formState.errors.city && <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Street Address</label>
                    <Input {...form.register("address")} placeholder="e.g. 15 Admiralty Way" className="w-full" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Estate Name (Optional)</label>
                    <Input {...form.register("estateName")} placeholder="e.g. Richmond Gate Estate" className="w-full" />
                    <p className="text-xs text-neutral-500 mt-1">If the property is inside a private estate.</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-4 border rounded-xl bg-neutral-50">
                      {AMENITIES.map(amenity => (
                        <label key={amenity} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" value={amenity} {...form.register("amenities")} className="text-primary focus:ring-primary rounded" />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Nigerian Conditions */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-lg font-bold text-neutral-900 border-b pb-2">Property Conditions</h2>
                <div className="bg-primary/5 p-4 rounded-xl mb-4 border border-primary/10">
                  <p className="text-sm text-primary font-medium">Be transparent about these conditions to get matching tenants faster.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-semibold mb-1">⚡ Electricity (NEPA) Band</label>
                     <select {...form.register("electricityBand")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                       <option value="">Select Band</option>
                       {ELECTRICITY_BANDS.map(b => <option key={b.value} value={b.value}>{b.label} - {b.description}</option>)}
                     </select>
                  </div>
                  
                  <div>
                     <label className="block text-sm font-semibold mb-1">💧 Water Situation</label>
                     <select {...form.register("waterSituation")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                       <option value="">Select Water Situation</option>
                       {WATER_OPTIONS.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm font-semibold mb-1">🚗 Parking Situation</label>
                     <select {...form.register("parkingSituation")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                       <option value="">Select Parking</option>
                       {PARKING_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                     </select>
                  </div>
                  
                  <div>
                     <label className="block text-sm font-semibold mb-1">🏠 Property Condition</label>
                     <select {...form.register("propertyCondition")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                       <option value="">Select Condition</option>
                       {PROPERTY_CONDITIONS.map(c => <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
                     </select>
                  </div>

                  <div className="md:col-span-2">
                     <label className="block text-sm font-semibold mb-1">📋 Land Title (For Sales mainly)</label>
                     <select {...form.register("landTitle")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                       <option value="">Select Title (Or leave blank for Rent)</option>
                       {LAND_TITLES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                     </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Pricing & Fees */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-lg font-bold text-neutral-900 border-b pb-2">Pricing & Extra Fees</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purpose === "rent" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Rent Base Price (₦)</label>
                        <Input type="number" {...form.register("price", { valueAsNumber: true })} className="w-full font-bold text-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Rent Frequency</label>
                        <select {...form.register("rentFrequency")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white text-lg">
                          <option value="yearly">Yearly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </>
                  )}

                  {purpose === "sale" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Sale Price (₦)</label>
                        <Input type="number" {...form.register("salePrice", { valueAsNumber: true })} className="w-full font-bold text-lg text-success-700" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-semibold mb-1">Land Size</label>
                          <Input {...form.register("landSize")} placeholder="e.g. 500" className="w-full" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1">Unit</label>
                          <select {...form.register("landSizeUnit")} className="w-full rounded-xl border border-neutral-200 p-3 outline-none focus:ring-2 focus:ring-primary bg-white">
                            <option value="sqm">sqm</option>
                            <option value="plots">plots</option>
                            <option value="acres">acres</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {purpose === "shortlet" && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Price per Night (₦)</label>
                        <Input type="number" {...form.register("shortletPricing.perNight", { valueAsNumber: true })} className="w-full font-bold text-lg text-purple-600" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-semibold mb-1">Price per Week (₦)</label>
                          <Input type="number" {...form.register("shortletPricing.perWeek", { valueAsNumber: true })} className="w-full" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1">Min. Stay (Days)</label>
                          <Input type="number" {...form.register("shortletPricing.minimumStay", { valueAsNumber: true })} className="w-full" />
                        </div>
                      </div>
                    </>
                  )}

                  {purpose === "rent" && (
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border p-4 bg-neutral-50 rounded-xl">
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-neutral-600">Agency Fee (₦)</label>
                        <Input type="number" {...form.register("agentFee", { valueAsNumber: true })} className="w-full bg-white" placeholder="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-neutral-600">Agreement Fee (₦)</label>
                        <Input type="number" {...form.register("agreementFee", { valueAsNumber: true })} className="w-full bg-white" placeholder="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1 text-neutral-600">Caution Fee (₦)</label>
                        <Input type="number" {...form.register("cautionFee", { valueAsNumber: true })} className="w-full bg-white" placeholder="0" />
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-2 flex flex-col gap-3">
                    <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-neutral-50">
                      <input type="checkbox" {...form.register("isNegotiable")} className="w-5 h-5 text-primary rounded" />
                      <div>
                        <p className="font-semibold text-sm">Open to Negotiation</p>
                        <p className="text-xs text-neutral-500">Allow potential tenants to negotiate the price.</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-neutral-50">
                      <input type="checkbox" {...form.register("isHandoverListing")} className="w-5 h-5 text-amber-500 rounded" />
                      <div>
                        <p className="font-semibold text-sm text-amber-700">This is a Handover / Moving-out Listing</p>
                        <p className="text-xs text-neutral-500">You are the current tenant looking for a replacement.</p>
                      </div>
                    </label>
                  </div>

                  {form.watch("isHandoverListing") && (
                    <div className="md:col-span-2">
                       <label className="block text-sm font-semibold mb-1 text-amber-700">Pack-out Date</label>
                       <Input type="date" {...form.register("packOutDate")} className="w-full border-amber-200 focus:ring-amber-500" />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-1">Listed By</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="owner" {...form.register("listingType")} className="text-primary" />
                        <span className="text-sm font-medium">Landlord/Owner directly</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" value="agent" {...form.register("listingType")} className="text-primary" />
                        <span className="text-sm font-medium">Real Estate Agent</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t mt-8">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
              ) : <div></div>}
              
              {step < 4 ? (
                <Button type="button" onClick={nextStep}>Next Step</Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                  {isSubmitting ? "Publishing..." : "Publish Listing"}
                </Button>
              )}
            </div>
            
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
