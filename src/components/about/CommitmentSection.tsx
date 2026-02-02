import { motion } from "framer-motion";
import { Check } from "lucide-react";

const commitments = [
  { title: "Transparency", description: "in how we operate, where funds go, and the impact we create" },
  { title: "Quality", description: "in every aspect of event planning, production, and execution" },
  { title: "Authenticity", description: "in representing Nepalese culture with respect and pride" },
  { title: "Innovation", description: "in creating fresh, engaging experiences that captivate modern audiences" },
  { title: "Partnership", description: "with artists, sponsors, venues, and organizations that share our values" },
  { title: "Impact", description: "measured in real, tangible improvements to communities in Nepal" },
];

const highlights = [
  "Elevates Culture — Showcasing the best of Nepalese and South Asian artistry",
  "Creates Opportunity — Providing platforms for emerging and established artists",
  "Drives Impact — Channeling event proceeds toward meaningful causes",
  "Builds Community — Strengthening diaspora connections",
  "Ensures Excellence — Delivering premium production quality",
  "Generates Legacy — Creating lasting positive change",
];

const CommitmentSection = () => {
  return (
    <section className="py-24 md:py-32 relative cosmic-bg">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-8 md:p-12 mb-16"
          >
            <h3 className="font-heading text-2xl md:text-3xl text-center mb-10">
              When you partner with Milanoir Events, you become part of{" "}
              <span className="gradient-text">something bigger</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-muted-foreground">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Commitments */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-secondary mb-4 block">
              Our Commitment
            </span>
            <h2 className="font-heading text-3xl md:text-4xl mb-12">
              What We <span className="gradient-text">Stand For</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {commitments.map((commitment, index) => (
                <motion.div
                  key={commitment.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-left"
                >
                  <h4 className="font-heading text-lg text-primary mb-2">{commitment.title}</h4>
                  <p className="text-muted-foreground text-sm">{commitment.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentSection;
