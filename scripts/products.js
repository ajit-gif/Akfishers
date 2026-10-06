/* ============================================================
   AK FISHERS SUPPLIER LLP — Product Catalogue Data
   Real catalogue · prices are indicative per-kg ranges
   ============================================================ */

/* Bump this when the hard-coded catalogue below changes so any
   stale admin edits saved in localStorage are ignored. */
const AKF_DATA_VERSION = "2";

/* Product photos supplied by the owner (assets/images/products/). sea.jpg is a neutral graphic used for page banners. */
const AKF_IMG = {
  sea: "assets/images/sea.jpg",
  pomfret: "assets/images/products/pomfret.jpg",
  surmai: "assets/images/products/surmai.jpg",
  rawas: "assets/images/products/rawas.jpg",
  halwa: "assets/images/products/halwa.jpg",
  bangda: "assets/images/products/bangda.jpg",
  prawns: "assets/images/products/prawns.jpg",
  mandeli: "assets/images/products/mandeli.jpg",
  bombil: "assets/images/products/bombil.jpg",
  mushi: "assets/images/products/mushi.jpg",
  blackCrab: "assets/images/products/black-crab.jpg",
  redCrab: "assets/images/products/red-crab.jpg",
  crab: "assets/images/products/crab.jpg",
  tisarya: "assets/images/products/tisarya.jpg",
  dhoma: "assets/images/products/dhoma.jpg",
  ghol: "assets/images/products/ghol.jpg",
  murdi: "assets/images/products/murdi.jpg",
  singhada: "assets/images/products/singhada.jpg",
  thamb: "assets/images/products/thamb.jpg"
};

const AKF_PRODUCTS = [
  {
    id: "pomfret",
    name: "Pomfret",
    marathi: "पापलेट",
    category: "pomfret",
    desc: "Mumbai's favourite fish — firm, white, flaky flesh. Perfect for tawa fry, stuffed pomfret and coastal curries.",
    price: 1200, priceMax: 2200, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "bestseller", stock: 20, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut", "Steak Cut", "Fillet"],
    img: AKF_IMG.pomfret,
    gallery: [AKF_IMG.pomfret],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste. Can be frozen for up to 2 weeks.",
    nutrition: ["High-quality protein", "Rich in Omega-3", "Low in saturated fat"]
  },
  {
    id: "surmai",
    name: "Surmai (King Fish)",
    marathi: "सुरमई",
    category: "surmai",
    desc: "Firm, meaty king fish with thick steaks. Ideal for tawa fry, tandoori and rich Malvani curries.",
    price: 1000, priceMax: 1300, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "bestseller", stock: 24, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut", "Steak Cut", "Fillet"],
    img: AKF_IMG.surmai,
    gallery: [AKF_IMG.surmai],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste. Can be frozen for up to 2 weeks.",
    nutrition: ["Excellent source of protein", "Rich in Omega-3", "Contains Vitamin D"]
  },
  {
    id: "rawas",
    name: "Rawas (Indian Salmon)",
    marathi: "रावस",
    category: "rawas",
    desc: "Soft, buttery Indian salmon with a mild flavour. Excellent grilled, pan-seared or lightly fried.",
    price: 1500, priceMax: 1500, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 14, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut", "Steak Cut", "Fillet"],
    img: AKF_IMG.rawas,
    gallery: [AKF_IMG.rawas],
    tags: ["Fresh Catch", "Premium"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste. Can be frozen for up to 2 weeks.",
    nutrition: ["Rich in Omega-3 fatty acids", "High-quality protein", "Source of Vitamin B12"]
  },
  {
    id: "halwa",
    name: "Halwa",
    marathi: "हलवा",
    category: "halwa",
    desc: "Tender, sweet white flesh with a delicate texture. A coastal favourite for light frying and curries.",
    price: 1000, priceMax: 1000, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 16, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut", "Steak Cut"],
    img: AKF_IMG.halwa,
    gallery: [AKF_IMG.halwa],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste. Can be frozen for up to 2 weeks.",
    nutrition: ["Good source of protein", "Low in fat", "Rich in minerals"]
  },
  {
    id: "bangda",
    name: "Bangda (Indian Mackerel)",
    marathi: "बांगडा",
    category: "bangda",
    desc: "Rich, flavourful mackerel — a coastal staple. Perfect for Konkani masala fry and traditional curries.",
    price: 400, priceMax: 400, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "bestseller", stock: 40, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut"],
    img: AKF_IMG.bangda,
    gallery: [AKF_IMG.bangda],
    tags: ["Fresh Catch", "Value Pick"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["High in Omega-3", "Rich in Vitamin B12", "Good source of Selenium"]
  },
  {
    id: "prawns",
    name: "Prawns (Kolambi)",
    marathi: "कोळंबी",
    category: "prawns",
    desc: "Fresh prawns, cleaned and deveined on request. Great for prawn curry, koliwada and butter garlic prawns.",
    price: 1000, priceMax: 1000, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "bestseller", stock: 26, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Deveined"],
    img: AKF_IMG.prawns,
    gallery: [AKF_IMG.prawns],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste. Can be frozen for up to 2 weeks.",
    nutrition: ["High in protein", "Low in calories", "Rich in Selenium"]
  },
  {
    id: "mandeli",
    name: "Mandeli (Bombay Anchovy)",
    marathi: "मांदेली",
    category: "smallfish",
    desc: "Small, delicate anchovies. Crisp-fried whole or cooked in a dry masala — a true Koli-style dish.",
    price: 250, priceMax: 450, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 22, isNew: false,
    weights: [250, 500, 1000],
    cuts: ["Whole", "Cleaned"],
    img: AKF_IMG.mandeli,
    gallery: [AKF_IMG.mandeli],
    tags: ["Fresh Catch", "Value Pick"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Rich in Calcium", "High in protein", "Source of Omega-3"]
  },
  {
    id: "bombil",
    name: "Bombay Duck (Bombil)",
    marathi: "बोंबिल",
    category: "smallfish",
    desc: "Soft, moist bombil. Best coated in rava and shallow-fried until golden and crisp.",
    price: 500, priceMax: 500, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 18, isNew: false,
    weights: [250, 500, 1000],
    cuts: ["Whole", "Cleaned"],
    img: AKF_IMG.bombil,
    gallery: [AKF_IMG.bombil],
    tags: ["Fresh Catch"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Good source of protein", "Low in fat"]
  },
  {
    id: "mushi",
    name: "Mushi (Boneless Shark)",
    marathi: "मूशी",
    category: "smallfish",
    desc: "Firm, mild, boneless shark meat. Popular for mushi fry and thick masala curry.",
    price: 500, priceMax: 500, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 12, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Curry Cut", "Cleaned"],
    img: AKF_IMG.mushi,
    gallery: [AKF_IMG.mushi],
    tags: ["Fresh Catch", "Boneless"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste. Can be frozen for up to 2 weeks.",
    nutrition: ["High in protein", "Low in fat"]
  },
  {
    id: "black-crab",
    name: "Black Crab",
    marathi: "खेकडा",
    category: "crabs",
    desc: "Meaty mud crab with rich, dense meat. Ideal for crab kalvan and masala crab.",
    price: 1200, priceMax: 1700, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 10, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Halved"],
    img: AKF_IMG.blackCrab,
    gallery: [AKF_IMG.blackCrab],
    tags: ["Fresh Catch", "Premium"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Rich in protein", "High in Zinc", "Source of Vitamin B12"]
  },
  {
    id: "red-crab",
    name: "Red Crab",
    marathi: "खेकडा",
    category: "crabs",
    desc: "Sweet, succulent sea crab. Great for spicy crab curry and crab sukka.",
    price: 600, priceMax: 600, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 10, isNew: false,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Halved"],
    img: AKF_IMG.redCrab,
    gallery: [AKF_IMG.redCrab],
    tags: ["Fresh Catch", "Premium"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Rich in protein", "High in Zinc", "Source of Copper"]
  },
  {
    id: "tisarya",
    name: "Tisarya / Shimplya (Clams & Mussels)",
    marathi: "तिसऱ्या / शिंपल्या",
    category: "shellfish",
    desc: "Fresh clams and mussels from the Konkan coast. For tisrya masala, sukka and shellfish soups.",
    price: 300, priceMax: 500, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 20, isNew: false,
    weights: [250, 500, 1000],
    cuts: ["Whole", "Cleaned", "Shelled"],
    img: AKF_IMG.tisarya,
    gallery: [AKF_IMG.tisarya],
    tags: ["Fresh Catch", "Value Pick"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Excellent source of Iron", "High in Vitamin B12", "Rich in protein"]
  },
  {
    id: "dhoma",
    name: "Dhoma",
    marathi: "ढोमा",
    category: "smallfish",
    desc: "Mild, soft-fleshed local catch that cooks quickly. A good everyday fish for fry and simple coastal curries.",
    price: 300, priceMax: 300, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 20, isNew: true,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut"],
    img: AKF_IMG.dhoma,
    gallery: [AKF_IMG.dhoma],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Good source of protein", "Low in fat"]
  },
  {
    id: "ghol",
    name: "Ghol",
    marathi: "घोळ",
    category: "smallfish",
    desc: "Large, firm and meaty fish prized for thick steaks. Excellent for tawa fry and rich curries.",
    price: 1500, priceMax: 1500, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 20, isNew: true,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut", "Steak Cut"],
    img: AKF_IMG.ghol,
    gallery: [AKF_IMG.ghol],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Good source of protein", "Low in fat"]
  },
  {
    id: "murdi",
    name: "Murdi",
    marathi: "मुरडी",
    category: "smallfish",
    desc: "Slender, tender local fish. Best shallow-fried whole or cooked in a light masala.",
    price: 700, priceMax: 700, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 20, isNew: true,
    weights: [250, 500, 1000],
    cuts: ["Whole", "Cleaned"],
    img: AKF_IMG.murdi,
    gallery: [AKF_IMG.murdi],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Good source of protein", "Low in fat"]
  },
  {
    id: "singhada",
    name: "Singhada",
    marathi: "शिंगाडा",
    category: "smallfish",
    desc: "Hearty, meaty fish with few bones. Popular for spicy curries and slow-cooked gravies.",
    price: 700, priceMax: 700, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 20, isNew: true,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut"],
    img: AKF_IMG.singhada,
    gallery: [AKF_IMG.singhada],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Good source of protein", "Low in fat"]
  },
  {
    id: "thamb",
    name: "Thamb",
    marathi: "तांब",
    category: "smallfish",
    desc: "Firm, flavourful reddish fish. Great for tawa fry, grills and Malvani-style curries.",
    price: 1500, priceMax: 1500, oldPrice: 0,
    unit: "kg", rating: 0, reviews: 0, sold: 0,
    badge: "", stock: 20, isNew: true,
    weights: [250, 500, 1000, 2000],
    cuts: ["Whole", "Cleaned", "Curry Cut", "Steak Cut"],
    img: AKF_IMG.thamb,
    gallery: [AKF_IMG.thamb],
    tags: ["Fresh Catch", "Hygienically Cleaned"],
    storage: "Store at 0–4°C and cook within 24 hours for best taste.",
    nutrition: ["Good source of protein", "Low in fat"]
  }
];

/* ============================================================
   Categories
   ============================================================ */
const AKF_CATEGORIES = [
  { id: "pomfret", name: "Pomfret", marathi: "पापलेट", img: AKF_IMG.pomfret, desc: "Whole & cut pomfret" },
  { id: "surmai", name: "Surmai", marathi: "सुरमई", img: AKF_IMG.surmai, desc: "King fish steaks & cuts" },
  { id: "rawas", name: "Rawas", marathi: "रावस", img: AKF_IMG.rawas, desc: "Indian salmon" },
  { id: "halwa", name: "Halwa", marathi: "हलवा", img: AKF_IMG.halwa, desc: "Tender coastal fish" },
  { id: "bangda", name: "Bangda", marathi: "बांगडा", img: AKF_IMG.bangda, desc: "Indian mackerel" },
  { id: "prawns", name: "Prawns", marathi: "कोळंबी", img: AKF_IMG.prawns, desc: "Fresh prawns" },
  { id: "smallfish", name: "Local Catch", marathi: "मासळी", img: AKF_IMG.mandeli, desc: "Mandeli, bombil, mushi & more" },
  { id: "crabs", name: "Crabs", marathi: "खेकडा", img: AKF_IMG.crab, desc: "Black & red crab" },
  { id: "shellfish", name: "Shellfish", marathi: "शिंपल्या", img: AKF_IMG.tisarya, desc: "Clams & mussels" }
];

/* ============================================================
   Delivery areas & coupons
   ============================================================ */
/* Delivery is priced by zone (pincode range). The exact locality name for
   each pincode comes from AKF_PINCODE_AREAS below (India Post data). */
const AKF_DELIVERY_ZONES = [
  {
    id: "mumbai", name: "Mumbai",
    note: "Mumbai island city & western/eastern suburbs",
    charge: 49,
    match: function (n) { return n >= 400001 && n <= 400104; }
  },
  {
    id: "thane", name: "Thane",
    note: "Thane, Kalwa, Mumbra, Ghodbunder Road",
    charge: 59,
    match: function (n) { return n >= 400600 && n <= 400615; }
  },
  {
    id: "navi-mumbai", name: "Navi Mumbai",
    note: "Airoli to Panvel — Vashi, Nerul, Belapur, Kharghar, Kamothe, Taloja",
    charge: 69,
    match: function (n) { return (n >= 400700 && n <= 400710) || (n >= 410200 && n <= 410222); }
  },
  {
    id: "mbvv", name: "Mira-Bhayandar / Vasai–Virar",
    note: "Mira Road, Bhayandar, Naigaon, Vasai, Nalasopara, Virar",
    charge: 79,
    match: function (n) { return n >= 401100 && n <= 401209; }
  },
  {
    id: "kdmt", name: "Kalyan / Dombivli / Ambernath",
    note: "Dombivli, Kalyan, Ulhasnagar, Bhiwandi, Ambernath, Badlapur, Titwala",
    charge: 79,
    match: function (n) { return n >= 421001 && n <= 421605; }
  }
];

/* Exact locality per pincode — India Post directory (all Mumbai-region 400xxx
   plus the serviced Thane / Navi Mumbai / MMR codes). Charge still comes from
   the zone; anything not listed but inside a zone falls back to the zone name. */
const AKF_PINCODE_AREAS = {
  /* ===== Mumbai — Island City (₹49) ===== */
  "400001": "Fort", "400002": "Kalbadevi", "400003": "Masjid Bunder",
  "400004": "Girgaon", "400005": "Colaba", "400006": "Malabar Hill",
  "400007": "Grant Road / Tardeo", "400008": "Mumbai Central", "400009": "Chinch Bunder",
  "400010": "Mazgaon", "400011": "Agripada / Jacob Circle", "400012": "Parel / Lalbaug",
  "400013": "Lower Parel", "400014": "Dadar East", "400015": "Sewri",
  "400016": "Mahim", "400017": "Dharavi", "400018": "Worli",
  "400019": "Matunga", "400020": "Churchgate / Marine Lines", "400021": "Nariman Point",
  "400022": "Sion / Chunabhatti", "400024": "Nehru Nagar, Kurla", "400025": "Prabhadevi",
  "400026": "Cumballa Hill", "400027": "Reay Road", "400028": "Dadar West / Shivaji Park",
  "400029": "Kalina, Santacruz East", "400030": "Worli", "400031": "Wadala",
  "400032": "Mantralaya", "400033": "Cotton Green / Kalachowki", "400034": "Haji Ali / Tardeo",
  "400035": "Raj Bhavan", "400037": "Antop Hill", "400042": "Bhandup East",
  "400043": "Shivaji Nagar, Govandi",
  /* ===== Mumbai — Western Suburbs (₹49) ===== */
  "400049": "Juhu", "400050": "Bandra West", "400051": "Bandra East",
  "400052": "Khar West", "400053": "Andheri West / Lokhandwala", "400054": "Santacruz West",
  "400055": "Santacruz East / Vakola", "400056": "Vile Parle West", "400057": "Vile Parle East",
  "400058": "Andheri West", "400061": "Versova", "400063": "Goregaon East",
  "400064": "Malad West", "400065": "Aarey Colony, Goregaon", "400066": "Borivali East",
  "400067": "Kandivali West", "400068": "Dahisar", "400091": "Borivali West",
  "400092": "Borivali West", "400095": "Malad West / Marve Road", "400097": "Malad East",
  "400101": "Kandivali East", "400102": "Oshiwara / Jogeshwari West",
  "400103": "Borivali West / Mandapeshwar", "400104": "Goregaon West / Bangur Nagar",
  /* ===== Mumbai — Eastern / Central Suburbs (₹49) ===== */
  "400059": "Marol, Andheri East", "400060": "Jogeshwari East", "400069": "Andheri East",
  "400070": "Kurla West", "400071": "Chembur", "400072": "Sakinaka, Andheri East",
  "400074": "Chembur East", "400075": "Ghatkopar West", "400076": "Powai",
  "400077": "Ghatkopar East", "400078": "Bhandup West", "400079": "Vikhroli",
  "400080": "Mulund West", "400081": "Mulund East", "400082": "Mulund Colony",
  "400083": "Kannamwar Nagar, Vikhroli", "400084": "Ghatkopar East", "400085": "Trombay",
  "400086": "Ghatkopar East", "400087": "Powai / NITIE", "400088": "Govandi / Trombay",
  "400089": "Chembur / Tilak Nagar", "400093": "Andheri East (MIDC)", "400094": "Anushakti Nagar",
  "400096": "SEEPZ, Andheri East", "400098": "Kalina, Santacruz East", "400099": "Andheri East / Airport",
  /* ===== Thane (₹59) ===== */
  "400601": "Thane West", "400602": "Naupada, Thane West", "400603": "Thane East",
  "400604": "Wagle Estate, Thane", "400605": "Kalwa", "400606": "Panchpakhadi, Thane West",
  "400607": "Manpada, Thane West", "400608": "Balkum, Thane West", "400610": "Thane West",
  "400612": "Mumbra", "400615": "Ghodbunder Road, Thane West",
  /* ===== Navi Mumbai (₹69) ===== */
  "400701": "Ghansoli", "400702": "Uran", "400703": "Vashi", "400704": "Uran (Mora)",
  "400705": "Sanpada", "400706": "Nerul", "400707": "Uran / JNPT", "400708": "Airoli",
  "400709": "Koparkhairane", "400710": "Mahape",
  "410206": "Panvel", "410208": "Taloja", "410209": "Kamothe", "410210": "Kharghar",
  "410216": "Kharghar", "410218": "Kalamboli", "410221": "New Panvel",
  /* ===== Mira-Bhayandar / Vasai–Virar (₹79) ===== */
  "401101": "Bhayandar West", "401105": "Bhayandar East", "401106": "Uttan",
  "401107": "Mira Road", "401201": "Vasai (Bassein)", "401202": "Vasai Road",
  "401203": "Nalasopara", "401207": "Naigaon", "401208": "Vasai East", "401209": "Nalasopara East",
  /* ===== Kalyan / Dombivli / Ambernath (₹79) ===== */
  "421002": "Ulhasnagar", "421003": "Ulhasnagar", "421004": "Ulhasnagar", "421005": "Ulhasnagar",
  "421201": "Dombivli East", "421202": "Dombivli West", "421203": "Dombivli MIDC", "421204": "Dombivli",
  "421301": "Kalyan West", "421302": "Bhiwandi", "421306": "Katemanivali, Kalyan East",
  "421308": "Bhiwandi", "421501": "Ambernath", "421503": "Badlapur", "421505": "Ambernath",
  "421605": "Titwala"
};

const AKF_COUPONS = [
  { code: "FRESH10", type: "percent", value: 10, min: 499, desc: "10% off on orders above ₹499" },
  { code: "WELCOME50", type: "fixed", value: 50, min: 599, desc: "₹50 off on your first order above ₹599" },
  { code: "FEAST150", type: "fixed", value: 150, min: 1499, desc: "₹150 off on orders above ₹1499" },
  { code: "SEA20", type: "percent", value: 20, min: 1999, desc: "20% off on orders above ₹1999" }
];

/* ============================================================
   Testimonials — real customer reviews
   ============================================================ */
const AKF_TESTIMONIALS = [
  { name: "Pratham Padawal", area: "Verified Google review", rating: 5, text: "खूप फ्रेश आणि छान मच्छी असते दादा कडे, आणि योग्य दरात आणि चांगली quality असते." },
  { name: "Kalpana Acharya", area: "Verified Google review", rating: 5, text: "The fish is very fresh and it's cleaned properly. Hygiene and quality is topmost." },
  { name: "Rahul Pirdhankar", area: "Verified Google review", rating: 5, text: "Freshness, great quality, value for money — all in one at AK Fishers. Fish and prawns were really fresh." }
];

/* ============================================================
   Helpers
   ============================================================ */
function akfFormatINR(n) {
  return "₹" + Math.round(Number(n)).toLocaleString("en-IN");
}

function akfGetProduct(id) {
  return AKF_PRODUCTS.find(function (p) { return p.id === id; });
}

function akfCategoryCount(catId) {
  return AKF_PRODUCTS.filter(function (p) { return p.category === catId; }).length;
}

function akfFindArea(pincode) {
  var pin = String(pincode == null ? "" : pincode).trim();
  if (!/^\d{6}$/.test(pin)) return null;
  var n = parseInt(pin, 10);
  var z = AKF_DELIVERY_ZONES.find(function (zn) { return zn.match(n); });
  if (!z) return null;
  var precise = AKF_PINCODE_AREAS[pin];
  return {
    pincode: pin,
    area: precise || z.name,   // exact locality when known, else the zone name
    zoneName: z.name,
    charge: z.charge,
    zone: z.id,
    note: z.note
  };
}

function akfEscapeHTML(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* Turn a product image URL into a 1200x630 social-share (OG) crop */
function akfOgImage(url) {
  url = String(url || "");
  if (url.indexOf("images.unsplash.com") > -1) {
    return url.replace(/([?&])w=\d+/, "$1w=1200")
              .replace(/([?&])h=\d+/, "$1h=630")
      + (/[?&]h=/.test(url) ? "" : "&h=630");
  }
  if (url && url.indexOf("://") === -1) return "https://akfishers.com/" + url.replace(/^\//, "");
  return url;
}

function akfStars(rating) {
  var full = Math.round(rating);
  var s = "";
  for (var i = 0; i < 5; i++) {
    s += i < full
      ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>';
  }
  return s;
}

function akfBadgeHTML(p) {
  var h = "";
  if (p.badge === "bestseller") h += '<span class="badge badge--bestseller">★ Best Seller</span>';
  if (p.badge === "new") h += '<span class="badge badge--new">New Arrival</span>';
  if (p.oldPrice && p.oldPrice > p.price) {
    var off = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
    h += '<span class="badge badge--discount">' + off + '% OFF</span>';
  }
  return h;
}

/* Price shown on cards / listings: indicative per-kg range */
function akfPriceRangeHTML(p) {
  if (p.oldPrice && p.oldPrice > p.price) {
    return '<span class="pc-price">' + akfFormatINR(p.price) + ' <small>/ ' + p.unit + '</small></span>' +
           '<span class="pc-price-old">' + akfFormatINR(p.oldPrice) + '</span>';
  }
  if (p.priceMax && p.priceMax > p.price) {
    return '<span class="pc-price">' + akfFormatINR(p.price) + ' – ' + akfFormatINR(p.priceMax) +
           ' <small>/ ' + p.unit + '</small></span>';
  }
  return '<span class="pc-price">' + akfFormatINR(p.price) + ' <small>/ ' + p.unit + '</small></span>';
}

function akfProductCardHTML(p) {
  var metaHTML = p.reviews > 0
    ? '<div class="pc-meta"><span>★ ' + p.rating + '</span><span class="dot"></span><span>' + p.reviews + ' reviews</span></div>'
    : '<div class="pc-meta">' + p.tags.slice(0, 2).map(function (t) { return '<span>' + akfEscapeHTML(t) + '</span>'; }).join('<span class="dot"></span>') + '</div>';

  return '<article class="product-card" data-id="' + p.id + '">' +
    '<div class="pc-media">' +
      '<a href="/product?id=' + p.id + '"><img src="' + p.img + '" alt="' + akfEscapeHTML(p.name) + '" loading="lazy"></a>' +
      '<div class="pc-badges">' + akfBadgeHTML(p) + '</div>' +
      '<button class="pc-wish" data-wish="' + p.id + '" aria-label="Add ' + akfEscapeHTML(p.name) + ' to wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7.5-4.7-10-9.3C.6 8.6 2.4 5 5.8 5c2 0 3.4 1 4.2 2.4C10.8 6 12.2 5 14.2 5c3.4 0 5.2 3.6 3.8 6.7C19.5 16.3 12 21 12 21z"/></svg></button>' +
    '</div>' +
    '<div class="pc-body">' +
      '<a href="/product?id=' + p.id + '"><h3 class="pc-name">' + akfEscapeHTML(p.name) + '</h3></a>' +
      '<div class="pc-marathi">' + akfEscapeHTML(p.marathi) + '</div>' +
      '<p class="pc-desc">' + akfEscapeHTML(p.desc) + '</p>' +
      metaHTML +
      '<div class="pc-price-row">' + akfPriceRangeHTML(p) + '</div>' +
      '<div class="pc-actions">' +
        '<a class="btn btn--primary btn--sm" href="/product?id=' + p.id + '">Choose &amp; Add</a>' +
      '</div>' +
    '</div>' +
  '</article>';
}

function akfCategoryCardHTML(c) {
  return '<a class="cat-card" href="/shop?cat=' + c.id + '">' +
    '<img src="' + c.img + '" alt="' + akfEscapeHTML(c.name) + '" loading="lazy">' +
    '<span class="cc-count">' + akfCategoryCount(c.id) + ' item' + (akfCategoryCount(c.id) === 1 ? '' : 's') + '</span>' +
    '<div class="cc-label"><h3>' + akfEscapeHTML(c.name) + '</h3><p>' + akfEscapeHTML(c.marathi) + ' · ' + akfEscapeHTML(c.desc) + '</p></div>' +
  '</a>';
}

/* ============================================================
   Apply admin edits saved in localStorage (version-guarded)
   ============================================================ */
(function () {
  try {
    if (localStorage.getItem("akf_data_version") !== AKF_DATA_VERSION) {
      localStorage.removeItem("akf_products");
      localStorage.removeItem("akf_categories");
      localStorage.setItem("akf_data_version", AKF_DATA_VERSION);
      return;
    }
    var sp = JSON.parse(localStorage.getItem("akf_products"));
    if (sp && sp.length) { AKF_PRODUCTS.length = 0; sp.forEach(function (p) { AKF_PRODUCTS.push(p); }); }
    var sc = JSON.parse(localStorage.getItem("akf_categories"));
    if (sc && sc.length) { AKF_CATEGORIES.length = 0; sc.forEach(function (c) { AKF_CATEGORIES.push(c); }); }
  } catch (e) { /* ignore */ }
})();

function akfPersistCatalogue() {
  try {
    localStorage.setItem("akf_products", JSON.stringify(AKF_PRODUCTS));
    localStorage.setItem("akf_categories", JSON.stringify(AKF_CATEGORIES));
    localStorage.setItem("akf_data_version", AKF_DATA_VERSION);
  } catch (e) { /* ignore */ }
}
