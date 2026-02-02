import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Music, Coins } from "lucide-react";

const visionPoints = [
  { icon: MapPin, text: "Every major UK city hosts regular Milanoir cultural celebrations" },
  { icon: Calendar, text: "50+ annual events bring 50,000+ attendees together" },
  { icon: Music, text: "100+ international artists find platforms for their artistry" },
  { icon: Coins, text: "Millions of pounds flow back to Nepal through our foundation programs" },
  { icon: Users, text: "Milanoir becomes synonymous with excellence, authenticity, and impact" },
];

const VisionSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-section rounded-3xl p-8 md:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-secondary mb-4 block">
                Our Vision
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                Leading the World in{" "}
                <span className="gradient-text">Purpose-Driven Cultural Events</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To become the world's leading platform for purpose-driven cultural events, 
                representing the Nepalese diaspora globally while creating sustainable impact 
                pathways that connect international audiences with meaningful causes in Nepal.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 space-y-6"
            >
              <h3 className="font-heading text-xl mb-6">We envision a future where:</h3>
              {visionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed pt-2">{point.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
