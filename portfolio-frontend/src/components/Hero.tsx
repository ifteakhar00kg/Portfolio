import { useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { RotatingText } from "./RotatingText";
import { ContactModal } from "./ContactModal";
import { SocialLinks } from "./SocialIcon";

const ROTATING = [
  "Scalable Spring Boot APIs",
  "AI-Integrated Web Apps",
  "Secure Backend Systems",
  "React & Next.js Interfaces",
];

export function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[40rem] w-[40rem] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.22 150 / 0.5), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[140px]"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.22 150 / 0.6), transparent 70%)" }}
      />

      {/* nav */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl font-semibold tracking-tight"
        >
          Ifteakar<span className="text-neon">.</span>
        </motion.div>
        
        {/* মেনু লিংকে অন-পেজ আইডি এবং হোভার কালার নিয়ন সেট করা হয়েছে */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden gap-8 text-sm text-muted-foreground md:flex"
        >
          <a href="#about" className="hover:text-neon transition-colors">About</a>
          <a href="#work" className="hover:text-neon transition-colors">Work</a>
          <button 
            onClick={() => setContactOpen(true)} 
            className="hover:text-neon transition-colors cursor-pointer bg-transparent border-none p-0 text-sm text-muted-foreground"
          >
            Contact
          </button>
        </motion.div>
      </nav>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 pb-20 pt-8 text-center md:px-12 md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            — Portfolio / 2026
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs text-neon"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hello, I'm{" "}
            <span className="italic text-neon text-glow">Ifteakar</span>
            <span className="text-neon">.</span>
            <br />
            <span className="text-foreground/90">I build </span>
            <RotatingText words={ROTATING} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Backend Developer & AI Integration Enthusiast based in Dhaka.
            Crafting resilient systems and intelligent products at the edge of
            engineering and design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            {/* রেজুমে ফাইলটি public ফোল্ডারে Resume_Khandokar_Ifteakar_Ahmed.pdf নামে রাখলে এটি সরাসরি ডাউনলোড হবে */}
            <MagneticButton variant="primary" href="/Resume_Khandokar_Ifteakar_Ahmed.pdf" download>
              Download Resume ↓
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => setContactOpen(true)}>
              Contact Me →
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="pt-2"
          >
            <SocialLinks />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-6 flex items-center gap-6 border-t border-border/60 pt-6"
          >
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">5+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Years</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">40+</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Projects</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-semibold text-foreground">∞</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Curiosity</p>
            </div>
          </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll ↓
        </motion.div>
      </motion.div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}