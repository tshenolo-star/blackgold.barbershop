"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "blackgold-promo-dismissed";

export default function PromoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-sm border border-gold/30 bg-charcoal p-8 text-center text-cream shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close popup"
          className="absolute right-4 top-4 text-xl text-cream/50 hover:text-gold"
        >
          &times;
        </button>
        <p className="eyebrow">First Time Here?</p>
        <h2 id="promo-title" className="heading-md mt-2 text-cream">
          Get 15% Off Your First Cut
        </h2>
        <p className="mt-4 text-sm text-cream/70">
          Book any service online and mention code <span className="text-gold">FIRST15</span> at the
          chair. New clients only.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/contact" onClick={close} className="btn-primary">
            Book Now
          </Link>
          <button type="button" onClick={close} className="btn-outline">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
