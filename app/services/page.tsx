import type { Metadata } from "next";
import Link from "next/link";
import { services, type Service } from "@/lib/data";
import {
  MotionFadeIn,
  MotionStagger,
  MotionItem,
} from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Services & Pricing | Blackgold Barber Co.",
  description:
    "Explore haircuts, fades, beard grooming and packages at Blackgold Barber Co.",
};

const categories: Service["category"][] = [
  "Cuts",
  "Beard & Shave",
  "Packages",
  "Kids",
];

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-charcoal py-20 text-cream">
        <div className="section container-max">
          <MotionFadeIn delay={0.05}>
            <p className="eyebrow">Services &amp; Pricing</p>
          </MotionFadeIn>
          <MotionFadeIn delay={0.15}>
            <h1 className="heading-xl mt-2 text-cream">The Full Menu</h1>
          </MotionFadeIn>
          <MotionFadeIn delay={0.3}>
            <p className="mt-6 max-w-xl text-cream/70">
              Every service includes a consultation and finishing touches.
              Prices are in South African Rand (ZAR) and may vary slightly for
              longer or thicker hair.
            </p>
          </MotionFadeIn>
        </div>
      </section>

      <section className="section container-max py-20">
        {categories.map((category) => {
          const items = services.filter((s) => s.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category} className="mb-16 last:mb-0">
              <MotionFadeIn>
                <h2 className="heading-md text-charcoal">{category}</h2>
              </MotionFadeIn>
              <MotionStagger
                className="mt-6 divide-y divide-charcoal/10 border-t border-charcoal/10"
                amount={0.05}
              >
                {items.map((s) => (
                  <MotionItem key={s.id}>
                    <div className="flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="font-display text-xl uppercase tracking-wide text-charcoal">
                          {s.name}
                        </h3>
                        <p className="mt-1 max-w-md text-sm text-charcoal/60">
                          {s.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-1">
                        <span className="font-display text-2xl text-gold">
                          R{s.price}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-charcoal/40">
                          {s.durationMinutes} min
                        </span>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </MotionStagger>
            </div>
          );
        })}

        <MotionFadeIn delay={0.1}>
          <div className="mt-6 rounded-sm bg-charcoal p-10 text-center text-cream">
            <h2 className="heading-md text-cream">Not Sure What You Need?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-cream/70">
              Book a consultation and your barber will recommend the right
              service and cut for your hair type and lifestyle.
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Book Now
            </Link>
          </div>
        </MotionFadeIn>
      </section>
    </div>
  );
}