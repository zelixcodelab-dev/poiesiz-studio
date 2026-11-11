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

export const CITIES = ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Chennai", "Delhi NCR"];
export const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa"];

export const USPS = ["Designs drawn for you", "Every rupee itemised", "Long-term warranty"];

export const TRENDING = [
  { title: "Soft Nordic Mornings", tag: "Living", imgs: [IMG.living2, IMG.din1, IMG.bed3] },
  { title: "Brass & Teak Revival", tag: "Indian Contemporary", imgs: [IMG.living1, IMG.din3, IMG.bed1] },
  { title: "Ten Kitchens We Love", tag: "Kitchen", imgs: [IMG.kit1, IMG.kit2, IMG.kit3] },
  { title: "Quiet Bedroom Retreats", tag: "Bedroom", imgs: [IMG.bed2, IMG.bed4, IMG.bed3] },
  { title: "Dinner For Eight", tag: "Dining", imgs: [IMG.din4, IMG.din2, IMG.din1] },
];

export const PROJECTS = [
  { name: "The Banyan Residence", city: "Bengaluru", style: "Modern Classical", bhk: "4 BHK", rating: 5, img: IMG.living1 },
  { name: "Lakeview Courtyard", city: "Hyderabad", style: "Indian Contemporary", bhk: "3 BHK", rating: 5, img: IMG.living3 },
  { name: "Riverside Quiet House", city: "Pune", style: "Japandi", bhk: "3 BHK", rating: 4, img: IMG.bed1 },
  { name: "Marine Drive Loft", city: "Mumbai", style: "Luxury Modern", bhk: "2 BHK", rating: 5, img: IMG.kit2 },
  { name: "Neem Tree Villa", city: "Bengaluru", style: "Tropical", bhk: "Villa", rating: 5, img: IMG.din4 },
  { name: "Old Town Terrace", city: "Hyderabad", style: "Eclectic", bhk: "2 BHK", rating: 4, img: IMG.din3 },
];

export const ROOMS = [
  { key: "master", label: "Master Bedroom", count: 186, imgs: [IMG.bed1, IMG.bed4, IMG.bed3, IMG.bed2] },
  { key: "living", label: "Living & Dining", count: 204, imgs: [IMG.living2, IMG.living1, IMG.living3, IMG.din1] },
  { key: "kitchen", label: "Modular Kitchen", count: 152, imgs: [IMG.kit1, IMG.kit2, IMG.kit3, IMG.kit4] },
  { key: "guest", label: "Guest Bedroom", count: 58, imgs: [IMG.bed2, IMG.bed3, IMG.bed4, IMG.bed1] },
  { key: "dining", label: "Dining Area", count: 97, imgs: [IMG.din2, IMG.din4, IMG.din3, IMG.din1] },
];

export const STYLES = [
  { name: "Tropical", count: 1120, img: IMG.din4, chips: ["#5E7A4C", "#E9DCC3", "#9A6B3F"] },
  { name: "Indian Fusion", count: 1380, img: IMG.living1, chips: ["#C85A32", "#D4A359", "#2D3B36"] },
  { name: "Modern Classical", count: 5240, img: IMG.bed1, chips: ["#1A1918", "#E5DEC9", "#B08D57"] },
  { name: "Japandi", count: 960, img: IMG.living3, chips: ["#A89A86", "#F3EFEA", "#4A4038"] },
];

export const CATEGORIES = ["Tile Designs", "Wall Panels", "Balcony Ideas", "False Ceilings", "Wardrobes", "Pooja Units", "TV Units", "Study Corners"];

export const WHY = [
  { title: "One team, start to finish", text: "A dedicated designer and project manager stay with your home from the first sketch to the final clean-up." },
  { title: "Built in our own workshop", text: "Modular units are cut, edged and finished in-house, so quality never depends on a middleman." },
  { title: "Designed around your day", text: "Storage, lighting and layouts planned for how your family actually cooks, works and rests." },
  { title: "A price you can read", text: "Itemised quotes with materials, hardware and labour listed line by line. No surprises at handover." },
  { title: "Checked, then checked again", text: "Multi-stage quality checks at the workshop and on site before anything is signed off." },
];

export const CENTRES = [
  { area: "Whitefield", city: "Bengaluru" },
  { area: "HSR Layout", city: "Bengaluru" },
  { area: "Wakad", city: "Pune" },
  { area: "Kondapur", city: "Hyderabad" },
  { area: "Bandra West", city: "Mumbai" },
];

export const STEPS = [
  { title: "Free design consultation", text: "Meet a designer, share your floor plan and walk through ideas, finishes and budget." },
  { title: "Confirm your booking", text: "Lock your slot with a small token amount once you like the direction." },
  { title: "Your detailed design", text: "Room-by-room 3D views, material boards and a final itemised quote for sign-off." },
  { title: "Make & install", text: "Units are built in the workshop, then installed and finished on site by our crew." },
];

export const REVIEWS = [
  { name: "Ananya R.", city: "Bengaluru", text: "Our designer understood how we live before showing a single render. The kitchen is the calmest room in the house now." },
  { name: "Karthik S.", city: "Hyderabad", text: "The quote listed every hinge and handle. What we were told on day one is what we paid on the last day." },
  { name: "Meera & Rohit", city: "Pune", text: "We moved cities mid-project and the site team kept us updated with photos every evening. Handover was on schedule." },
  { name: "Farhan K.", city: "Mumbai", text: "Small 2 BHK, lots of storage needs. They found space we didn't know we had, without it feeling crowded." },
  { name: "Lakshmi V.", city: "Chennai", text: "The pooja unit and the wardrobe finishes match perfectly. Lovely attention to the little things." },
];

export const FAQS = [
  { q: "How do I get started with Aangan Studio?", a: "Book a free consultation using the form on this page. A designer will call you to understand your home, timeline and budget, and set up a meeting." },
  { q: "Is the design consultation really free?", a: "Yes. The first consultation has no charge and no obligation. You only pay a token amount if you decide to go ahead." },
  { q: "Which cities do you work in?", a: "We currently take projects in the cities listed in our footer. If yours isn't there, leave your details and we'll tell you when we arrive." },
  { q: "What is included in your interior services?", a: "Space planning, 3D design, material selection, modular furniture, false ceilings, lighting, painting, installation and project management." },
  { q: "Can I change the design after booking?", a: "Yes. You can make revisions during the design stage. Changes after production starts are discussed with you along with any cost impact." },
  { q: "Are there any hidden costs?", a: "No. You receive an itemised quote before work starts, covering materials, hardware, labour and taxes." },
  { q: "How long will my home take?", a: "It depends on scope and size. Your designer will share a dated timeline after the consultation, and your project manager tracks it on site." },
  { q: "Do you offer a warranty and after-sales support?", a: "Yes. Modular work is covered by a written warranty and our service team handles any issues after handover." },
];

export const FOOTER_CITIES = ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Chennai", "Delhi", "Gurugram", "Noida"];
