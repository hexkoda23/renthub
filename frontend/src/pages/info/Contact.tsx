import { FormEvent } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button, Input } from "../../components/ui";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import toast from "react-hot-toast";

export const Contact = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Our support team will reach out soon.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold font-sora text-neutral-900 mb-4 md:text-5xl">Get in Touch</h1>
            <p className="text-neutral-600">Have questions about a property or need help with a listing? Our team is here for you 24/7.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4 p-6 rounded-3xl bg-neutral-50 border border-neutral-100">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Email Us</h4>
                  <p className="text-neutral-500 text-sm">support@renthub.ng</p>
                  <p className="text-neutral-500 text-sm">hello@renthub.ng</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-3xl bg-neutral-50 border border-neutral-100">
                <div className="h-12 w-12 rounded-2xl bg-success-50 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="text-success-600 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">WhatsApp Support</h4>
                  <p className="text-neutral-500 text-sm">+234 (0) 800-RENTHUB</p>
                  <p className="text-neutral-500 text-sm text-success-600 font-medium">Fastest Response</p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-3xl bg-neutral-50 border border-neutral-100">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-amber-600 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">Office</h4>
                  <p className="text-neutral-500 text-sm">Tech Hub, Lekki Phase 1,</p>
                  <p className="text-neutral-500 text-sm">Lagos, Nigeria.</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-neutral-700">Full Name</label>
                    <Input placeholder="John Doe" className="w-full" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-neutral-700">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="w-full" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2 text-neutral-700">Subject</label>
                  <select className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:ring-2 focus:ring-primary outline-none bg-neutral-50">
                    <option>Property Verification Inquiry</option>
                    <option>Report a Listing</option>
                    <option>Technical Support</option>
                    <option>Business Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-neutral-700">Message</label>
                  <textarea 
                    className="w-full rounded-xl border border-neutral-200 p-4 min-h-[150px] focus:ring-2 focus:ring-primary outline-none text-sm" 
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full py-6 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
