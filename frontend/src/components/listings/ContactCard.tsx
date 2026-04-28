import { useState } from "react";
import { MessageSquare, Phone, Mail, ShieldCheck, X, Send } from "lucide-react";
import { Button, Input } from "../ui";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ContactCardProps {
  listingId?: string;
  landlordId: string;
  propertyTitle: string;
}

export const ContactCard = ({ listingId = "", landlordId, propertyTitle }: ContactCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const landlordPhone = "09000000000";

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in your property: "${propertyTitle}" listed on RentHob. Is it still available?`);
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
      <div className="rounded-[2.5rem] border border-clay/10 bg-white p-8 shadow-2xl relative z-10 overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-clay/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-clay/10 transition-colors duration-500" />
        
        <h3 className="mb-8 text-2xl font-display font-bold text-ink">Interested?</h3>
        
        <div className="mb-8 flex items-center gap-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-sand/30 flex items-center justify-center text-clay font-bold text-2xl border-2 border-white shadow-inner">
              A
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
              <ShieldCheck className="h-5 w-5 text-clay" />
            </div>
          </div>
          <div>
            <p className="font-bold text-ink flex items-center gap-1.5 text-lg">
              Verified Agent
            </p>
            <p className="text-sm text-ink/50 font-medium">Responds in ~30 mins</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleWhatsApp}
            className="w-full h-14 bg-[#25D366] hover:bg-[#20ba59] border-none text-white gap-3 rounded-2xl shadow-lg shadow-green-500/20 font-bold transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageSquare className="h-5 w-5" />
            WhatsApp Message
          </Button>
          
          <Button 
            onClick={handleCall}
            variant="outline"
            className="w-full h-14 gap-3 border-clay/20 bg-sand/10 hover:bg-sand/20 text-ink rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95"
          >
            <Phone className="h-5 w-5 text-clay" />
            Call Agent
          </Button>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 text-clay text-sm font-bold flex items-center justify-center gap-2 hover:text-clay/80 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Send Email Enquiry
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-clay/5 text-[10px] text-ink/30 text-center uppercase tracking-[0.2em] font-bold">
          Reference: {landlordId.slice(0, 8)}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-10 w-full max-w-xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-sand/20 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-3 text-ink/40 hover:text-ink bg-sand/30 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-4xl font-serif text-ink mb-2">Send Enquiry</h3>
              <p className="text-ink/60 mb-10 text-lg">Direct inquiry for {propertyTitle}</p>
              
              <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-display font-bold uppercase tracking-widest text-clay ml-1">Your Full Name</label>
                  <Input 
                    {...register("name", { required: true })} 
                    placeholder="e.g. Chukwuma Obi" 
                    className="h-14 rounded-2xl bg-sand/20 border-none px-6 focus:ring-2 focus:ring-clay/20" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-display font-bold uppercase tracking-widest text-clay ml-1">Email Address</label>
                    <Input 
                      {...register("email", { required: true })} 
                      type="email" 
                      placeholder="name@email.com" 
                      className="h-14 rounded-2xl bg-sand/20 border-none px-6 focus:ring-2 focus:ring-clay/20" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-display font-bold uppercase tracking-widest text-clay ml-1">Phone Number</label>
                    <Input 
                      {...register("phone", { required: true })} 
                      placeholder="080 0000 0000" 
                      className="h-14 rounded-2xl bg-sand/20 border-none px-6 focus:ring-2 focus:ring-clay/20" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-display font-bold uppercase tracking-widest text-clay ml-1">Your Message</label>
                  <textarea 
                    {...register("message", { required: true })}
                    placeholder={`Tell the agent what you're looking for...`}
                    className="w-full rounded-[1.5rem] bg-sand/20 border-none p-6 min-h-[150px] focus:ring-2 focus:ring-clay/20 outline-none transition-all resize-none text-ink"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 mt-4 rounded-2xl bg-clay hover:bg-clay/90 text-white font-bold text-lg shadow-xl shadow-clay/20 gap-3" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ShieldCheck className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Enquiry
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
