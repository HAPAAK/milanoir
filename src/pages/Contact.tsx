import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/milanoir-logo.png";
import FooterSection from "@/components/about/FooterSection";
import StarField from "@/components/ui/StarField";
import GlowingInfinity from "@/components/ui/GlowingInfinity";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@milanoir-events.com",
    href: "mailto:info@milanoir-events.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+44 7887772745",
    href: "tel:+447887772745",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Island Business Centre, 202, SE18 6PF, London",
    href: null,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent! ✨",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Star field */}
        <StarField count={150} />
        
        {/* Glowing Infinity */}
        <GlowingInfinity />
        
        {/* Cosmic orbs */}
        <motion.div
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-cosmic-pink/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-cosmic-cyan/10 rounded-full blur-[140px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cosmic-purple/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 py-6 px-4">
        <div className="container flex items-center justify-end">
          <Link to="/">
            <motion.div
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </motion.div>
          </Link>
        </div>
      </nav>

      {/* Logo Section - Centered at top */}
      <section className="relative z-10 pt-4 pb-8">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Link to="/">
              <motion.img
                src={logo}
                alt="Milanoir Events"
                className="w-48 md:w-56 lg:w-64 animate-glow-pulse"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 glass-card text-xs md:text-sm tracking-widest text-cosmic-pink uppercase">
                Get In Touch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
            >
              <span className="gradient-text">Let's Create Something</span>
              <br />
              <span className="text-foreground">Extraordinary</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Have a vision? Let's bring it to life together. Reach out to discuss your next big event.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-card p-8 md:p-10 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-500">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-heading font-bold mb-2 gradient-text"
                >
                  Send Us a Message
                </motion.h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-foreground">
                        Full Name <span className="text-cosmic-pink">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Business Name"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 hover:border-primary/30"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-foreground">
                        Email Address <span className="text-cosmic-pink">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="business@email.com"
                        required
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 hover:border-primary/30"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="message" className="text-foreground">
                      Message (What's this about?) <span className="text-cosmic-pink">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your vision..."
                      required
                      rows={6}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 resize-none hover:border-primary/30"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-cosmic-pink via-cosmic-purple to-cosmic-cyan hover:opacity-90 text-white font-semibold text-base rounded-xl shadow-lg shadow-cosmic-pink/20 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Join Journey */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Cards */}
              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                  >
                    {info.href ? (
                      <a href={info.href} className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cosmic-pink/20 to-cosmic-purple/20 flex items-center justify-center group-hover:from-cosmic-pink/30 group-hover:to-cosmic-purple/30 transition-all duration-300">
                          <info.icon className="w-6 h-6 text-cosmic-pink group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg gradient-text mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cosmic-pink/20 to-cosmic-purple/20 flex items-center justify-center group-hover:from-cosmic-pink/30 group-hover:to-cosmic-purple/30 transition-all duration-300">
                          <info.icon className="w-6 h-6 text-cosmic-pink group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg gradient-text mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Join Our Journey Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="glass-card p-8 rounded-2xl border border-border/50 relative overflow-hidden hover:border-primary/20 transition-all duration-500"
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cosmic-pink/20 to-transparent rounded-full blur-2xl" />
                
                <h3 className="font-heading font-bold text-2xl gradient-text mb-4">
                  Join Our Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Whether you're an artist seeking to perform on international stages, a sponsor looking to connect with engaged diaspora audiences, a venue partner wanting to host culturally significant events, or simply someone who believes in the power of purposeful entertainment—we invite you to be part of The Beginning of Infinity.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Together, we're not just creating events. We're building a global movement that celebrates culture, supports communities, and proves that exceptional entertainment and meaningful impact can go hand in hand.
                </p>

                <div className="section-divider w-full my-6" />

                {/* Company Info */}
                <div className="space-y-2 text-sm">
                  <p className="text-foreground font-semibold">Milanoir Events Limited</p>
                  <p className="text-muted-foreground">Company Number: 16820191</p>
                  <p className="text-muted-foreground">Registered in England & Wales</p>
                  <p className="text-cosmic-pink italic mt-4">
                    "The Beginning of Infinity — Representing the Nepalese Diaspora Globally"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default Contact;
