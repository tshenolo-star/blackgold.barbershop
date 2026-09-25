"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { businessInfo } from "@/lib/data";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const easeOut = [0.16, 1, 0.3, 1] as const;

const columnVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="section container-max grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={columnVariants}>
          <Logo variant="light" />

          <p className="mt-4 max-w-xs text-sm text-cream/60">
            {businessInfo.description}
          </p>

          <div className="mt-6 flex gap-3">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={businessInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-charcoal"
            >
              <FaInstagram className="h-4 w-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={businessInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-charcoal"
            >
              <FaFacebookF className="h-4 w-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={businessInfo.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-charcoal"
            >
              <FaTiktok className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div variants={columnVariants}>
          <h3 className="eyebrow mb-4">Navigate</h3>
          <ul className="space-y-3 text-sm text-cream/70">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gold transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors">
                Contact / Booking
              </Link>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={columnVariants}>
          <h3 className="eyebrow mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-cream/70">
            <li>{businessInfo.address}</li>
            <li>
              <a
                href={businessInfo.phoneHref}
                className="hover:text-gold transition-colors"
              >
                {businessInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${businessInfo.email}`}
                className="hover:text-gold transition-colors"
              >
                {businessInfo.email}
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={columnVariants}>
          <h3 className="eyebrow mb-4">Opening Hours</h3>
          <ul className="space-y-3 text-sm text-cream/70">
            {businessInfo.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-cream/50">{h.time}</span>
              </li>
            ))}
          </ul>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/contact" className="btn-primary mt-6 w-full block text-center">
              Book Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        className="border-t border-cream/10"
      >
        <div className="section container-max flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream/50 sm:flex-row">
          <p>
            &copy; {year} {businessInfo.name}. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link
              href="/terms#privacy"
              className="hover:text-gold transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}