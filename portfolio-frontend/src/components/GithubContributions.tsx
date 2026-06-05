import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

const YEARS = [2026, 2025, 2024, 2023];

export function GithubContributions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [selectedYear, setSelectedYear] = useState(2026);

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16 md:px-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-6 backdrop-blur-sm md:p-10"
      >
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
              — Vibe Coding
            </p>
            <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              GitHub <span className="text-neon">contributions</span>
            </h3>
          </div>
          <p className="text-sm text-foreground/60">
            Activity matrix for {selectedYear} · consistency over hype
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
          <div className="w-full relative overflow-x-auto flex justify-center py-8 bg-background/20 rounded-xl border border-border/40 px-6 items-center">
            {/* GitHub Calendar Component */}
            <div className="min-w-max">
              <GitHubCalendar
                username="ifteakhar00kg"
                year={selectedYear}
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto justify-center md:justify-start">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_-5px_var(--primary)]"
                    : "border border-border/60 bg-background/40 text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
                style={{ minWidth: "80px" }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}