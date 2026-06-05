import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RevealText } from "./Reveal";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">
          — Achievements & Milestones
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          <RevealText>Professional </RevealText>
          <RevealText className="text-neon" delay={0.15}>Certifications</RevealText>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-md"
      >
        {/* Animated gradient border wrapper */}
        <div className="relative rounded-3xl p-[2px] overflow-hidden group">
          <motion.div
            aria-hidden
            className="absolute inset-[-50%]"
            style={{
              background:
                "conic-gradient(from 0deg, oklch(0.88 0.22 150), oklch(0.7 0.2 200), oklch(0.85 0.2 280), oklch(0.88 0.22 150))",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Breathing glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[3rem] blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.88 0.22 150 / 0.35), transparent 70%)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner glassmorphism card */}
          <motion.div
            className="relative rounded-[calc(1.5rem-2px)] bg-background/70 backdrop-blur-2xl px-6 py-10 md:px-8 md:py-12 text-center overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_40px_oklch(0.88_0.22_150_/_0.15)]"
            animate={{ boxShadow: [
              "inset 0 0 40px oklch(0.88 0.22 150 / 0.05)",
              "inset 0 0 80px oklch(0.88 0.22 150 / 0.15)",
              "inset 0 0 40px oklch(0.88 0.22 150 / 0.05)",
            ] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Verified badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 180 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-neon mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              Verified Certification
            </motion.div>

            {/* Certificate icon + title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px oklch(0.88 0.22 150 / 0.2)",
                      "0 0 40px oklch(0.88 0.22 150 / 0.4)",
                      "0 0 20px oklch(0.88 0.22 150 / 0.2)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10"
                >
                  <Award className="h-7 w-7 text-neon" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon text-background"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                >
                  <BadgeCheck className="h-3 w-3" />
                </motion.div>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                <span className="text-neon text-glow">Certified Spring Boot Developer</span>
              </h3>

              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Issued by <span className="text-foreground font-medium">Ostad</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-4 mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground"
            >
              Successfully completed a comprehensive Spring Boot Developer course, 
              mastering enterprise-level backend architecture, REST APIs, MVC patterns, 
              and database integrations.
            </motion.p>



            {/* View Certificate Button */}
            <motion.a
              href="https://ostad.app/share/certificate/c40205-khandokar-ifteakar-ahmed"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-medium text-neon transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_30px_oklch(0.88_0.22_150_/_0.25)] hover:scale-105"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Verified Certificate
            </motion.a>

            {/* floating particles */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-primary"
                  style={{
                    left: `${15 + i * 13}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    boxShadow: "0 0 8px var(--primary)",
                  }}
                  animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
                  transition={{
                    duration: 3 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
