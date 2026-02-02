import { motion } from "framer-motion";
import { Sparkles, Globe, Heart } from "lucide-react";

const missions = [
  {
    icon: Sparkles,
    title: "Create Exceptional Experiences",
    description: "We curate world-class events and concerts that deliver amazing and memorable nights in London, featuring international artists, cutting-edge production, and immersive cultural experiences that captivate audiences.",
    color: "cosmic-pink",
  },
  {
    icon: Globe,
    title: "Build Global Connections",
    description: "We leverage the strength and passion of the Nepalese diaspora to create a worldwide network of cultural exchange, artistic collaboration, and meaningful engagement—keeping our heart and soul rooted in Nepal.",
    color: "cosmic-cyan",
  },
  {
    icon: Heart,
    title: "Drive Purposeful Impact",
    description: "We don't just launch events—we create movements. Each concert and celebration supports specific causes, channeling resources, awareness, and support back home to Nepal.",
    color: "cosmic-purple",
  },
];

const MissionSection = () => {
  return (
    <section className="py-24 md:py-32 relative cosmic-bg">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-secondary mb-4 block">
            Our Mission
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
            Entertainment with <span className="gradient-text">Higher Purpose</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            At Milanoir Events, every concert, every celebration, and every gathering serves a higher purpose. 
            We believe extraordinary events have the power to transform communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-card rounded-2xl p-8 relative group hover:border-primary/30 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-xl bg-${mission.color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <mission.icon className={`w-7 h-7 text-${mission.color}`} />
              </div>
              <h3 className="font-heading text-xl mb-4">{mission.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{mission.description}</p>
              
              {/* Subtle glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-${mission.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
