/**
 * Privacy Policy page
 * Placeholder content for legal compliance
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import FooterSection from "@/components/about/FooterSection";

const PrivacyPolicy = () => {
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
              <span className="gradient-text">Privacy Policy</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-lg">
                Last updated: February 2026
              </p>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  1. Information We Collect
                </h2>
                <p>
                  When you join our waitlist or contact us, we collect personal information including your name, email address, and optionally your phone number. This information is used solely to communicate with you about our events and services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Send you updates about our events</li>
                  <li>Notify you when tickets become available</li>
                  <li>Respond to your inquiries</li>
                  <li>Improve our services</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  3. Data Protection
                </h2>
                <p>
                  We implement appropriate security measures to protect your personal information. Your data is stored securely and we do not sell or share your information with third parties for marketing purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  4. Your Rights
                </h2>
                <p>
                  Under GDPR, you have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@milanoir-events.com.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  5. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <p>
                  <strong>Milanoir Events Limited</strong><br />
                  Island Business Centre, 202, SE18 6PF, London<br />
                  Email: info@milanoir-events.com<br />
                  Phone: +44 7459 803177
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

export default PrivacyPolicy;
