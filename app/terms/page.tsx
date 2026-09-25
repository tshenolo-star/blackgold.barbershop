import type { Metadata } from "next";
import { businessInfo } from "@/lib/data";
import { MotionFadeIn } from "@/components/MotionWrappers";

export const metadata: Metadata = {
  title: "Terms & Conditions | Blackgold Barber Co.",
  description:
    "Booking, cancellation and privacy terms for Blackgold Barber Co.",
};

export default function TermsPage() {
  return (
    <div>
      <section className="bg-charcoal py-20 text-cream">
        <div className="section container-max">
          <MotionFadeIn delay={0.05}>
            <p className="eyebrow">Legal</p>
          </MotionFadeIn>
          <MotionFadeIn delay={0.15}>
            <h1 className="heading-xl mt-2 text-cream">
              Terms &amp; Conditions
            </h1>
          </MotionFadeIn>
          <MotionFadeIn delay={0.3}>
            <p className="mt-4 text-sm text-cream/60">
              Last updated: September 2026
            </p>
          </MotionFadeIn>
        </div>
      </section>

      <section className="section container-max max-w-3xl py-20 text-charcoal/80">
        <div className="space-y-12">
          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">1. Bookings</h2>
            <p className="mt-4 text-sm leading-relaxed">
              All appointments made through {businessInfo.name}&apos;s website
              are subject to availability and confirmation. You will receive an
              on-screen confirmation with the option to add the appointment to
              your calendar once your booking is complete. Please arrive five
              minutes before your scheduled time to ensure your service starts
              promptly.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">
              2. Cancellations &amp; Rescheduling
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              We ask for at least 24 hours&apos; notice to cancel or reschedule
              an appointment. This gives us the opportunity to offer your slot
              to another client. Cancellations made with less than 24
              hours&apos; notice, or repeated no-shows, may result in a request
              for a deposit on future bookings.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">3. Late Arrivals</h2>
            <p className="mt-4 text-sm leading-relaxed">
              If you arrive more than 15 minutes after your scheduled time, we
              may need to shorten your service or reschedule you to the next
              available slot, depending on the day&apos;s bookings.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">
              4. Pricing &amp; Payment
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Prices listed on our Services page are in South African Rand
              (ZAR) and are current as of the date of publication but may change
              without prior notice. We accept cash, major debit and credit
              cards, and popular mobile payment methods in-store. Payment is
              due at the time of service.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">
              5. Right To Refuse Service
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              {businessInfo.name} reserves the right to refuse or discontinue
              service to any individual behaving in a manner that is unsafe,
              abusive or disrespectful toward our staff or other clients.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">6. Promotions</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Promotional offers, including first-visit discounts, apply to new
              clients only, cannot be combined with other offers, and may be
              withdrawn or amended at any time at our discretion.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4} style={{ scrollMarginTop: "6rem" }}>
            <div id="privacy">
              <h2 className="heading-md text-charcoal">7. Privacy</h2>
              <p className="mt-4 text-sm leading-relaxed">
                Information you submit through our booking form — including
                your name, email address and phone number — is used solely to
                manage your appointment and to contact you about your booking.
                We do not sell or share your personal information with third
                parties for marketing purposes.
              </p>
            </div>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">
              8. Changes To These Terms
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              We may update these Terms &amp; Conditions from time to time.
              Continued use of our booking service after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          </MotionFadeIn>

          <MotionFadeIn amount={0.4}>
            <h2 className="heading-md text-charcoal">9. Contact</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Questions about these terms can be sent to{" "}
              <a
                href={`mailto:${businessInfo.email}`}
                className="text-gold hover:underline"
              >
                {businessInfo.email}
              </a>{" "}
              or by calling {businessInfo.phone}.
            </p>
          </MotionFadeIn>
        </div>
      </section>
    </div>
  );
}