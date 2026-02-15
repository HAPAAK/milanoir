import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import FooterSection from "@/components/about/FooterSection";

const TermsPage = () => {
  return (
    <PageWrapper showNavigation={true}>
      <div className="min-h-screen pt-20 pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </motion.div>

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
              <p className="text-lg">Last updated: February 2026</p>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by these Terms and
                  Conditions. If you do not agree to these terms, please do not use our website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">2. Use of Service</h2>
                <p>
                  You agree to use the Service only for lawful purposes and in a way that does not infringe the
                  rights of others or restrict their use and enjoyment of the Service.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">3. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, and images, is the property of
                  Milanoir Events or its content suppliers and is protected by international copyright laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">4. Limitation of Liability</h2>
                <p>
                  Milanoir Events will not be liable for any damages arising from the use of this website or from
                  any information, content, materials, products, or services included on or otherwise made
                  available to you through this website.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">5. Changes to Terms</h2>
                <p>
                  Milanoir Events reserves the right to modify these Terms and Conditions at any time. Your
                  continued use of the website after changes are posted constitutes your acceptance of the
                  modified terms.
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

export default TermsPage;
