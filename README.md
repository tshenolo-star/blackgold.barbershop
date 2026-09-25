# Blackgold Barber Co.

A full-stack marketing and booking website for a fictional Johannesburg barbershop, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Features

- Home, Services, About, Contact/Booking and Terms & Conditions pages
- Custom logo, colour palette (charcoal / gold / cream) and typography
- Responsive header with mobile navigation and footer with legal/social links
- Working booking form (service, barber, date, time, contact details)
- Calendar integration on booking confirmation: "Add to Google Calendar" link and a downloadable `.ics` file (Apple Calendar / Outlook compatible), both built from the customer's actual selections
- Dismissible first-visit promo popup
- Fully responsive layout for desktop, tablet and mobile

## Getting Started Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Deploying (to get a public URL)

The fastest path to a public URL is [Vercel](https://vercel.com):

1. Push this project to a GitHub repository.
2. Go to vercel.com, "Add New Project", and import the repository.
3. Framework preset "Next.js" is detected automatically — no extra configuration needed.
4. Click Deploy. You'll get a live `https://your-project.vercel.app` URL.

Netlify (with the Next.js runtime) also works if preferred.

## Project Structure

```
app/                Route pages (home, services, about, contact, terms)
components/         Header, Footer, Logo, BookingForm, PromoModal
lib/                Business data (services, barbers, hours) and calendar helpers
```
