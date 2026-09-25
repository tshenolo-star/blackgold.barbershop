import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoModal from "@/components/PromoModal";
import { businessInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: `${businessInfo.name} | Barbershop in Rosebank, Johannesburg`,
  description: businessInfo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23141414'/%3E%3Ctext x='50' y='68' font-size='60' text-anchor='middle' fill='%23C9A227' font-family='Georgia'%3EB%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body className="font-sans text-charcoal antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <PromoModal />
      </body>
    </html>
  );
}
