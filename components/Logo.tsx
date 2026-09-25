type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-cream" : "text-charcoal";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19" stroke="#C9A227" strokeWidth="1.5" />
        <path
          d="M12 10 L20 20 L12 30"
          stroke="#C9A227"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M28 10 L20 20 L28 30"
          stroke="#C9A227"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="20" cy="20" r="2.5" fill="#C9A227" />
      </svg>
      <span className={`font-display text-2xl leading-none tracking-wide ${textColor}`}>
        BLACKGOLD
        <span className="block text-[0.6rem] font-sans font-semibold tracking-widest2 text-gold">
          BARBER CO.
        </span>
      </span>
    </div>
  );
}
