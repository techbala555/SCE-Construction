// ============================================================
// SCE Construction - Central Content Data
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
  { label: "Why Choose Us?", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

// ── Company Information ─────────────────────────────────────
export const companyInfo = {
  name: "SCE Construction",
  tagline: "Building Tomorrow's Landmarks Today",
  description:
    "Shylesh Circuits & Engineering is a trusted name in construction, land development, and real estate. We deliver end-to-end solutions - from residential building construction and villa projects to GPS land surveys, DTCP approvals, layout planning, and property development. Every project is backed by professional engineering standards, modern planning practices, and a deep commitment to quality.",
  mission:
    "To deliver dependable construction, land development that exceed client expectations - built on trust, precision, and professional integrity.",
  vision:
    "To become a leading force in residential construction, land development, and property solutions - known for quality craftsmanship, transparent execution, and lasting client relationships.",
  cta: "Get Free Quote",
};

// ── Hero ────────────────────────────────────────────────────
export const heroContent = {
  subtitle: "CONSTRUCTION • LAND DEVELOPMENT • REAL ESTATE",
  title: "Building Tomorrow's",
  titleAccent: "Landmarks Today",
  description:
    "Complete construction, land development, engineering - delivered with a commitment to quality, trust, and timely execution.",
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
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 4, suffix: "", label: "Service Verticals" },
  { value: 50, suffix: "+", label: "Skilled Professionals" },
  { value: 100, suffix: "%", label: "Client Commitment" },
];

// ── Services ────────────────────────────────────────────────
export interface ServiceItem {
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: ServiceItem[];
}

export const services: Service[] = [
  {
    id: "construction",
    title: "Construction Services",
    description:
      "From independent houses and villas to apartments and complete interior finishing - we handle every aspect of residential building construction with professional-grade execution.",
    icon: "🏗️",
    items: [
      { text: "Residential Building Construction" },
      { text: "Independent House Construction" },
      { text: "Villa Construction" },
      { text: "Apartment Construction" },
      { text: "Interior Design & Finishing Works" },
    ],
  },
  {
    id: "land-development",
    title: "Land Development",
    description:
      "Professional land development services including GPS-based surveys, DTCP approval assistance, layout planning, site preparation, and complete infrastructure development.",
    icon: "📐",
    items: [
      { text: "GPS Land Survey & Site Measurement" },
      { text: "DTCP Approval Assistance" },
      { text: "Layout Planning & Development" },
      { text: "Land Development & Site Preparation" },
      { text: "Road, Drainage & Water Tank Construction" },
      { text: "Compound Wall Construction" },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Development",
    description:
      "Strategic property promotion and residential plot development - creating well-planned layouts and land development projects that maximize value for investors and homebuyers alike.",
    icon: "🏘️",
    items: [
      { text: "Property Promotion" },
      { text: "Residential Plot Development" },
      { text: "Layout Development" },
      { text: "Land Development Projects" },
    ],
  },
  {
    id: "future-projects",
    title: "Farmhouse Projects",
    description:
      "Specialized farmhouse planning, construction, and land development - helping you create premium countryside retreats designed for comfort, privacy, and long-term value.",
    icon: "🌿",
    items: [
      { text: "Farmhouse Planning" },
      { text: "Farmhouse Construction" },
      { text: "Farmhouse Land Development" },
    ],
  },
];

// ── Extended Service Details for Modal ──────────────────────
export interface ServiceDetail {
  id: string;
  title: string;
  icon: string;
  shortIntro: string;
  fullDescription: string;
  items: string[];
  keyBenefits: string[];
  whyChooseUs: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  construction: {
    id: "construction",
    title: "Construction Services",
    icon: "🏗️",
    shortIntro: "Engineering-Led Residential & Villa Construction",
    fullDescription:
      "Shylesh Circuits & Engineering delivers high-caliber residential construction across Madurai and Tamil Nadu. From single-family independent houses and luxury custom villas to modern apartment complexes and bespoke interior finishing, our end-to-end execution ensures structural integrity, architectural elegance, and transparent cost management.",
    items: [
      "Residential Building Construction",
      "Independent House Construction",
      "Villa Construction",
      "Apartment Construction",
      "Interior Design & Interior Finishing Works",
    ],
    keyBenefits: [
      "Turnkey management from foundation engineering to final key handover",
      "Strict compliance with BIS codes and structural safety standards",
      "Complete material quality transparency with zero hidden costs",
      "Dedicated site engineers and daily progress monitoring",
    ],
    whyChooseUs: [
      "Over 100+ successfully delivered projects across residential sectors",
      "In-house engineering team providing customized blueprint designs",
      "Seamless integration of structural build with luxury interior finishing",
    ],
  },
  "land-development": {
    id: "land-development",
    title: "Land Development",
    icon: "📐",
    shortIntro: "GPS Surveying, Approvals & Complete Site Preparation",
    fullDescription:
      "Our Land Development division turns raw land into approved, infrastructure-ready residential and commercial plots. Utilizing modern GPS surveying instruments, we guarantee sub-centimeter boundary accuracy, streamline DTCP government approvals, and construct complete layout infrastructure including asphalt/concrete internal roads, underground drainage, overhead water tanks, and secure compound walls.",
    items: [
      "GPS Land Survey & Site Measurement",
      "DTCP Approval Assistance",
      "Layout Planning & Development",
      "Land Development & Site Preparation",
      "Internal Road Construction",
      "Drainage System Development",
      "Overhead Water Tank Construction",
      "Compound Wall Construction",
    ],
    keyBenefits: [
      "High-precision GPS land survey and boundary mapping",
      "End-to-end assistance for DTCP and local body layout approvals",
      "Robust heavy civil work: internal roads, stormwater drainage, compound walls",
      "Maximizes land utilization efficiency and overall property appraisal value",
    ],
    whyChooseUs: [
      "Proven technical expertise in multi-acre layout engineering",
      "Deep understanding of regional land development compliance and documentation",
      "Heavy machinery and dedicated site preparation workforce",
    ],
  },
  "real-estate": {
    id: "real-estate",
    title: "Real Estate Development",
    icon: "🏘️",
    shortIntro: "Strategic Plot Promotion & Premium Layout Development",
    fullDescription:
      "SCE Construction's Real Estate Development division specializes in developing strategic residential layouts, property promotion, and prime plot promotion. We identify fast-growing residential zones, curate legal-clear plot layouts, and equip every project with essential civic infrastructure to offer homebuyers and real estate investors secure, high-appreciation land opportunities.",
    items: [
      "Property Promotion",
      "Residential Plot Development",
      "Layout Development",
      "Land Development Projects",
    ],
    keyBenefits: [
      "100% legal-clear title verification and transparent documentation",
      "Strategically located in high-growth residential and investment corridors",
      "Fully developed plots with roads, drainage, water supply, and electrification ready",
      "Direct developer pricing with comprehensive buyer guidance",
    ],
    whyChooseUs: [
      "Established brand reputation built on engineering integrity and trust",
      "Hassle-free plot registration and documentation support",
      "Strong focus on long-term capital appreciation for property buyers",
    ],
  },
  "future-projects": {
    id: "future-projects",
    title: "Farmhouse Projects",
    icon: "🌿",
    shortIntro: "Countryside Retreat Planning, Land Prep & Custom Build",
    fullDescription:
      "Experience peaceful living with our specialized Farmhouse Projects service. We assist land owners in planning, developing, and constructing private countryside farmhouses and resort-style holiday homes. From initial land contouring and fencing to sustainable architectural design and luxury construction, we create personal sanctuaries tailored for relaxation and value.",
    items: [
      "Farmhouse Planning",
      "Farmhouse Construction",
      "Farmhouse Land Development",
    ],
    keyBenefits: [
      "Tailored layout planning harmonizing natural terrain with modern living",
      "Complete site prep: perimeter fencing, water source planning, and access roads",
      "Climate-conscious, durable building structures for leisure and long-term utility",
      "Turnkey execution from land clearing to turnkey interior setup",
    ],
    whyChooseUs: [
      "Specialized expertise in rural and semi-urban land development",
      "Custom architectural styles combining rustic aesthetics with modern luxury",
      "Dedicated management for private estate and holiday home construction",
    ],
  },
};

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
    id: "villa-project",
    title: "Premium Villa Project",
    category: "Residential",
    description:
      "A custom-designed villa with modern architecture, spacious interiors, and premium finishing - built to the highest construction standards.",
    location: "Madurai, Tamil Nadu",
    year: 2024,
    image: "/images/projects/villa-project.jpg",
  },
  {
    id: "independent-house",
    title: "Independent House Construction",
    category: "Residential",
    description:
      "Complete independent house construction from foundation to finishing, featuring contemporary design and durable materials.",
    location: "Madurai, Tamil Nadu",
    year: 2024,
    image: "/images/projects/independent-house.jpg",
  },
  {
    id: "layout-development",
    title: "Residential Layout Development",
    category: "Layout Development",
    description:
      "A professionally planned residential layout with DTCP approval, internal roads, drainage systems, and essential infrastructure.",
    location: "Madurai, Tamil Nadu",
    year: 2024,
    image: "/images/projects/layout-development.jpg",
  },
  {
    id: "land-survey",
    title: "GPS Land Survey & Site Planning",
    category: "Land Development",
    description:
      "Precision GPS-based land survey and site measurement for accurate layout planning and development readiness.",
    location: "Madurai, Tamil Nadu",
    year: 2024,
    image: "/images/projects/land-survey.jpg",
  },
  {
    id: "interior-finishing",
    title: "Interior Design & Finishing",
    category: "Interior",
    description:
      "Complete interior design and finishing works - including modular kitchens, wardrobes, false ceilings, and premium flooring solutions.",
    location: "Madurai, Tamil Nadu",
    year: 2024,
    image: "/images/projects/interior-finishing.jpg",
  },
  {
    id: "plot-development",
    title: "Residential Plot Development",
    category: "Layout Development",
    description:
      "Strategic residential plot development with proper approvals, infrastructure planning, and value-driven positioning for homebuyers.",
    location: "Madurai, Tamil Nadu",
    year: 2024,
    image: "/images/projects/plot-development.jpg",
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
    id: "end-to-end",
    title: "End-to-End Solutions",
    description:
      "From land surveys and approvals to construction and interior finishing - we manage every stage of your project under one roof.",
    icon: "✅",
  },
  {
    id: "land-development",
    title: "Professional Land Development",
    description:
      "GPS-based surveys, DTCP approval assistance, layout planning, and complete site infrastructure - executed with technical precision.",
    icon: "📐",
  },
  {
    id: "quality",
    title: "Quality Engineering Standards",
    description:
      "We follow strict engineering standards at every stage - using quality materials, proven methods, and professional site supervision.",
    icon: "⭐",
  },
  {
    id: "customer-focus",
    title: "Customer-Focused Approach",
    description:
      "Your vision drives every decision. We prioritize clear communication, transparent updates, and a hassle-free construction experience.",
    icon: "🤝",
  },
  {
    id: "modern-planning",
    title: "Modern Planning & Execution",
    description:
      "We leverage modern planning tools, GPS technology, and systematic project workflows to ensure on-time, on-budget delivery.",
    icon: "📊",
  },
  {
    id: "transparency",
    title: "Transparent Project Management",
    description:
      "No hidden costs, no surprises. Detailed project plans, regular progress updates, and full cost transparency from day one.",
    icon: "💰",
  },
];

// ── Contact Details ─────────────────────────────────────────
export const contactDetails = {
  address: "Madurai, Tamil Nadu, India",
  phone: "+91 00000 00000",
  email: "info@sceconstruction.com",
  workingHours: "Mon – Sat: 9:00 AM – 6:00 PM",
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
  },
};
