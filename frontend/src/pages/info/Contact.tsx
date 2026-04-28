import { FormEvent } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button, Input } from "../../components/ui";
import { Mail, MapPin, MessageCircle, Send, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export const Contact = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Our support team will reach out soon.");
  };

  return (
    <div className="min-h-screen bg-sand grain">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-neutral-200 text-xs font-bold uppercase tracking-widest text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Contact Us
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-ink mb-6">
              Get in <span className="text-primary italic font-serif">Touch</span>
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Have questions about a property or need help with a listing? <br className="hidden md:block" />
              Our dedicated team is here for you 24/7.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-7xl mx-auto">
            {/* Contact Info Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="group p-8 rounded-[2rem] bg-white border border-neutral-200/60 shadow-xl shadow-ink/5 hover:border-primary/30 transition-all duration-500">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Mail className="text-primary h-7 w-7" />
                </div>
                <h4 className="text-xl font-display font-bold text-ink mb-2">Email Us</h4>
                <p className="text-neutral-500 mb-4">Our team typically responds within 2 hours.</p>
                <div className="space-y-1">
                  <p className="text-ink font-bold">support@renthob.ng</p>
                  <p className="text-ink font-bold">hello@renthob.ng</p>
                </div>
              </div>

              <div className="group p-8 rounded-[2rem] bg-ink text-white shadow-2xl shadow-ink/20 hover:scale-[1.02] transition-all duration-500">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MessageCircle className="text-primary h-7 w-7" />
                </div>
                <h4 className="text-xl font-display font-bold mb-2">WhatsApp Direct</h4>
                <p className="text-neutral-400 mb-4">Fastest response for urgent property inquiries.</p>
                <p className="text-primary text-2xl font-display font-bold">+234 (0) 800-RENTHOB</p>
              </div>

              <div className="group p-8 rounded-[2rem] bg-white border border-neutral-200/60 shadow-xl shadow-ink/5 hover:border-primary/30 transition-all duration-500">
                <div className="h-14 w-14 rounded-2xl bg-sand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="text-ink h-7 w-7" />
                </div>
                <h4 className="text-xl font-display font-bold text-ink mb-2">Headquarters</h4>
                <p className="text-neutral-500 mb-4">Visit us at our physical office for partnerships.</p>
                <p className="text-ink font-bold leading-relaxed">
                  Tech Hub, Floor 4, Lekki Phase 1, <br />
                  Lagos, Nigeria.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 bg-white rounded-[3rem] border border-neutral-200/60 p-10 md:p-16 shadow-2xl shadow-ink/5"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Full Name</label>
                    <Input 
                      placeholder="John Doe" 
                      className="h-14 bg-sand/30 border-neutral-200 focus:bg-white rounded-2xl" 
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="h-14 bg-sand/30 border-neutral-200 focus:bg-white rounded-2xl" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Inquiry Type</label>
                  <select className="w-full h-14 rounded-2xl border border-neutral-200 px-5 text-sm font-medium focus:ring-2 focus:ring-primary outline-none bg-sand/30 focus:bg-white transition-all appearance-none cursor-pointer">
                    <option>Property Verification Inquiry</option>
                    <option>Report a Listing</option>
                    <option>Technical Support</option>
                    <option>Business Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Your Message</label>
                  <textarea 
                    className="w-full rounded-3xl border border-neutral-200 p-6 min-h-[180px] focus:ring-2 focus:ring-primary outline-none text-sm font-medium bg-sand/30 focus:bg-white transition-all" 
                    placeholder="How can we assist you today?"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 rounded-2xl bg-ink text-white hover:bg-neutral-800 font-bold flex items-center justify-center gap-3 shadow-xl shadow-ink/10 transition-all active:scale-[0.98]"
                >
                  <Send className="h-5 w-5" />
                  Send Inquiry
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
