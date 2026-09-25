import Image from "next/image";
import Link from "next/link";
import { barbers, businessInfo, services } from "@/lib/data";
import {
  MotionDiv,
  MotionStagger,
  MotionItem,
  MotionLink,
} from "@/components/MotionWrappers";

const featuredServices = services.filter((s) =>
  ["classic-cut", "skin-fade", "cut-beard-combo", "hot-towel-shave"].includes(s.id)
);

export default function HomePage() {
  return (
    <div>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden text-cream">
        <Image
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=80"
          alt="Barber giving a client a precision haircut in a modern barbershop"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
        <div className="section container-max relative z-10 py-24">
          <MotionDiv delay={0.1}>
            <p className="eyebrow">Vereeniging, Vaal</p>
          </MotionDiv>
          <MotionDiv delay={0.2}>
            <h1 className="heading-xl mt-4 max-w-3xl text-cream">
              Sharp Cuts. <span className="text-gold">Timeless</span> Craft.
            </h1>
          </MotionDiv>
          <MotionDiv delay={0.35}>
            <p className="mt-6 max-w-xl text-lg text-cream/75">
              {businessInfo.description} Walk out looking like you mean it.
            </p>
          </MotionDiv>
          <MotionDiv delay={0.5} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Book Your Cut
            </Link>
            <Link href="/services" className="btn-outline">
              View Services &amp; Prices
            </Link>
          </MotionDiv>
        </div>
      </section>

      <section className="section container-max py-20">
        <MotionDiv className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">What We Do</p>
            <h2 className="heading-lg mt-2 text-charcoal">Popular Services</h2>
          </div>
          <Link href="/services" className="btn-outline-dark">
            See Full Menu
          </Link>
        </MotionDiv>

        <MotionStagger
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          amount={0.1}
        >
          {featuredServices.map((s) => (
            <MotionItem key={s.id}>
              <div className="flex h-full flex-col justify-between rounded-sm border border-charcoal/10 bg-white p-6 transition-shadow hover:shadow-xl">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-charcoal">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-charcoal/60">{s.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-charcoal/10 pt-4">
                  <span className="font-display text-xl text-gold">R{s.price}</span>
                  <span className="text-xs uppercase tracking-widest text-charcoal/40">
                    {s.durationMinutes} min
                  </span>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      <section className="bg-charcoal-light">
        <div className="section container-max grid grid-cols-1 gap-14 py-20 lg:grid-cols-2 lg:items-center">
          <MotionDiv variant="left">
            <div className="relative h-80 overflow-hidden rounded-sm lg:h-[28rem]">
              <Image
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80"
                alt="Interior of Blackgold Barber Co. showing barber chairs and mirrors"
                fill
                className="object-cover"
              />
            </div>
          </MotionDiv>
          <MotionDiv variant="right" delay={0.15}>
            <p className="eyebrow">Why Blackgold</p>
            <h2 className="heading-lg mt-2 text-cream">
              Built On Craft, Not Shortcuts
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-gold">
                  Master Barbers
                </h3>
                <p className="mt-1 text-sm text-cream/70">
                  Every barber on our team trained for years before picking up the clippers at Blackgold.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-gold">
                  Premium Products
                </h3>
                <p className="mt-1 text-sm text-cream/70">
                  We use professional-grade tools and grooming products on every single client.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-gold">
                  Easy Online Booking
                </h3>
                <p className="mt-1 text-sm text-cream/70">
                  Pick your service, your barber and your time — and add it straight to your calendar.
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <section className="section container-max py-20">
        <MotionDiv>
          <p className="eyebrow">Meet The Team</p>
          <h2 className="heading-lg mt-2 text-charcoal">Behind The Chair</h2>
        </MotionDiv>

        <MotionStagger
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
          amount={0.1}
        >
          {barbers.map((b) => (
            <MotionItem key={b.id}>
              <div className="group">
                <div className="relative h-72 overflow-hidden rounded-sm">
                  <Image
                    src={b.image}
                    alt={`${b.name}, ${b.title} at Blackgold Barber Co.`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-charcoal">
                  {b.name}
                </h3>
                <p className="text-sm font-semibold uppercase tracking-widest text-gold">
                  {b.title}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      <section className="bg-cream">
        <MotionStagger
          className="section container-max grid grid-cols-1 gap-6 py-20 sm:grid-cols-3"
          amount={0.1}
        >
          {[
            {
              quote:
                "Best fade I've had in Johannesburg, hands down. Booking online and getting the calendar reminder made it effortless.",
              author: "Mpho T.",
            },
            {
              quote:
                "Thabo remembered exactly how I like my beard shaped from three months ago. That's the kind of service that keeps me coming back.",
              author: "Ryan K.",
            },
            {
              quote:
                "Took my son for his first proper cut and Kabelo was so patient with him. Clean shop, great vibe.",
              author: "Zanele M.",
            },
          ].map((t) => (
            <MotionItem key={t.author}>
              <div className="h-full rounded-sm border border-charcoal/10 bg-white p-8">
                <p className="text-4xl leading-none text-gold">&ldquo;</p>
                <p className="mt-2 text-sm italic text-charcoal/70">{t.quote}</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-charcoal">
                  {t.author}
                </p>
              </div>
            </MotionItem>
          ))}
        </MotionStagger>
      </section>

      <section className="bg-charcoal">
        <div className="section container-max flex flex-col items-center gap-6 py-20 text-center text-cream">
          <MotionDiv>
            <p className="eyebrow">Ready When You Are</p>
          </MotionDiv>
          <MotionDiv delay={0.1}>
            <h2 className="heading-lg max-w-2xl text-cream">
              Your Next Great Haircut Is A Few Clicks Away
            </h2>
          </MotionDiv>
          <MotionDiv delay={0.25} className="mt-4">
            <Link href="/contact" className="btn-primary">
              Book Your Appointment
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}