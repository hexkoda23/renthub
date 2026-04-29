import { RegisterForm } from '../../components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Home, CheckCircle, Zap, MessageSquare } from 'lucide-react';

export const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Left Side: Dark gradient with branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-ink to-ink-soft overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #6C63FF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        {/* Gradient blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-primary/30">
              <Home className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-xl font-display font-bold">Rent<span className="text-primary">Hob</span></span>
          </Link>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
                Your Journey <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Starts Here</span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-md leading-relaxed">
                Join thousands of users finding their dream homes with AI-driven insights and verified listings.
              </p>
            </motion.div>
          </div>

          {/* Feature list */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center gap-3 text-sm font-medium text-neutral-300">
              <CheckCircle className="h-5 w-5 text-primary" />
              12,000+ Verified Properties
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-neutral-300">
              <Zap className="h-5 w-5 text-amber-400" />
              Zero Agent Fees
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-neutral-300">
              <MessageSquare className="h-5 w-5 text-accent" />
              AI-Powered Neighbourhood Insights
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
        <Link 
          to="/" 
          className="absolute top-6 right-6 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Get Started
            </div>
            <h2 className="text-2xl font-display font-bold text-ink mb-2">Create Account</h2>
            <p className="text-neutral-500 text-sm">
              Join the future of Nigerian real estate today.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 shadow-card p-6">
            <RegisterForm />
          </div>

          <div className="mt-6 text-center text-sm text-neutral-500">
            Already have an account? {" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in instead
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
