import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import FooterSection from "@/components/about/FooterSection";

const PrivacyPolicyPage = () => {
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
              href="/"
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
              <p className="text-lg">Last updated: February 2026</p>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">1. Information We Collect</h2>
                <p>
                  We collect personal information that you voluntarily provide to us, including your name,
                  email address, and any other information you choose to provide.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">2. How We Use Information</h2>
                <p>
                  We use your information to provide and improve our services, communicate with you, and comply
                  with legal obligations.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">3. Data Sharing</h2>
                <p>
                  We do not sell or trade your personal information. We may share it with trusted partners to
                  operate the website and provide services, under confidentiality agreements.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">4. Data Security</h2>
                <p>
                  We implement industry-standard measures to protect your information, but no method of
                  transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">5. Your Rights</h2>
                <p>
                  You may request access to, correction of, or deletion of your personal information. Contact us
                  with any requests.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-foreground">6. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy. Continued use of the site after changes signifies your
                  acceptance of the new terms.
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

export default PrivacyPolicyPage;
