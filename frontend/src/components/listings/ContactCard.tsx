import { useState } from "react";
import { MessageSquare, Phone, Mail, ShieldCheck, X } from "lucide-react";
import { Button, Input } from "../ui";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import toast from "react-hot-toast";

interface ContactCardProps {
  listingId?: string;
  landlordId: string;
  propertyTitle: string;
}

export const ContactCard = ({ listingId = "", landlordId, propertyTitle }: ContactCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // In a real app we'd get these from the landlord's user document
  // Hardcoded for the prototype
  const landlordPhone = "09000000000";

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in your property: "${propertyTitle}" listed on RentHub. Is it still available?`);
    window.open(`https://wa.me/234${landlordPhone.slice(1)}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+234${landlordPhone.slice(1)}`;
  };

  const onSubmitEnquiry = async (data: any) => {
    setIsSubmitting(true);
    try {
      await api.post("/enquiries", {
        listingId,
        landlordId,
        senderName: data.name,
        senderEmail: data.email,
        senderPhone: data.phone,
        message: data.message
      });
      toast.success("Enquiry sent! The landlord will get back to you.");
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error("Failed to send enquiry. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-xl relative z-10">
        <h3 className="mb-6 text-xl font-bold font-sora text-neutral-900">Interested?</h3>
        
        <div className="mb-6 flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-xl border-2 border-white shadow-sm">
            A
          </div>
          <div>
            <p className="font-bold text-neutral-900 flex items-center gap-1.5">
              Verified Agent
              <ShieldCheck className="h-4 w-4 text-primary" />
            </p>
            <p className="text-xs text-neutral-500">Typical response time: 30 mins</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] border-none text-white gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Contact via WhatsApp
          </Button>
          
          <Button 
            onClick={handleCall}
            variant="outline"
            className="w-full gap-2 border-neutral-200"
          >
            <Phone className="h-4 w-4 text-neutral-600" />
            <span className="text-neutral-700">Call Landlord</span>
          </Button>

          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="ghost"
            className="w-full gap-2 text-neutral-500 text-xs mt-2"
          >
            <Mail className="h-3 w-3" />
            Send Email Enquiry
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-50 text-[10px] text-neutral-400 text-center uppercase tracking-widest font-bold">
          Reference: {landlordId.slice(0, 8)}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 bg-neutral-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-2xl font-bold mb-1">Send Enquiry</h3>
            <p className="text-sm text-neutral-500 mb-6">Ask the landlord about viewing times or negotiable terms.</p>
            
            <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-4">
              <div>
                <Input {...register("name", { required: true })} placeholder="Your Full Name" className="w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input {...register("email", { required: true })} type="email" placeholder="Email Address" className="w-full" />
                <Input {...register("phone", { required: true })} placeholder="Phone Number" className="w-full" />
              </div>
              <div>
                <textarea 
                  {...register("message", { required: true })}
                  placeholder={`Hi, I would like to enquire about ${propertyTitle}...`}
                  className="w-full rounded-xl border border-neutral-200 p-4 min-h-[120px] focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <Button type="submit" className="w-full py-6 mt-2" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
