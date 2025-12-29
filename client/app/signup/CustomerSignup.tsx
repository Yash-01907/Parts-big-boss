"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Loader2 } from "lucide-react";
import { customerSignup } from "../Data/authLoginInfo";
import { authStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";

export default function CustomerSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Signup States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await customerSignup({ firstName, lastName, email, password });
      
      authStore.login({
        id: data.id || 'temp-id',
        email: data.email || email,
        name: `${firstName} ${lastName}`,
        type: 'customer',
        token: data.token
      });

      router.push('/'); 
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full max-w-[420px] space-y-10">
      <motion.div 
         initial="hidden" 
         animate="visible" 
         transition={{ staggerChildren: 0.1 }}
         className="space-y-2"
      >
        <motion.h2 variants={variants} className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Create Account
        </motion.h2>
        <motion.p variants={variants} className="text-[var(--text-muted)]">
          Join thousands of other customers
        </motion.p>
      </motion.div>

      {/* Form */}
      <motion.form 
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        
        {/* Name Fields */}
        <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <label 
                htmlFor="firstName" 
                className={`text-sm font-medium transition-colors ${focusedField === 'firstName' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                First Name
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  className="
                    w-full px-4 py-3 pl-11
                    bg-[var(--surface)] border border-transparent 
                    rounded-xl text-[var(--foreground)] 
                    placeholder:text-[var(--text-muted)]/50
                    focus:bg-white focus:border-[var(--accent)]/30 focus:ring-4 focus:ring-[var(--accent)]/10
                    transition-all duration-200
                  "
                />
                <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'firstName' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                  <User size={20} />
                </div>
              </div>
            </div>
            
            <div className="space-y-2 flex-1">
              <label 
                htmlFor="lastName" 
                className={`text-sm font-medium transition-colors ${focusedField === 'lastName' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  className="
                    w-full px-4 py-3 pl-11
                    bg-[var(--surface)] border border-transparent 
                    rounded-xl text-[var(--foreground)] 
                    placeholder:text-[var(--text-muted)]/50
                    focus:bg-white focus:border-[var(--accent)]/30 focus:ring-4 focus:ring-[var(--accent)]/10
                    transition-all duration-200
                  "
                />
                <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'lastName' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                  <User size={20} />
                </div>
              </div>
            </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className={`text-sm font-medium transition-colors ${focusedField === 'email' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="
                w-full px-4 py-3 pl-11
                bg-[var(--surface)] border border-transparent 
                rounded-xl text-[var(--foreground)] 
                placeholder:text-[var(--text-muted)]/50
                focus:bg-white focus:border-[var(--accent)]/30 focus:ring-4 focus:ring-[var(--accent)]/10
                transition-all duration-200
              "
            />
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
              <Mail size={20} />
            </div>
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className={`text-sm font-medium transition-colors ${focusedField === 'password' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="
                w-full px-4 py-3 pl-11 pr-11
                bg-[var(--surface)] border border-transparent 
                rounded-xl text-[var(--foreground)] 
                placeholder:text-[var(--text-muted)]/50
                focus:bg-white focus:border-[var(--accent)]/30 focus:ring-4 focus:ring-[var(--accent)]/10
                transition-all duration-200
              "
            />
            <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
              <Lock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-xl">
                {error}
            </div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || !firstName || !lastName || !email || !password}
          type="submit"
          className="
            w-full flex items-center justify-center gap-2
            bg-[var(--accent)] text-white 
            py-3.5 rounded-xl font-bold text-sm tracking-wide
            shadow-xl shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40
            disabled:opacity-70 disabled:cursor-not-allowed
            transition-all duration-300
          "
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Create Account <ArrowRight size={18} strokeWidth={2.5} />
            </>
          )}
        </motion.button>
      </motion.form>

      <p className="text-center text-sm text-[var(--text-secondary)]">
        Already have an account?{" "}
        <Link 
          href="/login" 
          className="font-bold text-[var(--accent)] hover:underline"
        >
          Sign in
        </Link>
      </p>

    </div>  
  );
}
