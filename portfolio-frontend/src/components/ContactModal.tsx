import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const EMAIL = "ifteakarahmed.kg@gmail.com";

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("http://localhost:8083/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSending(false);
        setSent(true);
        setTimeout(() => {
          setSent(false);
          onClose();
          setForm({ name: "", email: "", message: "" });
        }, 2000);
      } else {
        setSending(false);
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSending(false);
      alert("Backend is not responding. Please make sure the server is running.");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 shadow-2xl backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 30px 80px -20px oklch(0.88 0.22 150 / 0.25), inset 0 1px 0 oklch(1 0 0 / 0.05)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.88 0.22 150 / 0.5), transparent 70%)" }}
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full border border-border/60 bg-background/40 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-neon"
            >
              <X size={16} />
            </button>

            <div className="relative">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-neon">
                Get in touch
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
                Let's build something <span className="italic text-neon">brilliant</span>.
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon"
              >
                <Mail size={14} /> {EMAIL}
              </a>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Field
                  label="Name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  required
                />
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-shadow hover:glow-neon disabled:opacity-70"
                >
                  <motion.span
                    key={sent ? "sent" : sending ? "sending" : "idle"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2"
                  >
                    {sent ? "Message Sent!" : sending ? "Sending..." : (<>Send Message <Send size={14} /></>)}
                  </motion.span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border/60 bg-background/30 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  );
}