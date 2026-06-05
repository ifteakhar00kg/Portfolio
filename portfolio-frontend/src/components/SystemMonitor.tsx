import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Server, Database, Activity, Clock } from "lucide-react";

interface StatusType {
  status: string;
  database: string;
  uptimeSeconds: number;
  latencyMs: number;
}

export function SystemMonitor() {
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
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <footer className="relative border-t border-border/40 bg-card/10 py-8 px-6 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${online ? "bg-emerald-500" : "bg-rose-500"}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${online ? "bg-emerald-500" : "bg-rose-500"}`}></span>
          </div>
          <p className="font-display text-sm font-medium tracking-wide">
            System Status: <span className={online ? "text-emerald-400" : "text-rose-400"}>{online ? "OPERATIONAL" : "OFFLINE / DEGRADED"}</span>
          </p>
        </div>

        {metrics && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <Server size={14} className="text-primary/70" />
              <span>Backend: <span className="text-foreground">Spring Boot v3</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database size={14} className="text-primary/70" />
              <span>DB: <span className="text-foreground">{metrics.database}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity size={14} className="text-primary/70" />
              <span>Ping: <span className="text-foreground">{metrics.latencyMs}ms</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary/70" />
              <span>Uptime: <span className="text-foreground">{formatUptime(metrics.uptimeSeconds)}</span></span>
            </div>
          </motion.div>
        )}

        <p className="text-xs text-muted-foreground/60 font-mono">
          &copy; {new Date().getFullYear()} Ifteakar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}