export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`vintage-divider text-[10px] tracking-[0.5em] uppercase ${light ? "text-accent" : "text-ember"}`}
    >
      <span>{children}</span>
    </div>
  );
}
