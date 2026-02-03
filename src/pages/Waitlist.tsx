/**
 * Waitlist - Event waitlist registration page
 * Features: Back link, event info with countdown, glassmorphism form
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PageWrapper from "@/components/layout/PageWrapper";
import CountdownTimer from "@/components/home/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { mainEvent, uiText } from "@/data/content";
import logo from "@/assets/milanoir-logo-infinity.png";

// Form validation schema
const waitlistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  postcode: z.string().min(1, "Postcode is required"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy"
  })
});
type WaitlistFormData = z.infer<typeof waitlistSchema>;
const Waitlist = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    }
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema)
  });
  const termsAccepted = watch("termsAccepted");
  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);

    // Simulate API call - replace with actual backend integration
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Waitlist submission:", data);
    toast({
      title: "You're on the list! 🎉",
      description: "We'll notify you when tickets become available."
    });
    setIsSubmitting(false);
  };
  return <PageWrapper showNavigation={true}>
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Back link */}
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }} className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left column - Event info */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="glass-card rounded-3xl p-6 md:p-8 border border-border/30">
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">LONDON</span>
              </div>

              {/* Event title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                <span className="gradient-text">{mainEvent.title}</span>
              </h1>

              {/* Venue status */}
              <p className="text-muted-foreground text-lg mb-8">
                {uiText.eventInfo.venueTba}
              </p>

              {/* Logo */}
              

              {/* Countdown section */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  Countdown to showtime
                </p>
                <CountdownTimer />
              </div>

              {/* Venue and Date badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-4 border border-border/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Venue
                  </p>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    TBA
                  </p>
                  <p className="text-sm text-muted-foreground">London, UK</p>
                </div>
                <div className="glass-card rounded-2xl p-4 border border-border/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Date
                  </p>
                  <p className="text-lg font-heading font-semibold text-foreground">
                    April 14
                  </p>
                  <p className="text-sm text-muted-foreground">2026</p>
                </div>
              </div>
            </motion.div>

            {/* Right column - Registration form */}
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="glass-card rounded-3xl p-6 md:p-8 border border-border/30">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                  <span className="gradient-text">Join London</span>
                </h2>
                <p className="text-muted-foreground">
                  Lock in your waitlist spot for the celebration
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm text-muted-foreground">
                      First Name
                    </Label>
                    <Input id="firstName" {...register("firstName")} placeholder="Enter first name" className="glass-card border-border/40 focus:border-primary/50 bg-background/50 h-12" />
                    {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm text-muted-foreground">
                      Last Name
                    </Label>
                    <Input id="lastName" {...register("lastName")} placeholder="Enter last name" className="glass-card border-border/40 focus:border-primary/50 bg-background/50 h-12" />
                    {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-muted-foreground">
                    Email Address
                  </Label>
                  <Input id="email" type="email" {...register("email")} placeholder="you@example.com" className="glass-card border-border/40 focus:border-primary/50 bg-background/50 h-12" />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>

                {/* Phone and Postcode row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-muted-foreground">
                      Phone
                    </Label>
                    <Input id="phone" type="tel" {...register("phone")} placeholder="+44 7XXX XXXXXX" className="glass-card border-border/40 focus:border-primary/50 bg-background/50 h-12" />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postcode" className="text-sm text-muted-foreground">
                      Postcode
                    </Label>
                    <Input id="postcode" {...register("postcode")} placeholder="SW1A 1AA" className="glass-card border-border/40 focus:border-primary/50 bg-background/50 h-12" />
                    {errors.postcode && <p className="text-xs text-destructive">{errors.postcode.message}</p>}
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox id="terms" checked={termsAccepted || false} onCheckedChange={checked => setValue("termsAccepted", checked === true)} className="mt-0.5" />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <span className="text-primary hover:underline">privacy policy</span>{" "}
                    and{" "}
                    <span className="text-primary hover:underline">terms of service</span>
                  </Label>
                </div>
                {errors.termsAccepted && <p className="text-xs text-destructive">{errors.termsAccepted.message}</p>}

                {/* Submit button */}
                <motion.div whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} className="pt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-base font-semibold rounded-xl relative overflow-hidden group" style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))"
                }}>
                    <motion.span className="absolute inset-0" style={{
                    background: "linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)))"
                  }} initial={{
                    opacity: 0
                  }} whileHover={{
                    opacity: 1
                  }} transition={{
                    duration: 0.3
                  }} />
                    <span className="relative z-10">
                      {isSubmitting ? "Joining..." : "JOIN WAITLIST"}
                    </span>
                  </Button>
                </motion.div>
              </form>

              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none rounded-b-3xl overflow-hidden" style={{
              background: "linear-gradient(to top, hsl(var(--primary) / 0.05), transparent)"
            }} />
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>;
};
export default Waitlist;