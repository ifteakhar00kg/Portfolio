import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Wibify-style scroll reveal: soft fade + upward slide with a buttery cubic
 * ease. Designed to be paired with Lenis smooth scroll.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 0.9,
  once = true,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "span" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word reveal used for headings — mirrors the wibify hero / section
 * title intro. Splits the provided string on whitespace and staggers each
 * word with a small mask-style upward slide.
 */
const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealText({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
}: {
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });
  const words = children.split(/(\s+)/);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ paddingBottom: "0.12em" }}
          >
            <motion.span variants={wordVariants} className="inline-block">
              {w}
            </motion.span>
          </span>
        ),
      )}
    </motion.span>
  );
}
