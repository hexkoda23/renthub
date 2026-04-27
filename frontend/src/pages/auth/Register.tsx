import { RegisterForm } from '../../components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-sand grain overflow-hidden">
      {/* Left Side: Editorial/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ink overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687940-c52af0843990?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Living Space" 
            className="w-full h-full object-cover opacity-40 scale-110 hover:scale-100 transition-transform duration-10000 ease-linear"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full flex flex-col justify-between p-16 text-white">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <span className="text-2xl font-display font-bold">Rent<span className="text-primary italic font-serif">Hub</span></span>
          </Link>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-display font-bold leading-tight mb-6">
                Your Journey <br />
                <span className="text-primary italic font-serif">Starts Here</span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-md font-sans leading-relaxed">
                Join thousands of users finding their dream homes with AI-driven insights and verified listings.
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-neutral-400 uppercase tracking-widest">
              <ShieldCheck className="h-5 w-5 text-primary" />
              100% Verified Properties
            </div>
            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-neutral-500">
              <span>Smart Search</span>
              <span>Price History</span>
              <span>Neighbourhood Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative overflow-y-auto">
        <Link 
          to="/" 
          className="absolute top-8 right-8 lg:left-16 flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-ink transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full my-12 lg:my-0"
        >
          <div className="mb-10">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Get Started
            </div>
            <h2 className="text-4xl font-display font-bold text-ink mb-3">Create Account</h2>
            <p className="text-neutral-500 font-sans leading-relaxed">
              Join the future of Nigerian real estate today.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-neutral-200/60 shadow-xl shadow-ink/5">
            <RegisterForm />
          </div>

          <div className="mt-10 text-center text-sm font-sans text-neutral-500">
            Already have an account? {" "}
            <Link to="/login" className="text-primary font-bold hover:underline transition-all">
              Sign in instead
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
