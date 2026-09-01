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
  name: "SCE Developers",
  tagline: "Quality Construction & Land Development You Can Trust",
  description:
    "Shylesh Circuit & Engineering helps you build quality homes and commercial buildings with proper planning, skilled workers, and on-time delivery. From independent houses and villas to land development and DTCP approvals, we take care of your project from planning to final handover.",
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
  { value: 100, suffix: "%", label: "Transparent Pricing" },
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
      "In-house team for custom plans and 3D elevation",
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
  filterCategory: "all" | "residential" | "layout" | "elevation";
  description: string;
  location: string;
  year: number;
  image: string;
  objectPosition?: string;
  gallery?: string[];
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "villa-project",
    title: "Premium Villa Construction",
    category: "Luxury Residential",
    filterCategory: "residential",
    description:
      "Turnkey luxury villa construction featuring custom architectural elevations, private in-ground swimming pools, traditional Mangalore tile craftsmanship, and landscaped rooftop garden terraces with structural steel pergolas.",
    location: "Coimbatore, Tamil Nadu",
    year: 2024,
    image: "/images/projects/premium-villa/villa-luxury-pool-elevation.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/premium-villa/villa-luxury-pool-elevation.webp",
      "/images/projects/premium-villa/villa-night-elevation-lighting.webp",
      "/images/projects/premium-villa/villa-rooftop-turf-lounge.webp",
      "/images/projects/premium-villa/villa-rooftop-pergola-bar.webp",
      "/images/projects/premium-villa/villa-traditional-tiled-facade.webp",
      "/images/projects/premium-villa/villa-modern-pergola-pool.webp",
      "/images/projects/premium-villa/villa-rooftop-terracotta-sitout.webp",
      "/images/projects/premium-villa-coimbatore.webp",
    ],
    features: [
      "Private Swimming Pool & Deck",
      "Landscaped Rooftop Turf Lounge",
      "Custom Steel Pergola & Outdoor Bar",
      "Traditional Tiled & Modern Facades",
      "Architectural Facade Illumination",
    ],
  },
  {
    id: "independent-house",
    title: "Independent House Build",
    category: "Residential House",
    filterCategory: "residential",
    description:
      "Custom 2-storey modern independent residential construction featuring structural concrete cantilevers, natural ledger-stone facade accents, wood-panelled ceiling soffits, and heavy-duty automated security gates.",
    location: "Pollachi, Tamil Nadu",
    year: 2025,
    image: "/images/projects/independent-house/house-2storey-stone-elevation.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/independent-house/house-2storey-stone-elevation.webp",
      "/images/projects/independent-house/house-twilight-facade-sconces.webp",
      "/images/projects/independent-house/house-dark-luxury-floating-steps.webp",
      "/images/projects/independent-house/house-gated-entrance-driveway.webp",
      "/images/projects/independent-house-build.webp",
    ],
    features: [
      "2-Storey RCC Framed Structure",
      "Stacked Ledger-Stone Cladding",
      "Glass Balustrade with Planter",
      "Floating Concrete Entry Steps",
      "Custom Automated Metal Gate",
    ],
  },
  {
    id: "site-prep-groundwork",
    title: "Land Development & Site Preparation",
    category: "Land Development",
    filterCategory: "layout",
    description:
      "End-to-end land development and site preparation execution featuring tractor-mounted auger drilling for boundary piling, heavy mechanical earthmoving with JCB loaders, reinforced concrete drainage trenches, and heavy vibratory compaction for internal gravel roadways.",
    location: "Coimbatore, Tamil Nadu",
    year: 2025,
    image: "/images/projects/site-preparation/siteprep-jcb-grading-earthmoving.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/site-preparation/siteprep-jcb-grading-earthmoving.webp",
      "/images/projects/site-preparation/siteprep-tractor-auger-drilling.webp",
      "/images/projects/site-preparation/siteprep-leveled-farm-acreage.webp",
      "/images/projects/site-preparation/siteprep-concrete-drainage-footing.webp",
      "/images/projects/site-preparation/siteprep-road-roller-compaction.webp",
      "/images/projects/site-preparation-drilling.webp",
    ],
    features: [
      "Hydraulic Auger Borehole Drilling",
      "JCB Earthmoving & Soil Grading",
      "RCC Drainage & Footing Trenches",
      "Vibratory Road Base Compaction",
      "Complete Raw Acreage Development",
    ],
  },
  {
    id: "layout-development",
    title: "Residential Layout Planning",
    category: "Layout Development",
    filterCategory: "layout",
    description:
      "Comprehensive residential spatial planning and architectural layout drafting, translating functional Vastu-compliant 2D engineering floor plans into precise 3D cutaway models and photorealistic exterior elevations.",
    location: "Dindigul, Tamil Nadu",
    year: 2025,
    image: "/images/projects/layout-planning/layout-2d-floorplan-3d-sheet.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/layout-planning/layout-2d-floorplan-3d-sheet.webp",
      "/images/projects/layout-planning/layout-bungalow-dimensioned-plan.webp",
      "/images/projects/layout-planning/layout-3d-isometric-cutaway-plan.webp",
      "/images/projects/layout-development.webp",
    ],
    features: [
      "2D CAD Structural Floor Plans",
      "Photorealistic 3D Exterior Elevation",
      "3D Isometric Cutaway Modeling",
      "Vastu-Compliant Spatial Flow",
      "G+1 Duplex & Bungalow Sheets",
    ],
  },
  {
    id: "land-survey",
    title: "Hillside Villa & Contour Build",
    category: "Hillside Construction",
    filterCategory: "residential",
    description:
      "Specialized slope-responsive construction and hillside civil engineering, featuring terraced reinforced concrete footings on cut earth, heavy structural steel column frameworks, and cantilevered mountain view decks.",
    location: "Madurai, Tamil Nadu",
    year: 2026,
    image: "/images/projects/hillside-villa/hillside-stilt-mountain-villa.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/hillside-villa/hillside-stilt-mountain-villa.webp",
      "/images/projects/hillside-villa/hillside-active-steel-framing-site.webp",
      "/images/projects/hillside-villa/hillside-cantilever-forest-villa.webp",
      "/images/projects/hillside-villa-construction.webp",
    ],
    features: [
      "Stepped Slope Concrete Footings",
      "Structural Steel Frame Grid",
      "Stilt Foundation Engineering",
      "Panoramic Trapezoidal Glazing",
      "Contour Retaining Structures",
    ],
  },
  {
    id: "custom-elevation",
    title: "Interior & Finishing",
    category: "Interior & Finishing",
    filterCategory: "elevation",
    description:
      "Turnkey interior architecture and finishing execution featuring custom modular kitchen joinery, double-height staircase storage, bespoke backlit pooja sanctuaries, skylit courtyards with terracotta jaali screens, and luxury stone-accented wet rooms.",
    location: "Coimbatore, Tamil Nadu",
    year: 2026,
    image: "/images/projects/interior-finishing/interior-modular-kitchen-island.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/interior-finishing/interior-modular-kitchen-island.webp",
      "/images/projects/interior-finishing/interior-doubleheight-dining-stairs.webp",
      "/images/projects/interior-finishing/interior-custom-backlit-pooja-mandir.webp",
      "/images/projects/interior-finishing/interior-skylit-jaali-courtyard-swing.webp",
      "/images/projects/interior-finishing/interior-luxury-stone-master-bath.webp",
      "/images/projects/interior-finishing/interior-opentread-timber-staircase.webp",
      "/images/projects/interior-finishing/interior-balcony-sitout-timber-slats.webp",
      "/images/projects/interior-finishing/interior-courtyard-deck-hammock.webp",
      "/images/projects/interior-finishing/interior-understair-reading-nook.webp",
      "/images/projects/interior-finishing/interior-microcement-skylight-bath.webp",
      "/images/projects/interior-finishing/interior-glass-canopy-veranda-corridor.webp",
      "/images/projects/interior-finishing/interior-patio-utility-kitchen.webp",
      "/images/projects/interior-staircase-finish.webp",
    ],
    features: [
      "Quartz Waterfall Kitchen Island",
      "Double-Height Staircase Joinery",
      "Bespoke Backlit Pooja Mandir",
      "Skylit Atrium with Terracotta Jaali",
      "Master Wet Rooms with Stone & Skylights",
    ],
  },
  {
    id: "project-handover",
    title: "Multi-Storey Residential Handover",
    category: "Turnkey Handover",
    filterCategory: "residential",
    description:
      "End-to-end multi-storey residential apartment construction, from multi-tier reinforced concrete superstructure and masonry framing to completed turnkey handovers featuring stilt car parking, wood-panelled balcony soffits, and glass balustrades.",
    location: "Pollachi, Tamil Nadu",
    year: 2024,
    image: "/images/projects/multi-storey/multistorey-g4-residential-elevation.webp",
    objectPosition: "center center",
    gallery: [
      "/images/projects/multi-storey/multistorey-g4-residential-elevation.webp",
      "/images/projects/multi-storey/multistorey-active-superstructure-scaffolding.webp",
      "/images/projects/multi-storey/multistorey-g5-geometric-grid-block.webp",
      "/images/projects/multi-storey/multistorey-navy-facade-twilight.webp",
      "/images/projects/multi-storey/multistorey-courtyard-atrium-planters.webp",
      "/images/projects/housewarming-handover-real.webp",
    ],
    features: [
      "Multi-Storey RCC Superstructure",
      "Stilt Parking with Automated Gates",
      "Wood-Panelled Balcony Soffits",
      "Toughened Glass Balustrades",
      "Turnkey Griha Pravesham Handover",
    ],
  },
];

// ── Why Choose Us / Trust Pillars ───────────────────────────
export interface TrustPillar {
  id: string;
  title: string;
  description: string;
  icon: "UsersRound" | "Receipt" | "ClipboardCheck" | "ShieldCheck";
}

export const whyChooseUs: TrustPillar[] = [
  {
    id: "coordination",
    title: "One Team, Single Point of Contact",
    description:
      "In-house architects, civil engineers, and site managers work as one unified team—giving you a single accountable point of contact from day one to key handover.",
    icon: "UsersRound",
  },
  {
    id: "pricing",
    title: "Stage-Wise Transparent Estimates",
    description:
      "Itemized cost breakdowns for materials and labor with structured stage-by-stage billing tied directly to physical on-site progress.",
    icon: "Receipt",
  },
  {
    id: "planning",
    title: "Practical Planning & Approvals",
    description:
      "Functional 2D floor plans, 3D exterior elevations, and complete DTCP / local body approval assistance tailored to your plot and budget.",
    icon: "ClipboardCheck",
  },
  {
    id: "execution",
    title: "Accountable On-Site Execution",
    description:
      "Daily on-site supervision by experienced site engineers with structural quality inspections and milestone tracking through final key handover.",
    icon: "ShieldCheck",
  },
];

// ── Contact Details ─────────────────────────────────────────
export const contactDetails = {
  name: "Shylesh Circuit & Engineering",
  gstin: "33APOPP1899K1Z4",
  address: "372/3, Vidhiya Colony, TVS Nagar, Coimbatore – 641025, Tamil Nadu, India",
  fullAddress: "372/3, Vidhiya Colony, TVS Nagar, Coimbatore – 641025, Tamil Nadu, India",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=372%2F3%2C+Vidhiya+Colony%2C+TVS+Nagar%2C+Coimbatore+%E2%80%93+641025%2C+Tamil+Nadu%2C+India",
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


