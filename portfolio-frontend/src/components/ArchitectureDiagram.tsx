import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Node({
  label,
  sub,
  className = "",
}: {
  label: string;
  sub: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl border border-primary/30 bg-foreground/[0.03] px-4 py-3 backdrop-blur-sm ${className}`}
      style={{ boxShadow: "0 0 30px -10px var(--primary)" }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70">{sub}</p>
      <p className="font-display text-sm font-semibold text-foreground md:text-base">
        {label}
      </p>
    </div>
  );
}

export function ArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div
      ref={ref}
      className="relative mt-24 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 md:p-10 backdrop-blur-sm overflow-hidden"
    >
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
            — System Architecture
          </p>
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            How I build <span className="text-neon">systems</span>
          </h3>
        </div>
        <p className="max-w-sm text-sm text-foreground/60">
          A typical request flow through one of my full-stack architectures.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
      >
        {/* Client */}
        <div className="flex justify-center md:justify-start">
          <Node label="React / Next.js" sub="Client" />
        </div>

        {/* Connector 1 */}
        <Connector inView={inView} delay={0.2} />

        {/* API */}
        <div className="flex justify-center">
          <Node label="Spring Boot" sub="REST API" />
        </div>

        {/* Connector 2 - splits */}
        <Connector inView={inView} delay={0.6} />

        {/* DB + AI */}
        <div className="flex flex-col justify-center gap-4 md:items-end">
          <Node label="MySQL / PostgreSQL" sub="Database" className="w-full md:w-auto" />
          <Node label="LLM / AI Model" sub="Intelligence" className="w-full md:w-auto" />
        </div>
      </motion.div>
    </div>
  );
}

function Connector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="relative flex h-10 items-center justify-center md:h-1">
      <div className="relative h-px w-full overflow-hidden md:w-24">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--primary) 0 6px, transparent 6px 12px)",
            opacity: 0.35,
          }}
        />
        {inView && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary"
            style={{ boxShadow: "0 0 12px var(--primary), 0 0 24px var(--primary)" }}
          />
        )}
      </div>
    </div>
  );
}
