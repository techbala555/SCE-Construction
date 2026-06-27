// ============================================================
// SCE Construction — Central Content Data
// ============================================================

// ── Navigation ──────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

// ── Company Information ─────────────────────────────────────
export const companyInfo = {
  name: "SCE Construction",
  tagline: "Building Tomorrow's Landmarks Today",
  description:
    "SCE Construction is a premier construction company delivering world-class residential, commercial, and industrial projects. With over two decades of experience, we transform ambitious visions into architectural masterpieces that stand the test of time.",
  founded: 2003,
  mission:
    "To redefine the construction landscape by delivering projects of unparalleled quality, on time and within budget, while fostering sustainable building practices for future generations.",
  vision:
    "To be the most trusted and innovative construction partner in the region, known for excellence, integrity, and transformative design.",
  cta: "Get Free Quote",
};

// ── Hero ────────────────────────────────────────────────────
export const heroContent = {
  subtitle: "PREMIUM CONSTRUCTION & ENGINEERING",
  title: "Building Tomorrow's",
  titleAccent: "Landmarks Today",
  description:
    "Transforming ambitious visions into architectural masterpieces with over two decades of precision engineering, sustainable innovation, and unwavering commitment to excellence.",
  ctaPrimary: "Start Your Project",
  ctaSecondary: "View Our Work",
};

// ── Statistics ──────────────────────────────────────────────
export interface Statistic {
  value: number;
  suffix: string;
  label: string;
}

export const statistics: Statistic[] = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 22, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Expert Engineers" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

// ── Services ────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "residential",
    title: "Residential Construction",
    description:
      "From luxury villas to modern apartments, we craft living spaces that blend comfort with elegance. Every detail is designed to elevate your lifestyle.",
    icon: "🏠",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    description:
      "State-of-the-art office complexes, retail spaces, and hospitality venues engineered for peak performance and lasting impressions.",
    icon: "🏢",
  },
  {
    id: "industrial",
    title: "Industrial Construction",
    description:
      "Robust industrial facilities, warehouses, and manufacturing plants built with precision to withstand the demands of heavy operations.",
    icon: "🏗️",
  },
  {
    id: "renovation",
    title: "Renovation & Remodeling",
    description:
      "Breathe new life into existing structures with our expert renovation services. We modernize spaces while preserving their original character.",
    icon: "🔨",
  },
  {
    id: "interior",
    title: "Interior Design",
    description:
      "Bespoke interior solutions that harmonize aesthetics with functionality. Our designers create spaces that inspire and delight.",
    icon: "🎨",
  },
  {
    id: "consulting",
    title: "Project Consulting",
    description:
      "Expert guidance from concept to completion. Our consultants provide strategic insights to optimize timelines, budgets, and outcomes.",
    icon: "📋",
  },
];

// ── Projects ────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  year: number;
  image: string;
}

export const projects: Project[] = [
  {
    id: "skyline-tower",
    title: "Skyline Tower",
    category: "Commercial",
    description:
      "A 45-storey mixed-use tower featuring premium office spaces and a rooftop observation deck with panoramic city views.",
    location: "Downtown Business District",
    year: 2024,
    image: "/images/projects/skyline-tower.jpg",
  },
  {
    id: "emerald-residences",
    title: "Emerald Residences",
    category: "Residential",
    description:
      "An exclusive gated community of 120 luxury villas surrounded by manicured gardens and world-class amenities.",
    location: "Green Valley Suburbs",
    year: 2023,
    image: "/images/projects/emerald-residences.jpg",
  },
  {
    id: "metro-logistics-hub",
    title: "Metro Logistics Hub",
    category: "Industrial",
    description:
      "A 200,000 sq ft distribution center with automated sorting systems and sustainable energy infrastructure.",
    location: "Industrial Zone East",
    year: 2024,
    image: "/images/projects/metro-logistics.jpg",
  },
  {
    id: "aurora-mall",
    title: "Aurora Shopping Mall",
    category: "Commercial",
    description:
      "A contemporary retail destination spanning 350,000 sq ft with an atrium, cinemas, and dining promenade.",
    location: "City Center",
    year: 2022,
    image: "/images/projects/aurora-mall.jpg",
  },
  {
    id: "heritage-restoration",
    title: "Heritage Grand Hotel",
    category: "Renovation",
    description:
      "Meticulous restoration of a 1920s landmark hotel, blending historic charm with modern luxury hospitality standards.",
    location: "Old Town Quarter",
    year: 2023,
    image: "/images/projects/heritage-hotel.jpg",
  },
  {
    id: "tech-park",
    title: "Nexus Tech Park",
    category: "Commercial",
    description:
      "A LEED-certified technology campus with collaborative workspaces, innovation labs, and sustainable design throughout.",
    location: "Innovation Corridor",
    year: 2024,
    image: "/images/projects/tech-park.jpg",
  },
];

// ── Why Choose Us ───────────────────────────────────────────
export interface Reason {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const whyChooseUs: Reason[] = [
  {
    id: "quality",
    title: "Uncompromising Quality",
    description:
      "We use only premium materials and employ rigorous quality control at every stage of construction.",
    icon: "✅",
  },
  {
    id: "delivery",
    title: "On-Time Delivery",
    description:
      "Our track record speaks for itself — 98% of our projects are delivered on or ahead of schedule.",
    icon: "⏱️",
  },
  {
    id: "team",
    title: "Expert Team",
    description:
      "Over 150 certified engineers, architects, and project managers with decades of combined experience.",
    icon: "👷",
  },
  {
    id: "safety",
    title: "Safety First",
    description:
      "Zero-compromise safety protocols that have earned us industry-leading safety certifications.",
    icon: "🛡️",
  },
  {
    id: "sustainable",
    title: "Sustainable Building",
    description:
      "Green construction practices and eco-friendly materials that minimize environmental impact.",
    icon: "🌱",
  },
  {
    id: "transparent",
    title: "Transparent Pricing",
    description:
      "Detailed cost breakdowns with no hidden fees. You always know exactly where your investment goes.",
    icon: "💰",
  },
];

// ── Contact Details ─────────────────────────────────────────
export const contactDetails = {
  address: "1247 Construction Boulevard, Suite 400, Metro City, MC 10001",
  phone: "+1 (555) 234-5678",
  email: "info@sceconstruction.com",
  workingHours: "Mon – Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 2:00 PM",
  socials: {
    facebook: "https://facebook.com/sceconstruction",
    instagram: "https://instagram.com/sceconstruction",
    linkedin: "https://linkedin.com/company/sceconstruction",
    twitter: "https://twitter.com/sceconstruct",
  },
};
