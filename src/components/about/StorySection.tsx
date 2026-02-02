import { motion } from "framer-motion";

const StorySection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-section rounded-3xl p-8 md:p-12 text-center">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
              Our Story
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-8">
              Born from a Vision to{" "}
              <span className="gradient-text">Bridge Cultures</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Milanoir Events represents the convergence of exceptional entertainment and purposeful impact. 
              We are more than an event company—we are <em className="text-foreground not-italic font-medium">storytellers</em>, 
              <em className="text-foreground not-italic font-medium"> culture bearers</em>, and 
              <em className="text-foreground not-italic font-medium"> community builders</em> dedicated to creating 
              unforgettable nights that leave lasting legacies.
            </p>
            <div className="section-divider max-w-xs mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;
