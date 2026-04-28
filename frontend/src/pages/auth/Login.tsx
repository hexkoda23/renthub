import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../../components/auth/LoginForm";
import { useAuthStore } from "../../store/authStore";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Home, CheckCircle, Shield, Zap } from "lucide-react";

export const Login = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

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
                Find Your Perfect <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Home in Nigeria</span>
              </h1>
              <p className="text-neutral-400 text-lg max-w-md leading-relaxed">
                Access verified premium listings and AI-powered neighbourhood insights in one seamless platform.
              </p>
            </motion.div>
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <CheckCircle className="h-5 w-5 text-primary mb-2" />
              <p className="text-sm font-semibold">12,000+</p>
              <p className="text-xs text-neutral-400">Verified Listings</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <Shield className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-sm font-semibold">98%</p>
              <p className="text-xs text-neutral-400">Verified</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <Zap className="h-5 w-5 text-amber-400 mb-2" />
              <p className="text-sm font-semibold">₦0</p>
              <p className="text-xs text-neutral-400">Agent Fee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
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
              Welcome Back
            </div>
            <h2 className="text-2xl font-display font-bold text-ink mb-2">Sign in to RentHob</h2>
            <p className="text-neutral-500 text-sm">
              Enter your credentials to access your dashboard and saved searches.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-100 shadow-card p-6">
            <LoginForm />
          </div>

          <div className="mt-6 text-center text-sm text-neutral-500">
            Don't have an account? {" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create a free account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
