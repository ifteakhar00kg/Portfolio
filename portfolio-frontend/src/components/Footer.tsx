import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SocialLinks } from "./SocialIcon";

interface StatusType {
  status: string;
  database: string;
  uptimeSeconds: number;
  latencyMs: number;
}

export function Footer() {
  const [metrics, setMetrics] = useState<StatusType | null>(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const fetchStatus = () => {
      fetch("http://localhost:8083/api/v1/status")
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setMetrics(data);
          setOnline(data.status === "OPERATIONAL");
        })
        .catch(() => {
          setMetrics(null);
          setOnline(false);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Ifteakar<span className="text-neon">.</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Backend Developer & AI Integration Enthusiast
            </p>
            
            <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-xs text-muted-foreground">
              <div className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${online ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${online ? "bg-emerald-500" : "bg-rose-500"}`}></span>
              </div>
              <span>
                System: <span className={online ? "text-emerald-400 font-medium" : "text-rose-400 font-medium"}>{online ? "OPERATIONAL" : "OFFLINE"}</span>
              </span>
              {metrics && (
                <span className="text-muted-foreground/50">
                  • Ping: {metrics.latencyMs}ms • Uptime: {formatUptime(metrics.uptimeSeconds)}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SocialLinks />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center md:text-right"
          >
            <a
              href="mailto:ifteakarahmed.kg@gmail.com"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              ifteakarahmed.kg@gmail.com
            </a>
            <p className="mt-1 text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} Khandokar Ifteakar Ahmed. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}