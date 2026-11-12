const u = (id) => `https://images.unsplash.com/${id}?crop=entropy&cs=srgb&fm=jpg&q=80&w=1400`;

export const IMG = {
  hero: u("photo-1745301558339-44eb3217d5da"),
  living1: u("photo-1682662046610-fbdb3db4bd74"),
  living2: u("photo-1745429523617-0d837856ca35"),
  living3: u("photo-1742319096901-b8dc2e2734cc"),
  living4: u("photo-1564078516393-cf04bd966897"),
  bed1: u("photo-1616594039964-ae9021a400a0"),
  bed2: u("photo-1720420021124-4e18564e070f"),
  bed3: u("photo-1642541070065-3912f347e7c6"),
  bed4: u("photo-1696762932825-2737db830bbe"),
  kit1: u("photo-1722605090433-41d1183a792d"),
  kit2: u("photo-1663811396777-05505d999151"),
  kit3: u("photo-1682662044733-9120471befc7"),
  kit4: u("photo-1559554704-0f74b35a8718"),
  din1: u("photo-1666585958637-698ef8559cfc"),
  din2: u("photo-1560185007-cde436f6a4d0"),
  din3: u("photo-1593136596203-7212b076f4d2"),
  din4: u("photo-1761658652336-95d31ce1d806"),
};

export const CITIES = ["Kochi", "Ernakulam", "Aluva", "Kakkanad", "Maradu", "Thrissur", "Munnar", "Other (Kerala)"];
export const PROPERTY_TYPES = ["Apartment", "Villa", "Penthouse", "Office", "Retail shop", "Commercial"];

export const USPS = ["Concept to turnkey handover", "Material transparency", "Long-time warranty"];

export const TRENDING = [
  { title: "Soft Nordic Mornings", tag: "Living", imgs: [IMG.living2, IMG.din1, IMG.bed3] },
  { title: "Brass & Teak Revival", tag: "Indian Contemporary", imgs: [IMG.living1, IMG.din3, IMG.bed1] },
  { title: "Ten Kitchens We Love", tag: "Kitchen", imgs: [IMG.kit1, IMG.kit2, IMG.kit3] },
  { title: "Quiet Bedroom Retreats", tag: "Bedroom", imgs: [IMG.bed2, IMG.bed4, IMG.bed3] },
  { title: "Dinner For Eight", tag: "Dining", imgs: [IMG.din4, IMG.din2, IMG.din1] },
];

const P = (f) => `/projects/${f}.jpg`;

export const PROJECTS = [
  { name: "Chai Bazaar", type: "Retail", label: "Retail shop · Kannan Devan Hills Plantations", place: "Mattupetty, Munnar", status: "Completed", img: P("chai-interior-3") },
  { name: "Mr. Vinod's Residence", type: "Residence", label: "Residence", place: "Aluva", status: "Completed", img: P("vinod-dining") },
  { name: "Design Platform", type: "Residence", label: "Residential interiors · Sojan", place: "Thrissur", status: "Completed", img: P("thrissur-kitchen") },
  { name: "Cubespace", type: "Office", label: "Office interior", place: "Kakkanad, Ernakulam", status: "Completed", img: P("cubespace-1") },
  { name: "Geojit Finance", type: "Office", label: "Financial institution", place: "", status: "Completed", img: P("geojit-2") },
  { name: "River Showroom", type: "Commercial", label: "Showroom", place: "", status: "Completed", img: P("river-1") },
  { name: "Optical Store", type: "Commercial", label: "Commercial interiors", place: "", status: "Completed", img: P("optical-shop") },
  { name: "Actor Indrajith Sukumaran's Residence", type: "Residence", label: "Residence interior", place: "Maradu, Ernakulam", status: "On-going", img: P("indrajith-2") },
  { name: "Commercial Building", type: "Commercial", label: "Commercial interiors", place: "", status: "Completed", img: P("commercial-building") },
];

export const ONGOING = [
  { img: P("indrajith-1"), label: "Actor Indrajith Sukumaran's Residence · Maradu" },
  { img: P("ongoing-house"), label: "Residence · on-going" },
  { img: P("ongoing-panel"), label: "Wall panelling" },
  { img: P("ongoing-cabinet"), label: "Wardrobe & cabinetry" },
  { img: P("ongoing-site"), label: "Ceiling & lighting work" },
  { img: P("ongoing-facade"), label: "Commercial interiors · on-going" },
  { img: P("indrajith-2"), label: "Residence entrance · Maradu" },
];

export const SERVICES = [
  { title: "Complete Turnkey Services", text: "We design solutions tailored to your style, space and budget. This includes interior execution, MEP services such as electrical, plumbing, air conditioning etc." },
  { title: "Residential Interiors", text: "Considering your requirements and space constraints, our dedicated team will help you create your dream home with all its beauty." },
  { title: "Commercial Interiors", text: "We create visually impressive commercial spaces that reflect a specific theme, prioritising functionality and safety, without compromising on freshness, style and aesthetics." },
  { title: "Office Interiors", text: "Finest, highly ergonomic office interiors, right from cabins to bay areas, receptions, meeting areas, conference rooms, cubicles, pantry and every other space requirement." },
];

export const CLIENTS = ["TATA Projects", "Tata Consumer Products Limited", "Sands Infra", "Kannan Devan Hills Plantations Company (P) Ltd", "Ripple Tea", "abm"];

export const CONTACT = {
  phones: ["+91 99617 75580", "+91 82818 99881"],
  email: "poiesizinteriors@gmail.com",
  address: "43/2635-A2, Pallissery Road, Palarivattom, Ernakulam 682 025",
  website: "www.poiesiz.com",
};

export const ROOMS = [
  { key: "master", label: "Master Bedroom", count: 186, imgs: [IMG.bed1, IMG.bed4, IMG.bed3, IMG.bed2] },
  { key: "living", label: "Living & Dining", count: 204, imgs: [IMG.living2, IMG.living1, IMG.living3, IMG.din1] },
  { key: "kitchen", label: "Modular Kitchen", count: 152, imgs: [IMG.kit1, IMG.kit2, IMG.kit3, IMG.kit4] },
  { key: "guest", label: "Guest Bedroom", count: 58, imgs: [IMG.bed2, IMG.bed3, IMG.bed4, IMG.bed1] },
  { key: "dining", label: "Dining Area", count: 97, imgs: [IMG.din2, IMG.din4, IMG.din3, IMG.din1] },
];

export const STYLES = [
  { name: "Tropical", count: 1120, img: IMG.din4, chips: ["#5E7A4C", "#E9DCC3", "#9A6B3F"] },
  { name: "Indian Fusion", count: 1380, img: IMG.living1, chips: ["#8A6200", "#FEBD1C", "#1C1C1C"] },
  { name: "Modern Classical", count: 5240, img: IMG.bed1, chips: ["#1A1918", "#E5DEC9", "#B08D57"] },
  { name: "Japandi", count: 960, img: IMG.living3, chips: ["#A89A86", "#F3EFEA", "#4A4038"] },
];

export const CATEGORIES = ["Tile Designs", "Wall Panels", "Balcony Ideas", "False Ceilings", "Wardrobes", "Pooja Units", "TV Units", "Study Corners"];

export const WHY = [
  { title: "Concept to turnkey handover", text: "Our team assists right from the initial conceptual design to the turnkey handover, transforming any construction into a dream project." },
  { title: "In-house expertise", text: "A great team of engineers, interior designers, technicians and contractors under one roof." },
  { title: "Material transparency", text: "Customised turnkey and unique interior designs, with complete transparency on every material used." },
  { title: "Lifetime assistance", text: "Our commitment to lifetime assistance is upheld by a long-time warranty." },
  { title: "Timely, sustainable delivery", text: "Innovative design solutions delivered on time, with sustainable options that respect the environment we live in." },
];

export const STEPS = [
  { title: "Free consultation", text: "Share your space, style and budget with our team, and walk through ideas together." },
  { title: "Conceptual design", text: "We develop a concept tailored to your requirements and space constraints." },
  { title: "Execution & MEP", text: "Interior execution along with electrical, plumbing and air-conditioning by our in-house team." },
  { title: "Turnkey handover", text: "Your space is handed over ready to use, with lifetime assistance afterwards." },
];

export const REVIEWS = [
  { name: "Ananya R.", city: "Bengaluru", text: "Our designer understood how we live before showing a single render. The kitchen is the calmest room in the house now." },
  { name: "Karthik S.", city: "Hyderabad", text: "The quote listed every hinge and handle. What we were told on day one is what we paid on the last day." },
  { name: "Meera & Rohit", city: "Pune", text: "We moved cities mid-project and the site team kept us updated with photos every evening. Handover was on schedule." },
  { name: "Farhan K.", city: "Mumbai", text: "Small 2 BHK, lots of storage needs. They found space we didn't know we had, without it feeling crowded." },
  { name: "Lakshmi V.", city: "Chennai", text: "The pooja unit and the wardrobe finishes match perfectly. Lovely attention to the little things." },
];

export const FAQS = [
  { q: "How do I get started with POIESIZ Interiors?", a: "Book a free consultation using the form on this page. A designer will call you to understand your home, timeline and budget, and set up a meeting." },
  { q: "Is the design consultation really free?", a: "Yes. The first consultation has no charge and no obligation. You only pay a token amount if you decide to go ahead." },
  { q: "Where are you based and which projects do you take?", a: "We are based in Kochi, Kerala, and undertake both residential and commercial projects: luxury homes, penthouses, flats, financial institutions, offices and retail shops." },
  { q: "What is included in your turnkey service?", a: "Everything from the initial conceptual design to the turnkey handover, including interior execution and MEP services such as electrical, plumbing and air conditioning." },
  { q: "Can I change the design after booking?", a: "Yes. You can make revisions during the design stage. Changes after production starts are discussed with you along with any cost impact." },
  { q: "Are there any hidden costs?", a: "No. You receive an itemised quote before work starts, covering materials, hardware, labour and taxes." },
  { q: "How long will my home take?", a: "It depends on scope and size. Your designer will share a dated timeline after the consultation, and your project manager tracks it on site." },
  { q: "Do you offer a warranty and after-sales support?", a: "Yes. Our work is backed by a long-time warranty and our commitment to lifetime assistance." },
];

export const FOOTER_CITIES = ["Kochi", "Ernakulam", "Palarivattom", "Kakkanad", "Aluva", "Maradu", "Thrissur", "Munnar"];
