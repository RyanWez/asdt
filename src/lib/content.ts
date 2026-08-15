import heroPortrait from "@/assets/images/hero-portrait.jpg";
import heroDetail from "@/assets/images/hero-detail.jpg";
import aboutPortrait from "@/assets/images/about-portrait.jpg";
import philosophyDetail from "@/assets/images/philosophy-detail.jpg";
import colMidnightBloom from "@/assets/images/col-midnight-bloom.jpg";
import colSoftPetal from "@/assets/images/col-soft-petal.jpg";
import colSundayLinen from "@/assets/images/col-sunday-linen.jpg";
import colRosewood from "@/assets/images/col-rosewood.jpg";
import colMoonlight from "@/assets/images/col-moonlight.jpg";
import colSageCoord from "@/assets/images/col-sage-coord.jpg";

/**
 * Centralised, CMS-ready content. Replace any string, link, or image import
 * here and the whole site updates. Every item below is intentionally editable.
 */
export const site = {
  name: "Aye Sandar Tun",
  nameBurmese: "အေးစန္ဒာထွန်း",
  role: "Custom Fashion Designer",
  tagline: "Custom clothing, thoughtfully made.",
  location: "Yangon, Myanmar",
  email: "hello@ayesandartun.com",
  phone: "+95 9 000 000 000",
} as const;

export const nav = [
  { label: "Home", id: "top" },
  { label: "About", id: "about" },
  { label: "Collections", id: "collections" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
] as const;

export const social = [
  { label: "Instagram", handle: "@ayesandartun", href: "https://instagram.com/ayesandartun" },
  { label: "Facebook", handle: "Aye Sandar Tun", href: "https://facebook.com/ayesandartun" },
  { label: "TikTok", handle: "@ayesandartun", href: "https://tiktok.com/@ayesandartun" },
  { label: "Messenger", handle: "Message Aye", href: "https://m.me/ayesandartun" },
] as const;

export type Category = "evening" | "occasion" | "everyday" | "custom";

export interface Project {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  story: string;
  fabric: string;
  occasion: string;
  image: string;
  accent: "raspberry" | "lilac" | "sage" | "apricot";
  ratio: string;
  offset: string;
}

export const filters: { label: string; value: "all" | Category }[] = [
  { label: "All", value: "all" },
  { label: "Evening", value: "evening" },
  { label: "Occasion", value: "occasion" },
  { label: "Everyday", value: "everyday" },
  { label: "Custom", value: "custom" },
];

export const projects: Project[] = [
  {
    id: "midnight-bloom",
    title: "Midnight Bloom Gown",
    category: "evening",
    categoryLabel: "Evening & Event Wear",
    story:
      "A floor-sweeping gown with a sculpted bodice and a skirt that moves like ink in water — made for entrances that linger.",
    fabric: "Silk crepe with hand-set sequin tulle",
    occasion: "Galas & black-tie evenings",
    image: colMidnightBloom,
    accent: "raspberry",
    ratio: "3 / 4",
    offset: "lg:mt-0",
  },
  {
    id: "soft-petal",
    title: "Soft Petal Evening Dress",
    category: "occasion",
    categoryLabel: "Occasion",
    story:
      "Soft draping that skims the figure, finished with delicate pleats at the shoulder. Quietly romantic from every angle.",
    fabric: "Sandwashed silk in dusty lilac",
    occasion: "Weddings & celebratory dinners",
    image: colSoftPetal,
    accent: "lilac",
    ratio: "4 / 5",
    offset: "lg:mt-24",
  },
  {
    id: "sunday-linen",
    title: "Sunday Linen Set",
    category: "everyday",
    categoryLabel: "Everyday Elegance",
    story:
      "An easy two-piece cut from breathable linen for slow mornings, market walks, and everything in between.",
    fabric: "Garment-dyed European linen",
    occasion: "Everyday & weekend wear",
    image: colSundayLinen,
    accent: "sage",
    ratio: "3 / 4",
    offset: "lg:mt-10",
  },
  {
    id: "rosewood",
    title: "Rosewood Celebration Dress",
    category: "occasion",
    categoryLabel: "Occasion",
    story:
      "Warm rosewood tones with a softly flared hem made for dancing — a piece that feels festive without trying too hard.",
    fabric: "Matte satin in rosewood",
    occasion: "Engagements & festive occasions",
    image: colRosewood,
    accent: "apricot",
    ratio: "4 / 5",
    offset: "lg:mt-0",
  },
  {
    id: "moonlight",
    title: "Moonlight Draped Gown",
    category: "evening",
    categoryLabel: "Evening & Event Wear",
    story:
      "Liquid ivory draping that catches the light with every step, edged with the softest pearl trim.",
    fabric: "Fluid crepe with pearl-edged finish",
    occasion: "Evening events & receptions",
    image: colMoonlight,
    accent: "lilac",
    ratio: "3 / 4",
    offset: "lg:mt-24",
  },
  {
    id: "sage-coord",
    title: "Sage Everyday Co-ord",
    category: "custom",
    categoryLabel: "Custom Creation",
    story:
      "A relaxed, tailored co-ord in muted sage, drafted around real measurements for a wardrobe staple that finally fits.",
    fabric: "Brushed cotton twill",
    occasion: "Everyday & custom wardrobe",
    image: colSageCoord,
    accent: "sage",
    ratio: "4 / 5",
    offset: "lg:mt-10",
  },
];

export interface Service {
  id: string;
  index: string;
  title: string;
  benefit: string;
  detail: string;
  image: string;
  accent: "raspberry" | "lilac" | "sage" | "apricot";
}

export const services: Service[] = [
  {
    id: "evening-event",
    index: "01",
    title: "Evening & Event Outfits",
    benefit: "One-of-a-kind gowns and statement pieces designed for the moments that matter most.",
    detail:
      "From galas to milestone celebrations, each piece is built around your silhouette, the dress code, and the way you want to feel in the room.",
    image: colMidnightBloom,
    accent: "raspberry",
  },
  {
    id: "everyday-custom",
    index: "02",
    title: "Everyday Custom Clothing",
    benefit: "Thoughtfully tailored everyday pieces that fit your body and your life.",
    detail:
      "Co-ords, dresses, and separates cut to your measurements in fabrics that move with you — so getting dressed feels easy and intentional.",
    image: colSageCoord,
    accent: "sage",
  },
  {
    id: "consultation",
    index: "03",
    title: "Personalized Design Consultation",
    benefit: "A relaxed conversation to shape your idea before a single stitch is made.",
    detail:
      "We talk through silhouette, colour, fabric, and timeline. Bring references, mood, or just a feeling — and we shape a clear direction together.",
    image: aboutPortrait,
    accent: "lilac",
  },
  {
    id: "alterations",
    index: "04",
    title: "Alterations & Final Fitting",
    benefit: "Refinements and alterations so every piece fits beautifully and feels effortless.",
    detail:
      "Precision fitting and thoughtful adjustments for new pieces or beloved garments in your wardrobe that deserve a second life.",
    image: heroDetail,
    accent: "apricot",
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Share Your Idea",
    body: "Tell me about the occasion, the style you love, your references, and your budget. No detail is too small.",
  },
  {
    index: "02",
    title: "Design Consultation",
    body: "We discuss silhouette, colour, fabric, and timeline until the direction feels completely right for you.",
  },
  {
    index: "03",
    title: "Sketch & Fabric",
    body: "I prepare the design direction and gather materials — bringing the first sketch to life in real swatches.",
  },
  {
    index: "04",
    title: "Fitting & Refinement",
    body: "We adjust for comfort, proportion, and fit until the piece moves the way it should with you.",
  },
  {
    index: "05",
    title: "The Final Piece",
    body: "Your completed garment is pressed, finished by hand, and prepared for collection or delivery.",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  outfit: string;
  event: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Aye understood exactly what I wanted before I could describe it. My engagement dress felt completely mine.",
    name: "Hnin",
    outfit: "Rosewood Celebration Dress",
    event: "Engagement",
  },
  {
    quote:
      "The fit was perfect and the details were incredible. I felt confident the entire evening — so many compliments.",
    name: "Su",
    outfit: "Midnight Bloom Gown",
    event: "Annual Gala",
  },
  {
    quote:
      "I wanted something simple and elegant for every day. The co-ord is now my most-worn piece in the wardrobe.",
    name: "May",
    outfit: "Sage Everyday Co-ord",
    event: "Everyday Wardrobe",
  },
];

export const outfitTypes = [
  "Evening / event gown",
  "Occasion / wedding-guest dress",
  "Everyday custom clothing",
  "Co-ord or separates",
  "Alteration / refit",
  "Not sure yet",
];

export const budgetRanges = [
  "Under $150",
  "$150 – $300",
  "$300 – $600",
  "$600 – $1,200",
  "$1,200+",
  "Prefer to discuss",
];

export const images = {
  heroPortrait,
  heroDetail,
  aboutPortrait,
  philosophyDetail,
};
