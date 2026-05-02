export type Property = {
  id: string
  title: string
  location: string
  priceLabel: string
  badge: 'Buy' | 'Rent' | 'Commercial'
  image: string
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'properties', label: 'Properties' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
] as const

export const properties: Property[] = [
  {
    id: 'p1',
    title: '2 BHK Family Apartment — Thane West',
    location: 'Kasarvadavali • Ghodbunder Road',
    priceLabel: '₹ 1.35 Cr onwards',
    badge: 'Buy',
    image: '/images/property2.jpg',
  },
  {
    id: 'p2',
    title: '1 BHK Near HyperCity — Ready to Move',
    location: 'Opp. HyperCity • Kasarvadavali',
    priceLabel: '₹ 85 L onwards',
    badge: 'Buy',
    image: '/images/property3.jpg',
  },
  {
    id: 'p3',
    title: 'Premium Rental — Furnished 2 BHK',
    location: 'Hiranandani Estate • Thane',
    priceLabel: '₹ 55,000 / month',
    badge: 'Rent',
    image: '/images/property1.jpg',
  },
  {
    id: 'p4',
    title: 'Retail / Showroom — High Footfall',
    location: 'Ghodbunder Road Corridor',
    priceLabel: '₹ 2.9 L / month',
    badge: 'Commercial',
    image: '/images/property4.jpg',
  },
  {
    id: 'p5',
    title: 'Grade-A Office Space — New Tower',
    location: 'Majiwada • Thane West',
    priceLabel: '₹ 2.1 Cr',
    badge: 'Commercial',
    image: '/images/commercial.jpg',
  },
  {
    id: 'p6',
    title: 'Industrial Warehouse — Logistics Friendly',
    location: 'Thane • Connectivity Hub',
    priceLabel: 'On Request',
    badge: 'Commercial',
    image: '/images/industrial.jpg',
  },
]

export type Testimonial = {
  name: string
  locality: string
  rating: 5
  source: 'Google' | 'JustDial'
  text: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Vijay P.',
    locality: 'Manpada',
    rating: 5,
    source: 'Google',
    text: 'Transparent guidance and no-pressure follow-ups. We closed our deal smoothly with clear paperwork support.',
  },
  {
    name: 'Ayesha S.',
    locality: 'Kasarvadavali',
    rating: 5,
    source: 'Google',
    text: 'Excellent local knowledge of Ghodbunder Road. They recommended the right society within our budget.',
  },
  {
    name: 'Sanjay K.',
    locality: 'Majiwada',
    rating: 5,
    source: 'JustDial',
    text: 'Professional team, fast property options, and great coordination for site visits. Highly recommended.',
  },
  {
    name: 'Neha R.',
    locality: 'Hiranandani Estate',
    rating: 5,
    source: 'Google',
    text: 'We got a reliable tenant quickly. Proper verification and smooth agreement process.',
  },
  {
    name: 'Rohit M.',
    locality: 'Waghbil',
    rating: 5,
    source: 'Google',
    text: 'Honest advice and strong negotiation. Their experience really shows — especially for resale deals.',
  },
]

export const coverageChips = [
  'Kasarvadavali',
  'Ghodbunder Rd',
  'Thane West',
  'Hiranandani Estate',
  'Manpada',
  'Majiwada',
  'Balkum',
  'Waghbil',
]

export const blogPosts = [
  {
    id: 'b1',
    title: 'First-Time Home Buying in Thane: A Step-by-Step Checklist',
    date: 'Mar 2026',
    image: '/images/consultation.jpg',
    excerpt:
      'Budgeting, loan readiness, society due diligence, and negotiation tips tailored to Thane West buyers.',
  },
  {
    id: 'b2',
    title: 'Why Ghodbunder Road Keeps Growing: Connectivity, Lifestyle & Value',
    date: 'Feb 2026',
    image: '/images/thane-skyline.jpg',
    excerpt:
      'What drives demand on the corridor — and how to shortlist micro-markets like Kasarvadavali and Waghbil.',
  },
  {
    id: 'b3',
    title: 'RERA Basics for Buyers & Investors: What to Check Before You Pay',
    date: 'Jan 2026',
    image: '/images/about-building.jpg',
    excerpt:
      'Key documents, project registration checks, and a simple verification workflow for safer transactions.',
  },
]
