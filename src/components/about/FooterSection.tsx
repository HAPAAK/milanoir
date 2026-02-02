import { motion } from "framer-motion";
import logo from "@/assets/milanoir-logo.png";

const FooterSection = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <img src={logo} alt="Milanoir Events" className="w-32 mb-6 opacity-80" />
          <p className="text-muted-foreground text-sm max-w-md mb-4">
            Milanoir Events Limited — Curating experiences that transcend ordinary entertainment.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Registered in London, United Kingdom • Company Number: 16820191
          </p>
          <div className="section-divider w-32 my-8" />
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} Milanoir Events Limited. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
