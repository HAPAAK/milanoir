import { motion } from "framer-motion";
import { Target, Fingerprint, Award, TrendingUp } from "lucide-react";

const differences = [
  {
    icon: Target,
    title: "Purpose-Driven Entertainment",
    description: "Every Milanoir event is designed with intention. We partner with charitable organizations to ensure your night of entertainment contributes to tangible positive change. When you attend a Milanoir event, you're not just a spectator—you're a changemaker.",
  },
  {
    icon: Fingerprint,
    title: "Authentic Cultural Representation",
    description: "We proudly represent the Nepalese diaspora on the global stage, showcasing authentic heritage, contemporary artistry, and the vibrant fusion of tradition and innovation.",
  },
  {
    icon: Award,
    title: "Uncompromising Excellence",
    description: "From intimate gatherings to large-scale productions, we maintain the highest standards of quality, professionalism, and creativity. Our partnerships ensure every detail exceeds expectations.",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Growth Model",
    description: "We're building a sustainable ecosystem that creates ongoing opportunities for artists, supports long-term community development, and establishes London as a premier destination for culturally significant entertainment.",
  },
];

const DifferenceSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">
            What Sets Us Apart
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl">
            The <span className="gradient-text">Milanoir Difference</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {differences.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-5 group"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg gradient-border bg-background flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
