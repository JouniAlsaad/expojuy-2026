"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeInUp, viewportOnce } from "@/design-system/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </motion.div>
  );
}
