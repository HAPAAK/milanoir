import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/milanoir-logo-infinity.png";
import FooterSection from "@/components/about/FooterSection";
import PageWrapper from "@/components/layout/PageWrapper";
import { useLanguage } from "@/contexts/LanguageContext";
import { getApiUrl } from "@/lib/api";

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
    value: "+44 7459 803177",
    href: "tel:+447459803177",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Island Business Centre, 202, SE18 6PF, London",
    href: null,
  },
];

const ContactPage = () => {
  const { t } = useLanguage();
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

    try {
      const response = await fetch(getApiUrl("/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorMessage =
          typeof responseData.error === "string"
            ? responseData.error
            : "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }

      toast({
        title: "Message Sent! ✨",
        description:
          typeof responseData.message === "string"
            ? responseData.message
            : "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Message failed",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <PageWrapper>
      <section className="relative z-10 pt-20 md:pt-24 pb-8">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mb-6"
            >
              <img
                src={typeof logo === "string" ? logo : logo.src}
                alt="Milanoir Events"
                className="w-16 md:w-20 opacity-80"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 glass-card text-xs md:text-sm tracking-widest text-primary uppercase">
                {t.contact.getInTouch}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
            >
              <span className="gradient-text">{t.contact.title}</span>
              <br />
              <span className="text-foreground">{t.contact.subtitle}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t.contact.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-12 md:py-20">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
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
                  {t.contact.sendMessage}
                </motion.h2>
                <p className="text-muted-foreground mb-8">{t.contact.formDescription}</p>

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
                        {t.contact.fullName} <span className="text-primary">*</span>
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
                        {t.contact.email} <span className="text-primary">*</span>
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
                      {t.contact.message} <span className="text-primary">*</span>
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
                      className="w-full h-12 bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white font-semibold text-base rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          {t.contact.submit}
                          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
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
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                          <info.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
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
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                          <info.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg gradient-text mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="glass-card p-8 rounded-2xl border border-border/50 relative overflow-hidden hover:border-primary/20 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />

                <h3 className="font-heading font-bold text-2xl gradient-text mb-4">
                  {t.contact.joinJourney}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.contact.joinJourneyText}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <FooterSection />
    </PageWrapper>
  );
};

export default ContactPage;
