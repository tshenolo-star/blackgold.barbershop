"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

function pickVariant(variant: string): Variants {
  switch (variant) {
    case "down":
      return fadeDown;
    case "left":
      return fadeLeft;
    case "right":
      return fadeRight;
    case "scale":
      return scaleIn;
    case "up":
    default:
      return fadeUp;
  }
}

export function MotionSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  );
}

export function MotionFadeIn({
  children,
  className = "",
  delay = 0,
  variant = "up",
  once = true,
  amount = 0.15,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "down" | "left" | "right" | "scale";
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      variants={pickVariant(variant)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export const MotionDiv = MotionFadeIn;

export function MotionStagger({
  children,
  className = "",
  amount = 0.15,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "down" | "left" | "right" | "scale";
}) {
  return (
    <motion.div variants={pickVariant(variant)} className={className}>
      {children}
    </motion.div>
  );
}

export function MotionLink({
  children,
  href,
  className = "",
  delay = 0,
  external = false,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  delay?: number;
  external?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </motion.div>
  );
}

export function MotionCard({
  children,
  className = "",
  hoverLift = true,
}: {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={hoverLift ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionImage({
  children,
  className = "",
  variant = "scale",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  delay?: number;
}) {
  return (
    <motion.div
      variants={pickVariant(variant)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.8, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}