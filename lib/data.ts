export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: "Cuts" | "Beard & Shave" | "Packages" | "Kids";
};

export const services: Service[] = [
  {
    id: "classic-cut",
    name: "Classic Haircut",
    description: "Precision scissor or clipper cut, finished with a wash and style.",
    price: 80,
    durationMinutes: 30,
    category: "Cuts"
  },
  {
    id: "skin-fade",
    name: "Skin Fade",
    description: "Sharp, seamless fade blended to skin with detailed finishing work.",
    price: 120,
    durationMinutes: 40,
    category: "Cuts"
  },
  {
    id: "line-up",
    name: "Line Up",
    description: "Crisp edge-up for your hairline and beard outline.",
    price: 50,
    durationMinutes: 15,
    category: "Cuts"
  },
  {
    id: "beard-trim",
    name: "Beard Trim & Shape",
    description: "Beard shaping, trimming and conditioning oil finish.",
    price: 120,
    durationMinutes: 20,
    category: "Beard & Shave"
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    description: "Traditional straight-razor shave with hot towel prep and balm finish.",
    price: 160,
    durationMinutes: 30,
    category: "Beard & Shave"
  },
  {
    id: "cut-beard-combo",
    name: "Haircut + Beard Combo",
    description: "Our classic cut paired with a full beard trim and shape.",
    price: 130,
    durationMinutes: 50,
    category: "Packages"
  },
  {
    id: "full-package",
    name: "The Full Package",
    description: "Haircut, beard trim and hot towel shave — the complete experience.",
    price: 200,
    durationMinutes: 75,
    category: "Packages"
  },
  {
    id: "kids-cut",
    name: "Kids Cut (12 & under)",
    description: "Patient, friendly cuts for our youngest clients.",
    price: 80,
    durationMinutes: 25,
    category: "Kids"
  }
];

export type Barber = {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
};

export const barbers: Barber[] = [
  {
    id: "thabo",
    name: "Tshenolo Lekepa",
    title: "Founder & Master Barber",
    bio: "Fifteen years behind the chair, Tshenolo founded Blackgold to bring old-school craftsmanship to modern Vaal. Known for razor-sharp lines and a steady hand.",
    specialties: ["Classic cuts", "Straight-razor shaves", "Beard sculpting"],
    image:
      "/images/thabo.jpg"
  },
  {
    id: "sipho",
    name: "Sipho Radebe",
    title: "Fade Specialist",
    bio: "Sipho trained in Cape Town before joining the Blackgold team, and has built a loyal following for his precision skin fades and creative design work.",
    specialties: ["Skin fades", "Hair designs", "Curly hair"],
    image:
      "/images/sipho.jpg"
  },
  {
    id: "kabelo",
    name: "Kabelo Molefe",
    title: "Senior Barber",
    bio: "With a background in men's grooming education, Kabelo is the barber other barbers ask for advice. Calm, thorough, and great with first-timers and kids.",
    specialties: ["Kids cuts", "Beard grooming", "Classic gentleman styles"],
    image:
      "/images/kabelo.jpg"
  }
];

export const businessInfo = {
  name: "Blackgold Barber Co.",
  shortName: "Blackgold",
  tagline: "Sharp Cuts. Timeless Craft.",
  description:
    "A modern barbershop in the heart of Vaal, Vereeniging — where precision cutting meets old-school hospitality.",
  address: "49A Market Avenue, Vereeniging, 1928",
  phone: "+27 72 503 6443",
  phoneHref: "tel:+27725036443",
  whatsapp: "https://wa.me/27725036443",
  email: "nolodevelopers@gmail.com",
  
  hours: [
    { day: "Monday – Friday", time: "09:00 – 19:00" },
    { day: "Saturday", time: "08:00 – 17:00" },
    { day: "Sunday", time: "Closed" }
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com"
  },
 mapEmbedSrc:
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4310.854616137212!2d27.91534901267691!3d-26.674754550429682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9458094627d95f%3A0x263ef5f665c03631!2s49%20Market%20Ave%2C%20Vereeniging%2C%201939!5e0!3m2!1sen!2sza!4v1790336187246!5m2!1sen!2sza",
};
