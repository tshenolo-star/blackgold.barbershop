import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { businessInfo } from "@/lib/data";
import { MotionSection, MotionFadeIn } from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Contact & Booking | Blackgold Barber Co.",
  description:
    "Find, contact and book an appointment at Blackgold Barber Co. in Vereeniging, South Africa.",
};

export default function ContactPage() {
  return (
    <div>
      <MotionSection className="bg-charcoal py-20 text-cream">
        <div className="section container-max">
          <MotionFadeIn>
            <p className="eyebrow">Contact &amp; Booking</p>
          </MotionFadeIn>
          <MotionFadeIn delay={0.1}>
            <h1 className="heading-xl mt-2 text-cream">
              Let&apos;s Get You In The Chair
            </h1>
          </MotionFadeIn>
        </div>
      </MotionSection>

      <section className="section container-max grid grid-cols-1 gap-14 py-20 lg:grid-cols-5">
        <MotionFadeIn className="lg:col-span-2" delay={0.05}>
          <h2 className="heading-md text-charcoal">Visit Us</h2>
          <dl className="mt-6 space-y-6 text-sm">
            <MotionFadeIn delay={0.1}>
              <div>
                <dt className="font-semibold uppercase tracking-widest text-charcoal/50">
                  Address
                </dt>
                <dd className="mt-1 text-charcoal/80">{businessInfo.address}</dd>
              </div>
            </MotionFadeIn>

            <MotionFadeIn delay={0.15}>
              <div>
                <dt className="font-semibold uppercase tracking-widest text-charcoal/50">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={businessInfo.phoneHref}
                    className="text-gold hover:underline"
                  >
                    {businessInfo.phone}
                  </a>
                </dd>
              </div>
            </MotionFadeIn>

            <MotionFadeIn delay={0.2}>
              <div>
                <dt className="font-semibold uppercase tracking-widest text-charcoal/50">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="text-gold hover:underline"
                  >
                    {businessInfo.email}
                  </a>
                </dd>
              </div>
            </MotionFadeIn>

            <MotionFadeIn delay={0.25}>
              <div>
                <dt className="font-semibold uppercase tracking-widest text-charcoal/50">
                  Opening Hours
                </dt>
                <dd className="mt-2 space-y-1 text-charcoal/80">
                  {businessInfo.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between gap-6 border-b border-charcoal/10 py-1"
                    >
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </MotionFadeIn>
          </dl>

          <MotionFadeIn delay={0.3} className="mt-8 overflow-hidden rounded-sm border border-charcoal/10">
            <iframe
              title="Blackgold Barber Co. location map"
              src={businessInfo.mapEmbedSrc}
              width="100%"
              height="260"
              loading="lazy"
              style={{ border: 0 }}
            />
          </MotionFadeIn>

          <MotionFadeIn delay={0.35}>
            <a
              href={businessInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark mt-6 w-full"
            >
              Message Us On WhatsApp
            </a>
          </MotionFadeIn>
        </MotionFadeIn>

        <div className="lg:col-span-3">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}