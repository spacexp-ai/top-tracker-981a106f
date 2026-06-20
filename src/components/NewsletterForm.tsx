import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check } from "lucide-react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // store locally — wire to email service of choice
    try {
      const list = JSON.parse(localStorage.getItem("tt_newsletter") || "[]");
      list.push({ email, ts: Date.now() });
      localStorage.setItem("tt_newsletter", JSON.stringify(list));
    } catch {}
    setSent(true);
  }

  return (
    <div className={compact ? "" : "max-w-md"}>
      {!compact && (
        <p className="font-serif text-base text-bone/70 mb-4">
          Quarterly dispatches from camp — tracking notes, conservation reports, and the printed
          field journal.
        </p>
      )}
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-accent text-sm font-serif italic"
          >
            <Check className="h-4 w-4" /> You're on the list. Karibu.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-stretch border border-bone/20 focus-within:border-accent transition-colors"
          >
            <span className="px-3 flex items-center text-accent">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              maxLength={120}
              className="flex-1 bg-transparent text-bone py-2.5 text-sm placeholder:text-bone/30 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 bg-accent text-accent-foreground text-[10px] tracking-[0.3em] uppercase hover:bg-ember hover:text-bone transition"
            >
              Join
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
