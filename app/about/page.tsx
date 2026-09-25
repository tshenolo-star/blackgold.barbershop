import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { barbers, businessInfo } from "@/lib/data";
import {
  MotionFadeIn,
  MotionStagger,
  MotionItem,
} from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "About Us | Blackgold Barber Co.",
  description:
    "The story behind Blackgold Barber Co. and the barbers who bring it to life.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-charcoal py-20 text-cream">
        <div className="section container-max">
          <MotionFadeIn delay={0.05}>
            <p className="eyebrow">Our Story</p>
          </MotionFadeIn>
          <MotionFadeIn delay={0.15}>
            <h1 className="heading-xl mt-2 text-cream">Craft Over Everything</h1>
          </MotionFadeIn>
        </div>
      </section>

      <section className="section container-max grid grid-cols-1 gap-14 py-20 lg:grid-cols-2 lg:items-center">
        <MotionFadeIn
          variant="left"
          className="relative order-2 h-80 overflow-hidden rounded-sm lg:order-1 lg:h-[26rem]"
        >
          <Image
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80"
            alt="Barber trimming a client's beard with focus and precision"
            fill
            className="object-cover"
          />
        </MotionFadeIn>
        <MotionFadeIn variant="right" delay={0.15} className="order-1 lg:order-2">
          <p className="eyebrow">How We Started</p>
          <h2 className="heading-lg mt-2 text-charcoal">
            From One Chair To A Vaal Landmark
          </h2>
          <p className="mt-6 text-charcoal/70">
            {businessInfo.name} opened its doors with a single chair and a simple
            idea: a haircut should be an experience, not a transaction. Founder
            Tshenolo Lekepa built his reputation cutting hair out of a garage in
            Sharpeville before bringing that same discipline to a proper shop in
            Vereeniging.
          </p>
          <p className="mt-4 text-charcoal/70">
            Today the team has grown, but the standard hasn&apos;t moved an inch.
            Every barber who joins Blackgold trains under Tshenolo before they touch
            a paying client — because a client&apos;s trust in their barber is
            earned one clean line at a time.
          </p>
        </MotionFadeIn>
      </section>

      <section className="bg-cream">
        <MotionStagger
          className="section container-max grid grid-cols-1 gap-8 py-20 sm:grid-cols-3"
          amount={0.1}
        >
          {[
            {
              title: "Precision First",
              body: "Every cut starts with a real conversation about what you actually want, not what's fastest for us.",
            },
            {
              title: "Respect The Chair",
              body: "Clean tools, clean stations, and barbers who show up on time, every time.",
            },
            {
              title: "Community Rooted",
              body: "We're proud to be part of Vaal — sponsoring local events and mentoring young barbers.",
            },
          ].map((v) => (
            <MotionItem key={v.title}>
              <div className="h-full rounded-sm border border-charcoal/10 bg-white p-8">
                <h3 className="font-display text-2xl uppercase tracking-wide text-charcoal">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm text-charcoal/60">{v.body}</p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      <section className="section container-max py-20">
        <MotionFadeIn>
          <p className="eyebrow">The Barbers</p>
          <h2 className="heading-lg mt-2 text-charcoal">Meet The Team</h2>
        </MotionFadeIn>

        <div className="mt-12 space-y-12">
          {barbers.map((b, i) => (
            <MotionFadeIn
              key={b.id}
              variant={i % 2 === 1 ? "right" : "left"}
              delay={0.05}
              className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-72 overflow-hidden rounded-sm lg:h-96">
                <Image
                  src={b.image}
                  alt={`${b.name}, ${b.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-3xl uppercase tracking-wide text-charcoal">
                  {b.name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-gold">
                  {b.title}
                </p>
                <p className="mt-4 text-charcoal/70">{b.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {b.specialties.map((sp) => (
                    <li
                      key={sp}
                      className="rounded-full border border-charcoal/15 px-3 py-1 text-xs uppercase tracking-widest text-charcoal/60"
                    >
                      {sp}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionFadeIn>
          ))}
        </div>

        <MotionFadeIn delay={0.1} className="mt-16 text-center">
          <Link href="/contact" className="btn-outline-dark">
            Book With Our Team
          </Link>
        </MotionFadeIn>
      </section>
    </div>
  );
}