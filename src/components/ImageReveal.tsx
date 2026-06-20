import { motion } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-[4/5]"
  delay?: number;
}

const containerVariants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: (delay: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const imageVariants = {
  hidden: { scale: 1.2, y: "10%" },
  show: (delay: number) => ({
    scale: 1,
    y: "0%",
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function ImageReveal({
  src,
  alt = "",
  className = "",
  aspectRatio = "aspect-[4/5]",
  delay = 0,
}: ImageRevealProps) {
  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Outer wrapper: Animates clipPath mask */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8%" }}
        variants={containerVariants}
        custom={delay}
        className="w-full h-full [will-change:clip-path]"
      >
        {/* Inner Image: Animates scale down and counter-y translation for parallax reveal */}
        <motion.img
          src={src}
          alt={alt}
          variants={imageVariants}
          custom={delay}
          className="w-full h-full object-cover [will-change:transform]"
        />
      </motion.div>
    </div>
  );
}
