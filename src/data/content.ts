// ============================================================
// SCE Construction - Central Content Data (Human-Audited & Rewritten)
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
  tagline: "Quality Construction & Land Development You Can Trust",
  description:
    "Shylesh Circuits & Engineering helps you build quality homes and commercial buildings with proper planning, skilled workers, and on-time delivery. From independent houses and villas to land development and DTCP approvals, we take care of your project from planning to final handover.",
  mission:
    "To build strong, beautiful homes and planned layouts with transparent pricing, quality materials, and dedicated customer support.",
  vision:
    "To be Tamil Nadu's most trusted builder by delivering every project on time, within budget, and to the highest quality standards.",
  cta: "Get Free Quote",
};

// ── Hero ────────────────────────────────────────────────────
export const heroContent = {
  subtitle: "RESIDENTIAL CONSTRUCTION • LAND DEVELOPMENT • 3D ELEVATION",
  title: "Build Your Dream Home",
  titleAccent: "With Complete Peace of Mind",
  description:
    "We handle your entire house construction and land development project with quality materials, transparent pricing, and on-time completion across Tamil Nadu.",
  ctaPrimary: "Get Free Quote",
  ctaSecondary: "View Our Projects",
};

// ── Statistics ──────────────────────────────────────────────
export interface Statistic {
  value: number;
  suffix: string;
  label: string;
}

export const statistics: Statistic[] = [
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Skilled Team Members" },
  { value: 5, suffix: "", label: "Core Services" },
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
    title: "House & Building Construction",
    description:
      "We construct independent houses, luxury villas, and apartments with quality materials, experienced site supervisors, and on-time completion.",
    icon: "Building2",
    items: [
      { text: "Independent House Construction" },
      { text: "Luxury Villa Construction" },
      { text: "Apartment Building Construction" },
      { text: "Interior Works & Finishing" },
    ],
  },
  {
    id: "land-development",
    title: "Land & Layout Development",
    description:
      "GPS land surveying, DTCP approval assistance, layout development, internal roads, and site preparation for plot owners and developers.",
    icon: "MapPinned",
    items: [
      { text: "GPS Land Survey & Boundary Mapping" },
      { text: "DTCP Approval Assistance" },
      { text: "Internal Roads & Drainage Systems" },
      { text: "Compound Wall & Site Prep" },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Plot Promotion",
    description:
      "Planned residential layout development and plot promotion in prime growing locations with clear legal titles and complete infrastructure.",
    icon: "Building",
    items: [
      { text: "Residential Plot Promotion" },
      { text: "Approved Layout Planning" },
      { text: "Infrastructure Ready Plots" },
      { text: "Clear Title Verification" },
    ],
  },
  {
    id: "future-projects",
    title: "Farmhouse Projects",
    description:
      "Custom farmhouse planning, land preparation, and construction to build your peaceful weekend retreat surrounded by nature.",
    icon: "Trees",
    items: [
      { text: "Farmhouse Design & Planning" },
      { text: "Site Fencing & Water Setup" },
      { text: "Custom Countryside Build" },
    ],
  },
  {
    id: "elevation-3d",
    title: "3D Elevation Design",
    description:
      "Realistic 3D architectural elevation designs that help you see your building's exterior design before construction starts.",
    icon: "Box",
    items: [
      { text: "Residential 3D Elevation" },
      { text: "Villa Exterior Design" },
      { text: "Commercial Facade Renders" },
      { text: "Color & Material Visualization" },
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
    title: "House & Building Construction",
    icon: "🏗️",
    shortIntro: "Quality Independent House & Villa Construction",
    fullDescription:
      "We build independent houses, luxury villas, and residential buildings tailored to your family's needs. Our experienced team manages everything from foundation work and structural engineering to modern interior finishing, ensuring durable quality and transparent cost management.",
    items: [
      "Residential Building Construction",
      "Independent House Construction",
      "Villa Construction",
      "Apartment Construction",
      "Interior Design & Finishing Works",
    ],
    keyBenefits: [
      "Complete project management from floor plan to key handover",
      "Top-grade building materials and structural safety checks",
      "Transparent pricing with no hidden charges",
      "Experienced site engineers supervising daily work",
    ],
    whyChooseUs: [
      "100+ successfully completed homes and villas",
      "In-house team for custom plan drawing and 3D elevation",
      "Timely completion with regular progress updates",
    ],
  },
  "land-development": {
    id: "land-development",
    title: "Land & Layout Development",
    icon: "📐",
    shortIntro: "GPS Survey, Layout Planning & DTCP Approvals",
    fullDescription:
      "We turn raw land into well-planned, government-approved residential layouts. Using precision GPS survey instruments, we map accurate boundaries, assist with DTCP approvals, and build complete layout infrastructure including tar/concrete roads, drainage, water tanks, and compound walls.",
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
      "Accurate boundary measurement using modern GPS survey tools",
      "Step-by-step support for DTCP layout and plot approvals",
      "Complete road, drainage, and utility construction",
      "Increases overall land usability and market value",
    ],
    whyChooseUs: [
      "Over 10 years of experience in layout engineering",
      "Clear knowledge of local land rules and paperwork",
      "In-house earthmoving equipment and site workers",
    ],
  },
  "real-estate": {
    id: "real-estate",
    title: "Real Estate Plot Promotion",
    icon: "🏘️",
    shortIntro: "Approved Residential Plot & Layout Development",
    fullDescription:
      "We create well-planned residential layouts in fast-growing areas across Tamil Nadu. Every plot layout comes with clear legal titles, approved documentation, and essential amenities like roads, water connections, and drainage, giving buyers secure land investment opportunities.",
    items: [
      "Property Promotion",
      "Residential Plot Development",
      "Layout Development",
      "Land Development Projects",
    ],
    keyBenefits: [
      "100% legal clear titles and verified land documents",
      "Located in promising growth corridors with high appreciation",
      "Fully developed plots ready for immediate house construction",
      "Direct builder pricing with complete buyer support",
    ],
    whyChooseUs: [
      "Trusted name backed by 10+ years of construction experience",
      "Hassle-free registration and documentation assistance",
      "Honest guidance for homebuyers and land investors",
    ],
  },
  "future-projects": {
    id: "future-projects",
    title: "Farmhouse Projects",
    icon: "🌿",
    shortIntro: "Farmhouse Planning, Land Prep & Construction",
    fullDescription:
      "Build your private weekend retreat with our custom farmhouse services. We help land owners clear site terrain, install perimeter fencing, plan water sources, and construct comfortable farmhouses designed for family gatherings, relaxation, and long-term value.",
    items: [
      "Farmhouse Planning",
      "Farmhouse Construction",
      "Farmhouse Land Development",
    ],
    keyBenefits: [
      "Thoughtful layout planning suited for natural land contours",
      "Full site preparation including fencing, roads, and water supply",
      "Durable construction designed for countryside climate",
      "Complete execution from land prep to interior setup",
    ],
    whyChooseUs: [
      "Hands-on experience in rural land development",
      "Custom designs blending natural surroundings with modern comfort",
      "Personalized attention for private estate builds",
    ],
  },
  "elevation-3d": {
    id: "elevation-3d",
    title: "3D Elevation Design",
    icon: "🎨",
    shortIntro: "Realistic 3D Exterior Elevation & Facade Design",
    fullDescription:
      "Visualize your dream home before breaking ground. Our 3D design team creates realistic architectural elevation renders, helping you try out different exterior colors, material finishes, wall textures, and lighting options before construction begins.",
    items: [
      "Residential 3D Elevation",
      "Villa Exterior Design",
      "Commercial Building Elevation",
      "Modern Facade Design",
      "Exterior Visualization",
      "Architectural Rendering",
    ],
    keyBenefits: [
      "See your building's exact exterior look before starting work",
      "Make design changes early to save material costs and time",
      "High-resolution 3D images for plan approval and visualization",
      "Custom color and elevation choices within your budget",
    ],
    whyChooseUs: [
      "Experienced architectural designers and 3D visualizers",
      "Clear renders showing exact color and material details",
      "Easy transition from 3D plan to actual building construction",
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
    title: "Premium Villa Construction",
    category: "Residential",
    description:
      "A custom-designed luxury villa with modern elevation, spacious rooms, and quality interior finishing built for a family.",
    location: "Coimbatore, Tamil Nadu",
    year: 2024,
    image: "/images/projects/villa-project.webp",
  },
  {
    id: "independent-house",
    title: "Independent House Build",
    category: "Residential",
    description:
      "Complete independent house construction from foundation to final paint finish, delivered on schedule with quality materials.",
    location: "Coimbatore, Tamil Nadu",
    year: 2024,
    image: "/images/projects/independent-house.webp",
  },
  {
    id: "layout-development",
    title: "Residential Layout Planning",
    category: "Layout Development",
    description:
      "A 5-acre DTCP approved residential layout with tar roads, underground drainage, and street lighting.",
    location: "Coimbatore, Tamil Nadu",
    year: 2024,
    image: "/images/projects/layout-development.webp",
  },
  {
    id: "land-survey",
    title: "GPS Land Survey & Site Mapping",
    category: "Land Development",
    description:
      "Accurate GPS boundary survey and contour mapping for land plot development and government approval paperwork.",
    location: "Coimbatore, Tamil Nadu",
    year: 2024,
    image: "/images/projects/land-survey.webp",
  },
  {
    id: "interior-finishing",
    title: "Interior Design & Woodwork",
    category: "Interior",
    description:
      "Modern home interiors including modular kitchen, hall TV units, bedroom wardrobes, and false ceiling lighting.",
    location: "Coimbatore, Tamil Nadu",
    year: 2024,
    image: "/images/projects/interior-finishing.webp",
  },
  {
    id: "plot-development",
    title: "Plot Development Project",
    category: "Layout Development",
    description:
      "Site clearing, road work, and compound fencing for an approved residential plot layout.",
    location: "Coimbatore, Tamil Nadu",
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
    id: "experience",
    title: "10+ Years Experience",
    description:
      "Over a decade of hands-on experience building homes, villas, and land layouts across Tamil Nadu.",
    icon: "Clock3",
  },
  {
    id: "delivered",
    title: "100+ Projects Completed",
    description:
      "A proven track record of over 100 successful house builds, plot layouts, and engineering projects.",
    icon: "Trophy",
  },
  {
    id: "team",
    title: "50+ Skilled Team",
    description:
      "An experienced team of civil engineers, architects, survey experts, site supervisors, and skilled workers.",
    icon: "Users",
  },
  {
    id: "elevation-3d",
    title: "Realistic 3D Elevation",
    description:
      "Detailed 3D designs that let you preview your building's exterior before construction begins.",
    icon: "Box",
  },
  {
    id: "quality",
    title: "Quality Construction Materials",
    description:
      "We use certified brand-name materials and follow proper structural standards for long-lasting strength.",
    icon: "ShieldCheck",
  },
  {
    id: "end-to-end",
    title: "Complete Project Handover",
    description:
      "From land survey and plan approval to civil construction and interior work, we manage everything.",
    icon: "Building2",
  },
];

// ── Contact Details ─────────────────────────────────────────
export const contactDetails = {
  name: "Shyles Circuit & Engineering Electrical Work",
  address: "PMR Nagar, TVS Nagar, Coimbatore, Tamil Nadu – 641025",
  fullAddress: "Shyles Circuit & Engineering Electrical Work, PMR Nagar, TVS Nagar, Coimbatore, Tamil Nadu – 641025",
  mapUrl: "https://www.google.com/maps/place/Circuit+%26+Engineering+Electrical+Work/@11.0490908,76.9223518,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba859728aa80393:0x1861b2c7c4c52dce!8m2!3d11.0490908!4d76.9223518!16s%2Fg%2F11b8z0k5t_",
  phone: "+91 98422 29272",
  email: "info@scedevelopers.in",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM",
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    twitter: "#",
  },
};
