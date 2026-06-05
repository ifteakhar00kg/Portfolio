import { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { RevealText } from "./Reveal";

// 🛠️ আপনার আসল ব্যাকএন্ড ডাটাবেজ ইন্টারফেস
interface ProjectType {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubLink?: string;
  liveLink?: string;
  imageLink?: string;
}

// 🛠️ টাইপরাইটার কম্পোনেন্ট (লাভেবল স্টাইল ও লেফট অ্যালাইনমেন্ট)
function CustomLoopingTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentText = "";
    let index = 0;
    let timeoutId: NodeJS.Timeout;
    let isTyping = true;

    const loop = () => {
      if (isTyping) {
        if (index < text.length) {
          currentText += text.charAt(index);
          setDisplayedText(currentText);
          index++;
          
          const randomDelay = Math.random() * 40 + 70; 
          timeoutId = setTimeout(loop, randomDelay);
        } else {
          isTyping = false;
          timeoutId = setTimeout(loop, 4000);
        }
      } else {
        currentText = "";
        setDisplayedText("");
        index = 0;
        isTyping = true;
        timeoutId = setTimeout(loop, 400);
      }
    };

    timeoutId = setTimeout(loop, 100);
    return () => clearTimeout(timeoutId);
  }, [text]);

  return (
    <>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="ml-[4px] inline-block h-[1.1em] w-[2px] align-middle bg-primary shadow-[0_0_8px_var(--primary)]"
      />
    </>
  );
}

function TiltCard({
  project,
  index,
  inView,
}: {
  project: ProjectType;
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  // 🛠️ আপনার আগের স্প্লিট লজিক (কোমা দিয়ে টেকনোলজি আলাদা করার জন্য)
  const stack = project.technologies ? project.technologies.split(",").map(s => s.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 md:p-10 backdrop-blur-sm transition-shadow duration-500 hover:border-primary/40 hover:shadow-[0_0_60px_-10px_var(--primary)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 8%, transparent), transparent 40%)",
          }}
        />

        <div style={{ transform: "translateZ(40px)" }} className="relative flex h-full flex-col">
          <div className="flex items-start justify-between mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-primary/80">
              0{index + 1} / API
            </span>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-full border border-foreground/15 p-2 text-foreground/70 group-hover:border-primary group-hover:text-neon"
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-neon transition-colors">
            {project.title}
          </h3>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {stack.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full border border-foreground/10 text-xs text-foreground/70"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto">
            <a
              href={project.githubLink || project.liveLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-medium text-neon transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_-5px_var(--primary)]"
            >
              View Swagger / Live API
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  // 🛠️ লাইভ API ফেচিং লজিক রিস্টোর করা হলো
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  useEffect(() => {
    fetch("http://localhost:8083/api/v1/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80 mb-3">
            — Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <RevealText>Recent </RevealText>
            <RevealText className="text-neon" delay={0.15}>projects</RevealText>
          </h2>
        </div>

        {/* 🛠️ টাইপরাইটার */}
        <div className="w-full max-w-sm text-sm text-foreground/60 leading-relaxed text-left md:min-h-[85px] select-none">
          <CustomLoopingTypewriter
            text="A showcase of end-to-end full-stack applications, blending robust Spring Boot architectures with high-performance reactive user interfaces."
          />
        </div>

      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 🛠️ ডাটাবেজ থেকে আসা ডাটা ম্যাপ করা হচ্ছে */}
        {projects.map((p, i) => (
          <TiltCard key={p.id} project={p} index={i} inView={inView} />
        ))}
      </div>

      <ArchitectureDiagram />
    </section>
  );
}