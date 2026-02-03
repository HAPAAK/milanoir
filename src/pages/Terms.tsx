/**
 * Terms & Conditions page
 * Placeholder content for legal compliance
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import FooterSection from "@/components/about/FooterSection";

const Terms = () => {
  return (
    <PageWrapper showNavigation={true}>
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </motion.div>

          {/* Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-border/30"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              <span className="gradient-text">Terms & Conditions</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-lg">
                Last updated: February 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  2. Use of Service
                </h2>
                <p>
                  Our website allows you to join waitlists for events, contact us, and learn about our services. You agree to provide accurate information when using these services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  3. Intellectual Property
                </h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of Milanoir Events Limited and is protected by copyright laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  4. Event Tickets
                </h2>
                <p>
                  Joining a waitlist does not guarantee ticket availability. Ticket purchases are subject to separate terms and conditions provided at the time of purchase.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  5. Limitation of Liability
                </h2>
                <p>
                  Milanoir Events Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  6. Governing Law
                </h2>
                <p>
                  These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  7. Contact
                </h2>
                <p>
                  For questions about these Terms & Conditions:
                </p>
                <p>
                  <strong>Milanoir Events Limited</strong><br />
                  Company Number: 16820191<br />
                  Island Business Centre, 202, SE18 6PF, London<br />
                  Email: info@milanoir-events.com
                </p>
              </section>
            </div>
          </motion.article>
        </div>
      </div>
      <FooterSection />
    </PageWrapper>
  );
};

export default Terms;
