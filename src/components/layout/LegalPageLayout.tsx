/**
 * LegalPageLayout - Shared layout for legal pages (Privacy Policy, Terms, etc.)
 * Renders a back button, title, last-updated date, and a list of sections.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "./PageWrapper";
import Footer from "./Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import type { LegalSection } from "@/data/legalContent";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const LegalPageLayout = ({ title, lastUpdated, sections }: LegalPageLayoutProps) => {
  const { t } = useLanguage();

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
              <span className="text-sm font-medium">{t.legal.backLabel}</span>
            </Link>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-border/30"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              <span className="gradient-text">{title}</span>
            </h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-lg">{lastUpdated}</p>

              {sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    {section.heading}
                  </h2>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
          </motion.article>
        </div>
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default LegalPageLayout;
