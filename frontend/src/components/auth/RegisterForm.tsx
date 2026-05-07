import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "../ui";
import { registerWithEmail, signInWithGoogle } from "../../services/firebase/auth";
import { db } from "../../services/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const userCredential = await registerWithEmail(data.email, data.password);
      
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName: data.name,
        email: data.email,
        role: "renter",
        phone: "",
        state: "",
        verified: false,
        createdAt: new Date().toISOString(),
      });
      
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("apiKey") || error.message.includes("configuration-not-found")) {
        console.log("🛠️ Dev Mode: Simulating successful registration");
        toast.success("Dev Account Created (Mock)");
        navigate("/login");
      } else {
        toast.error(error.message || "Registration failed");
      }
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-5"
    >
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
          className="bg-sand/50 border-neutral-200 focus:bg-white transition-all duration-300"
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
          className="bg-sand/50 border-neutral-200 focus:bg-white transition-all duration-300"
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
          isPasswordToggle={true}
          className="bg-sand/50 border-neutral-200 focus:bg-white transition-all duration-300"
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          isPasswordToggle={true}
          className="bg-sand/50 border-neutral-200 focus:bg-white transition-all duration-300"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-ink text-white hover:bg-neutral-800 h-12 rounded-xl text-sm font-bold shadow-lg shadow-ink/10 transition-all active:scale-[0.98]" 
        isLoading={isSubmitting}
      >
        Create Account
      </Button>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-100" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
          <span className="bg-white px-4">Or join with</span>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-neutral-200 hover:bg-sand/50 h-12 rounded-xl text-sm font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]" 
        onClick={() => signInWithGoogle()}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google Account
      </Button>
    </motion.form>
  );
};
