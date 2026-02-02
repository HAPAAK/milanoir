import { motion } from "framer-motion";
import { Star, Heart, Users, Lightbulb, Target, Leaf } from "lucide-react";

const values = [
  {
    icon: Star,
    title: "Excellence",
    description: "We pursue perfection in every detail, from artist selection to production quality, ensuring world-class experiences.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description: "We honor genuine cultural expression, staying true to our Nepalese roots while embracing innovation.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We build bridges between people, cultures, and causes, strengthening the global Nepalese diaspora network.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously push creative boundaries, leveraging technology and modern production to create unforgettable experiences.",
  },
  {
    icon: Target,
    title: "Purpose",
    description: "We measure success not just in ticket sales, but in lives touched and positive change created.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We build for the long term, creating lasting value for artists, communities, and the causes we support.",
  },
];

const ValuesSection = () => {
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
            Our Values
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl">
            Principles That <span className="gradient-text">Guide Us</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group text-center p-8 rounded-2xl border border-transparent hover:border-border hover:bg-card/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-xl mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
